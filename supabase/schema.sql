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

-- ----------------------------------------------------------
-- 8. Learner Active Profiles Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learner_profiles (
  user_id TEXT PRIMARY KEY,
  current_level TEXT NOT NULL DEFAULT 'N5',
  target_level TEXT NOT NULL DEFAULT 'N5',
  target_date DATE,
  study_days_per_week INTEGER DEFAULT 5,
  minutes_per_day INTEGER DEFAULT 60,
  preferred_study_time TEXT DEFAULT 'evening',
  learning_goal TEXT DEFAULT 'pass_jlpt',
  exam_date DATE,
  business_goal TEXT DEFAULT 'none',
  skill_scores JSONB DEFAULT '{"vocabulary": 80, "kanji": 75, "grammar": 65, "reading": 60, "listening": 50, "speaking": 60, "writing": 55}'::jsonb,
  completed_content JSONB DEFAULT '[]'::jsonb,
  mastered_content JSONB DEFAULT '[]'::jsonb,
  weak_content JSONB DEFAULT '[]'::jsonb,
  recent_errors JSONB DEFAULT '[]'::jsonb,
  recent_scores JSONB DEFAULT '[]'::jsonb,
  retention_scores JSONB DEFAULT '[]'::jsonb,
  last_study_date DATE DEFAULT CURRENT_DATE,
  streak INTEGER DEFAULT 0,
  learning_consistency NUMERIC DEFAULT 0.85,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.learner_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own learner profile" ON public.learner_profiles;
CREATE POLICY "Users can view own learner profile"
  ON public.learner_profiles FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can insert own learner profile" ON public.learner_profiles;
CREATE POLICY "Users can insert own learner profile"
  ON public.learner_profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Users can update own learner profile" ON public.learner_profiles;
CREATE POLICY "Users can update own learner profile"
  ON public.learner_profiles FOR UPDATE
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 9. Multi-Dimensional Learning Mastery Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_mastery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing'
  mastery_score INTEGER DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 5),
  confidence NUMERIC DEFAULT 0.0 CHECK (confidence BETWEEN 0.0 AND 1.0),
  attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_mastery_user_due ON public.learning_mastery(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_mastery_user_content ON public.learning_mastery(user_id, content_id);
CREATE INDEX IF NOT EXISTS idx_mastery_user_type_score ON public.learning_mastery(user_id, content_type, mastery_score);

ALTER TABLE public.learning_mastery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own learning mastery" ON public.learning_mastery;
CREATE POLICY "Users can manage own learning mastery"
  ON public.learning_mastery FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 10. Fine-Grained Error Logs & Confusion Tracking Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_errors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  question_id TEXT,
  error_type TEXT NOT NULL,
  incorrect_answer TEXT,
  correct_answer TEXT,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_errors_user_content ON public.learning_errors(user_id, content_id);
CREATE INDEX IF NOT EXISTS idx_errors_user_created ON public.learning_errors(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_errors_user_type ON public.learning_errors(user_id, error_type);

ALTER TABLE public.learning_errors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own learning errors" ON public.learning_errors;
CREATE POLICY "Users can manage own learning errors"
  ON public.learning_errors FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 11. Active Daily Learning Plans Table (AI + Deterministic Cache)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_date DATE NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 60,
  focus JSONB NOT NULL DEFAULT '[]'::jsonb,
  ai_model TEXT DEFAULT 'gemini-2.5-flash',
  is_completed BOOLEAN DEFAULT FALSE,
  completed_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, plan_date)
);

CREATE INDEX IF NOT EXISTS idx_plans_user_date ON public.learning_plans(user_id, plan_date DESC);

ALTER TABLE public.learning_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own learning plans" ON public.learning_plans;
CREATE POLICY "Users can manage own learning plans"
  ON public.learning_plans FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 12. Learning Plan Items Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_plan_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.learning_plans(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  skill TEXT NOT NULL,
  activity TEXT NOT NULL,
  minutes INTEGER NOT NULL DEFAULT 10,
  priority INTEGER NOT NULL DEFAULT 50,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plan_items_plan_order ON public.learning_plan_items(plan_id, order_index ASC);
CREATE INDEX IF NOT EXISTS idx_plan_items_user_status ON public.learning_plan_items(user_id, status);

ALTER TABLE public.learning_plan_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own learning plan items" ON public.learning_plan_items;
CREATE POLICY "Users can manage own learning plan items"
  ON public.learning_plan_items FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 13. AI Usage Tracking & Token Metering Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  feature TEXT NOT NULL,
  request_date DATE DEFAULT CURRENT_DATE NOT NULL,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  request_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_date ON public.ai_usage(user_id, request_date);
CREATE INDEX IF NOT EXISTS idx_ai_usage_date ON public.ai_usage(request_date);

ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own AI usage" ON public.ai_usage;
CREATE POLICY "Users can view own AI usage"
  ON public.ai_usage FOR SELECT
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Service or users can insert AI usage" ON public.ai_usage;
CREATE POLICY "Service or users can insert AI usage"
  ON public.ai_usage FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can view all AI usage" ON public.ai_usage;
CREATE POLICY "Admins can view all AI usage"
  ON public.ai_usage FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 14. AI Feedback Table (Quality Auditing)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_id UUID,
  content_id TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own AI feedback" ON public.ai_feedback;
CREATE POLICY "Users can manage own AI feedback"
  ON public.ai_feedback FOR ALL
  USING (auth.uid()::text = user_id OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- Triggers for Updated At
-- ----------------------------------------------------------
DROP TRIGGER IF EXISTS on_learner_profile_updated ON public.learner_profiles;
CREATE TRIGGER on_learner_profile_updated
  BEFORE UPDATE ON public.learner_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_learning_mastery_updated ON public.learning_mastery;
CREATE TRIGGER on_learning_mastery_updated
  BEFORE UPDATE ON public.learning_mastery
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_learning_plans_updated ON public.learning_plans;
CREATE TRIGGER on_learning_plans_updated
  BEFORE UPDATE ON public.learning_plans
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();



