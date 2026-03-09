-- Add SEA and AEO columns to blog_posts table
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS sea_keywords TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS aeo_answer TEXT;
