-- ==========================================================
-- NEOJLPT Master: AI-Powered Active Learning System Migration
-- Migration: 20261006_active_learning_system.sql
-- ==========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper Function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------
-- 1. Learner Active Profiles Table
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
-- 2. Multi-Dimensional Learning Mastery Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_mastery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing'
  mastery_score INTEGER DEFAULT 0 CHECK (mastery_score BETWEEN 0 AND 5), -- 0=New, 1=Introduced, 2=Learning, 3=Practicing, 4=Strong, 5=Mastered
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
-- 3. Fine-Grained Error Logs & Confusion Tracking Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_errors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  question_id TEXT,
  error_type TEXT NOT NULL, -- e.g. 'particle_confusion', 'kanji_visual_confusion', 'reading_miss', 'keigo_confusion'
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
-- 4. Active Daily Learning Plans Table (AI + Deterministic Cache)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_date DATE NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 60,
  focus JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g. ["listening", "grammar"]
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
-- 5. Learning Plan Items Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_plan_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.learning_plans(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  skill TEXT NOT NULL,
  activity TEXT NOT NULL, -- 'warm_up' | 'spaced_review' | 'concept_intro' | 'guided_explanation' | 'practice' | 'active_retrieval' | 'application' | 'mini_assessment' | 'confusion_review'
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
-- 6. AI Usage Tracking & Token Metering Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  feature TEXT NOT NULL, -- 'daily_plan' | 'explain' | 'generate_practice' | 'speaking_feedback' | 'confusion_review'
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

-- Admin view policy for all AI usage
DROP POLICY IF EXISTS "Admins can view all AI usage" ON public.ai_usage;
CREATE POLICY "Admins can view all AI usage"
  ON public.ai_usage FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 7. AI Feedback Table (Quality Auditing)
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
