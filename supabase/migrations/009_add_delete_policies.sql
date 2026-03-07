-- ============================================
-- Add missing DELETE RLS policies
-- The initial migrations did not include DELETE policies,
-- causing all deletions to be silently blocked by RLS.
-- ============================================

-- Projects: allow service_role to delete
CREATE POLICY "Only admins can delete projects"
  ON public.projects FOR DELETE
  USING (auth.role() = 'service_role');
