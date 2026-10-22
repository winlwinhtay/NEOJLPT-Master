-- ==========================================================
-- NEOJLPT Master: 25 Historical-Style Mock Tests (2020–2025)
-- Migration: 20261023_jlpt_historical_mock_tests.sql
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. Mock Tests Catalog Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id TEXT PRIMARY KEY,                       -- e.g. 'mock-n5-01', 'mock-n1-05'
  title TEXT NOT NULL,
  jlpt_level TEXT NOT NULL CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  set_number INTEGER NOT NULL CHECK (set_number BETWEEN 1 AND 5),
  historical_year_style TEXT NOT NULL DEFAULT '2020–2025',
  source_type TEXT NOT NULL DEFAULT 'original_jlpt_style'
    CHECK (source_type IN ('official_sample', 'verified_historical', 'original_jlpt_style', 'educational_reference')),
  source_label TEXT NOT NULL DEFAULT 'JLPT-Style Practice — Based on 2020–2025 examination formats',
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published')),
  content_version TEXT NOT NULL DEFAULT '2026.1',
  total_time_minutes INTEGER NOT NULL,
  total_max_score INTEGER NOT NULL DEFAULT 180,
  passing_score INTEGER NOT NULL,
  description TEXT,
  sections_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mock_tests_level_set ON public.mock_tests(jlpt_level, set_number);
CREATE INDEX IF NOT EXISTS idx_mock_tests_status ON public.mock_tests(quality_status);

-- ----------------------------------------------------------
-- 2. Mock Test Questions Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mock_test_questions (
  id TEXT PRIMARY KEY,                       -- e.g. 'n5-s1-v1', 'n1-s5-l2'
  mock_test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,                  -- 'vocab_kanji', 'grammar_reading', 'listening'
  jlpt_level TEXT NOT NULL CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  question_type TEXT NOT NULL,               -- 'kanji_reading', 'vocab_meaning', 'grammar_select', 'sentence_order', 'reading_comprehension', 'listening_comprehension'
  category TEXT NOT NULL,                    -- 'kanji', 'vocabulary', 'grammar', 'reading', 'listening'
  prompt_jp TEXT NOT NULL,
  reading_prompt TEXT,
  passage TEXT,
  audio_text TEXT,
  audio_url TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer INTEGER NOT NULL,
  explanation_en TEXT,
  explanation_my TEXT,
  difficulty INTEGER NOT NULL DEFAULT 1,
  question_order INTEGER NOT NULL DEFAULT 1,
  source_type TEXT NOT NULL DEFAULT 'original_jlpt_style',
  source_label TEXT NOT NULL DEFAULT 'JLPT-Style Practice — Based on 2020–2025 examination formats',
  historical_year TEXT,
  quality_status TEXT NOT NULL DEFAULT 'published',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mock_questions_test_id ON public.mock_test_questions(mock_test_id);
CREATE INDEX IF NOT EXISTS idx_mock_questions_level_cat ON public.mock_test_questions(jlpt_level, category);
CREATE INDEX IF NOT EXISTS idx_mock_questions_type ON public.mock_test_questions(question_type);

-- ----------------------------------------------------------
-- 3. Mock Test User Attempts Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mock_test_attempts (
  id TEXT PRIMARY KEY,                       -- 'attempt-timestamp' or UUID
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  jlpt_level TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  total_max_score INTEGER NOT NULL DEFAULT 0,
  estimated_scaled_score INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  section_scores JSONB NOT NULL DEFAULT '[]'::jsonb,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  flagged_question_ids TEXT[] DEFAULT '{}',
  weak_categories TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mock_attempts_user ON public.mock_test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_attempts_test ON public.mock_test_attempts(test_id);
CREATE INDEX IF NOT EXISTS idx_mock_attempts_level ON public.mock_test_attempts(jlpt_level);

-- ----------------------------------------------------------
-- 4. Row Level Security Policies
-- ----------------------------------------------------------
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_test_attempts ENABLE ROW LEVEL SECURITY;

-- Public read for published mock tests & questions
CREATE POLICY "Public read published mock tests"
  ON public.mock_tests FOR SELECT
  USING (quality_status = 'published');

CREATE POLICY "Public read published mock test questions"
  ON public.mock_test_questions FOR SELECT
  USING (quality_status = 'published');

-- Authenticated users manage own attempts
CREATE POLICY "Users can view their own mock test attempts"
  ON public.mock_test_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mock test attempts"
  ON public.mock_test_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins full access
CREATE POLICY "Admins full access to mock tests"
  ON public.mock_tests FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins full access to mock test questions"
  ON public.mock_test_questions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
