-- ==========================================================
-- NEOJLPT Master: Supabase PostgreSQL Database Schema
-- Run this script in your Supabase project SQL Editor
-- ==========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. Profiles Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Can be Supabase Auth UID (UUID as string) or local user ID
  email TEXT,
  name TEXT DEFAULT 'Takeshi Learner',
  avatar TEXT DEFAULT '⛩️',
  target_level TEXT DEFAULT 'N5',
  current_level TEXT DEFAULT 'N5',
  daily_goal_minutes INTEGER DEFAULT 25,
  daily_goal_vocab INTEGER DEFAULT 20,
  daily_goal_kanji INTEGER DEFAULT 5,
  daily_goal_grammar INTEGER DEFAULT 2,
  daily_goal_reading INTEGER DEFAULT 1,
  daily_goal_listening INTEGER DEFAULT 10,
  native_language TEXT DEFAULT 'English',
  learning_goal TEXT DEFAULT 'pass_jlpt',
  streak_days INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  is_premium BOOLEAN DEFAULT FALSE,
  theme TEXT DEFAULT 'light',
  font_size TEXT DEFAULT 'medium',
  show_furigana BOOLEAN DEFAULT TRUE,
  speech_speed NUMERIC DEFAULT 1.0,
  audio_auto_play BOOLEAN DEFAULT TRUE,
  sound_effects BOOLEAN DEFAULT TRUE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid()::text = id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid()::text = id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 2. Spaced Repetition (SRS) Items Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.srs_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL, -- 'vocab' | 'kanji' | 'grammar'
  stage INTEGER DEFAULT 0,
  ease_factor NUMERIC DEFAULT 2.5,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  due_date TIMESTAMPTZ NOT NULL,
  last_reviewed TIMESTAMPTZ,
  history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_srs_user_due ON public.srs_items(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_srs_user_item ON public.srs_items(user_id, item_id);

ALTER TABLE public.srs_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own SRS items" ON public.srs_items;
CREATE POLICY "Users can view own SRS items"
  ON public.srs_items FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can insert own SRS items" ON public.srs_items;
CREATE POLICY "Users can insert own SRS items"
  ON public.srs_items FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can update own SRS items" ON public.srs_items;
CREATE POLICY "Users can update own SRS items"
  ON public.srs_items FOR UPDATE
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can delete own SRS items" ON public.srs_items;
CREATE POLICY "Users can delete own SRS items"
  ON public.srs_items FOR DELETE
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 3. Mock Test Attempts Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mock_test_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  level TEXT NOT NULL, -- 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage NUMERIC NOT NULL,
  passed BOOLEAN NOT NULL,
  time_spent_seconds INTEGER NOT NULL,
  section_scores JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mock_user ON public.mock_test_attempts(user_id, completed_at DESC);

ALTER TABLE public.mock_test_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own mock tests" ON public.mock_test_attempts;
CREATE POLICY "Users can view own mock tests"
  ON public.mock_test_attempts FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can insert own mock tests" ON public.mock_test_attempts;
CREATE POLICY "Users can insert own mock tests"
  ON public.mock_test_attempts FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 4. Mistake Notebook Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mistake_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  your_answer TEXT,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  category TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mistakes_user ON public.mistake_logs(user_id, date DESC);

ALTER TABLE public.mistake_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own mistakes" ON public.mistake_logs;
CREATE POLICY "Users can manage own mistakes"
  ON public.mistake_logs FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 5. Completed Lessons Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.completed_lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lessons_user ON public.completed_lessons(user_id);

ALTER TABLE public.completed_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view and edit completed lessons" ON public.completed_lessons;
CREATE POLICY "Users can view and edit completed lessons"
  ON public.completed_lessons FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- Helper Functions & Trigger for updated_at
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_srs_updated ON public.srs_items;
CREATE TRIGGER on_srs_updated
  BEFORE UPDATE ON public.srs_items
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- ----------------------------------------------------------
-- 6. Personalized Study Plans Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_plans (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  target_level TEXT NOT NULL DEFAULT 'N5',
  current_level TEXT NOT NULL DEFAULT 'beginner',
  days_per_week INTEGER DEFAULT 5,
  daily_minutes INTEGER DEFAULT 30,
  intensity TEXT DEFAULT 'balanced', -- 'relaxed' | 'balanced' | 'intensive'
  target_exam_date DATE,
  plan_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_study_plans_user ON public.study_plans(user_id);
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own study plan" ON public.study_plans;
CREATE POLICY "Users can manage own study plan"
  ON public.study_plans FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 7. Curriculum Planner Configuration Table (Admin)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_config (
  id TEXT PRIMARY KEY DEFAULT 'global_default',
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.curriculum_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read curriculum config" ON public.curriculum_config;
CREATE POLICY "Anyone can read curriculum config"
  ON public.curriculum_config FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can update curriculum config" ON public.curriculum_config;
CREATE POLICY "Admins can update curriculum config"
  ON public.curriculum_config FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');


