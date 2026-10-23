-- ==============================================================================
-- Migration: Complete University-Grade Reading Curriculum Platform (N5–N1)
-- Description: Core 50-exercise library storage, translations, reviews, and learner progress tracking
-- ==============================================================================

-- 1. Reading Exercises Table
CREATE TABLE IF NOT EXISTS public.reading_exercises (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_my TEXT,
  level TEXT NOT NULL, -- 'N5', 'N4', 'N3', 'N2', 'N1'
  topic TEXT NOT NULL, -- 'daily_life', 'school', 'culture', 'food', 'travel', 'work', 'technology', 'community', 'environment', 'news'
  subtopic TEXT,
  learning_objectives JSONB DEFAULT '[]'::jsonb,
  learning_objectives_my JSONB DEFAULT '[]'::jsonb,
  difficulty_rating INTEGER DEFAULT 1,
  estimated_reading_time_minutes INTEGER DEFAULT 3,
  length TEXT NOT NULL DEFAULT 'medium', -- 'short', 'medium', 'long'
  passage TEXT NOT NULL, -- with ruby annotations [漢字]{かんじ}
  passage_plain TEXT NOT NULL,
  translation_en TEXT NOT NULL,
  translation_my TEXT,
  vocabulary_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  grammar_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  audio_script TEXT,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  review_status TEXT NOT NULL DEFAULT 'published', -- 'published', 'approved', 'review_required', 'draft'
  content_version TEXT NOT NULL DEFAULT '1.0',
  source_type TEXT NOT NULL DEFAULT 'curated_university', -- 'curated_university', 'ai_generated', 'official_sample'
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Reading User Progress & Practice Analytics Table
CREATE TABLE IF NOT EXISTS public.reading_user_progress (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  level TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0, -- percentage 0-100
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers_count INTEGER NOT NULL DEFAULT 0,
  user_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_reading_exercises_level ON public.reading_exercises (level);
CREATE INDEX IF NOT EXISTS idx_reading_exercises_topic ON public.reading_exercises (topic);
CREATE INDEX IF NOT EXISTS idx_reading_exercises_review_status ON public.reading_exercises (review_status);
CREATE INDEX IF NOT EXISTS idx_reading_user_progress_user_id ON public.reading_user_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_reading_user_progress_exercise_id ON public.reading_user_progress (exercise_id);
CREATE INDEX IF NOT EXISTS idx_reading_user_progress_level ON public.reading_user_progress (level);

-- Enable RLS
ALTER TABLE public.reading_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_user_progress ENABLE ROW LEVEL SECURITY;

-- RLS for reading_exercises: Published exercises are viewable by all users
DROP POLICY IF EXISTS "Anyone can view published reading exercises" ON public.reading_exercises;
CREATE POLICY "Anyone can view published reading exercises"
  ON public.reading_exercises FOR SELECT
  USING (review_status IN ('published', 'approved', 'review_required'));

DROP POLICY IF EXISTS "Admins can insert and modify reading exercises" ON public.reading_exercises;
CREATE POLICY "Admins can insert and modify reading exercises"
  ON public.reading_exercises FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'admin' OR profiles.account_type = 'ADMIN')
    )
  );

-- RLS for reading_user_progress: Users manage their own progress records
DROP POLICY IF EXISTS "Users can view own reading progress" ON public.reading_user_progress;
CREATE POLICY "Users can view own reading progress"
  ON public.reading_user_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reading progress" ON public.reading_user_progress;
CREATE POLICY "Users can insert own reading progress"
  ON public.reading_user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reading progress" ON public.reading_user_progress;
CREATE POLICY "Users can update own reading progress"
  ON public.reading_user_progress FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reading progress" ON public.reading_user_progress;
CREATE POLICY "Users can delete own reading progress"
  ON public.reading_user_progress FOR DELETE
  USING (auth.uid() = user_id);
