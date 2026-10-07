import { JLPTLevel } from './index';

export type AICacheQualityStatus = 'draft' | 'validated' | 'published' | 'rejected' | 'pending';

export interface AICacheItem {
  id: string;
  cache_key: string;
  content_type: string;
  jlpt_level: JLPTLevel;
  topic_id?: string;
  source_content_id?: string;
  difficulty?: string;
  support_language: string;
  request_version?: string;
  prompt_version?: string;
  model: string;
  response_json: any;
  quality_status: AICacheQualityStatus;
  usage_count: number;
  created_at: string;
  updated_at: string;
  last_used_at: string;
  expires_at?: string;
}

export interface AIQuestionBankItem {
  id: string;
  cache_key: string;
  question_hash: string;
  source_content_id: string;
  jlpt_level: JLPTLevel;
  skill: string;
  question_type: string;
  difficulty: string;
  question_json: {
    prompt: string;
    options: string[];
    context?: string;
    furigana?: string;
  };
  answer_json: {
    correctIndex: number;
    correctAnswer: string;
    explanation: string;
  };
  explanation_json?: any;
  support_language: string;
  quality_status: AICacheQualityStatus;
  times_served: number;
  times_correct: number;
  times_incorrect: number;
  created_at: string;
  updated_at: string;
}

export interface AITranslationItem {
  id: string;
  cache_content_id?: string;
  translation_key: string;
  source_content_id: string;
  language: string;
  translated_json: any;
  quality_status: AICacheQualityStatus;
  created_at: string;
  updated_at: string;
}

export interface AICostMetric {
  id: string;
  date: string;
  model: string;
  feature: string;
  input_tokens: number;
  output_tokens: number;
  gemini_requests: number;
  cache_hits: number;
  cache_misses: number;
  estimated_cost: number;
  created_at: string;
  updated_at: string;
}

export interface AICacheTelemetryStats {
  totalCached: number;
  totalQuestions: number;
  cacheHits: number;
  cacheMisses: number;
  geminiCalls: number;
  hitRatePercent: number;
  tokensSaved: number;
  costSavedUsd: number;
}
