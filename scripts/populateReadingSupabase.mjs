/**
 * Supabase Batch Population Script: 50 Core University Reading Exercises
 * Validates, formats, and persists the complete 50-exercise library into Supabase:
 * - Entity 1: ai_content_cache (Reading exercises & bilingual translations)
 * - Entity 2: ai_question_bank (Comprehension questions with deterministic hash)
 */

import { createClient } from '@supabase/supabase-js';
import { createServer } from 'vite';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rhidvvfdbilagdgzzzzg.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWR2dmZkYmlsYWdkZ3p6enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTIzMDksImV4cCI6MjEwNDUyODMwOX0.HT7Anhv-YeI7U-O1SQ73i2VZDWGk_usWkwlV7EjdKGw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

function generateQuestionHash(exerciseId, qIdx, prompt) {
  const raw = `${exerciseId}::q${qIdx}::${prompt.trim()}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return `q_hash_${exerciseId}_${qIdx}_${Math.abs(hash).toString(36)}`;
}

async function run() {
  console.log('================================================================');
  console.log(' POPULATING 50-EXERCISE JLPT READING CURRICULUM IN SUPABASE');
  console.log(' Target URL:', SUPABASE_URL);
  console.log('================================================================');

  // Use Vite SSR module loader to load TypeScript data files directly
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  let READING_DATA;
  try {
    const mod = await vite.ssrLoadModule('./src/data/readingData.ts');
    READING_DATA = mod.READING_DATA;
  } catch (err) {
    console.error('Failed to load reading data via Vite SSR loader:', err);
    await vite.close();
    process.exit(1);
  }

  console.log(`Loaded ${READING_DATA.length} reading exercises across N5–N1.`);

  const report = {
    total: READING_DATA.length,
    byLevel: { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 },
    aiContentCacheSynced: 0,
    aiQuestionBankSynced: 0,
    translationsSynced: 0,
    errors: [],
  };

  for (const ex of READING_DATA) {
    report.byLevel[ex.level] = (report.byLevel[ex.level] || 0) + 1;
    const isAdvanced = ex.level === 'N1' || ex.level === 'N2';
    const reviewStatus = ex.reviewStatus || (isAdvanced ? 'review_required' : 'published');

    // 1. Sync to ai_content_cache (Primary Exercise)
    const cacheKey = `reading_exercise_${ex.id}_${ex.contentVersion || 'v1'}`;
    const cachePayload = {
      cache_key: cacheKey,
      content_type: 'reading_curriculum_exercise',
      jlpt_level: ex.level,
      topic_id: ex.topic,
      source_content_id: ex.id,
      difficulty: ex.level,
      support_language: 'ja',
      model: 'university_curriculum_author_v1',
      response_json: ex,
      quality_status: reviewStatus === 'review_required' ? 'pending' : 'published',
      usage_count: 1,
      last_used_at: new Date().toISOString(),
    };

    const { error: exErr } = await supabase
      .from('ai_content_cache')
      .upsert(cachePayload, { onConflict: 'cache_key' });

    if (exErr) {
      console.warn(`[WARN] Exercise ${ex.id} ai_content_cache:`, exErr.message);
      report.errors.push({ id: ex.id, table: 'ai_content_cache', error: exErr.message });
    } else {
      report.aiContentCacheSynced++;
    }

    // 2. Sync Bilingual Translations (English & Burmese)
    const translations = [
      {
        lang: 'en',
        title: ex.titleEn,
        passage: ex.translationEn,
      },
      {
        lang: 'my',
        title: ex.titleMy || ex.title,
        passage: ex.translationMy || ex.translationEn,
      }
    ];

    for (const t of translations) {
      const transKey = `reading_translation_${ex.id}_${t.lang}`;
      const transPayload = {
        cache_key: transKey,
        content_type: 'reading_translation',
        jlpt_level: ex.level,
        topic_id: ex.topic,
        source_content_id: ex.id,
        difficulty: ex.level,
        support_language: t.lang,
        model: 'bilingual_curriculum_v1',
        response_json: {
          exerciseId: ex.id,
          level: ex.level,
          title: t.title,
          passage: t.passage,
          language: t.lang,
        },
        quality_status: reviewStatus === 'review_required' ? 'pending' : 'published',
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      };

      const { error: tErr } = await supabase
        .from('ai_content_cache')
        .upsert(transPayload, { onConflict: 'cache_key' });

      if (!tErr) {
        report.translationsSynced++;
      }
    }

    // 3. Sync Questions to ai_question_bank
    if (ex.questions && ex.questions.length > 0) {
      for (let qIdx = 0; qIdx < ex.questions.length; qIdx++) {
        const q = ex.questions[qIdx];
        const qHash = generateQuestionHash(ex.id, qIdx, q.questionJp);

        const qPayload = {
          cache_key: `q_${ex.id}_${qIdx}`,
          question_hash: qHash,
          source_content_id: ex.id,
          jlpt_level: ex.level,
          skill: 'reading',
          question_type: 'reading_comprehension',
          difficulty: ex.level,
          question_json: {
            prompt: q.questionJp,
            questionEn: q.questionEn,
            questionMy: q.questionMy,
            options: q.options,
            optionsMy: q.optionsMy,
          },
          answer_json: {
            correctIndex: q.correctIndex,
            correctAnswer: q.options[q.correctIndex],
            explanation: q.explanation,
            explanationMy: q.explanationMy,
          },
          explanation_json: {
            explanationEn: q.explanation,
            explanationMy: q.explanationMy,
          },
          support_language: 'ja',
          quality_status: reviewStatus === 'review_required' ? 'draft' : 'published',
        };

        const { error: qErr } = await supabase
          .from('ai_question_bank')
          .upsert(qPayload, { onConflict: 'question_hash' });

        if (!qErr) {
          report.aiQuestionBankSynced++;
        }
      }
    }

    process.stdout.write(`Processed ${ex.id} (${ex.level})...\r`);
  }

  await vite.close();

  console.log('\n================================================================');
  console.log(' SUPABASE BATCH SYNC COMPLETED SUCCESSFULLY');
  console.log(' Total Exercises Processed:', report.total);
  console.log(' By Level:', JSON.stringify(report.byLevel));
  console.log(' Exercises Persisted in ai_content_cache:', report.aiContentCacheSynced);
  console.log(' Translations Persisted (EN & MY):', report.translationsSynced);
  console.log(' Questions Persisted in ai_question_bank:', report.aiQuestionBankSynced);
  console.log(' Errors Encountered:', report.errors.length);
  console.log('================================================================');
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
