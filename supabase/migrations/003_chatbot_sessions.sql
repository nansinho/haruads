-- ============================================
-- Table: chatbot_sessions (Analytics)
-- Suivi des parcours utilisateurs dans le chatbot
-- À exécuter manuellement dans Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS public.chatbot_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  node_id TEXT NOT NULL REFERENCES public.chatbot_nodes(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les requêtes analytics
CREATE INDEX idx_chatbot_sessions_session ON public.chatbot_sessions (session_id);
CREATE INDEX idx_chatbot_sessions_node ON public.chatbot_sessions (node_id);
CREATE INDEX idx_chatbot_sessions_date ON public.chatbot_sessions (created_at);

-- RLS
ALTER TABLE public.chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- Insertion publique (les visiteurs peuvent créer des sessions)
CREATE POLICY "Anyone can insert chatbot sessions"
  ON public.chatbot_sessions FOR INSERT
  WITH CHECK (true);

-- Lecture réservée aux admins
CREATE POLICY "Only admins can read chatbot sessions"
  ON public.chatbot_sessions FOR SELECT
  USING (auth.role() = 'service_role');

-- ============================================
-- Vue analytics : résumé par nœud
-- ============================================

CREATE OR REPLACE VIEW public.chatbot_analytics AS
SELECT
  node_id,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_sessions,
  MIN(created_at) as first_visit,
  MAX(created_at) as last_visit
FROM public.chatbot_sessions
GROUP BY node_id
ORDER BY total_visits DESC;
