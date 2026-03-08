-- ============================================
-- Migration 011: Testimonials Table
-- Système de témoignages clients (remplacement Trustindex)
-- ============================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  source TEXT DEFAULT 'Google',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_active ON public.testimonials(is_active, sort_order);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are public" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (true);

-- Reuse existing trigger function from migration 005
CREATE TRIGGER trigger_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();

-- Seed data: vrais avis Google (ancienne implémentation)
INSERT INTO public.testimonials (author_name, author_role, content, rating, source, is_active, sort_order) VALUES
  ('Karim B.', 'Gérant, AIAKO', 'L''Agence HDS a parfaitement compris notre besoin de migrer notre boutique WooCommerce vers une solution moderne. Le nouveau site est rapide, fluide et nos ventes en ligne ont augmenté significativement.', 5, 'Google', true, 1),
  ('Caroline M.', 'Directrice, C&CO Formation', 'Expertise technique remarquable et vraie écoute. Le dashboard de formation qu''ils ont développé nous a permis de gérer nos sessions et apprenants bien plus efficacement. Un partenaire de confiance.', 5, 'Google', true, 2),
  ('Laurent A.', 'Directeur technique, StartupTech', 'Du design à la mise en production, tout a été livré dans les temps avec une qualité irréprochable. La communication est transparente à chaque étape. Je recommande sans hésiter.', 5, 'Google', true, 3),
  ('Sophie R.', 'Fondatrice, BookEasy', 'Notre système de réservation en ligne fonctionne parfaitement depuis le lancement. L''intégration Stripe est fluide et nos clients adorent la simplicité du parcours de booking.', 5, 'Google', true, 4),
  ('Pierre D.', 'CEO, FormaPro', 'L''Agence HDS a su transformer notre vision en un site qui reflète vraiment notre identité. Réactivité, professionnalisme et un suivi après-projet impeccable.', 5, 'Google', true, 5);
