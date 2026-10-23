-- ==============================================================================
-- Migration: Speaking Practice - Yuki Intelligent Coach Sessions & Saved Notes
-- Description: Supports session history, feedback records, and saved learning notes
-- ==============================================================================

-- 1. Speaking Sessions Table
CREATE TABLE IF NOT EXISTS public.speaking_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'learning_mode', -- 'natural_conversation', 'learning_mode', 'professional_speaking'
  level TEXT NOT NULL DEFAULT 'N5',
  learning_language TEXT NOT NULL DEFAULT 'ja',
  explanation_language TEXT NOT NULL DEFAULT 'my',
  turn_count INTEGER NOT NULL DEFAULT 1,
  feedbacks JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Speaking Saved Items (Vocabulary, Grammar & Natural Expressions)
CREATE TABLE IF NOT EXISTS public.speaking_saved_items (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'vocabulary', 'grammar', 'expression'
  original TEXT NOT NULL,
  enhanced TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example TEXT,
  register TEXT, -- 'casual', 'neutral', 'formal', 'professional'
  explanation TEXT,
  level TEXT NOT NULL DEFAULT 'N5',
  known BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.speaking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_saved_items ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_speaking_sessions_user_id ON public.speaking_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_speaking_sessions_created_at ON public.speaking_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_speaking_saved_items_user_id ON public.speaking_saved_items (user_id);
CREATE INDEX IF NOT EXISTS idx_speaking_saved_items_type ON public.speaking_saved_items (type);

-- RLS Policies for speaking_sessions
DROP POLICY IF EXISTS "Users can view own speaking sessions" ON public.speaking_sessions;
CREATE POLICY "Users can view own speaking sessions"
  ON public.speaking_sessions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own speaking sessions" ON public.speaking_sessions;
CREATE POLICY "Users can insert own speaking sessions"
  ON public.speaking_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own speaking sessions" ON public.speaking_sessions;
CREATE POLICY "Users can update own speaking sessions"
  ON public.speaking_sessions FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own speaking sessions" ON public.speaking_sessions;
CREATE POLICY "Users can delete own speaking sessions"
  ON public.speaking_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for speaking_saved_items
DROP POLICY IF EXISTS "Users can view own saved speaking items" ON public.speaking_saved_items;
CREATE POLICY "Users can view own saved speaking items"
  ON public.speaking_saved_items FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own saved speaking items" ON public.speaking_saved_items;
CREATE POLICY "Users can insert own saved speaking items"
  ON public.speaking_saved_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own saved speaking items" ON public.speaking_saved_items;
CREATE POLICY "Users can update own saved speaking items"
  ON public.speaking_saved_items FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own saved speaking items" ON public.speaking_saved_items;
CREATE POLICY "Users can delete own saved speaking items"
  ON public.speaking_saved_items FOR DELETE
  USING (auth.uid() = user_id);
