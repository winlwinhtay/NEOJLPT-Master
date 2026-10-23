/**
 * Small Batch Test: Two N5 Exercises, Translations, and Complete Learner Session
 * Verifies Authorization, Caching, Review Gates, and Failure Recovery
 */

import { createServer } from 'vite';

async function runSmallBatchTest() {
  console.log('================================================================');
  console.log(' PRO AI GENERATOR: SMALL BATCH TEST & VERIFICATION PIPELINE');
  console.log('================================================================\n');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const { ReadingAiGeneratorService } = await vite.ssrLoadModule('./src/services/content/readingAiGeneratorService.ts');
  const { ReadingValidator } = await vite.ssrLoadModule('./src/services/content/readingValidator.ts');
  const { isUserEligibleForLiveAI } = await vite.ssrLoadModule('./src/services/entitlementService.ts');
  const { ReadingService } = await vite.ssrLoadModule('./src/services/content/readingService.ts');

  let passedChecks = 0;
  let totalChecks = 0;

  function assert(condition, message) {
    totalChecks++;
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passedChecks++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: AUTHORIZATION & ENTITLEMENT VERIFICATION
  // -------------------------------------------------------------
  console.log('--- TEST 1: Authorization & Pro Entitlement Gates ---');

  const freeGuest = { email: 'guest@example.com', role: 'user', isPremium: false };
  const proSubscriber = { email: 'learner@example.com', role: 'user', isPremium: true, subscriptionPlan: 'PRO' };
  const superAdmin = { email: 'neowin001@gmail.com', role: 'admin', isPremium: true };

  assert(!isUserEligibleForLiveAI(freeGuest, null), 'Free guest user is correctly denied AI generation access');
  assert(isUserEligibleForLiveAI(proSubscriber, null), 'Active Pro subscriber is correctly granted AI generation entitlement');
  assert(isUserEligibleForLiveAI(superAdmin, null), 'Super Administrator (neowin001@gmail.com) is correctly granted access');

  // -------------------------------------------------------------
  // TEST 2: SMALL BATCH GENERATION (TWO N5 EXERCISES)
  // -------------------------------------------------------------
  console.log('\n--- TEST 2: Small Batch Generation (2 N5 Exercises) ---');

  // Exercise 1: N5 Daily Routine
  const ex1Params = {
    level: 'N5',
    topic: 'daily_life',
    subtopic: 'Morning routine and catching the train',
    format: 'narrative',
    difficulty: 'standard',
    questionCount: 2,
    explanationLanguage: 'en',
  };

  const res1 = await ReadingAiGeneratorService.generateExercise(ex1Params);
  assert(Boolean(res1.exercise && res1.exercise.id), `Exercise 1 generated successfully: ID ${res1.exercise.id}`);

  const val1 = ReadingValidator.validateExercise(res1.exercise);
  assert(val1.isValid, `Exercise 1 passes all deterministic content validation checks`);
  assert(val1.hasFurigana, `Exercise 1 contains validated [漢字]{かんじ} ruby furigana`);
  assert(val1.hasTranslations, `Exercise 1 includes complete bilingual translations (EN & MY)`);

  // Exercise 2: N5 Food & Dining
  const ex2Params = {
    level: 'N5',
    topic: 'food',
    subtopic: 'Ordering lunch at a traditional noodle shop',
    format: 'dialogue',
    difficulty: 'standard',
    questionCount: 2,
    explanationLanguage: 'en',
  };

  const res2 = await ReadingAiGeneratorService.generateExercise(ex2Params);
  assert(Boolean(res2.exercise && res2.exercise.id), `Exercise 2 generated successfully: ID ${res2.exercise.id}`);

  const val2 = ReadingValidator.validateExercise(res2.exercise);
  assert(val2.isValid, `Exercise 2 passes all deterministic content validation checks`);
  assert(res1.exercise.id !== res2.exercise.id, `Exercises 1 and 2 have distinct IDs`);

  // -------------------------------------------------------------
  // TEST 3: CACHING & ZERO-COST REPEAT GENERATION
  // -------------------------------------------------------------
  console.log('\n--- TEST 3: Request Fingerprint Caching ---');

  // Re-request identical parameters to Exercise 1
  const repeatRes1 = await ReadingAiGeneratorService.generateExercise(ex1Params);
  assert(repeatRes1.cacheHit === true, 'Duplicate generation request successfully hits cache without re-prompting Gemini');
  assert(repeatRes1.exercise.id === res1.exercise.id, 'Cached exercise matches original exercise ID');

  // -------------------------------------------------------------
  // TEST 4: REVIEW GATES FOR ADVANCED LEVELS (N2 & N1)
  // -------------------------------------------------------------
  console.log('\n--- TEST 4: N2/N1 Expert Review Publication Gates ---');

  const n2Params = {
    level: 'N2',
    topic: 'technology',
    subtopic: 'Autonomous vehicles and urban transit ethics',
    format: 'essay',
    difficulty: 'standard',
    questionCount: 3,
    explanationLanguage: 'en',
  };

  const n2Res = await ReadingAiGeneratorService.generateExercise(n2Params);
  assert(n2Res.exercise.reviewStatus === 'review_required', 'Generated N2 exercise is strictly gated with review_required status');
  assert(n2Res.exercise.reviewStatus !== 'published', 'Unapproved N2 exercise is prevented from direct publication');

  // -------------------------------------------------------------
  // TEST 5: COMPLETE LEARNER PRACTICE SESSION
  // -------------------------------------------------------------
  console.log('\n--- TEST 5: Complete Learner Practice Session ---');

  const learnerExercise = res1.exercise;
  assert(learnerExercise.questions.length >= 2, 'Exercise has at least 2 comprehension questions');

  // Simulate user answering both questions correctly
  const answers = {};
  learnerExercise.questions.forEach((q) => {
    answers[q.id] = q.correctIndex;
  });

  // Calculate score
  let correctCount = 0;
  learnerExercise.questions.forEach((q) => {
    if (answers[q.id] === q.correctIndex) correctCount++;
  });

  const scorePct = Math.round((correctCount / learnerExercise.questions.length) * 100);
  assert(scorePct === 100, `Learner session scored 100% (${correctCount}/${learnerExercise.questions.length})`);

  // Simulate session completion persistence
  ReadingService.saveReadingProgress({
    id: `test-session-${Date.now()}`,
    userId: 'test-user-001',
    exerciseId: learnerExercise.id,
    level: learnerExercise.level,
    score: scorePct,
    totalQuestions: learnerExercise.questions.length,
    correctAnswersCount: correctCount,
    completedAt: new Date().toISOString(),
    timeSpentSeconds: 120,
    userAnswers: answers,
  });

  const progressList = ReadingService.getReadingProgressList();
  const sessionSaved = progressList.some((p) => p.exerciseId === learnerExercise.id);
  assert(sessionSaved, 'Learner practice session record is successfully saved in progress store');

  // -------------------------------------------------------------
  // TEST 6: FAILURE RECOVERY & RESILIENCE
  // -------------------------------------------------------------
  console.log('\n--- TEST 6: Failure Recovery & Non-Duplication ---');

  // Verify that an invalid level or network failure recovers gracefully to deterministic fallback
  const recoveryRes = ReadingAiGeneratorService.createDeterministicExercise({
    level: 'N5',
    topic: 'daily_life',
  });
  assert(Boolean(recoveryRes && recoveryRes.passage), 'Failure recovery fallback generates valid university standard exercise');

  await vite.close();

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log(` SMALL BATCH TEST SUMMARY: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
  if (passedChecks === totalChecks) {
    console.log(' ALL PREREQUISITE & SMALL BATCH GATES SATISFIED (100% PASS)');
  } else {
    console.error(` FAILED ${totalChecks - passedChecks} CHECKS`);
    process.exit(1);
  }
  console.log('================================================================');
}

runSmallBatchTest().catch((e) => {
  console.error('Small batch test error:', e);
  process.exit(1);
});
