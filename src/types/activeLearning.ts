import { JLPTLevel } from './index';

export type ActiveSkillType =
  | 'vocabulary'
  | 'kanji'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing';

export type ContentMasteryScore = 0 | 1 | 2 | 3 | 4 | 5;
// 0 = New
// 1 = Introduced
// 2 = Learning
// 3 = Practicing
// 4 = Strong
// 5 = Mastered

export type PlanActivityType =
  | 'warm_up'
  | 'spaced_review'
  | 'concept_intro'
  | 'guided_explanation'
  | 'practice'
  | 'active_retrieval'
  | 'application'
  | 'mini_assessment'
  | 'confusion_review';

export interface LearningErrorRecord {
  id: string;
  userId: string;
  contentId: string;
  contentType: string;
  questionId?: string;
  errorType: string;
  incorrectAnswer: string;
  correctAnswer: string;
  explanation?: string;
  createdAt: string;
}

export interface LearningMasteryRecord {
  id?: string;
  userId: string;
  contentId: string;
  contentType: 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing';
  masteryScore: ContentMasteryScore;
  confidence: number; // 0.0 - 1.0
  attempts: number;
  correctAttempts: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

export interface LearnerActiveProfile {
  userId: string;
  currentLevel: JLPTLevel;
  targetLevel: JLPTLevel;
  targetDate?: string;
  studyDaysPerWeek: number;
  minutesPerDay: number; // 30, 60, 90, 120
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningGoal: 'pass_jlpt' | 'work' | 'study' | 'travel' | 'conversation';
  examDate?: string;
  businessGoal?: 'none' | 'workplace_basics' | 'business_meetings' | 'keigo_mastery' | 'full_business';
  skillScores: Record<ActiveSkillType, number>; // 0 - 100
  completedContent: string[];
  masteredContent: string[];
  weakContent: string[];
  recentErrors: LearningErrorRecord[];
  recentScores: { date: string; category: string; score: number }[];
  retentionScores: Record<string, number>;
  lastStudyDate: string;
  streak: number;
  learningConsistency: number; // 0.0 - 1.0
}

export interface LearningPlanItem {
  id: string;
  planId?: string;
  contentId: string;
  contentType: 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'confusion';
  skill: ActiveSkillType;
  activity: PlanActivityType;
  minutes: number;
  priority: number;
  reason: string; // "Why am I learning this?"
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  orderIndex: number;
  title: string;
  subtitle?: string;
  contentData?: any; // Preloaded curriculum item
}

export interface ActiveDailyPlan {
  id: string;
  userId: string;
  planDate: string;
  estimatedMinutes: number;
  focus: ActiveSkillType[];
  aiModel: string;
  isCompleted: boolean;
  completedMinutes: number;
  items: LearningPlanItem[];
  examModeActive: boolean;
  daysToExam?: number;
  source: 'gemini_ai' | 'deterministic_engine' | 'cached';
  generatedAt: string;
}

export interface ConfusionPair {
  id: string;
  title: string;
  conceptA: string;
  conceptB: string;
  conceptC?: string;
  category: 'grammar' | 'particle' | 'kanji' | 'keigo' | 'vocabulary';
  level: JLPTLevel;
  differenceExplanation: string;
  contrastRule: string;
  examplesA: { jp: string; reading: string; en: string }[];
  examplesB: { jp: string; reading: string; en: string }[];
  examplesC?: { jp: string; reading: string; en: string }[];
  practiceQuestions: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export interface AIUsageRecord {
  id?: string;
  userId: string;
  feature: string;
  requestDate: string;
  inputTokens: number;
  outputTokens: number;
  requestCount: number;
}

export interface ActiveLearningConfig {
  aiEnabled: boolean;
  geminiModel: string;
  dailyRequestLimitFree: number;
  dailyRequestLimitPro: number;
  dailyRequestLimitPremium: number;
  fallbackEnabled: boolean;
  cacheTtlHours: number;
}
