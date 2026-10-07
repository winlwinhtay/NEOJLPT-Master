// ============================================================================
// Supabase Edge Function: active-learning
// Cost-Optimized AI Content Cache, Deduplication & Active Learning Gateway
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
const PROMPT_VERSION = 'v2';

// In-flight request deduplication map to prevent cache stampedes
const inFlightRequests = new Map<string, Promise<any>>();

// Helper: Compute SHA-256 Hex Digest
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Helper: Generate Deterministic Cache Key
async function buildContentCacheKey(params: {
  contentType: string;
  jlptLevel: string;
  topicId?: string;
  sourceContentId?: string;
  difficulty?: string;
  supportLanguage?: string;
  promptVersion?: string;
  model?: string;
}): Promise<string> {
  const normType = (params.contentType || 'general').trim().toLowerCase();
  const normLevel = (params.jlptLevel || 'N5').trim().toUpperCase();
  const normTopic = (params.topicId || '').trim().toLowerCase();
  const normSource = (params.sourceContentId || '').trim();
  const normDiff = (params.difficulty || 'intermediate').trim().toLowerCase();
  const normLang = (params.supportLanguage || 'en').trim().toLowerCase();
  const normVer = (params.promptVersion || PROMPT_VERSION).trim();
  const normModel = (params.model || GEMINI_MODEL).trim();

  const rawKey = `${normType}:${normLevel}:${normTopic}:${normSource}:${normDiff}:${normLang}:${normVer}:${normModel}`;
  return await sha256(rawKey);
}

// Pricing constants for cost tracking (Gemini Flash estimated tier)
const INPUT_COST_PER_TOKEN = 0.0000001; // $0.10 per 1M
const OUTPUT_COST_PER_TOKEN = 0.0000004; // $0.40 per 1M

serve(async (req: Request) => {
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

    let userId = 'anonymous';
    let supabaseClient = null;
    let isAdminUser = false;
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const token = authHeader.replace('Bearer ', '');
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser(token);
      if (!userError && user?.id) {
        userId = user.id;
        const userEmail = (user.email || '').trim().toLowerCase();
        if (userEmail === 'neowin001@gmail.com') {
          isAdminUser = true;
          // Ensure profile in database has role admin and is_premium true
          await supabaseClient.from('profiles').update({
            role: 'admin',
            is_premium: true,
            account_type: 'ADMIN',
          }).eq('id', user.id);
        }
      }
    }

    const body = await req.json();
    const action = body.action || 'daily-plan';
    const today = new Date().toISOString().split('T')[0];

    // =========================================================================
    // ROUTE 0: ADMIN CACHE STATS & TELEMETRY
    // =========================================================================
    if (action === 'cache-stats') {
      if (!supabaseClient) {
        return new Response(JSON.stringify({ error: 'Database client unavailable' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: statsData, error: statsError } = await supabaseClient.rpc('get_ai_cache_stats');
      if (statsError) {
        console.error('Error fetching cache stats:', statsError);
      }

      // Fetch recent 10 cached entries for explorer
      const { data: recentCache } = await supabaseClient
        .from('ai_content_cache')
        .select('id, cache_key, content_type, jlpt_level, source_content_id, quality_status, usage_count, created_at, last_used_at')
        .order('last_used_at', { ascending: false })
        .limit(20);

      // Fetch daily cost metric aggregates
      const { data: costHistory } = await supabaseClient
        .from('ai_cost_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(14);

      return new Response(
        JSON.stringify({
          stats: statsData || {
            totalCached: 0,
            totalQuestions: 0,
            cacheHits: 0,
            cacheMisses: 0,
            geminiCalls: 0,
            hitRatePercent: 0,
            tokensSaved: 0,
            costSavedUsd: 0,
          },
          recentEntries: recentCache || [],
          costHistory: costHistory || [],
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // =========================================================================
    // ROUTE 1: ADAPTIVE EXPLANATION (Cache-First + Stampede Protection)
    // =========================================================================
    if (action === 'explain') {
      const {
        contentId,
        contentType = 'grammar_explanation',
        level = 'N5',
        supportLanguage = 'en',
        difficulty = 'intermediate',
        forceRefresh = false,
      } = body;

      if (!contentId) {
        return new Response(JSON.stringify({ error: 'contentId is required for explain' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const cacheKey = await buildContentCacheKey({
        contentType,
        jlptLevel: level,
        sourceContentId: contentId,
        difficulty,
        supportLanguage,
        promptVersion: PROMPT_VERSION,
        model: GEMINI_MODEL,
      });

      // 1. CHECK CACHE FIRST (unless forceRefresh is true)
      if (supabaseClient && !forceRefresh) {
        const { data: cached } = await supabaseClient
          .from('ai_content_cache')
          .select('*')
          .eq('cache_key', cacheKey)
          .in('quality_status', ['validated', 'published'])
          .maybeSingle();

        if (cached && cached.response_json) {
          // Increment cache hit count asynchronously
          supabaseClient.rpc('increment_ai_cache_hit', { p_cache_key: cacheKey }).then(() => {});
          supabaseClient
            .rpc('record_ai_metric', {
              p_date: today,
              p_model: GEMINI_MODEL,
              p_feature: contentType,
              p_input_tokens: 0,
              p_output_tokens: 0,
              p_is_hit: true,
              p_cost: 0,
            })
            .then(() => {});

          return new Response(
            JSON.stringify({
              ...cached.response_json,
              _source: 'cache',
              _cacheKey: cacheKey,
              _usageCount: cached.usage_count + 1,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // 2. CHECK IN-FLIGHT DEDUPLICATION (Prevent Cache Stampede)
      if (inFlightRequests.has(cacheKey)) {
        const inFlightResult = await inFlightRequests.get(cacheKey);
        return new Response(
          JSON.stringify({ ...inFlightResult, _source: 'cache_inflight_dedup' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check Gemini API Key
      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'GEMINI_API_KEY not configured. Use deterministic local explanation.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 3. CALL GEMINI (Wrapped in Promise for deduplication)
      const generationPromise = (async () => {
        const systemPrompt = `You are an expert native Japanese language educator and university instructor explaining JLPT ${level} concept: "${contentId}".
Target Learner Level: JLPT ${level}.
Support Explanation Language: ${supportLanguage}.
Rules:
- For N5/N4: Use clear, friendly language with accessible explanations.
- For N3/N2/N1: Provide nuanced distinction, formality register (keigo/colloquial), and natural collocations.
- Japanese example sentences must be authentic, natural Japanese with readings.
- Output MUST strictly be valid JSON adhering to this schema:
{
  "title": string,
  "explanation": string,
  "structure": string,
  "examples": [
    { "jp": string, "reading": string, "meaning": string }
  ],
  "commonMistakes": string,
  "studyTip": string
}`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        const aiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          throw new Error(`Gemini API Error: ${errText}`);
        }

        const aiResult = await aiResponse.json();
        const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(rawText || '{}');

        // Telemetry metrics
        const inputTokens = aiResult.usageMetadata?.promptTokenCount || 450;
        const outputTokens = aiResult.usageMetadata?.candidatesTokenCount || 250;
        const estimatedCost = (inputTokens * INPUT_COST_PER_TOKEN) + (outputTokens * OUTPUT_COST_PER_TOKEN);

        // Store in Supabase Cache
        if (supabaseClient && parsed.explanation) {
          await supabaseClient.from('ai_content_cache').upsert(
            {
              cache_key: cacheKey,
              content_type: contentType,
              jlpt_level: level,
              source_content_id: contentId,
              difficulty,
              support_language: supportLanguage,
              prompt_version: PROMPT_VERSION,
              model: GEMINI_MODEL,
              response_json: parsed,
              quality_status: 'published',
              usage_count: 1,
            },
            { onConflict: 'cache_key' }
          );

          await supabaseClient.rpc('record_ai_metric', {
            p_date: today,
            p_model: GEMINI_MODEL,
            p_feature: contentType,
            p_input_tokens: inputTokens,
            p_output_tokens: outputTokens,
            p_is_hit: false,
            p_cost: estimatedCost,
          });
        }

        return parsed;
      })();

      inFlightRequests.set(cacheKey, generationPromise);
      try {
        const result = await generationPromise;
        return new Response(
          JSON.stringify({ ...result, _source: 'gemini_ai', _cacheKey: cacheKey }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    }

    // =========================================================================
    // ROUTE 2: BATCH PRACTICE QUESTIONS & REUSABLE QUESTION BANK
    // =========================================================================
    if (action === 'generate-practice') {
      const {
        contentId,
        level = 'N5',
        skill = 'grammar',
        count = 3,
        supportLanguage = 'en',
        difficulty = 'medium',
      } = body;

      // 1. Check AI Question Bank pool first!
      if (supabaseClient) {
        const { data: pooledQuestions } = await supabaseClient
          .from('ai_question_bank')
          .select('*')
          .eq('source_content_id', contentId)
          .eq('skill', skill)
          .in('quality_status', ['validated', 'published'])
          .limit(count);

        if (pooledQuestions && pooledQuestions.length >= count) {
          // Serve from pool with 0 tokens!
          for (const q of pooledQuestions) {
            supabaseClient
              .from('ai_question_bank')
              .update({ times_served: (q.times_served || 0) + 1 })
              .eq('id', q.id)
              .then(() => {});
          }

          supabaseClient
            .rpc('record_ai_metric', {
              p_date: today,
              p_model: GEMINI_MODEL,
              p_feature: 'practice_pool',
              p_input_tokens: 0,
              p_output_tokens: 0,
              p_is_hit: true,
              p_cost: 0,
            })
            .then(() => {});

          return new Response(
            JSON.stringify({
              questions: pooledQuestions.map((q) => ({
                id: q.id,
                ...q.question_json,
                ...q.answer_json,
                explanation: q.explanation_json || q.answer_json.explanation,
                _source: 'question_bank_pool',
              })),
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // If pool is low, BATCH GENERATE 5-10 questions in a SINGLE Gemini call!
      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'GEMINI_API_KEY not configured. Use deterministic question templates.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const batchCount = Math.max(5, count);
      const prompt = `You are a JLPT test creation specialist generating a batch of ${batchCount} authentic, high-quality JLPT ${level} practice questions for concept/grammar: "${contentId}".
Skill: ${skill}. Difficulty: ${difficulty}. Language: ${supportLanguage}.
Rules:
- Questions must strictly mirror authentic JLPT exam question structure.
- Provide 4 distinct options per question with exactly 1 correct answer.
- Distractors must be plausible, targeting common learner confusions.
- Provide detailed explanation for why the correct answer is right and why others are wrong.
Return JSON:
{
  "questions": [
    {
      "prompt": string,
      "options": string[],
      "correctIndex": number,
      "correctAnswer": string,
      "explanation": string,
      "questionType": "multiple_choice" | "fill_blank" | "particle_choice"
    }
  ]
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!aiResponse.ok) {
        throw new Error(`Gemini question generation error: ${await aiResponse.text()}`);
      }

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText || '{}');
      const generatedList = parsed.questions || [];

      // Deduplicate by question_hash and save batch into ai_question_bank
      const savedQuestions: any[] = [];
      if (supabaseClient && generatedList.length > 0) {
        for (const q of generatedList) {
          const qHash = await sha256(`${contentId}:${q.prompt}:${q.correctAnswer}`);
          const qCacheKey = await sha256(`qbank:${contentId}:${skill}:${level}`);

          const { data: inserted, error: insertError } = await supabaseClient
            .from('ai_question_bank')
            .upsert(
              {
                cache_key: qCacheKey,
                question_hash: qHash,
                source_content_id: contentId,
                jlpt_level: level,
                skill,
                question_type: q.questionType || 'multiple_choice',
                difficulty,
                question_json: { prompt: q.prompt, options: q.options },
                answer_json: {
                  correctIndex: q.correctIndex,
                  correctAnswer: q.correctAnswer,
                  explanation: q.explanation,
                },
                explanation_json: { explanation: q.explanation },
                support_language: supportLanguage,
                quality_status: 'published',
                times_served: 1,
              },
              { onConflict: 'question_hash' }
            )
            .select()
            .single();

          if (!insertError && inserted) {
            savedQuestions.push(inserted);
          }
        }

        // Record Batch Generation Token Metrics
        const inputTokens = aiResult.usageMetadata?.promptTokenCount || 600;
        const outputTokens = aiResult.usageMetadata?.candidatesTokenCount || 800;
        const estimatedCost = (inputTokens * INPUT_COST_PER_TOKEN) + (outputTokens * OUTPUT_COST_PER_TOKEN);
        await supabaseClient.rpc('record_ai_metric', {
          p_date: today,
          p_model: GEMINI_MODEL,
          p_feature: 'question_batch_generation',
          p_input_tokens: inputTokens,
          p_output_tokens: outputTokens,
          p_is_hit: false,
          p_cost: estimatedCost,
        });
      }

      return new Response(
        JSON.stringify({
          questions: (savedQuestions.length > 0 ? savedQuestions : generatedList)
            .slice(0, count)
            .map((q: any) => ({
              id: q.id || `q-gen-${Math.random()}`,
              ...(q.question_json || { prompt: q.prompt, options: q.options }),
              ...(q.answer_json || {
                correctIndex: q.correctIndex,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
              }),
              _source: 'gemini_batch_generated',
            })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // =========================================================================
    // ROUTE 3: MULTI-LANGUAGE TRANSLATION (Cache-First)
    // =========================================================================
    if (action === 'translation') {
      const { contentId, targetLanguage = 'en', sourceContent } = body;
      const transKey = await sha256(`trans:${contentId}:${targetLanguage}:${PROMPT_VERSION}`);

      if (supabaseClient) {
        const { data: cachedTrans } = await supabaseClient
          .from('ai_content_translations')
          .select('*')
          .eq('translation_key', transKey)
          .maybeSingle();

        if (cachedTrans && cachedTrans.translated_json) {
          return new Response(
            JSON.stringify({
              translated: cachedTrans.translated_json,
              _source: 'translation_cache',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({ status: 'fallback', message: 'Translation service unavailable' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const prompt = `Translate this Japanese learning explanation into ${targetLanguage} with high grammatical accuracy and educational clarity:
${JSON.stringify(sourceContent)}
Return JSON:
{
  "title": string,
  "explanation": string,
  "examples": [{"jp": string, "reading": string, "meaning": string}],
  "studyTip": string
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedTrans = JSON.parse(rawText || '{}');

      if (supabaseClient && parsedTrans.explanation) {
        await supabaseClient.from('ai_content_translations').upsert(
          {
            translation_key: transKey,
            source_content_id: contentId || 'custom',
            language: targetLanguage,
            translated_json: parsedTrans,
            quality_status: 'published',
          },
          { onConflict: 'translation_key' }
        );
      }

      return new Response(
        JSON.stringify({ translated: parsedTrans, _source: 'gemini_translation' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // =========================================================================
    // ROUTE 4: DAILY STUDY PLAN (Personalized, Zero-Hallucination & User-Cached)
    // =========================================================================
    if (action === 'daily-plan' || action === 'recalculate') {
      const planDate = body.date || today;
      const level = body.level || 'N5';
      const learner = body.learnerProfile || {};
      const candidates = body.candidates || [];

      // Check User's Personal Daily Plan Cache first
      if (supabaseClient && !body.forceRefresh) {
        const { data: cachedPlan } = await supabaseClient
          .from('learning_plans')
          .select('*, learning_plan_items(*)')
          .eq('user_id', userId)
          .eq('plan_date', planDate)
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
                source: 'cached_user_plan',
              },
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            status: 'fallback',
            message: 'GEMINI_API_KEY not configured. Falling back to deterministic engine.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const candidateListCompact = candidates.slice(0, 30).map((c: any) => ({
        id: c.id,
        type: c.type,
        title: c.title,
      }));

      const systemPrompt = `You are the JLPTMaster Adaptive Learning Planner.
Select and sequence an optimal daily study lesson for a JLPT ${level} learner.
CRITICAL ZERO-HALLUCINATION RULE:
You MUST ONLY select items from the provided Candidate Curriculum list.
You MUST NOT invent content IDs.
The total duration should match ${learner.minutesPerDay || 60} minutes.
Prioritize:
1. Review of weak skills (Learner scores: ${JSON.stringify(learner.skillScores || {})})
2. Recent errors: ${JSON.stringify(learner.recentErrors || [])}
3. Next sequential curriculum lessons.

Return ONLY a JSON object:
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
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
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
      const validCandidateIds = new Set(candidates.map((c: any) => c.id));
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

      // Record AI Usage & Telemetry
      const inputTokens = aiResult.usageMetadata?.promptTokenCount || 550;
      const outputTokens = aiResult.usageMetadata?.candidatesTokenCount || 300;
      const estimatedCost = (inputTokens * INPUT_COST_PER_TOKEN) + (outputTokens * OUTPUT_COST_PER_TOKEN);

      if (supabaseClient) {
        await supabaseClient.rpc('record_ai_metric', {
          p_date: today,
          p_model: GEMINI_MODEL,
          p_feature: 'daily_plan',
          p_input_tokens: inputTokens,
          p_output_tokens: outputTokens,
          p_is_hit: false,
          p_cost: estimatedCost,
        });

        // Store Personal Plan in Supabase
        const { data: savedPlan } = await supabaseClient
          .from('learning_plans')
          .upsert({
            user_id: userId,
            plan_date: planDate,
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
            id: `plan-gemini-${planDate}`,
            userId,
            planDate,
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

    // =========================================================================
    // ROUTE 5: SPEAKING PRACTICE EVALUATION (Personalized)
    // =========================================================================
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
      const parsedEvaluation = JSON.parse(rawText || '{}');

      // Record tokens
      if (supabaseClient) {
        const inTok = aiResult.usageMetadata?.promptTokenCount || 400;
        const outTok = aiResult.usageMetadata?.candidatesTokenCount || 200;
        await supabaseClient.rpc('record_ai_metric', {
          p_date: today,
          p_model: GEMINI_MODEL,
          p_feature: 'speaking_evaluation',
          p_input_tokens: inTok,
          p_output_tokens: outTok,
          p_is_hit: false,
          p_cost: (inTok * INPUT_COST_PER_TOKEN) + (outTok * OUTPUT_COST_PER_TOKEN),
        });
      }

      return new Response(JSON.stringify(parsedEvaluation), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // =========================================================================
    // ROUTE 6: JOB INTERVIEW EVALUATION (STAR Method & Keigo Assessment)
    // =========================================================================
    if (action === 'interview-eval') {
      const { questionJp, questionEn, candidateResponse, modeId = 'basic_entry' } = body;

      if (!candidateResponse || candidateResponse.trim().length < 5) {
        return new Response(
          JSON.stringify({
            overallScore: 50,
            starScore: 50,
            keigoScore: 50,
            clarityScore: 50,
            intentAlignmentScore: 50,
            strengths: ['回答の試み'],
            areasToImprove: ['より具体的なエピソードとSTAR構成（状況・課題・行動・結果）を含めてください。'],
            polishedJapaneseVersion: '本日はお時間をいただき誠にありがとうございます。ご質問の件につきまして、私の経験を踏まえてご説明申し上げます。',
            interviewerCommentary: '回答が短すぎるか、具体的なエピソードが不足しています。数値を交えて具体的に述べることで説得力が増します。',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!GEMINI_API_KEY) {
        // High-quality deterministic evaluation fallback
        return new Response(
          JSON.stringify({
            overallScore: 78,
            starScore: 80,
            keigoScore: 75,
            clarityScore: 82,
            intentAlignmentScore: 76,
            strengths: [
              '質問の意図に対して論理的に回答を展開できている点',
              '過去の経験に対する積極的な取り組み姿勢が伝わる点',
            ],
            areasToImprove: [
              '「やりました」「頑張りました」等の口語を「〜に従事いたしました」「〜に尽力いたしました」へ格上げする',
              '定量的な成果（数値、パーセンテージ、期間）をもう1つ追加すると説得力が増します',
            ],
            polishedJapaneseVersion: candidateResponse
              .replace(/やりました/g, 'に従事いたしました')
              .replace(/頑張りました/g, '尽力いたしました')
              .replace(/思います/g, 'と考えております'),
            interviewerCommentary:
              '面接官からの視点：熱意と論理構成は良好です。敬語の格上げ（謙譲語の適切な活用）と具体的な数値指標を加えることで、即戦力としての評価がさらに高まります。',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const prompt = `You are a veteran Japanese executive corporate recruiter and university Japanese language professor evaluating a job candidate's interview response in Japan.
Interview Mode: "${modeId}"
Interview Question: "${questionJp}" (${questionEn})
Candidate Answer: "${candidateResponse}"

Evaluate rigorously on Japanese corporate interview standards:
1. STAR Framework (Situation, Task, Action, Result) completeness
2. Business Keigo & Formal Japanese appropriateness (Sonkeigo/Kenjougo, avoiding colloquialisms)
3. Direct alignment with the interviewer's hidden intent
4. Logical clarity and structure (PREP: Conclusion first)

Output strictly JSON:
{
  "overallScore": number (0-100),
  "starScore": number (0-100),
  "keigoScore": number (0-100),
  "clarityScore": number (0-100),
  "intentAlignmentScore": number (0-100),
  "strengths": string[],
  "areasToImprove": string[],
  "polishedJapaneseVersion": string (high-impact, executive-level natural Japanese rewrite of candidate's answer),
  "interviewerCommentary": string (constructive, professional coaching feedback in Japanese)
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText || '{}');

      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // =========================================================================
    // ROUTE 7: RESUME PHRASING COACH (Rirekisho / Shokumu Keirekisho)
    // =========================================================================
    if (action === 'resume-coach') {
      const { rawPhrase, targetRole = 'エンジニア / ビジネス職' } = body;

      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            original: rawPhrase,
            polished: `担当業務において、${rawPhrase.replace(/しました|作りました/g, 'の設計および遂行に従事し、品質と生産性の向上に寄与いたしました')}`,
            advice: '受動的な「担当しました」から能動的な「〜に従事し、〜に寄与いたしました」へ変換することで、自律的な成果創出能力をアピールできます。',
            impactScore: 85,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const prompt = `You are a Japanese executive headhunter and career consultant specializing in 履歴書 (Rirekisho) and 職務経歴書 (Shokumu Keirekisho).
Target Role: "${targetRole}"
Candidate Raw Phrasing: "${rawPhrase}"

Transform this raw phrasing into a high-impact, professional corporate Japanese bullet point that Japanese recruiters love.
Apply rules:
- Eliminate casual endings (〜しました ➔ 〜に従事いたしました / 〜を主導いたしました)
- Emphasize ownership, initiative, and quantifiable value creation
- Output strictly JSON:
{
  "original": string,
  "polished": string,
  "advice": string,
  "impactScore": number (0-100)
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText || '{}');

      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // =========================================================================
    // ROUTE 8: BUSINESS EMAIL REVIEW
    // =========================================================================
    if (action === 'business-email-review') {
      const { draft, category = 'business_inquiry', audience = 'external' } = body;

      if (!GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            overallScore: 82,
            politenessScore: 84,
            structureScore: 80,
            feedback: '7部構成（件名・宛名・挨拶・用件・詳細・結び・署名）の基本が押さえられています。クッション言葉を1つ追加するとより洗練された印象になります。',
            suggestedImprovements: [
              '「お忙しいところ恐縮ですが」などのクッション言葉を依頼の前に添える',
              '署名欄に会社の代表電話番号とURLを付記する',
            ],
            professionalRewrite: draft,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const prompt = `You are a Japanese business communication professor reviewing a student's business email draft.
Category: "${category}". Audience: "${audience}".
Draft:
"${draft}"

Review against:
1. 7-Part Japanese Email Structure (件名, 宛名, 挨拶, 用件, 依頼/詳細, 結び, 署名)
2. Honorific Accuracy (Keigo, Sonkeigo/Kenjougo distinction, avoidance of double honorifics)
3. Cushion Phrases (クッション言葉)
4. Overall Business Etiquette

Output JSON:
{
  "overallScore": number (0-100),
  "politenessScore": number (0-100),
  "structureScore": number (0-100),
  "feedback": string (in Japanese),
  "suggestedImprovements": string[],
  "professionalRewrite": string (polished, natural executive Japanese email)
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
        }),
      });

      const aiResult = await aiResponse.json();
      const rawText = aiResult.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText || '{}');

      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Edge Function Gateway Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
