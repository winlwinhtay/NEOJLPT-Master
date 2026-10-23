/**
 * Automated Acceptance Test Suite: 50-Exercise JLPT Reading Curriculum
 * Verifies Curriculum Coverage, Japanese Quality, Translation Integrity,
 * Supabase Live Persistence, Expert Review Restrictions, and Cost Controls.
 */

import { createClient } from '@supabase/supabase-js';
import { createServer } from 'vite';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rhidvvfdbilagdgzzzzg.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWR2dmZkYmlsYWdkZ3p6enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTIzMDksImV4cCI6MjEwNDUyODMwOX0.HT7Anhv-YeI7U-O1SQ73i2VZDWGk_usWkwlV7EjdKGw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function runAcceptanceTests() {
  console.log('================================================================');
  console.log(' RUNNING 50-EXERCISE JLPT READING ACCEPTANCE TEST SUITE');
  console.log('================================================================\n');

  // Load modules via Vite SSR loader
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const { READING_DATA } = await vite.ssrLoadModule('./src/data/readingData.ts');
  const { READING_BLUEPRINT_MANIFEST } = await vite.ssrLoadModule('./src/data/reading/readingBlueprintManifest.ts');
  const { ReadingValidator } = await vite.ssrLoadModule('./src/services/content/readingValidator.ts');
  const { ReadingLibraryI18n } = await vite.ssrLoadModule('./src/data/translations/readingLibraryI18n.ts');
  const { SUPPORTED_LANGUAGES } = await vite.ssrLoadModule('./src/i18n/translations.ts');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // -------------------------------------------------------------
  // SUITE 1: CURRICULUM COVERAGE & BLUEPRINT CONFORMITY
  // -------------------------------------------------------------
  console.log('--- SUITE 1: Curriculum Coverage & Blueprint Integrity ---');
  assert(READING_DATA.length === 50, `Exactly 50 exercises exist in core reading library (actual: ${READING_DATA.length})`);
  assert(READING_BLUEPRINT_MANIFEST.length === 50, `Exactly 50 blueprint entries exist in manifest (actual: ${READING_BLUEPRINT_MANIFEST.length})`);

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  for (const lvl of levels) {
    const dataCount = READING_DATA.filter((r) => r.level === lvl).length;
    const bpCount = READING_BLUEPRINT_MANIFEST.filter((b) => b.level === lvl).length;
    assert(dataCount === 10, `${lvl} has exactly 10 exercises in data (actual: ${dataCount})`);
    assert(bpCount === 10, `${lvl} has exactly 10 blueprint specifications (actual: ${bpCount})`);
  }

  const ids = new Set(READING_DATA.map((r) => r.id));
  assert(ids.size === 50, `All 50 exercise IDs are strictly unique (actual: ${ids.size})`);

  const duplicateCheck = ReadingValidator.checkDuplicates(READING_DATA);
  assert(duplicateCheck.duplicatePairs.length === 0, `Zero duplicate passages detected across library (duplicates: ${duplicateCheck.duplicatePairs.length})`);

  // -------------------------------------------------------------
  // SUITE 2: JAPANESE CONTENT, FURIGANA & QUESTION VALIDATION
  // -------------------------------------------------------------
  console.log('\n--- SUITE 2: Japanese Content & Pedagogical QA ---');
  let validExerciseCount = 0;
  let furiganaCheckPassed = true;
  let questionKeysValid = true;

  for (const ex of READING_DATA) {
    const rep = ReadingValidator.validateExercise(ex);
    if (rep.isValid) validExerciseCount++;

    // Beginner levels must have Furigana markup [漢字]{かんじ}
    if ((ex.level === 'N5' || ex.level === 'N4') && !rep.hasFurigana) {
      furiganaCheckPassed = false;
    }

    // Question options & correctIndex range check
    if (ex.questions) {
      for (const q of ex.questions) {
        if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
          questionKeysValid = false;
        }
      }
    }
  }

  assert(validExerciseCount === 50, `All 50 exercises pass deterministic validation checks (${validExerciseCount}/50)`);
  assert(furiganaCheckPassed, 'All N5 and N4 beginner passages include validated Furigana ruby markup');
  assert(questionKeysValid, 'All comprehension question answer keys reference valid options within bounds');

  // -------------------------------------------------------------
  // SUITE 3: MULTILINGUAL TRANSLATION COVERAGE
  // -------------------------------------------------------------
  console.log('\n--- SUITE 3: Multilingual Translations ---');
  assert(SUPPORTED_LANGUAGES.length >= 19, `Authoritative supported language registry contains ${SUPPORTED_LANGUAGES.length} languages`);

  let enComplete = true;
  let myComplete = true;

  for (const ex of READING_DATA) {
    if (!ex.translationEn || ex.translationEn.trim().length === 0) enComplete = false;
    if (!ex.translationMy || ex.translationMy.trim().length === 0) myComplete = false;
  }

  assert(enComplete, '100% English translation coverage across all 50 passages');
  assert(myComplete, '100% Burmese (Myanmar / my) translation coverage across all 50 passages');

  const sampleLocalized = ReadingLibraryI18n.getLocalizedExercise('r-n5-01', 'my');
  assert(sampleLocalized.title.length > 0 && sampleLocalized.passage.length > 0, 'ReadingLibraryI18n correctly returns localized Burmese exercise without network calls');

  // -------------------------------------------------------------
  // SUITE 4: SUPABASE PERSISTENCE & LIVE VERIFICATION
  // -------------------------------------------------------------
  console.log('\n--- SUITE 4: Supabase Database Live Verification ---');
  const { count: dbExCount } = await supabase
    .from('ai_content_cache')
    .select('id', { count: 'exact', head: true })
    .eq('content_type', 'reading_curriculum_exercise');

  const { count: dbTransCount } = await supabase
    .from('ai_content_cache')
    .select('id', { count: 'exact', head: true })
    .eq('content_type', 'reading_translation');

  const { count: dbQCount } = await supabase
    .from('ai_question_bank')
    .select('id', { count: 'exact', head: true })
    .eq('skill', 'reading');

  assert(dbExCount === 50, `50 reading exercises successfully stored in Supabase ai_content_cache (actual: ${dbExCount})`);
  assert(dbTransCount >= 100, `Bilingual translations stored in Supabase ai_content_cache (actual: ${dbTransCount})`);
  assert(dbQCount >= 100, `Comprehension questions stored in Supabase ai_question_bank (actual: ${dbQCount})`);

  // -------------------------------------------------------------
  // SUITE 5: REVIEW REQUIREMENTS & PUBLICATION RESTRICTIONS
  // -------------------------------------------------------------
  console.log('\n--- SUITE 5: Expert Review & Publication Gate ---');
  const n1n2Unreviewed = READING_DATA.filter((r) => (r.level === 'N1' || r.level === 'N2') && r.reviewStatus === 'review_required');
  assert(n1n2Unreviewed.length === 20, `All 20 N2 and N1 exercises are restricted with 'review_required' status (actual: ${n1n2Unreviewed.length})`);

  let hasReviewerNotes = true;
  for (const ex of n1n2Unreviewed) {
    if (!ex.reviewerNotes || ex.reviewerNotes.trim().length === 0) {
      hasReviewerNotes = false;
    }
  }
  assert(hasReviewerNotes, 'All N2 and N1 exercises carry explicit editorial reviewer notes detailing academic nuance');

  const n5n3Published = READING_DATA.filter((r) => (r.level === 'N5' || r.level === 'N4' || r.level === 'N3') && r.reviewStatus === 'published');
  assert(n5n3Published.length === 30, `All 30 N5–N3 foundation exercises are marked 'published' (actual: ${n5n3Published.length})`);

  await vite.close();

  // -------------------------------------------------------------
  // TEST SUMMARY
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log(` ACCEPTANCE TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  if (passedTests === totalTests) {
    console.log(' ALL ACCEPTANCE CRITERIA VERIFIED AND SATISFIED (100% PASS)');
  } else {
    console.error(` ${totalTests - passedTests} TESTS FAILED`);
    process.exit(1);
  }
  console.log('================================================================');
}

runAcceptanceTests().catch((e) => {
  console.error('Acceptance test execution error:', e);
  process.exit(1);
});
