// Verification script for Kanji and Business Japanese System Upgrade
import fs from 'fs';
import path from 'path';

console.log('--- STARTING VERIFICATION: KANJI + BUSINESS JAPANESE SYSTEM ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Verify Kanji Confusion Data
const kanjiConfusionPath = path.resolve('src/data/kanjiConfusionData.ts');
assert(fs.existsSync(kanjiConfusionPath), 'kanjiConfusionData.ts exists');
const kanjiConfusionContent = fs.readFileSync(kanjiConfusionPath, 'utf8');
assert(kanjiConfusionContent.includes('持') && kanjiConfusionContent.includes('待'), 'Includes 持 vs 待 pair');
assert(kanjiConfusionContent.includes('未') && kanjiConfusionContent.includes('末'), 'Includes 未 vs 末 pair');
assert(kanjiConfusionContent.includes('問') && kanjiConfusionContent.includes('間'), 'Includes 問 vs 間 pair');
assert(kanjiConfusionContent.includes('visualDifference'), 'Includes visual difference breakdown');
assert(kanjiConfusionContent.includes('practiceQuestions'), 'Includes contextual discrimination questions');

// 2. Verify Kanji Components
assert(fs.existsSync('src/components/kanji/KanjiConfusionStudio.tsx'), 'KanjiConfusionStudio.tsx exists');
assert(fs.existsSync('src/components/kanji/KanjiVocabularyNetwork.tsx'), 'KanjiVocabularyNetwork.tsx exists');

// 3. Verify Business Career Data
const careerJobPath = path.resolve('src/data/business/careerJobData.ts');
assert(fs.existsSync(careerJobPath), 'careerJobData.ts exists');
const careerJobContent = fs.readFileSync(careerJobPath, 'utf8');
assert(careerJobContent.includes('INTERVIEW_MODES'), 'INTERVIEW_MODES defined');
assert(careerJobContent.includes('basic_entry') && careerJobContent.includes('tech_dx'), 'Includes basic_entry and tech_dx modes');
assert(careerJobContent.includes('INTERVIEW_QUESTION_BANK'), 'INTERVIEW_QUESTION_BANK defined');
assert(careerJobContent.includes('starFramework'), 'Questions contain STAR framework');
assert(careerJobContent.includes('CAREER_10_STEPS'), 'CAREER_10_STEPS defined');
assert(careerJobContent.includes('RESUME_WORDING_TRANSFORMATIONS'), 'Resume wording transformations defined');
assert(careerJobContent.includes('DEFAULT_RIREKISHO_TEMPLATE'), 'Default Rirekisho template defined');
assert(careerJobContent.includes('DEFAULT_SHOKUMU_KEIREKISHO_TEMPLATE'), 'Default Shokumu Keirekisho template defined');

// 4. Verify Business Email 4-Step Comparative Data
const emailCompPath = path.resolve('src/data/business/businessEmailDetailedData.ts');
assert(fs.existsSync(emailCompPath), 'businessEmailDetailedData.ts exists');
const emailCompContent = fs.readFileSync(emailCompPath, 'utf8');
assert(emailCompContent.includes('step1Bad'), 'Contains step 1 bad email');
assert(emailCompContent.includes('step2WhyBad'), 'Contains step 2 why bad explanation');
assert(emailCompContent.includes('step3Improved'), 'Contains step 3 improved email');
assert(emailCompContent.includes('step4Professional'), 'Contains step 4 professional model');

// 5. Verify Workplace Scripts & HORENSO Data
const workplaceScriptPath = path.resolve('src/data/business/horensoTelephoneMeetingData.ts');
assert(fs.existsSync(workplaceScriptPath), 'horensoTelephoneMeetingData.ts exists');
const workplaceContent = fs.readFileSync(workplaceScriptPath, 'utf8');
assert(workplaceContent.includes('WORKPLACE_SCRIPTS_DATA'), 'WORKPLACE_SCRIPTS_DATA defined');
assert(workplaceContent.includes('telephone') && workplaceContent.includes('horenso'), 'Contains telephone and horenso categories');

// 6. Verify Business UI Components
assert(fs.existsSync('src/components/business/InterviewSimulator.tsx'), 'InterviewSimulator.tsx exists');
assert(fs.existsSync('src/components/business/ResumeCoachStudio.tsx'), 'ResumeCoachStudio.tsx exists');
assert(fs.existsSync('src/components/business/CareerCoachStudio.tsx'), 'CareerCoachStudio.tsx exists');
assert(fs.existsSync('src/components/business/HorensoStudio.tsx'), 'HorensoStudio.tsx exists');

// 7. Verify AI Gateway & Edge Function Extensions
const gatewayPath = path.resolve('src/services/aiGatewayService.ts');
const gatewayContent = fs.readFileSync(gatewayPath, 'utf8');
assert(gatewayContent.includes('evaluateInterviewResponse'), 'AIGatewayService has evaluateInterviewResponse');
assert(gatewayContent.includes('coachResumePhrase'), 'AIGatewayService has coachResumePhrase');
assert(gatewayContent.includes('reviewBusinessEmail'), 'AIGatewayService has reviewBusinessEmail');

const edgeFuncPath = path.resolve('supabase/functions/active-learning/index.ts');
const edgeFuncContent = fs.readFileSync(edgeFuncPath, 'utf8');
assert(edgeFuncContent.includes('interview-eval'), 'active-learning has interview-eval route');
assert(edgeFuncContent.includes('resume-coach'), 'active-learning has resume-coach route');
assert(edgeFuncContent.includes('business-email-review'), 'active-learning has business-email-review route');

// 8. Verify View Integrations
const kanjiViewContent = fs.readFileSync('src/views/KanjiView.tsx', 'utf8');
assert(kanjiViewContent.includes('KanjiConfusionStudio'), 'KanjiView mounts KanjiConfusionStudio');
assert(kanjiViewContent.includes('KanjiVocabularyNetwork'), 'KanjiView mounts KanjiVocabularyNetwork');

const businessViewContent = fs.readFileSync('src/views/BusinessJapaneseView.tsx', 'utf8');
assert(businessViewContent.includes('InterviewSimulator'), 'BusinessJapaneseView mounts InterviewSimulator');
assert(businessViewContent.includes('ResumeCoachStudio'), 'BusinessJapaneseView mounts ResumeCoachStudio');
assert(businessViewContent.includes('CareerCoachStudio'), 'BusinessJapaneseView mounts CareerCoachStudio');
assert(businessViewContent.includes('HorensoStudio'), 'BusinessJapaneseView mounts HorensoStudio');

console.log(`\n--- SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED ---`);
if (passedTests === totalTests) {
  console.log('🎉 ALL INTEGRATION TESTS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('⚠️ SOME TESTS FAILED');
  process.exit(1);
}
