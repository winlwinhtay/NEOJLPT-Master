import { JLPTLevel } from './index';

export type SpeakingMode = 'natural_conversation' | 'learning_mode' | 'professional_speaking';

export interface GrammarCorrectionItem {
  original: string;
  correction: string;
  explanation: string;
  explanationMy?: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
}

export interface VocabularyEnhancementItem {
  originalExpression: string;
  suggestedExpression: string;
  meaning: string;
  example: string;
  register: 'casual' | 'neutral' | 'formal' | 'professional';
  reason: string;
}

export interface NaturalAlternativeItem {
  expression: string;
  reading?: string;
  explanation: string;
  explanationMy?: string;
}

export interface SpeakingFeedback {
  id: string;
  originalTranscript: string;
  correctedTranscript: string;
  overallSummary: string;
  overallSummaryMy?: string;
  grammarCorrections: GrammarCorrectionItem[];
  vocabularyEnhancements: VocabularyEnhancementItem[];
  naturalAlternatives: NaturalAlternativeItem[];
  learningPoints: string[];
  learningPointsMy?: string[];
  retryPrompt: string;
  retryPromptMy?: string;
  spokenAudioUrl?: string; // If audio blob available
  level: JLPTLevel;
  mode: SpeakingMode;
  timestamp: string;
}

export interface SavedLearningItem {
  id: string;
  userId?: string;
  type: 'vocabulary' | 'grammar' | 'expression';
  original: string;
  enhanced: string;
  meaning: string;
  example?: string;
  register?: 'casual' | 'neutral' | 'formal' | 'professional';
  explanation?: string;
  level: JLPTLevel;
  date: string;
  known: boolean;
}

export interface SpeakingSessionRecord {
  id: string;
  userId?: string;
  topic: string;
  mode: SpeakingMode;
  level: JLPTLevel;
  learningLanguage: 'ja' | 'en';
  explanationLanguage: 'en' | 'my' | 'ja';
  createdAt: string;
  turnCount: number;
  feedbacks: SpeakingFeedback[];
}
