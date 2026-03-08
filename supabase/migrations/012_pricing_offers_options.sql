-- ============================================
-- Migration 012: Pricing Offers & Options System
-- Categories, Tiers, Detailed Options
-- ============================================

-- ---- CATÉGORIES D'OFFRES (types de services) ----
CREATE TABLE IF NOT EXISTS public.offer_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- nom d'icône Lucide (ex: Globe, Code, ShoppingCart)
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.offer_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Offer categories are public" ON public.offer_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage offer categories" ON public.offer_categories
  FOR ALL USING (true);

-- ---- AJOUT COLONNES SUR OFFERS ----
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.offer_categories(id);
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'business';

-- ---- OPTIONS D'OFFRES (détails pour le popup) ----
CREATE TABLE IF NOT EXISTS public.offer_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'technologies', 'fonctionnalites', 'design', 'performance', 'seo', 'support'
  icon TEXT, -- icône Lucide pour la catégorie
  name TEXT NOT NULL,
  description TEXT,
  is_included BOOLEAN DEFAULT true, -- inclus par défaut dans l'offre
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_offer_options_offer ON public.offer_options(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_options_category ON public.offer_options(offer_id, category);

ALTER TABLE public.offer_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Offer options are public" ON public.offer_options
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage offer options" ON public.offer_options
  FOR ALL USING (true);
