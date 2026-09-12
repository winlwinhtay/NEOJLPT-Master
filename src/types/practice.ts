import { JLPTLevel } from './index';

export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'sentence_order'
  | 'kanji_reading'
  | 'vocab_meaning'
  | 'grammar_select'
  | 'reading_comprehension'
  | 'listening_comprehension';

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  level: JLPTLevel;
  category: 'vocabulary' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'particle_drill' | 'keigo_simulator';
  promptJp: string;
  promptEn?: string;
  readingPrompt?: string;
  passage?: string;
  audioText?: string;
  options: string[]; // For multiple choice & sentence ordering tokens
  correctAnswer: string | number | number[]; // index, string, or ordered array of indexes
  explanation: string;
  wrongExplanations?: Record<string, string>; // reason why specific option is wrong
  relatedLessonId?: string;
  relatedGrammarId?: string;
  relatedVocabId?: string;
  tags: string[];
}

export interface MatchingPairItem {
  id: string;
  left: string;
  right: string;
  matched?: boolean;
}

export interface MockTestSection {
  id: 'vocab_kanji' | 'grammar_reading' | 'listening';
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  passingScore: number;
  questions: PracticeQuestion[];
}

export interface MockTest {
  id: string;
  title: string;
  level: JLPTLevel;
  totalTimeMinutes: number;
  totalMaxScore: number;
  passingScore: number;
  sections: MockTestSection[];
  description: string;
}

export interface MockTestAttempt {
  id: string;
  testId: string;
  level: JLPTLevel;
  date: string;
  timeSpentSeconds: number;
  sectionScores: {
    sectionId: string;
    sectionTitle: string;
    score: number;
    maxScore: number;
    correctCount: number;
    totalCount: number;
  }[];
  totalScore: number;
  totalMaxScore: number;
  passed: boolean;
  estimatedScaledScore: number; // e.g. out of 180 (JLPT scale)
  answers: Record<string, any>;
  flaggedQuestionIds: string[];
  weakCategories: string[];
  recommendedLessonIds: string[];
}
