// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) TYPES & INTERFACES
// Comprehensive University-Course-Style Business Curriculum Data Schema
// ============================================================================

export type BusinessCourseLevel =
  | 'foundation'
  | 'intermediate'
  | 'upper_intermediate'
  | 'professional'
  | 'career_track';

export type BusinessGoal =
  | 'work_in_japan'
  | 'japanese_university'
  | 'internship'
  | 'job_interview'
  | 'office_communication'
  | 'customer_service'
  | 'japanese_company'
  | 'business_travel'
  | 'management'
  | 'sales'
  | 'hr_admin'
  | 'finance'
  | 'it_engineering'
  | 'general_business';

export type BusinessIndustry =
  | 'general'
  | 'it'
  | 'sales'
  | 'hr_admin'
  | 'finance'
  | 'manufacturing'
  | 'hospitality'
  | 'logistics';

export type BusinessLessonType =
  | 'conversation'
  | 'keigo'
  | 'email'
  | 'telephone'
  | 'meeting'
  | 'presentation'
  | 'negotiation'
  | 'customer_service'
  | 'culture'
  | 'document'
  | 'interview'
  | 'resume'
  | 'quiz'
  | 'assessment';

export interface BusinessLesson {
  id: string;
  unitId: string;
  level: BusinessCourseLevel;
  titleJp: string;
  titleEn: string;
  lessonNumber: number;
  type: BusinessLessonType;
  estimatedMinutes: number;
  prerequisiteJpLevel: string; // e.g., 'N4+', 'N3+', 'N2+'
  learningObjectives: string[];
  keyVocabulary: string[];
  keyGrammarPatterns: string[];
  culturalNote?: string;
  isCompleted?: boolean;
}

export interface BusinessUnit {
  id: string;
  level: BusinessCourseLevel;
  unitNumber: number;
  titleJp: string;
  titleEn: string;
  description: string;
  iconName: string;
  lessons: BusinessLesson[];
}

export interface BusinessCourse {
  id: BusinessCourseLevel;
  nameJp: string;
  nameEn: string;
  recommendedJlpt: string;
  description: string;
  outcomes: string[];
  units: BusinessUnit[];
}

// ----------------------------------------------------------------------------
// Keigo Mastery Types
// ----------------------------------------------------------------------------
export interface BusinessKeigoVerb {
  id: string;
  plain: string; // e.g. 行く / 来る
  reading: string;
  meaning: string;
  teineigo: string; // 行きます
  sonkeigo: string[]; // いらっしゃる / おいでになる / 行かれる
  kenjougo: string[]; // 参る / 伺う
  bikaigo?: string;
  actorRule: string; // e.g. "Use Sonkeigo when customer/client/boss performs the action."
  commonMistakes: {
    incorrect: string;
    correct: string;
    reason: string;
  }[];
  exampleSituations: {
    context: string;
    japanese: string;
    speaker: string;
    translation: string;
  }[];
}

export interface KeigoConfusionExercise {
  id: string;
  prompt: string;
  situation: string;
  speaker: string;
  targetPerson: string;
  options: {
    text: string;
    type: 'plain' | 'teineigo' | 'sonkeigo' | 'kenjougo' | 'incorrect_keigo';
    explanation: string;
  }[];
  correctIndex: number;
}

// ----------------------------------------------------------------------------
// Business Email Types
// ----------------------------------------------------------------------------
export type BusinessEmailCategory =
  | 'request'
  | 'apology'
  | 'scheduling'
  | 'confirmation'
  | 'followup'
  | 'thankyou'
  | 'report'
  | 'inquiry'
  | 'reminder'
  | 'decline';

export interface BusinessEmailTemplate {
  id: string;
  category: BusinessEmailCategory;
  titleJp: string;
  titleEn: string;
  audience: 'internal_colleague' | 'internal_manager' | 'external_client' | 'customer';
  subject: string;
  recipient: string;
  greeting: string;
  opening: string;
  body: string;
  requestAction: string;
  closing: string;
  signature: string;
  keyPhrases: {
    phrase: string;
    reading: string;
    meaning: string;
    usageNote: string;
  }[];
  cushionPhrases: string[]; // e.g. 恐れ入りますが、お忙しいところ恐縮ですが
  writingPrompt?: {
    scenario: string;
    requirements: string[];
    modelSolution: string;
    explanation: string;
  };
}

// ----------------------------------------------------------------------------
// Workplace Scenarios & Telephone Simulation
// ----------------------------------------------------------------------------
export interface DialogueLine {
  id: string;
  speaker: string;
  speakerRole: string; // e.g. '社外顧客 (Client)', '課長 (Section Chief)', '自分 (You)'
  isUserTurn?: boolean;
  japanese: string;
  reading?: string;
  english: string;
  nuanceExplanation?: string;
  userOptions?: {
    text: string;
    politenessScore: number; // 0 to 100
    isOptimal: boolean;
    feedback: string;
  }[];
}

export interface BusinessScenario {
  id: string;
  titleJp: string;
  titleEn: string;
  category: 'office' | 'telephone' | 'meeting' | 'customer_complaint' | 'negotiation' | 'hourensou';
  level: BusinessCourseLevel;
  situation: string;
  roles: { name: string; role: string }[];
  objective: string;
  dialogue: DialogueLine[];
  culturalTip: string;
  keyTakeaways: string[];
}

// ----------------------------------------------------------------------------
// Workplace Culture & Etiquette
// ----------------------------------------------------------------------------
export interface BusinessCultureGuideItem {
  id: string;
  category: 'hourensou' | 'seating' | 'meishi' | 'hierarchy' | 'greetings' | 'nomikai' | 'ringi';
  titleJp: string;
  titleEn: string;
  summary: string;
  coreRule: string;
  diagramSvgKey?: string; // e.g. 'conference_room_seating', 'taxi_seating', 'elevator_seating'
  detailedGuidelines: {
    heading: string;
    explanation: string;
    dos: string[];
    donts: string[];
  }[];
  modernTrendNote?: string; // Explain differences across startups, tech vs traditional corporations
}

// ----------------------------------------------------------------------------
// Job Interview & Entry Sheet Types
// ----------------------------------------------------------------------------
export interface BusinessInterviewQuestion {
  id: string;
  category: 'opening' | 'motivation' | 'self_pr' | 'experience' | 'failure_resilience' | 'reverse_question';
  questionJp: string;
  questionReading: string;
  questionEn: string;
  interviewerIntent: string;
  answerFramework: {
    step: string;
    description: string;
  }[];
  modelAnswerJp: string;
  modelAnswerReading: string;
  modelAnswerEn: string;
  cautionPoints: string[];
}

export interface EntrySheetGuideItem {
  id: string;
  section: 'personal' | 'gakuchika' | 'shibou_douki' | 'jiko_pr' | 'career_vision';
  titleJp: string;
  titleEn: string;
  explanation: string;
  structureFormula: string[];
  badExample: { text: string; issue: string };
  goodExample: { text: string; explanation: string };
}

// ----------------------------------------------------------------------------
// Business Vocabulary & Glossary
// ----------------------------------------------------------------------------
export interface BusinessVocabularyItem {
  id: string;
  word: string;
  reading: string;
  meaningEn: string;
  meaningByLang?: Record<string, string>;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression';
  businessDomain:
    | 'organization'
    | 'meetings'
    | 'finance'
    | 'hr'
    | 'sales'
    | 'it'
    | 'contracts'
    | 'operations'
    | 'courtesy';
  jlptEquivalent: 'N4' | 'N3' | 'N2' | 'N1' | 'BJT';
  formality: 'standard_business' | 'honorific' | 'humble' | 'internal_casual';
  exampleJp: string;
  exampleReading: string;
  exampleEn: string;
  collocations?: string[];
  relatedTerms?: string[];
}

// ----------------------------------------------------------------------------
// Business Assessment & Final Exam
// ----------------------------------------------------------------------------
export interface BusinessQuizQuestion {
  id: string;
  section: 'keigo' | 'vocabulary' | 'email' | 'telephone' | 'scenario' | 'culture';
  level: BusinessCourseLevel;
  questionJp: string;
  questionEn: string;
  scenarioContext?: string;
  options: string[];
  correctAnswer: number;
  explanationJp: string;
  explanationEn: string;
}

export interface BusinessCertificateRecord {
  id: string;
  courseLevel: BusinessCourseLevel;
  courseName: string;
  studentName: string;
  issuedDate: string;
  scorePercentage: number;
  sectionsBreakdown: {
    section: string;
    score: number;
  }[];
}

export interface BusinessUserProgress {
  selectedGoal?: BusinessGoal;
  activeLevel: BusinessCourseLevel;
  completedLessonIds: string[];
  completedUnitIds: string[];
  quizScores: Record<string, number>;
  masteredKeigoIds: string[];
  masteredVocabIds: string[];
  scenarioCompletedIds: string[];
  certificates: BusinessCertificateRecord[];
}

// ----------------------------------------------------------------------------
// Comprehensive Career & Interview Simulation Types
// ----------------------------------------------------------------------------
export type InterviewModeId =
  | 'basic_entry'
  | 'mid_career'
  | 'tech_dx'
  | 'sales_biz'
  | 'management'
  | 'stress_adaptability'
  | 'reverse_question'
  | 'casual_culture'
  | 'case_study'
  | 'final_executive';

export interface InterviewModeInfo {
  id: InterviewModeId;
  titleJp: string;
  titleEn: string;
  targetAudience: string;
  description: string;
  focusSkills: string[];
  questionsCount: number;
}

export interface InterviewQuestionExtended {
  id: string;
  modeId: InterviewModeId;
  category: string;
  questionJp: string;
  questionReading?: string;
  questionEn: string;
  interviewerIntent: string;
  starFramework: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  modelAnswerJp: string;
  modelAnswerReading?: string;
  modelAnswerEn: string;
  keyPhrases: string[];
  commonPitfalls: string[];
  jlptMinLevel: 'N3' | 'N2' | 'N1';
}

export interface InterviewEvaluationResult {
  overallScore: number;
  starScore: number;
  keigoScore: number;
  clarityScore: number;
  intentAlignmentScore: number;
  strengths: string[];
  areasToImprove: string[];
  polishedJapaneseVersion: string;
  interviewerCommentary: string;
}

// ----------------------------------------------------------------------------
// 4-Step Comparative Email Types
// ----------------------------------------------------------------------------
export interface EmailComparativeFourStep {
  id: string;
  category: string;
  titleJp: string;
  titleEn: string;
  scenario: string;
  audience: 'internal' | 'external' | 'executive';
  urgency: 'normal' | 'urgent' | 'courtesy';
  step1Bad: {
    subject: string;
    body: string;
  };
  step2WhyBad: {
    reasons: string[];
    criticalFlaws: string[];
    politenessIssues: string[];
  };
  step3Improved: {
    subject: string;
    body: string;
    improvementsMade: string[];
  };
  step4Professional: {
    subject: string;
    body: string;
    executiveNuances: string[];
    cushionWordsUsed: string[];
  };
  keyCushionPhrases: { phrase: string; meaning: string; usage: string }[];
}

// ----------------------------------------------------------------------------
// Japanese Resume & CV Types (履歴書・職務経歴書)
// ----------------------------------------------------------------------------
export interface RirekishoRecord {
  personalInfo: {
    fullNameJp: string;
    furigana: string;
    birthDate: string;
    gender?: string;
    currentAddress: string;
    addressFurigana: string;
    email: string;
    phone: string;
  };
  educationHistory: { year: number; month: number; description: string }[];
  workHistory: { year: number; month: number; description: string }[];
  certifications: { year: number; month: number; name: string }[];
  motivationJp: string;
  specialSkillsJp: string;
  commuteHours: number;
  dependentsCount: number;
}

export interface ShokumuKeirekishoProject {
  id: string;
  period: string;
  projectName: string;
  role: string;
  teamSize: string;
  description: string;
  technologiesOrSkills: string[];
  achievementsWithMetrics: string;
}

export interface ShokumuKeirekishoRecord {
  executiveSummary: string;
  coreCompetencies: string[];
  projects: ShokumuKeirekishoProject[];
  selfPR: string;
}

export interface ResumeWordingTransformation {
  casualPhrase: string;
  casualReading?: string;
  issue: string;
  polishedCorporatePhrase: string;
  polishedReading?: string;
  category: 'achievement' | 'leadership' | 'cooperation' | 'problem_solving' | 'motivation';
  explanation: string;
}

// ----------------------------------------------------------------------------
// Career Coaching & Readiness Scorecard
// ----------------------------------------------------------------------------
export interface CareerStepItem {
  stepNumber: number;
  titleJp: string;
  titleEn: string;
  summary: string;
  actionItems: string[];
  keyDeliverables: string[];
  recommendedDuration: string;
}

export interface CorporateReadinessScore {
  overallScore: number; // 0 - 100
  keigoProficiency: number;
  emailBusinessStandard: number;
  horensoReporting: number;
  interviewReadiness: number;
  vocabularyMastery: number;
  jlptEstimatedFit: 'N3 Business Entry' | 'N2 Practical Office' | 'N1 Executive/Consulting';
  personalizedRecommendations: string[];
}

