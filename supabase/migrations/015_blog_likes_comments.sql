-- Blog likes table
CREATE TABLE IF NOT EXISTS public.blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, visitor_id)
);

-- Blog comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_likes_post ON public.blog_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON public.blog_comments(post_id);

ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog likes are public" ON public.blog_likes FOR ALL USING (true);
CREATE POLICY "Blog comments are public" ON public.blog_comments FOR ALL USING (true);
