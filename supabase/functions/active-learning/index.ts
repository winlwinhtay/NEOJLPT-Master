// ============================================================================
// Supabase Edge Function: active-learning
// Secure, Server-Side Gemini Active Learning Engine for JLPTMaster
// ============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';
const GEMINI_MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-3.8-flash';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

interface PlanRequest {
  action: 'daily-plan' | 'recalculate' | 'explain' | 'generate-practice' | 'speaking-session';
  date?: string;
  forceRefresh?: boolean;
  contentId?: string;
  contentType?: string;
  supportLanguage?: string;
  level?: string;
  learnerProfile?: any;
  candidates?: Array<{ id: string; type: string; title: string; level: string }>;
  userInput?: string;
  scenario?: string;
}

serve(async (req: Request) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Authenticate user via Supabase
    let userId = 'anonymous';
    let supabaseClient = null;
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
      if (!userError && user?.id) {
        userId = user.id;
      }
    }

    const body: PlanRequest = await req.json();
    const action = body.action || 'daily-plan';

    // -------------------------------------------------------------
    // Route 1: DAILY STUDY PLAN (With Gemini AI + Zero Hallucination)
    // -------------------------------------------------------------
    if (action === 'daily-plan' || action === 'recalculate') {
      const today = body.date || new Date().toISOString().split('T')[0];
      const level = body.level || 'N5';
      const learner = body.learnerProfile || {};
      const candidates = body.candidates || [];

      // Check Cache in learning_plans first if not forceRefresh
      if (supabaseClient && !body.forceRefresh) {
        const { data: cachedPlan } = await supabaseClient
          .from('learning_plans')
          .select('*, learning_plan_items(*)')
          .eq('user_id', userId)
          .eq('plan_date', today)
          .maybeSingle();

        if (cachedPlan && cachedPlan.learning_plan_items?.length > 0) {
          return new Response(
            JSON.stringify({
              plan: {
                id: cachedPlan.id,
                userId: cachedPlan.user_id,
                planDate: cachedPlan.plan_date,
                estimatedMinutes: cachedPlan.estimated_minutes,
                focus: cachedPlan.focus,
                aiModel: cachedPlan.ai_model,
                items: cachedPlan.learning_plan_items.map((item: any) => ({
                  id: item.id,
                  planId: item.plan_id,
                  contentId: item.content_id,
                  contentType: item.content_type,
                  skill: item.skill,
                  activity: item.activity,
                  minutes: item.minutes,
                  priority: item.priority,
                  reason: item.reason,
                  status: item.status,
                  orderIndex: item.order_index,
                })),
                source: 'cached',
              },
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // Check Gemini API Key
      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'GEMINI_API_KEY not configured on server. Use deterministic active learning engine.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Build Compact Gemini Prompt with Strict JSON Schema
      const candidateListCompact = candidates.slice(0, 30).map((c) => ({
        id: c.id,
        type: c.type,
        title: c.title,
      }));

      const systemPrompt = `You are the JLPTMaster Adaptive Learning Planner.
Your role: Select and sequence an optimal daily study lesson for a JLPT ${level} learner.
CRITICAL ZERO-HALLUCINATION RULE:
You MUST ONLY select items from the provided Candidate Curriculum list.
You MUST NOT invent content IDs.
The total duration should match ${learner.minutesPerDay || 60} minutes.
Prioritize:
1. Review of weak skills (Learner scores: ${JSON.stringify(learner.skillScores || {})})
2. Recent errors: ${JSON.stringify(learner.recentErrors || [])}
3. Next sequential curriculum lessons.

Return ONLY a JSON object adhering to this schema:
{
  "daily_plan": {
    "estimated_minutes": number,
    "focus": string[]
  },
  "lessons": [
    {
      "content_id": string,
      "content_type": string,
      "skill": string,
      "activity": string,
      "minutes": number,
      "priority": number,
      "reason": string
    }
  ]
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\nCandidate Curriculum List:\n${JSON.stringify(candidateListCompact)}\n\nGenerate today's optimal package.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      };

      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('Gemini API Error:', errorText);
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'Gemini rate limit or API error. Falling back to deterministic engine.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedPlan = JSON.parse(rawText || '{}');

      // Validate Content IDs against candidate catalog (Zero Hallucination check)
      const validCandidateIds = new Set(candidates.map((c) => c.id));
      const validatedLessons = (parsedPlan.lessons || []).filter((l: any) =>
        validCandidateIds.has(l.content_id)
      );

      if (validatedLessons.length === 0) {
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'AI output failed content_id verification. Falling back to deterministic engine.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Record AI Usage
      const inputTokens = aiResult.usageMetadata?.promptTokenCount || 500;
      const outputTokens = aiResult.usageMetadata?.candidatesTokenCount || 250;
      if (supabaseClient) {
        await supabaseClient.from('ai_usage').insert({
          user_id: userId,
          feature: 'daily_plan',
          request_date: today,
          input_tokens: inputTokens,
          output_tokens: outputTokens,
        });

        // Store Cached Plan in Supabase
        const { data: savedPlan } = await supabaseClient
          .from('learning_plans')
          .upsert({
            user_id: userId,
            plan_date: today,
            estimated_minutes: parsedPlan.daily_plan?.estimated_minutes || 60,
            focus: parsedPlan.daily_plan?.focus || ['grammar', 'listening'],
            ai_model: GEMINI_MODEL,
          })
          .select()
          .single();

        if (savedPlan?.id) {
          const planItemsToInsert = validatedLessons.map((l: any, idx: number) => ({
            plan_id: savedPlan.id,
            user_id: userId,
            content_id: l.content_id,
            content_type: l.content_type || 'grammar',
            skill: l.skill || 'grammar',
            activity: l.activity || 'guided_explanation',
            minutes: l.minutes || 15,
            priority: l.priority || 80,
            reason: l.reason || 'Curriculum progression',
            order_index: idx,
            status: 'pending',
          }));

          await supabaseClient.from('learning_plan_items').delete().eq('plan_id', savedPlan.id);
          await supabaseClient.from('learning_plan_items').insert(planItemsToInsert);
        }
      }

      return new Response(
        JSON.stringify({
          status: 'success',
          plan: {
            id: `plan-gemini-${today}`,
            userId,
            planDate: today,
            estimatedMinutes: parsedPlan.daily_plan?.estimated_minutes || 60,
            focus: parsedPlan.daily_plan?.focus || ['grammar', 'listening'],
            aiModel: GEMINI_MODEL,
            isCompleted: false,
            completedMinutes: 0,
            items: validatedLessons.map((l: any, idx: number) => ({
              id: `item-${idx}`,
              contentId: l.content_id,
              contentType: l.content_type,
              skill: l.skill,
              activity: l.activity,
              minutes: l.minutes,
              priority: l.priority,
              reason: l.reason,
              status: 'pending',
              orderIndex: idx,
            })),
            source: 'gemini_ai',
            generatedAt: new Date().toISOString(),
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // -------------------------------------------------------------
    // Route 2: ADAPTIVE EXPLANATION (Grammar / Kanji / Nuance)
    // -------------------------------------------------------------
    if (action === 'explain') {
      const { contentId, level = 'N5', supportLanguage = 'en' } = body;
      if (!GEMINI_API_KEY) {
        return new Response(JSON.stringify({ status: 'fallback', message: 'No API key' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const prompt = `You are a native Japanese language university instructor explaining JLPT ${level} grammar/kanji concept: "${contentId}".
Target Learner Level: JLPT ${level}.
Support Explanation Language: ${supportLanguage}.
Rules:
- For N5/N4: Use simple, crystal-clear language with high clarity.
- For N2/N1: Provide nuanced distinction, formality register, and collocations.
- Japanese example sentences must remain authentic Japanese with natural phrasing.
Return JSON:
{
  "title": string,
  "explanation": string,
  "structure": string,
  "examples": [{"jp": string, "reading": string, "meaning": string}],
  "commonMistakes": string,
  "studyTip": string
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      return new Response(rawText || '{}', {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // -------------------------------------------------------------
    // Route 3: SPEAKING PRACTICE EVALUATION
    // -------------------------------------------------------------
    if (action === 'speaking-session') {
      const { userInput, scenario = 'General conversation', level = 'N5' } = body;
      const prompt = `Evaluate this Japanese learner's speech/response for JLPT ${level}.
Scenario: "${scenario}"
Learner response: "${userInput}"
Score objectively on a 0-100 scale across:
- Grammar accuracy
- Vocabulary naturalness
- Appropriateness/Politeness (Keigo/formality)
- Fluency/Cohesion
Provide constructive feedback and a natural native alternative.
Return JSON:
{
  "overallScore": number,
  "grammarScore": number,
  "vocabScore": number,
  "appropriatenessScore": number,
  "fluencyScore": number,
  "feedback": string,
  "betterAlternative": string,
  "reading": string,
  "explanation": string
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      return new Response(rawText || '{}', {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Edge Function Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
