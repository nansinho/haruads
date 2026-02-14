-- ============================================
-- Migration 007: Marketing & Configuration
-- Newsletter, Prix Dynamiques, Settings, Sécurité
-- ============================================

-- ---- NEWSLETTER ----
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers(status);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Newsletter management" ON public.newsletter_subscribers FOR ALL USING (true);

-- ---- NEWSLETTER CAMPAIGNS ----
CREATE TABLE IF NOT EXISTS public.newsletter_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent')),
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage campaigns" ON public.newsletter_campaigns FOR ALL USING (true);

-- ---- PRIX DYNAMIQUES ----
CREATE TABLE IF NOT EXISTS public.dynamic_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id),
  offer_id UUID REFERENCES public.offers(id),
  name TEXT NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  conditions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.dynamic_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing is public" ON public.dynamic_pricing FOR SELECT USING (true);
CREATE POLICY "Admins manage pricing" ON public.dynamic_pricing FOR ALL USING (true);

-- ---- PARAMÈTRES SITE ----
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json', 'image')),
  category TEXT DEFAULT 'general',
  label TEXT,
  description TEXT,
  updated_by UUID REFERENCES public.users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings readable" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL USING (true);

-- Default settings
INSERT INTO public.site_settings (key, value, type, category, label) VALUES
  ('site_name', 'Agence HDS', 'string', 'general', 'Nom du site'),
  ('site_description', 'Agence web créative', 'string', 'general', 'Description'),
  ('contact_email', 'contact@agencehds.fr', 'string', 'contact', 'Email de contact'),
  ('contact_phone', '', 'string', 'contact', 'Téléphone'),
  ('contact_address', '', 'string', 'contact', 'Adresse'),
  ('social_instagram', '', 'string', 'social', 'Instagram'),
  ('social_linkedin', '', 'string', 'social', 'LinkedIn'),
  ('social_twitter', '', 'string', 'social', 'Twitter/X'),
  ('maintenance_mode', 'false', 'boolean', 'system', 'Mode maintenance'),
  ('analytics_id', '', 'string', 'system', 'Google Analytics ID')
ON CONFLICT (key) DO NOTHING;

-- ---- LOGS SÉCURITÉ ----
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_logs_user ON public.security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_action ON public.security_logs(action);
CREATE INDEX IF NOT EXISTS idx_security_logs_date ON public.security_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_logs_severity ON public.security_logs(severity);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read logs" ON public.security_logs FOR SELECT USING (true);
CREATE POLICY "System can insert logs" ON public.security_logs FOR INSERT WITH CHECK (true);

-- ---- ACTIVITÉ (Dashboard stats) ----
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON public.page_views(created_at DESC);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read views" ON public.page_views FOR SELECT USING (true);

-- Vue analytique pour le dashboard
CREATE OR REPLACE VIEW public.dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.users WHERE role = 'client') as total_clients,
  (SELECT COUNT(*) FROM public.quote_requests WHERE status = 'new') as new_quotes,
  (SELECT COUNT(*) FROM public.tickets WHERE status IN ('open', 'in_progress')) as active_tickets,
  (SELECT COUNT(*) FROM public.blog_posts WHERE status = 'published') as published_articles,
  (SELECT COUNT(*) FROM public.newsletter_subscribers WHERE status = 'active') as newsletter_subs,
  (SELECT COUNT(*) FROM public.contact_messages WHERE status = 'unread') as unread_messages,
  (SELECT COUNT(*) FROM public.projects) as total_projects,
  (SELECT COALESCE(SUM(paid_amount), 0) FROM public.client_projects) as total_revenue,
  (SELECT COUNT(*) FROM public.invoices WHERE status = 'overdue') as overdue_invoices,
  (SELECT COUNT(*) FROM public.page_views WHERE created_at > now() - interval '30 days') as views_30d;

-- Triggers
CREATE TRIGGER trigger_pricing_updated_at BEFORE UPDATE ON public.dynamic_pricing FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();
