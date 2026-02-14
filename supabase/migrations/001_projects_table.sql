-- ============================================
-- Table: projects (Hero Carousel + Projets)
-- À exécuter manuellement dans Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  client TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  hero_visible BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_projects_hero ON public.projects (hero_visible, sort_order) WHERE hero_visible = true;
CREATE INDEX idx_projects_featured ON public.projects (featured, sort_order) WHERE featured = true;
CREATE INDEX idx_projects_slug ON public.projects (slug);

-- RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

-- Écriture réservée aux admins (service_role)
CREATE POLICY "Only admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only admins can update projects"
  ON public.projects FOR UPDATE
  USING (auth.role() = 'service_role');

-- Données initiales
INSERT INTO public.projects (title, slug, description, image_url, tags, client, year, featured, hero_visible, sort_order) VALUES
  ('AIAKO E-Commerce', 'aiako-ecommerce', 'Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.', '/images/projects/project-dashboard.jpg', ARRAY['Next.js', 'Supabase', 'E-Commerce'], 'AIAKO', 2024, true, true, 1),
  ('Dashboard C&CO', 'dashboard-cco', 'Plateforme SaaS de formation multi-tenant.', '/images/projects/neuralia-project.webp', ARRAY['React', 'Node.js'], 'C&CO', 2024, true, true, 2),
  ('Landing Fintech', 'landing-fintech', 'Refonte UI/UX et design system complet.', '/images/projects/project-landing.jpg', ARRAY['Figma', 'GSAP'], NULL, 2023, true, true, 3),
  ('Système de Réservation', 'systeme-reservation', 'Calendrier de booking avec paiement intégré.', '/images/projects/reservation-system.webp', ARRAY['Next.js', 'Stripe'], NULL, 2024, true, false, 4);

-- Fonction pour auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
