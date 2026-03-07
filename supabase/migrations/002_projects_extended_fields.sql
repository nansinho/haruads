-- ============================================
-- Migration: Extend projects table with detail fields
-- + Create tags table for reusable tags
-- ============================================

-- Add new columns to projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS results JSONB DEFAULT '[]';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published'));
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS external_url TEXT;

-- Index for public listing
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status, sort_order) WHERE status = 'published';

-- ============================================
-- Table: tags (reusable tags across projects)
-- ============================================
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Public read
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Tags are viewable by everyone' AND tablename = 'tags') THEN
    CREATE POLICY "Tags are viewable by everyone"
      ON public.tags FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can insert tags' AND tablename = 'tags') THEN
    CREATE POLICY "Only admins can insert tags"
      ON public.tags FOR INSERT
      WITH CHECK (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can delete tags' AND tablename = 'tags') THEN
    CREATE POLICY "Only admins can delete tags"
      ON public.tags FOR DELETE
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Index
CREATE INDEX IF NOT EXISTS idx_tags_name ON public.tags (name);
