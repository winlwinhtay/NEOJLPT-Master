import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';
import { isSuperAdminEmail } from '../../src/services/entitlementService';

export interface GenerateReadingRequestBody {
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  topic: string;
  subtopic?: string;
  purpose?: string;
  difficulty?: 'easier' | 'standard' | 'challenging';
  passageLength?: 'short' | 'medium' | 'long';
  format?: 'dialogue' | 'narrative' | 'notice' | 'email' | 'informational' | 'essay';
  questionCount?: number;
  grammarFocus?: string[];
  vocabularyFocus?: string[];
  explanationLanguage?: string;
  personalizationPrompt?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  const supabase = getSupabaseAdmin();
  let user: any = null;
  let isPro = false;

  // 1. Authenticate user & verify entitlement
  if (token) {
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (!authError && authData?.user) {
      user = authData.user;
      const userEmail = (user.email || '').toLowerCase().trim();

      if (isSuperAdminEmail(userEmail)) {
        isPro = true;
      } else {
        // Query user profile & subscriptions in Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, account_type, is_premium')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          if (profile.role === 'admin' || profile.account_type === 'ADMIN' || profile.is_premium) {
            isPro = true;
          }
        }

        if (!isPro) {
          const { data: sub } = await supabase
            .from('user_subscriptions')
            .select('plan, status')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .maybeSingle();

          if (sub && (sub.plan === 'PRO' || sub.plan === 'PREMIUM')) {
            isPro = true;
          }
        }
      }
    }
  }

  // Enforce Pro / Admin subscription entitlement
  if (!isPro) {
    return res.status(403).json({
      error: 'Forbidden: Pro or Premium subscription is required to generate AI reading exercises.',
      code: 'SUBSCRIPTION_REQUIRED',
    });
  }

  const body: GenerateReadingRequestBody = req.body || {};
  const level = body.level || 'N5';
  const topic = (body.topic || 'daily_life').toLowerCase().replace(/\s+/g, '_');
  const format = body.format || 'narrative';
  const difficulty = body.difficulty || 'standard';
  const explanationLang = body.explanationLanguage || 'en';
  const questionCount = Math.min(Math.max(body.questionCount || 2, 1), 5);

  // 2. Compute Deterministic Request Fingerprint & Check Cache
  const fingerprint = `reading_ai_${level}_${topic}_${format}_${difficulty}_${explanationLang}_q${questionCount}`;
  const startTime = Date.now();

  try {
    const { data: cached } = await supabase
      .from('ai_content_cache')
      .select('response_json, usage_count')
      .eq('cache_key', fingerprint)
      .maybeSingle();

    if (cached && cached.response_json) {
      // Increment cache hit usage
      await supabase
        .from('ai_content_cache')
        .update({
          usage_count: (cached.usage_count || 1) + 1,
          last_used_at: new Date().toISOString(),
        })
        .eq('cache_key', fingerprint);

      // Log zero-token cache hit
      await supabase.from('api_usage_logs').insert({
        user_id: user?.id || null,
        feature: 'ai_reading_generator',
        provider: 'gemini',
        model: 'gemini-2.5-flash',
        endpoint: '/api/ai/generate-reading',
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0,
        estimated_cost: 0.0,
        cache_hit: true,
        status: 'success',
        duration_ms: Date.now() - startTime,
      });

      return res.status(200).json({
        exercise: cached.response_json,
        cacheHit: true,
      });
    }
  } catch (cacheErr) {
    console.warn('Cache lookup warning:', cacheErr);
  }

  // 3. Gemini Generation with strict JSON Schema
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Gemini AI API key is not configured on server.',
    });
  }

  const prompt = `You are a Senior University Japanese Language Educator and JLPT Reading Specialist.
Generate a complete, personalized, pedagogically sound Japanese reading comprehension exercise according to these strict parameters:
- JLPT Level: ${level}
- Topic: ${topic}
- Subtopic: ${body.subtopic || 'General theme'}
- Format: ${format}
- Difficulty: ${difficulty}
- Target Questions: ${questionCount}
- Explanation Language: ${explanationLang}
${body.grammarFocus ? `- Target Grammar Points: ${body.grammarFocus.join(', ')}` : ''}
${body.vocabularyFocus ? `- Target Vocabulary Words: ${body.vocabularyFocus.join(', ')}` : ''}
${body.personalizationPrompt ? `- Learner Focus Area: ${body.personalizationPrompt}` : ''}

CRITICAL RULES:
1. Japanese passage must use natural Japanese at strictly ${level} level.
2. In the passage, wrap kanji words with ruby furigana markup like [漢字]{かんじ} for beginner levels (${level === 'N5' || level === 'N4' ? 'mandatory' : 'optional'}).
3. Multiple-choice questions must have 4 options in Japanese, with exactly ONE unambiguous correct answer matching correctIndex (0-3).
4. Explanations must clearly explain why the correct choice is right.
5. Provide 3-5 target vocabulary words and 2-3 target grammar points.

Respond ONLY with a valid JSON object with this exact structure:
{
  "title": "Japanese title",
  "titleEn": "English translation of title",
  "titleMy": "Burmese translation of title",
  "topic": "${topic}",
  "subtopic": "${body.subtopic || 'Personalized Theme'}",
  "difficultyRating": ${level === 'N5' ? 1 : level === 'N4' ? 2 : level === 'N3' ? 3 : level === 'N2' ? 4 : 5},
  "estimatedReadingTimeMinutes": ${level === 'N5' ? 2 : level === 'N4' ? 3 : level === 'N3' ? 4 : 5},
  "length": "medium",
  "passage": "Passage text with [漢字]{かんじ} furigana markup",
  "passagePlain": "Plain Japanese passage without brackets",
  "translationEn": "Full English translation of the passage",
  "translationMy": "Full Burmese (မြန်မာ) translation of the passage",
  "vocabularyList": [
    { "word": "単語", "reading": "たんご", "meaning": "English meaning", "meaningMy": "Burmese meaning" }
  ],
  "grammarPoints": [
    { "grammar": "〜ポイント", "meaning": "English meaning", "meaningMy": "Burmese meaning", "explanation": "Explanation", "exampleJp": "Example sentence" }
  ],
  "questions": [
    {
      "id": "q1",
      "questionJp": "Japanese question",
      "questionEn": "English question",
      "questionMy": "Burmese question",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctIndex": 0,
      "explanation": "English explanation",
      "explanationMy": "Burmese explanation"
    }
  ]
}`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(502).json({ error: `Gemini API error: ${errText}` });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return res.status(502).json({ error: 'No text returned from Gemini API.' });
    }

    const parsed = JSON.parse(rawText);
    const exerciseId = `ai-${level.toLowerCase()}-${Date.now().toString(36)}`;
    const exercise = {
      id: exerciseId,
      level,
      ...parsed,
      contentVersion: '1.0',
      sourceType: 'ai_generated',
      reviewStatus: level === 'N1' || level === 'N2' ? 'review_required' : 'published',
      reviewerNotes: 'Generated by Pro AI Reading Generator (Gemini Flash).',
      createdAt: new Date().toISOString(),
    };

    // 4. Cache in Supabase ai_content_cache with fingerprint
    try {
      await supabase.from('ai_content_cache').insert({
        cache_key: fingerprint,
        content_type: 'reading_ai_generated',
        jlpt_level: level,
        topic_id: topic,
        source_content_id: exercise.id,
        difficulty: level,
        support_language: explanationLang,
        model: 'gemini-2.5-flash',
        response_json: exercise,
        quality_status: exercise.reviewStatus,
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      });
    } catch {}

    // 5. Track Usage & Tokens
    const inTokens = geminiData.usageMetadata?.promptTokenCount || 500;
    const outTokens = geminiData.usageMetadata?.candidatesTokenCount || 600;
    const estCost = inTokens * 0.0000001 + outTokens * 0.0000004;

    try {
      await supabase.from('api_usage_logs').insert({
        user_id: user?.id || null,
        feature: 'ai_reading_generator',
        provider: 'gemini',
        model: 'gemini-2.5-flash',
        endpoint: '/api/ai/generate-reading',
        input_tokens: inTokens,
        output_tokens: outTokens,
        total_tokens: inTokens + outTokens,
        estimated_cost: Number(estCost.toFixed(6)),
        cache_hit: false,
        status: 'success',
        duration_ms: Date.now() - startTime,
      });
    } catch {}

    return res.status(200).json({
      exercise,
      cacheHit: false,
      usage: {
        promptTokens: inTokens,
        completionTokens: outTokens,
        estimatedCost: estCost,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      error: `Generation failed: ${err.message}`,
    });
  }
}
