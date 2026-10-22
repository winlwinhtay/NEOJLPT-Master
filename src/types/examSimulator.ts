import { JLPTLevel, QuestionType, PracticeQuestion } from './practice';

export type ExamMode = 'full_simulation' | 'practice';

export type ExamSectionId =
  | 'vocabulary'
  | 'grammar_reading'
  | 'vocab_kanji'
  | 'language_knowledge_reading'
  | 'listening';

export interface QuestionTypeTarget {
  type: QuestionType;
  targetCount: number;
  labelEn: string;
  labelJp: string;
}

export interface SectionBlueprint {
  sectionId: ExamSectionId;
  title: string;
  titleJp: string;
  timeLimitMinutes: number;
  targetQuestionCount: number;
  questionTypes: QuestionTypeTarget[];
  order: number;
}

export interface ExamBlueprint {
  level: JLPTLevel;
  version: string;
  title: string;
  description: string;
  totalTimeMinutes: number;
  totalMaxScore: number;
  passingScore: number;
  sectionalHurdle: number; // 19 / 60
  sections: SectionBlueprint[];
}

export interface ActiveSectionSession {
  sectionIndex: number;
  sectionId: ExamSectionId;
  startedAt: number; // epoch ms
  deadlineTimestamp: number; // epoch ms
  isSubmitted: boolean;
  isLocked: boolean;
  timeSpentSeconds: number;
  answers: Record<string, number>;
}

export interface SimulationSessionState {
  id: string;
  testId: string;
  level: JLPTLevel;
  mode: ExamMode;
  createdAt: number;
  currentSectionIndex: number;
  isTransitioning: boolean;
  isCompleted: boolean;
  sections: ActiveSectionSession[];
}

export interface QuestionBankReadiness {
  level: JLPTLevel;
  sectionId: ExamSectionId;
  sectionTitle: string;
  targetCount: number;
  availableCount: number;
  selectedCount: number;
  isComplete: boolean;
  readinessPercentage: number;
  qualityStatusDistribution: Record<string, number>;
}
