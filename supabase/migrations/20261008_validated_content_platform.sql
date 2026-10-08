-- ==========================================================
-- NEOJLPT Master: Validated Content Platform & Reusable Curriculum
-- Migration: 20261008_validated_content_platform.sql
-- ==========================================================

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. Universal Content Master Catalog Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_content_items (
  id TEXT PRIMARY KEY,                       -- e.g. 'v-n5-01', 'k-n5-01', 'g-n5-001', 'r-n5-01'
  content_type TEXT NOT NULL,                 -- 'vocabulary', 'kanji', 'grammar', 'reading', 'listening', 'business', 'example_sentence'
  jlpt_level TEXT NOT NULL,                   -- 'N5', 'N4', 'N3', 'N2', 'N1'
  title TEXT NOT NULL,
  slug TEXT,
  content_source TEXT NOT NULL DEFAULT 'verified_reference'
    CHECK (content_source IN ('verified_reference', 'expert_reviewed', 'imported', 'ai_generated', 'legacy', 'fallback')),
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published', 'rejected')),
  quality_score NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
  content_version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_curr_items_type_level ON public.curriculum_content_items(content_type, jlpt_level);
CREATE INDEX IF NOT EXISTS idx_curr_items_status ON public.curriculum_content_items(quality_status);
CREATE INDEX IF NOT EXISTS idx_curr_items_source ON public.curriculum_content_items(content_source);
CREATE INDEX IF NOT EXISTS idx_curr_items_quality ON public.curriculum_content_items(quality_score DESC);

-- ----------------------------------------------------------
-- 2. Validated Reusable Example Sentences Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_example_sentences (
  id TEXT PRIMARY KEY,                       -- e.g. 'ex-n5-001', 'ex-hash-xxxx'
  japanese TEXT NOT NULL,                    -- Target Japanese sentence
  reading TEXT NOT NULL,                     -- Furigana / Hiragana reading
  translation_en TEXT NOT NULL,              -- English translation
  translations_by_lang JSONB NOT NULL DEFAULT '{}'::jsonb, -- Multilingual translations (my, ja, th, etc.)
  jlpt_level TEXT NOT NULL DEFAULT 'N5',
  difficulty INTEGER NOT NULL DEFAULT 1,     -- 1 to 5
  context TEXT,                              -- 'daily_conversation', 'school', 'work', 'travel', etc.
  register TEXT DEFAULT 'polite',            -- 'polite', 'casual', 'formal', 'humble', 'honorific'
  grammar_ids TEXT[] DEFAULT '{}',           -- e.g. ['g-n5-001']
  vocabulary_ids TEXT[] DEFAULT '{}',        -- e.g. ['v-n5-01']
  kanji_ids TEXT[] DEFAULT '{}',             -- e.g. ['k-n5-01']
  audio_url TEXT,
  content_source TEXT NOT NULL DEFAULT 'verified_reference'
    CHECK (content_source IN ('verified_reference', 'expert_reviewed', 'imported', 'ai_generated', 'legacy', 'fallback')),
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published', 'rejected')),
  quality_score NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
  content_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_curr_ex_level ON public.curriculum_example_sentences(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_curr_ex_status ON public.curriculum_example_sentences(quality_status);
CREATE INDEX IF NOT EXISTS idx_curr_ex_grammar ON public.curriculum_example_sentences USING GIN (grammar_ids);
CREATE INDEX IF NOT EXISTS idx_curr_ex_vocab ON public.curriculum_example_sentences USING GIN (vocabulary_ids);
CREATE INDEX IF NOT EXISTS idx_curr_ex_kanji ON public.curriculum_example_sentences USING GIN (kanji_ids);

-- ----------------------------------------------------------
-- 3. Validated Vocabulary Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_vocabulary (
  id TEXT PRIMARY KEY,                       -- e.g. 'v-n5-01'
  word TEXT NOT NULL,
  kanji TEXT,
  hiragana TEXT NOT NULL,
  romaji TEXT,
  meaning TEXT NOT NULL,
  meanings_by_lang JSONB NOT NULL DEFAULT '{}'::jsonb,
  part_of_speech TEXT NOT NULL DEFAULT 'Noun',
  jlpt_level TEXT NOT NULL,                  -- 'N5', 'N4', 'N3', 'N2', 'N1'
  difficulty INTEGER NOT NULL DEFAULT 1,
  common_usage TEXT,
  register TEXT DEFAULT 'neutral',
  synonyms TEXT[] DEFAULT '{}',
  antonyms TEXT[] DEFAULT '{}',
  collocations TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  unit_id TEXT,
  lesson_id TEXT,
  example_sentence_ids TEXT[] DEFAULT '{}',
  content_source TEXT NOT NULL DEFAULT 'verified_reference'
    CHECK (content_source IN ('verified_reference', 'expert_reviewed', 'imported', 'ai_generated', 'legacy', 'fallback')),
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published', 'rejected')),
  quality_score NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
  content_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_curr_vocab_level ON public.curriculum_vocabulary(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_curr_vocab_word ON public.curriculum_vocabulary(word);
CREATE INDEX IF NOT EXISTS idx_curr_vocab_status ON public.curriculum_vocabulary(quality_status);

-- ----------------------------------------------------------
-- 4. Validated Kanji Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_kanji (
  id TEXT PRIMARY KEY,                       -- e.g. 'k-n5-01'
  kanji TEXT NOT NULL UNIQUE,
  meaning TEXT NOT NULL,
  meanings_by_lang JSONB NOT NULL DEFAULT '{}'::jsonb,
  onyomi TEXT[] NOT NULL DEFAULT '{}',
  kunyomi TEXT[] NOT NULL DEFAULT '{}',
  romaji_onyomi TEXT[] DEFAULT '{}',
  romaji_kunyomi TEXT[] DEFAULT '{}',
  stroke_count INTEGER NOT NULL,
  jlpt_level TEXT NOT NULL,                  -- 'N5', 'N4', 'N3', 'N2', 'N1'
  radicals TEXT[] DEFAULT '{}',
  stroke_coordinates JSONB NOT NULL DEFAULT '[]'::jsonb,
  example_vocab JSONB NOT NULL DEFAULT '[]'::jsonb,
  similar_kanji TEXT[] DEFAULT '{}',
  confusing_kanji TEXT[] DEFAULT '{}',
  mnemonic TEXT,
  unit_id TEXT,
  example_sentence_ids TEXT[] DEFAULT '{}',
  content_source TEXT NOT NULL DEFAULT 'verified_reference'
    CHECK (content_source IN ('verified_reference', 'expert_reviewed', 'imported', 'ai_generated', 'legacy', 'fallback')),
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published', 'rejected')),
  quality_score NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
  content_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_curr_kanji_level ON public.curriculum_kanji(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_curr_kanji_char ON public.curriculum_kanji(kanji);
CREATE INDEX IF NOT EXISTS idx_curr_kanji_status ON public.curriculum_kanji(quality_status);

-- ----------------------------------------------------------
-- 5. Validated Grammar Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_grammar (
  id TEXT PRIMARY KEY,                       -- e.g. 'g-n5-001'
  pattern TEXT NOT NULL,
  meaning TEXT NOT NULL,
  meanings_by_lang JSONB NOT NULL DEFAULT '{}'::jsonb,
  structure TEXT NOT NULL,
  explanation TEXT NOT NULL,
  explanations_by_lang JSONB NOT NULL DEFAULT '{}'::jsonb,
  formal_level TEXT DEFAULT 'polite',
  register TEXT DEFAULT 'standard',
  restrictions TEXT,
  common_mistakes TEXT,
  study_tip TEXT,
  jlpt_level TEXT NOT NULL,                  -- 'N5', 'N4', 'N3', 'N2', 'N1'
  difficulty INTEGER NOT NULL DEFAULT 1,
  unit_id TEXT,
  example_sentence_ids TEXT[] DEFAULT '{}',
  similar_patterns TEXT[] DEFAULT '{}',
  confusing_patterns TEXT[] DEFAULT '{}',
  content_source TEXT NOT NULL DEFAULT 'verified_reference'
    CHECK (content_source IN ('verified_reference', 'expert_reviewed', 'imported', 'ai_generated', 'legacy', 'fallback')),
  quality_status TEXT NOT NULL DEFAULT 'published'
    CHECK (quality_status IN ('draft', 'needs_review', 'validated', 'published', 'rejected')),
  quality_score NUMERIC(5, 2) NOT NULL DEFAULT 95.0,
  content_version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_curr_grammar_level ON public.curriculum_grammar(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_curr_grammar_pattern ON public.curriculum_grammar(pattern);
CREATE INDEX IF NOT EXISTS idx_curr_grammar_status ON public.curriculum_grammar(quality_status);

-- ----------------------------------------------------------
-- 6. Content Relationship Graph Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_content_relations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id TEXT NOT NULL,
  source_type TEXT NOT NULL,                 -- 'kanji', 'vocabulary', 'grammar', 'reading', 'listening'
  target_id TEXT NOT NULL,
  target_type TEXT NOT NULL,                 -- 'kanji', 'vocabulary', 'grammar', 'example_sentence', 'question'
  relation_type TEXT NOT NULL,               -- 'uses_kanji', 'uses_vocab', 'uses_grammar', 'example_of', 'tests_concept', 'confused_with'
  confidence NUMERIC(3, 2) DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(source_id, target_id, relation_type)
);

CREATE INDEX IF NOT EXISTS idx_curr_rel_source ON public.curriculum_content_relations(source_id, source_type);
CREATE INDEX IF NOT EXISTS idx_curr_rel_target ON public.curriculum_content_relations(target_id, target_type);

-- ----------------------------------------------------------
-- 7. Content Review Queue Table (Admin Quality Gate)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_review_queue (
  id TEXT PRIMARY KEY,                       -- e.g. 'REV-001'
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  jlpt_level TEXT NOT NULL,
  title TEXT NOT NULL,
  issue_category TEXT NOT NULL,              -- 'Incorrect Grammar', 'Naturalness', 'Level Classification', 'Translation', 'Typographical'
  severity TEXT NOT NULL DEFAULT 'MEDIUM',   -- 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'
  current_payload JSONB NOT NULL,
  proposed_correction JSONB NOT NULL,
  reviewer_notes TEXT,
  quality_score NUMERIC(5, 2),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'verified')),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rev_queue_status ON public.content_review_queue(status);
CREATE INDEX IF NOT EXISTS idx_rev_queue_level ON public.content_review_queue(jlpt_level);

-- ----------------------------------------------------------
-- 8. Row Level Security Policies
-- ----------------------------------------------------------
ALTER TABLE public.curriculum_content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_example_sentences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_grammar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_content_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_review_queue ENABLE ROW LEVEL SECURITY;

-- Public can view validated/published curriculum items
DROP POLICY IF EXISTS "Public can view validated and published items" ON public.curriculum_content_items;
CREATE POLICY "Public can view validated and published items"
  ON public.curriculum_content_items FOR SELECT
  USING (quality_status IN ('validated', 'published'));

DROP POLICY IF EXISTS "Public can view validated and published sentences" ON public.curriculum_example_sentences;
CREATE POLICY "Public can view validated and published sentences"
  ON public.curriculum_example_sentences FOR SELECT
  USING (quality_status IN ('validated', 'published'));

DROP POLICY IF EXISTS "Public can view validated and published vocab" ON public.curriculum_vocabulary;
CREATE POLICY "Public can view validated and published vocab"
  ON public.curriculum_vocabulary FOR SELECT
  USING (quality_status IN ('validated', 'published'));

DROP POLICY IF EXISTS "Public can view validated and published kanji" ON public.curriculum_kanji;
CREATE POLICY "Public can view validated and published kanji"
  ON public.curriculum_kanji FOR SELECT
  USING (quality_status IN ('validated', 'published'));

DROP POLICY IF EXISTS "Public can view validated and published grammar" ON public.curriculum_grammar;
CREATE POLICY "Public can view validated and published grammar"
  ON public.curriculum_grammar FOR SELECT
  USING (quality_status IN ('validated', 'published'));

DROP POLICY IF EXISTS "Public can view content relations" ON public.curriculum_content_relations;
CREATE POLICY "Public can view content relations"
  ON public.curriculum_content_relations FOR SELECT
  USING (true);

-- Admins and Service can manage all content
DROP POLICY IF EXISTS "Admins can manage content items" ON public.curriculum_content_items;
CREATE POLICY "Admins can manage content items"
  ON public.curriculum_content_items FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage example sentences" ON public.curriculum_example_sentences;
CREATE POLICY "Admins can manage example sentences"
  ON public.curriculum_example_sentences FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage vocabulary" ON public.curriculum_vocabulary;
CREATE POLICY "Admins can manage vocabulary"
  ON public.curriculum_vocabulary FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage kanji" ON public.curriculum_kanji;
CREATE POLICY "Admins can manage kanji"
  ON public.curriculum_kanji FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage grammar" ON public.curriculum_grammar;
CREATE POLICY "Admins can manage grammar"
  ON public.curriculum_grammar FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage relations" ON public.curriculum_content_relations;
CREATE POLICY "Admins can manage relations"
  ON public.curriculum_content_relations FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Admins can manage review queue" ON public.content_review_queue;
CREATE POLICY "Admins can manage review queue"
  ON public.content_review_queue FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- ----------------------------------------------------------
-- 9. Updated At Triggers
-- ----------------------------------------------------------
DROP TRIGGER IF EXISTS on_curriculum_items_updated ON public.curriculum_content_items;
CREATE TRIGGER on_curriculum_items_updated
  BEFORE UPDATE ON public.curriculum_content_items
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_curriculum_sentences_updated ON public.curriculum_example_sentences;
CREATE TRIGGER on_curriculum_sentences_updated
  BEFORE UPDATE ON public.curriculum_example_sentences
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_curriculum_vocab_updated ON public.curriculum_vocabulary;
CREATE TRIGGER on_curriculum_vocab_updated
  BEFORE UPDATE ON public.curriculum_vocabulary
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_curriculum_kanji_updated ON public.curriculum_kanji;
CREATE TRIGGER on_curriculum_kanji_updated
  BEFORE UPDATE ON public.curriculum_kanji
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_curriculum_grammar_updated ON public.curriculum_grammar;
CREATE TRIGGER on_curriculum_grammar_updated
  BEFORE UPDATE ON public.curriculum_grammar
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_review_queue_updated ON public.content_review_queue;
CREATE TRIGGER on_review_queue_updated
  BEFORE UPDATE ON public.content_review_queue
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
