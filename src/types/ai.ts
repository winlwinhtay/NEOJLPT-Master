import { JLPTLevel } from './index';

export type AIConversationTopic =
  | 'self_introduction'
  | 'shopping'
  | 'restaurant'
  | 'hotel'
  | 'airport'
  | 'immigration'
  | 'school'
  | 'workplace'
  | 'interview'
  | 'travel'
  | 'daily_conversation'
  | 'business_conversation';

export type AIPersonaId = 'yuki' | 'kenji' | 'tanaka' | 'ren';

export interface AIPersona {
  id: AIPersonaId;
  name: string;
  nameJp: string;
  avatar: string;
  role: string;
  roleMy: string;
  description: string;
  speechStyle: string;
}

export interface InteractiveSpeakingScenario {
  id: string;
  icon: string;
  title: string;
  titleMy: string;
  titleJp: string;
  description: string;
  descriptionMy: string;
  starterMessages: Record<JLPTLevel, { jp: string; reading: string; en: string; my: string }>;
  suggestedReplies: Record<JLPTLevel, string[]>;
}

export interface InteractiveSpeakingOptions {
  userText: string;
  scenarioId: string;
  scenarioTitle: string;
  customTopicDescription?: string;
  level: JLPTLevel;
  personaId: AIPersonaId;
  sessionHistory: AIMessage[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  textJp: string;
  textEn?: string;
  textMy?: string;
  reading?: string;
  audioUrl?: string;
  timestamp: string;
  apiSource?: 'edge_gemini' | 'direct_gemini' | 'smart_contextual';
  feedback?: {
    grammarMistakes?: string[];
    vocabularySuggestions?: string[];
    naturalJapaneseAlternatives?: string[];
    pronunciationTips?: string[];
  };
  suggestedReplies?: string[];
}

export interface ConversationSession {
  id: string;
  level: JLPTLevel;
  topic: AIConversationTopic;
  scenarioTitle: string;
  scenarioPrompt: string;
  japaneseOnly: boolean;
  messages: AIMessage[];
  summaryFeedback?: {
    overallGrammarScore: number; // 0-100
    naturalnessScore: number; // 0-100
    vocabularyBreadth: number; // 0-100
    keyMistakes: { mistake: string; correction: string; reason: string }[];
    recommendedGrammarLessons: string[];
    newVocabularyLearned: { word: string; reading: string; meaning: string }[];
    motivationalNote: string;
  };
}

export interface SpeakingExercise {
  id: string;
  level: JLPTLevel;
  japaneseText: string;
  readingText: string;
  englishMeaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  breakdown: { token: string; reading: string; role: string }[];
}

export interface SpeakingAttemptResult {
  transcript: string;
  confidenceScore: number; // 0 - 100
  status: 'excellent' | 'good' | 'needs_work' | 'try_again';
  pronunciationFeedback: string;
  naturalAlternative?: string;
  isAiEvaluated?: boolean;
}
