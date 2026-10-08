import { JLPTLevel } from '../types';

/**
 * Standard Session Lifecycle States.
 * The session progresses through these deterministic states:
 * IDLE -> LOADING -> ACTIVE -> ANSWER_SELECTED -> SUBMITTING -> FEEDBACK -> READY_FOR_NEXT -> ACTIVE ... -> COMPLETING -> COMPLETED
 * With resilient error path:
 * ANY_STATE -> ERROR -> RECOVER -> ACTIVE
 */
export type SessionLifecycleStatus =
  | 'IDLE'
  | 'LOADING'
  | 'ACTIVE'
  | 'ANSWER_SELECTED'
  | 'SUBMITTING'
  | 'FEEDBACK'
  | 'READY_FOR_NEXT'
  | 'COMPLETING'
  | 'COMPLETED'
  | 'ERROR';

/**
 * Mode of the learning session.
 */
export type SessionMode =
  | 'practice'
  | 'mock_test'
  | 'quiz'
  | 'mastery'
  | 'business_exam'
  | 'business_quiz'
  | 'active_learning'
  | 'drill'
  | 'placement';

/**
 * Supported question interaction types.
 */
export type SessionQuestionType =
  | 'multiple_choice'
  | 'sentence_order'
  | 'multiple_select'
  | 'fill_blank'
  | 'kanji'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'business'
  | 'interview'
  | 'custom';

/**
 * Normalized standard question format for the Shared Session Engine.
 */
export interface SessionQuestion {
  /** Unique question identifier */
  id: string;
  /** Interaction format type */
  type: SessionQuestionType;
  /** Primary Japanese prompt/sentence */
  prompt: string;
  /** Secondary English prompt, context, or scenario */
  promptSub?: string;
  /** Reading passage or conversation script (for reading/listening/business) */
  passage?: string;
  /** Candidate answer choices */
  options: string[];
  /** Correct answer (index for MC, index array for sentence order, string for text) */
  correctAnswer: number | number[] | string | string[];
  /** Comprehensive explanation for learning reinforcement */
  explanation?: string;
  /** Japanese text to be pronounced or synthesized via speech */
  audioText?: string;
  /** JLPT difficulty level */
  level?: JLPTLevel;
  /** Content category (kanji, vocab, grammar, reading, listening, business, etc.) */
  category?: string;
  /** Additional section grouping (e.g. for Mock Exams or multi-part drills) */
  sectionId?: string;
  sectionTitle?: string;
  /** Extensible metadata */
  metadata?: Record<string, any>;
}

/**
 * Record of a learner's submitted answer for a specific question.
 */
export interface UserAnswerRecord {
  questionId: string;
  rawAnswer: any; // e.g. option index 0..3, ordered tokens array [2, 0, 1, 3], string, etc.
  isCorrect: boolean;
  scoreAwarded: number;
  timeSpentSeconds?: number;
  submittedAt: number;
  explanation?: string;
}

/**
 * Complete immutable session state managed by the session engine.
 */
export interface SessionState {
  sessionId: string;
  mode: SessionMode;
  status: SessionLifecycleStatus;
  questions: SessionQuestion[];
  currentIndex: number;
  currentSelectedAnswer: any | null;
  answers: Record<string, UserAnswerRecord>;
  score: number;
  maxScore: number;
  isSubmitting: boolean;
  isAdvancing: boolean;
  isCompleted: boolean;
  errorMessage: string | null;
  startedAt: number;
  completedAt?: number;
  flaggedQuestionIds: Record<string, boolean>;
  activeSectionId?: string;
  metadata?: Record<string, any>;
}

/**
 * Evaluation output from AnswerEvaluator.
 */
export interface EvaluationResult {
  isCorrect: boolean;
  score: number;
  maxScore: number;
  feedback?: string;
  normalizedUserAnswer: string;
  normalizedCorrectAnswer: string;
}

/**
 * Final summarized session result produced when the session completes.
 */
export interface SessionResult {
  sessionId: string;
  mode: SessionMode;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracyPercentage: number;
  score: number;
  maxScore: number;
  isPassed: boolean;
  durationSeconds: number;
  answers: Record<string, UserAnswerRecord>;
  mistakes: Array<{
    questionId: string;
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    explanation?: string;
    category?: string;
    level?: JLPTLevel;
  }>;
  completedAt: number;
}

/**
 * Configuration options for initializing a learning session.
 */
export interface SessionConfig {
  sessionId?: string;
  mode: SessionMode;
  questions: SessionQuestion[];
  /** If true, selecting an option automatically triggers evaluation (e.g. quick drills) */
  autoSubmitOnSelect?: boolean;
  /** If true, shows immediate explanation & correct badge (default true). If false, waits until test ends (e.g. mock test) */
  instantFeedback?: boolean;
  /** Base XP awarded per correct answer */
  xpPerCorrect?: number;
  /** Bonus XP awarded upon completing the entire session */
  completionBonusXP?: number;
  /** Activity tracking category for user statistics */
  activityCategory?: 'practice' | 'kanji' | 'vocab' | 'grammar' | 'reading' | 'listening' | 'business';
  /** Minimum accuracy percentage to count as 'passed' (default 70) */
  passingThresholdPercentage?: number;
  /** Callback triggered when the session completes */
  onComplete?: (result: SessionResult) => void;
  /** Callback triggered when a mistake is made */
  onMistake?: (mistake: any) => void;
}
