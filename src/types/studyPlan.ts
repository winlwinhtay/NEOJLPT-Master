import { JLPTLevel } from './index';

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type StudyIntensity = 'relaxed' | 'balanced' | 'intensive';

export type StudyPhaseType =
  | 'foundation'
  | 'core_curriculum'
  | 'integrated_practice'
  | 'exam_preparation'
  | 'final_review';

export interface StudyPhaseDetail {
  id: string;
  type: StudyPhaseType;
  phaseNumber: number;
  title: string;
  description: string;
  startWeek: number;
  endWeek: number;
  completed: boolean;
  isCurrent: boolean;
  percentageProgress: number;
}

export type StudyTaskType =
  | 'vocab_review'
  | 'vocab_new'
  | 'kanji'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'practice'
  | 'mock_section'
  | 'mock_full'
  | 'mistake_review';

export interface DailyStudyTask {
  id: string;
  type: StudyTaskType;
  title: string;
  subtitle?: string;
  durationMinutes: number;
  targetId?: string; // ID of vocab/grammar/kanji/reading/listening/mock
  targetLevel: JLPTLevel;
  completed: boolean;
  priorityScore: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  contentData?: any; // pre-loaded item for instant study execution
}

export interface DailyStudyPlan {
  date: string; // YYYY-MM-DD
  dayOfWeek: Weekday;
  allocatedMinutes: number;
  isRestDay: boolean;
  tasks: DailyStudyTask[];
  completed: boolean;
  completedMinutes: number;
  xpEarned: number;
}

export interface WeeklyStudyPlan {
  weekNumber: number;
  phaseType: StudyPhaseType;
  totalWeeklyMinutes: number;
  completedWeeklyMinutes: number;
  targetVocab: number;
  completedVocab: number;
  targetKanji: number;
  completedKanji: number;
  targetGrammar: number;
  completedGrammar: number;
  targetReading: number;
  completedReading: number;
  targetListening: number;
  completedListening: number;
  targetPractice: number;
  completedPractice: number;
  hasMockTest: boolean;
  mockTestId?: string;
  mockTestCompleted?: boolean;
}

export interface JLPTReadinessScore {
  overall: number; // 0 - 100
  vocabulary: number;
  kanji: number;
  grammar: number;
  reading: number;
  listening: number;
  mockTestReadiness: number;
  recommendedFocus: string;
}

export interface CatchUpStatus {
  isBehind: boolean;
  missedDaysCount: number;
  missedMinutesCount: number;
  catchUpMode: 'normal' | 'gentle' | 'intensive';
  message: string;
}

export interface StudyPlan {
  id: string;
  currentLevel: JLPTLevel | 'beginner';
  targetLevel: JLPTLevel;
  daysPerWeek: number;
  selectedDays: Weekday[];
  dailyMinutes: number;
  customDayMinutes?: Partial<Record<Weekday, number>>;
  totalWeeklyMinutes: number;
  intensity: StudyIntensity;
  targetExamDate?: string; // YYYY-MM-DD
  startDate: string;
  estimatedWeeks: number;
  estimatedCompletionDate: string;
  currentPhase: StudyPhaseType;
  phases: StudyPhaseDetail[];
  currentWeek: number;
  lastActiveDate: string;
  readiness: JLPTReadinessScore;
  catchUp: CatchUpStatus;
  completedTaskIds: string[];
}

export interface CurriculumPlannerConfig {
  durations: {
    vocabNewMinutes: number;
    vocabReviewMinutes: number;
    kanjiNewMinutes: number;
    kanjiReviewMinutes: number;
    grammarBasicMinutes: number;
    grammarComplexMinutes: number;
    readingShortMinutes: number;
    readingMediumMinutes: number;
    readingLongMinutes: number;
    listeningMinutes: number;
    practicePerQuestionMinutes: number;
    mockSectionMinutes: number;
    mockFullBufferMinutes: number;
  };
  difficultyMultipliers: Record<1 | 2 | 3 | 4 | 5, number>;
  intensityMultipliers: Record<StudyIntensity, { workloadMultiplier: number; reviewRatio: number }>;
  levelTargetHours: Record<JLPTLevel, number>;
  phaseWeights: Record<StudyPhaseType, number>;
}
