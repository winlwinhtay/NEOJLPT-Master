import { JLPTLevel, VocabularyItem, KanjiItem, GrammarItem, ReadingLesson, ListeningLesson } from '../../types';
import { SupportedLanguage } from '../../types/i18n';

export type ContentSource =
  | 'verified_reference'
  | 'expert_reviewed'
  | 'imported'
  | 'ai_generated'
  | 'legacy'
  | 'fallback';

export type QualityStatus =
  | 'draft'
  | 'needs_review'
  | 'validated'
  | 'published'
  | 'rejected';

export interface QualityScoreBreakdown {
  grammarCorrect: boolean;
  naturalnessScore: number;     // 0 - 100
  semanticAccuracy: boolean;
  levelSuitability: boolean;
  registerSuitability: boolean;
  translationQualityScore: number; // 0 - 100
  totalScore: number;           // 0 - 100 composite
  issues: string[];
  recommendation: 'publish' | 'review' | 'reject';
}

export interface ValidationResult {
  isValid: boolean;
  score: number;
  breakdown: QualityScoreBreakdown;
  errors: string[];
  warnings: string[];
}

export interface CurriculumContentItem {
  id: string;
  contentType: 'vocabulary' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'business' | 'example_sentence';
  jlptLevel: JLPTLevel;
  title: string;
  slug?: string;
  contentSource: ContentSource;
  qualityStatus: QualityStatus;
  qualityScore: number;
  contentVersion: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CurriculumExampleSentence {
  id: string;
  japanese: string;
  reading: string;
  translationEn: string;
  translationsByLang: Partial<Record<SupportedLanguage, string>>;
  jlptLevel: JLPTLevel;
  difficulty: number;
  context?: string;
  register?: 'polite' | 'casual' | 'formal' | 'humble' | 'honorific';
  grammarIds?: string[];
  vocabularyIds?: string[];
  kanjiIds?: string[];
  audioUrl?: string;
  contentSource: ContentSource;
  qualityStatus: QualityStatus;
  qualityScore: number;
  contentVersion: number;
}

export interface CurriculumVocabulary extends VocabularyItem {
  contentSource: ContentSource;
  qualityStatus: QualityStatus;
  qualityScore: number;
  contentVersion: number;
  exampleSentenceIds?: string[];
  relatedKanjiIds?: string[];
}

export interface CurriculumKanji extends KanjiItem {
  contentSource: ContentSource;
  qualityStatus: QualityStatus;
  qualityScore: number;
  contentVersion: number;
  exampleSentenceIds?: string[];
  relatedVocabIds?: string[];
}

export interface CurriculumGrammar extends GrammarItem {
  contentSource: ContentSource;
  qualityStatus: QualityStatus;
  qualityScore: number;
  contentVersion: number;
  exampleSentenceIds?: string[];
  commonMistakes?: string[];
  studyTip?: string;
  naturalnessNotes?: string;
}

export interface ContentRelation {
  id?: string;
  sourceId: string;
  sourceType: 'kanji' | 'vocabulary' | 'grammar' | 'reading' | 'listening';
  targetId: string;
  targetType: 'kanji' | 'vocabulary' | 'grammar' | 'example_sentence' | 'question';
  relationType: 'uses_kanji' | 'uses_vocab' | 'uses_grammar' | 'example_of' | 'tests_concept' | 'confused_with';
  confidence?: number;
}

export interface ContentFilter {
  level?: JLPTLevel | 'all';
  searchQuery?: string;
  qualityStatus?: QualityStatus | 'all';
  source?: ContentSource | 'all';
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ReviewQueueItem {
  id: string;
  contentId: string;
  contentType: string;
  jlptLevel: JLPTLevel;
  title: string;
  issueCategory: 'Incorrect Grammar' | 'Level Classification' | 'Naturalness' | 'Translation' | 'Typographical';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  currentPayload: any;
  proposedCorrection: any;
  reviewerNotes?: string;
  qualityScore?: number;
  status: 'pending' | 'approved' | 'rejected' | 'verified';
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}
