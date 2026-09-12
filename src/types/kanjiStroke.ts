// ============================================================================
// KANJI STROKE ORDER & JAPANESE SCHOOL-STYLE LEARNING TYPES
// Data structures for verified KanjiVG paths, animations, canvas & quiz
// ============================================================================

import { JLPTLevel } from './index';

export type StrokeDirection = '→' | '↓' | '←' | '↑' | '↘' | '↗' | '↙' | '↖' | '↷' | '↶';

export interface StrokePathInfo {
  order: number; // 1-indexed (1, 2, 3...)
  d: string; // SVG path command string
  type?: string; // KanjiVG stroke classification (e.g. ㇐, ㇑, ㇒, ㇔, ㇁, etc.)
  startX: number;
  startY: number;
  direction: StrokeDirection;
  numberX: number;
  numberY: number;
}

export interface KanjiStrokeData {
  character: string;
  strokeCount: number;
  strokes: StrokePathInfo[];
  viewBox: string; // Standard "0 0 109 109"
  source: 'KanjiVG';
  sourceVersion: string;
  attribution: string;
  verified: boolean;
}

export type KanjiWritingPracticeMode = 'trace' | 'guided' | 'recall';

export interface KanjiComponentInfo {
  component: string;
  name?: string;
  meaning?: string;
  isRadical: boolean;
  role?: 'semantic' | 'phonetic' | 'enclosure' | 'general';
}

export interface KanjiSimilarComparison {
  character: string;
  meaning: string;
  distinctionNote: string;
}

export interface KanjiQuizQuestion {
  id: string;
  type: 'meaning' | 'reading' | 'recognition' | 'strokeCount' | 'vocabulary';
  question: string;
  options: string[];
  correctAnswer: number; // 0..3
  explanation: string;
}

export interface KanjiMasteryRecord {
  kanjiId: string;
  character: string;
  level: JLPTLevel;
  understandingViewed: boolean;
  readingViewed: boolean;
  strokeOrderWatched: boolean;
  writingPracticeCount: number;
  writingScore: number;
  vocabularyMastered: boolean;
  quizScore: number;
  masteryScore: number; // 0..100%
  status: 'new' | 'learning' | 'practicing' | 'review' | 'mastered' | 'needs_review';
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewIntervalDays: number;
}
