import { ActiveLearningEngine } from '../src/services/activeLearningEngine';
import { ActiveLearningService } from '../src/services/activeLearningService';
import { CONFUSION_PAIRS_DATA } from '../src/data/confusionPairsData';
import { VOCABULARY_DATA } from '../src/data/vocabularySeed';
import { KANJI_DATA } from '../src/data/kanjiSeed';
import { CANONICAL_GRAMMAR } from '../src/data/canonicalGrammarData';
import { READING_DATA } from '../src/data/readingData';
import { LISTENING_DATA } from '../src/data/listeningData';
import { PRACTICE_QUESTIONS } from '../src/data/practiceData';
import { JLPTLevel } from '../src/types';
import { LearnerActiveProfile } from '../src/types/activeLearning';

console.log('================================================================');
console.log('  JLPTMaster Active Learning System — Comprehensive Test Suite  ');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? '— ' + detail : ''}`);
  }
}

// -------------------------------------------------------------
// Test 1: N5 Learner (30 Minutes / Day)
// -------------------------------------------------------------
console.log('\n--- Test 1: N5 Learner (30 min/day) ---');
const n5Profile: LearnerActiveProfile = {
  userId: 'user-n5-test',
  currentLevel: 'N5',
  targetLevel: 'N5',
  studyDaysPerWeek: 5,
  minutesPerDay: 30,
  preferredStudyTime: 'morning',
  learningGoal: 'pass_jlpt',
  skillScores: {
    vocabulary: 80,
    kanji: 75,
    grammar: 65,
    reading: 60,
    listening: 50,
    speaking: 60,
    writing: 55,
  },
  completedContent: [],
  masteredContent: [],
  weakContent: [],
  recentErrors: [],
  recentScores: [],
  retentionScores: {},
  lastStudyDate: '2026-10-06',
  streak: 2,
  learningConsistency: 0.8,
};

const n5Plan = ActiveLearningEngine.generateDailyPlan(n5Profile, [], []);
assert(n5Plan.estimatedMinutes === 30, 'N5 plan estimatedMinutes equals 30');
assert(n5Plan.items.length >= 3, 'N5 plan contains at least 3 sequenced items');
assert(
  n5Plan.items.some((i) => i.skill === 'listening'),
  'N5 plan prioritizes listening (weakest skill at 50%)'
);
assert(
  n5Plan.items.every((i) => i.priority >= 5 && i.priority <= 100),
  'N5 item priorities are bounded between 5 and 100'
);

// -------------------------------------------------------------
// Test 2: N4 Learner (60 Minutes / Day)
// -------------------------------------------------------------
console.log('\n--- Test 2: N4 Learner (60 min/day) ---');
const n4Profile: LearnerActiveProfile = {
  ...n5Profile,
  userId: 'user-n4-test',
  currentLevel: 'N4',
  targetLevel: 'N4',
  minutesPerDay: 60,
};
const n4Plan = ActiveLearningEngine.generateDailyPlan(n4Profile, [], []);
assert(n4Plan.estimatedMinutes === 60, 'N4 plan estimatedMinutes equals 60');
assert(n4Plan.items.length >= 4, 'N4 plan contains balanced multi-skill items');

// -------------------------------------------------------------
// Test 3: N3 Learner (60 Minutes / Day)
// -------------------------------------------------------------
console.log('\n--- Test 3: N3 Learner (60 min/day) ---');
const n3Profile: LearnerActiveProfile = {
  ...n5Profile,
  userId: 'user-n3-test',
  currentLevel: 'N3',
  targetLevel: 'N3',
  minutesPerDay: 60,
};
const n3Plan = ActiveLearningEngine.generateDailyPlan(n3Profile, [], []);
assert(n3Plan.estimatedMinutes === 60, 'N3 plan estimatedMinutes equals 60');

// -------------------------------------------------------------
// Test 4: N2 Learner (90 Minutes / Day)
// -------------------------------------------------------------
console.log('\n--- Test 4: N2 Learner (90 min/day) ---');
const n2Profile: LearnerActiveProfile = {
  ...n5Profile,
  userId: 'user-n2-test',
  currentLevel: 'N2',
  targetLevel: 'N2',
  minutesPerDay: 90,
};
const n2Plan = ActiveLearningEngine.generateDailyPlan(n2Profile, [], []);
assert(n2Plan.estimatedMinutes === 90, 'N2 plan estimatedMinutes equals 90');
assert(n2Plan.items.length >= 4, 'N2 plan contains deep study sequence');

// -------------------------------------------------------------
// Test 5: N1 Learner (120 Minutes / Day)
// -------------------------------------------------------------
console.log('\n--- Test 5: N1 Learner (120 min/day) ---');
const n1Profile: LearnerActiveProfile = {
  ...n5Profile,
  userId: 'user-n1-test',
  currentLevel: 'N1',
  targetLevel: 'N1',
  minutesPerDay: 120,
};
const n1Plan = ActiveLearningEngine.generateDailyPlan(n1Profile, [], []);
assert(n1Plan.estimatedMinutes === 120, 'N1 plan estimatedMinutes equals 120');
assert(n1Plan.items.length >= 4, 'N1 plan contains extended practice & reading sequence');

// -------------------------------------------------------------
// Test 6: Zero-Hallucination Curriculum Integrity Check
// -------------------------------------------------------------
console.log('\n--- Test 6: Zero-Hallucination Curriculum Integrity ---');
const allCurriculumIds = new Set([
  ...VOCABULARY_DATA.map((v) => v.id),
  ...KANJI_DATA.map((k) => k.id),
  ...CANONICAL_GRAMMAR.map((g) => g.id),
  ...READING_DATA.map((r) => r.id),
  ...LISTENING_DATA.map((l) => l.id),
  ...PRACTICE_QUESTIONS.map((q) => q.id),
  ...CONFUSION_PAIRS_DATA.map((c) => c.id),
]);

const plansToVerify = [n5Plan, n4Plan, n3Plan, n2Plan, n1Plan];
let allIdsValid = true;
let invalidFound = '';

for (const plan of plansToVerify) {
  for (const item of plan.items) {
    if (!allCurriculumIds.has(item.contentId) && !item.contentId.startsWith('v-review')) {
      allIdsValid = false;
      invalidFound = item.contentId;
      break;
    }
  }
}
assert(allIdsValid, 'Every single plan item references a verified authentic curriculum ID', invalidFound);

// -------------------------------------------------------------
// Test 7: Confusion Detection (は vs が, に vs で)
// -------------------------------------------------------------
console.log('\n--- Test 7: Confusion Detection ---');
const errorsWithHaGa = [
  {
    id: 'err-1',
    userId: 'u1',
    contentId: 'g-n5-001',
    contentType: 'grammar',
    errorType: 'particle_confusion',
    incorrectAnswer: 'は',
    correctAnswer: 'が',
    explanation: 'Question word subject takes が',
    createdAt: '2026-10-06T00:00:00Z',
  },
];
const detectedHaGa = ActiveLearningEngine.detectConfusions(errorsWithHaGa, 'N5');
assert(detectedHaGa.length > 0, 'Detects recurring confusion on は vs が');
assert(detectedHaGa[0].id === 'conf-ha-ga', 'Correct confusion pair conf-ha-ga identified');

// -------------------------------------------------------------
// Test 8: Missed Day Schedule Adaptation
// -------------------------------------------------------------
console.log('\n--- Test 8: Missed Day Schedule Adaptation ---');
const adaptedPlan = ActiveLearningEngine.handleMissedDayAdaptation(n5Plan, 2);
assert(
  adaptedPlan.items.reduce((acc, i) => acc + i.minutes, 0) <= n5Plan.estimatedMinutes,
  'Workload is strictly capped at daily limit (NOT doubled after missed days)'
);
assert(
  adaptedPlan.items[0].reason.includes('missed days'),
  'Items clearly indicate catch-up prioritization in rationale'
);

// -------------------------------------------------------------
// Test 9: Exam Mode Final Review Countdown (<14 days)
// -------------------------------------------------------------
console.log('\n--- Test 9: Exam Mode Final Review (<14 days) ---');
const examDateIn7Days = new Date();
examDateIn7Days.setDate(examDateIn7Days.getDate() + 7);
const examApproachingProfile: LearnerActiveProfile = {
  ...n3Profile,
  examDate: examDateIn7Days.toISOString().split('T')[0],
};
const examPlan = ActiveLearningEngine.generateDailyPlan(examApproachingProfile, [], []);
assert(examPlan.examModeActive === true, 'Exam Final Review Mode is activated');
assert(examPlan.daysToExam !== undefined && examPlan.daysToExam <= 14, 'Days to exam correctly calculated');

// -------------------------------------------------------------
// Test 10: Recommendation Score Formula
// -------------------------------------------------------------
console.log('\n--- Test 10: Recommendation Scoring Algorithm ---');
const highPriority = ActiveLearningEngine.calculateItemPriority({
  skill: 'listening',
  masteryScore: 1,
  skillProficiency: 45, // very weak
  isDueSRS: true,
  daysOverdue: 3,
  hasRecentMistake: true,
  isPrerequisiteForNextUnit: true,
  isHighExamFrequency: true,
  isCurrentRoadmapTarget: true,
  timesPracticedThisWeek: 0,
});

const lowPriority = ActiveLearningEngine.calculateItemPriority({
  skill: 'vocabulary',
  masteryScore: 5, // fully mastered
  skillProficiency: 95, // strong
  isDueSRS: false,
  daysOverdue: 0,
  hasRecentMistake: false,
  isPrerequisiteForNextUnit: false,
  isHighExamFrequency: false,
  isCurrentRoadmapTarget: false,
  timesPracticedThisWeek: 3,
});

assert(highPriority.priority > lowPriority.priority, 'Priority of weak, overdue, mistake item is significantly higher than mastered item');
assert(highPriority.priority >= 80, `High priority item receives score >= 80 (Actual: ${highPriority.priority})`);
assert(lowPriority.priority <= 25, `Low priority item receives score <= 25 (Actual: ${lowPriority.priority})`);

// -------------------------------------------------------------
// Test 11: Speaking Evaluation Deterministic Fallback
// -------------------------------------------------------------
console.log('\n--- Test 11: Speaking Evaluation Heuristics ---');
const politeEval = await ActiveLearningService.evaluateSpeaking('私は学生です。', 'Self introduction', 'N5');
assert(politeEval.overallScore >= 80, `Polite Japanese receives high score (Score: ${politeEval.overallScore})`);
assert(politeEval.appropriatenessScore >= 85, 'Appropriateness reflects polite register');

console.log('\n================================================================');
console.log(`  TEST RESULTS: ${passedTests} / ${totalTests} assertions passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
