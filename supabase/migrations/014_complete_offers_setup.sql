-- ============================================
-- MIGRATION COMPLETE : Pricing, Offres & Options
-- A coller dans Supabase SQL Editor -> Run
-- ============================================
-- ZERO UUID code en dur = zero erreur possible.
-- ============================================

CREATE TABLE IF NOT EXISTS public.offer_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.offer_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Offer categories are public" ON public.offer_categories;
CREATE POLICY "Offer categories are public" ON public.offer_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage offer categories" ON public.offer_categories;
CREATE POLICY "Admins can manage offer categories" ON public.offer_categories FOR ALL USING (true);

ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.offer_categories(id);
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'business';

CREATE TABLE IF NOT EXISTS public.offer_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  icon TEXT,
  name TEXT NOT NULL,
  description TEXT,
  is_included BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_offer_options_offer ON public.offer_options(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_options_category ON public.offer_options(offer_id, category);

ALTER TABLE public.offer_options ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Offer options are public" ON public.offer_options;
CREATE POLICY "Offer options are public" ON public.offer_options FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage offer options" ON public.offer_options;
CREATE POLICY "Admins can manage offer options" ON public.offer_options FOR ALL USING (true);

DO $$
DECLARE
  cat_vitrine UUID; cat_ecommerce UUID; cat_webapp UUID;
  cat_saas UUID; cat_ia UUID; cat_branding UUID;
  off_vitrine_ess UUID;
  off_vitrine_bus UUID;
  off_vitrine_pre UUID;
  off_ecommerce_ess UUID;
  off_ecommerce_bus UUID;
  off_ecommerce_pre UUID;
  off_webapp_ess UUID;
  off_webapp_bus UUID;
  off_webapp_pre UUID;
  off_saas_ess UUID;
  off_saas_bus UUID;
  off_saas_pre UUID;
  off_ia_ess UUID;
  off_ia_bus UUID;
  off_ia_pre UUID;
  off_branding_ess UUID;
  off_branding_bus UUID;
  off_branding_pre UUID;
BEGIN

-- Cleanup
DELETE FROM public.offer_options;
DELETE FROM public.offers WHERE category_id IS NOT NULL;
DELETE FROM public.offer_categories;

-- ============ CATEGORIES ============
INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('Site Vitrine', 'site-vitrine', 'Sites vitrines modernes, responsive et performants pour presenter votre activite en ligne.', 'Globe', 1)
  RETURNING id INTO cat_vitrine;

INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('E-Commerce', 'e-commerce', 'Boutiques en ligne sur mesure avec paiement securise et gestion de catalogue.', 'ShoppingCart', 2)
  RETURNING id INTO cat_ecommerce;

INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('Application Web', 'application-web', 'Applications web complexes, dashboards et outils metier sur mesure.', 'Code', 3)
  RETURNING id INTO cat_webapp;

INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('Solution SaaS', 'solution-saas', 'Plateformes SaaS multi-tenant, scalables et securisees.', 'Cloud', 4)
  RETURNING id INTO cat_saas;

INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('Intelligence Artificielle', 'intelligence-artificielle', 'Chatbots IA, automatisation et integration de modeles de langage.', 'Brain', 5)
  RETURNING id INTO cat_ia;

INSERT INTO public.offer_categories (name, slug, description, icon, sort_order)
  VALUES ('Branding & SEO', 'branding-seo', 'Identite visuelle forte et referencement naturel pour une visibilite maximale.', 'Palette', 6)
  RETURNING id INTO cat_branding;

-- ============ OFFRES ============
INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Site Vitrine Essentiel'', ''site-vitrine-essentiel'', ''Un site one-page moderne et responsive pour presenter votre activite avec un design soigne.'', 0, ''custom'', ARRAY[''Site one-page responsive'',''Design moderne sur mesure'',''Formulaire de contact'',''Integration reseaux sociaux'',''Optimisation mobile'',''Hebergement offert 1 an'',''Certificat SSL inclus'',''Livraison sous 2 semaines''], false, true, 1, cat_vitrine, ''essentiel'')
  RETURNING id INTO off_vitrine_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Site Vitrine Business'', ''site-vitrine-business'', ''Site multi-pages complet avec blog integre, CMS headless et optimisations SEO avancees.'', 0, ''custom'', ARRAY[''Site multi-pages (5 a 10 pages)'',''Animations et transitions fluides'',''Blog integre avec CMS'',''SEO on-page complet'',''CMS headless (edition facile)'',''Formulaires avances'',''Google Analytics integre'',''Support 3 mois inclus''], true, true, 2, cat_vitrine, ''business'')
  RETURNING id INTO off_vitrine_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Site Vitrine Premium'', ''site-vitrine-premium'', ''Site sur mesure sans limite de pages, avec animations avancees, multilingue et espace client.'', 0, ''custom'', ARRAY[''Pages illimitees'',''Animations avancees (Framer Motion)'',''Site multilingue (2+ langues)'',''Espace client securise'',''Integration API tierces'',''Audit UX complet'',''Design system dedie'',''Performance A+ (Core Web Vitals)'',''Support prioritaire 12 mois''], false, true, 3, cat_vitrine, ''premium'')
  RETURNING id INTO off_vitrine_pre;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''E-Commerce Essentiel'', ''e-commerce-essentiel'', ''Boutique en ligne cle en main jusqu''''a 50 produits avec paiement Stripe securise.'', 0, ''custom'', ARRAY[''Jusqu''''a 50 produits'',''Paiement securise Stripe'',''Design responsive sur mesure'',''Gestion de stock basique'',''Pages produits optimisees'',''Panier et checkout fluide'',''Emails de confirmation'',''Livraison sous 3 semaines''], false, true, 4, cat_ecommerce, ''essentiel'')
  RETURNING id INTO off_ecommerce_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''E-Commerce Business'', ''e-commerce-business'', ''Boutique complete jusqu''''a 500 produits avec filtres avances, multi-paiement et analytics.'', 0, ''custom'', ARRAY[''Jusqu''''a 500 produits'',''Multi-paiement (Stripe + Monetico)'',''Filtres et recherche avances'',''Emails transactionnels automatises'',''Dashboard analytics vendeur'',''Gestion des avis clients'',''Codes promo et reductions'',''Suivi de commandes temps reel'',''Support 6 mois inclus''], true, true, 5, cat_ecommerce, ''business'')
  RETURNING id INTO off_ecommerce_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''E-Commerce Premium'', ''e-commerce-premium'', ''Solution e-commerce illimitee avec marketplace multi-vendeurs, abonnements et IA.'', 0, ''custom'', ARRAY[''Produits illimites'',''Marketplace multi-vendeurs'',''Systeme d''''abonnements'',''Programme de fidelite'',''Recommandations IA'',''Multi-devises et multi-langues'',''API publique pour integrations'',''Reporting avance et exports'',''Support prioritaire 12 mois''], false, true, 6, cat_ecommerce, ''premium'')
  RETURNING id INTO off_ecommerce_pre;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Application Web Essentiel'', ''application-web-essentiel'', ''Application web simple avec authentification, dashboard basique et deploiement cloud.'', 0, ''custom'', ARRAY[''Application web responsive'',''Authentification securisee'',''Dashboard utilisateur basique'',''Base de donnees PostgreSQL'',''Deploiement cloud (Vercel)'',''Interface d''''administration'',''API REST basique'',''Livraison sous 4 semaines''], false, true, 7, cat_webapp, ''essentiel'')
  RETURNING id INTO off_webapp_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Application Web Business'', ''application-web-business'', ''Application complexe avec gestion de roles, API REST complete et notifications temps reel.'', 0, ''custom'', ARRAY[''Gestion de roles et permissions'',''API REST complete et documentee'',''Tableau de bord avance avec graphiques'',''Notifications temps reel'',''Gestion de fichiers et uploads'',''Systeme de recherche avance'',''Exports PDF/CSV'',''Tests automatises'',''Support 6 mois inclus''], true, true, 8, cat_webapp, ''business'')
  RETURNING id INTO off_webapp_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Application Web Premium'', ''application-web-premium'', ''Application sur mesure avec architecture microservices, WebSocket et monitoring avance.'', 0, ''custom'', ARRAY[''Architecture microservices'',''API GraphQL + REST'',''Temps reel WebSocket'',''CI/CD pipeline complet'',''Monitoring et alertes'',''Scalabilite automatique'',''Tests E2E complets'',''Documentation technique'',''Support prioritaire 12 mois''], false, true, 9, cat_webapp, ''premium'')
  RETURNING id INTO off_webapp_pre;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''SaaS Essentiel'', ''saas-essentiel'', ''MVP SaaS avec authentification, facturation et dashboard admin. Ideal pour valider votre idee.'', 0, ''custom'', ARRAY[''MVP fonctionnel'',''Authentification complete'',''Facturation Stripe integree'',''Dashboard admin'',''1 role utilisateur'',''Base PostgreSQL'',''Landing page incluse'',''Livraison sous 6 semaines''], false, true, 10, cat_saas, ''essentiel'')
  RETURNING id INTO off_saas_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''SaaS Business'', ''saas-business'', ''SaaS multi-tenant complet avec gestion d''''abonnements, analytics et API publique.'', 0, ''custom'', ARRAY[''Architecture multi-tenant'',''Gestion d''''abonnements Stripe'',''3+ roles utilisateurs'',''Analytics et metriques'',''Webhooks configurables'',''API publique documentee'',''Onboarding utilisateur guide'',''Emails transactionnels'',''Support 6 mois inclus''], true, true, 11, cat_saas, ''business'')
  RETURNING id INTO off_saas_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''SaaS Premium'', ''saas-premium'', ''SaaS enterprise avec white-label, SSO/SAML, audit logs et SLA garanti.'', 0, ''custom'', ARRAY[''White-label personnalisable'',''SSO / SAML / OAuth2'',''Audit logs complets'',''SLA garanti 99.9%'',''Scalabilite automatique'',''Backups automatiques'',''Support dedie multi-canal'',''Migration de donnees assistee'',''Support prioritaire 12 mois''], false, true, 12, cat_saas, ''premium'')
  RETURNING id INTO off_saas_pre;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''IA Essentiel'', ''ia-essentiel'', ''Chatbot IA basique integre a votre site web avec FAQ automatisee et reponses configurables.'', 0, ''custom'', ARRAY[''Chatbot IA integre au site'',''FAQ automatisee'',''Reponses pre-configurees'',''Widget personnalisable'',''Historique des conversations'',''Interface d''''administration'',''Integration simple (widget JS)'',''Livraison sous 2 semaines''], false, true, 13, cat_ia, ''essentiel'')
  RETURNING id INTO off_ia_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''IA Business'', ''ia-business'', ''Chatbot IA avance avec connexion CRM, analyse de sentiment et generation de contenu.'', 0, ''custom'', ARRAY[''Chatbot IA avance (GPT/Claude)'',''Connexion CRM et outils metier'',''Analyse de sentiment'',''Generation de contenu IA'',''Multi-canal (site, WhatsApp, email)'',''Escalade vers agent humain'',''Tableau de bord analytics'',''Formation et personnalisation'',''Support 6 mois inclus''], true, true, 14, cat_ia, ''business'')
  RETURNING id INTO off_ia_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''IA Premium'', ''ia-premium'', ''Solution IA sur mesure avec fine-tuning, RAG sur vos documents et automatisation workflow.'', 0, ''custom'', ARRAY[''Solution IA sur mesure'',''Fine-tuning de modele dedie'',''RAG (Retrieval Augmented Generation)'',''Automatisation de workflows'',''Analytics IA avances'',''Integration multi-sources'',''API IA dediee'',''Audit et optimisation continue'',''Support prioritaire 12 mois''], false, true, 15, cat_ia, ''premium'')
  RETURNING id INTO off_ia_pre;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Branding & SEO Essentiel'', ''branding-seo-essentiel'', ''Logo, charte graphique basique et audit SEO avec optimisation de 5 pages cles.'', 0, ''custom'', ARRAY[''Creation de logo professionnel'',''Charte graphique basique'',''Audit SEO technique'',''Optimisation de 5 pages'',''Google Business Profile'',''Fichier sitemap.xml'',''Meta tags optimises'',''Rapport de recommandations''], false, true, 16, cat_branding, ''essentiel'')
  RETURNING id INTO off_branding_ess;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Branding & SEO Business'', ''branding-seo-business'', ''Identite visuelle complete, strategie SEO 3 mois avec creation de contenu et reporting.'', 0, ''custom'', ARRAY[''Identite visuelle complete'',''Strategie SEO 3 mois'',''Creation de contenu mensuel (4 articles)'',''Strategie de backlinks'',''Reporting mensuel detaille'',''Google Analytics + Search Console'',''Optimisation technique continue'',''Supports print (cartes de visite, flyers)'',''Support 3 mois inclus''], true, true, 17, cat_branding, ''business'')
  RETURNING id INTO off_branding_bus;

INSERT INTO public.offers (name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier)
  VALUES (''Branding & SEO Premium'', ''branding-seo-premium'', ''Branding complet, strategie SEO 12 mois, content marketing et gestion des reseaux sociaux.'', 0, ''custom'', ARRAY[''Branding complet et book de marque'',''Strategie SEO 12 mois'',''Content marketing (8 articles/mois)'',''Gestion reseaux sociaux'',''Campagnes publicitaires (Google Ads)'',''Video de presentation'',''Strategie d''''influence locale'',''Audit de reputation en ligne'',''Support prioritaire 12 mois''], false, true, 18, cat_branding, ''premium'')
  RETURNING id INTO off_branding_pre;


-- ============ OPTIONS ============

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_vitrine_ess, ''technologies'', ''Code'', ''Next.js / React'', ''Framework moderne pour des performances optimales'', true, 1),
  (off_vitrine_ess, ''technologies'', ''Code'', ''Tailwind CSS'', ''Framework CSS utility-first pour un design sur mesure'', true, 2),
  (off_vitrine_ess, ''technologies'', ''Code'', ''TypeScript'', ''Typage statique pour un code robuste et maintenable'', true, 3),
  (off_vitrine_ess, ''technologies'', ''Code'', ''WordPress'', ''CMS traditionnel avec theme sur mesure'', false, 4),
  (off_vitrine_ess, ''technologies'', ''Code'', ''Framer Motion'', ''Animations fluides et interactions modernes'', false, 5),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Formulaire de contact'', ''Formulaire avec validation et envoi par email'', true, 1),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Integration reseaux sociaux'', ''Liens et feeds vers vos profils sociaux'', true, 2),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Google Maps integre'', ''Carte interactive avec votre localisation'', true, 3),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Blog'', ''Section blog avec gestion de contenu'', false, 4),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Chat en direct'', ''Widget de chat pour communiquer avec vos visiteurs'', false, 5),
  (off_vitrine_ess, ''fonctionnalites'', ''Layers'', ''Newsletter'', ''Inscription newsletter avec envoi automatise'', false, 6),
  (off_vitrine_ess, ''design'', ''Palette'', ''Design responsive'', ''Adapte mobile, tablette et desktop'', true, 1),
  (off_vitrine_ess, ''design'', ''Palette'', ''Maquette Figma'', ''1 maquette Figma avant developpement'', true, 2),
  (off_vitrine_ess, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre en complement du theme clair'', false, 3),
  (off_vitrine_ess, ''design'', ''Palette'', ''Animations avancees'', ''Micro-interactions et transitions elaborees'', false, 4),
  (off_vitrine_ess, ''performance'', ''Zap'', ''Optimisation images (WebP)'', ''Compression et format moderne des images'', true, 1),
  (off_vitrine_ess, ''performance'', ''Zap'', ''SSL / HTTPS'', ''Certificat de securite inclus'', true, 2),
  (off_vitrine_ess, ''performance'', ''Zap'', ''CDN mondial'', ''Distribution globale pour des temps de chargement rapides'', false, 3),
  (off_vitrine_ess, ''performance'', ''Zap'', ''Lazy loading'', ''Chargement differe des images et composants'', false, 4),
  (off_vitrine_ess, ''seo'', ''Search'', ''Meta tags optimises'', ''Title, description et Open Graph configures'', true, 1),
  (off_vitrine_ess, ''seo'', ''Search'', ''Sitemap XML'', ''Plan du site pour les moteurs de recherche'', true, 2),
  (off_vitrine_ess, ''seo'', ''Search'', ''Schema.org (donnees structurees)'', ''Rich snippets pour un meilleur affichage Google'', false, 3),
  (off_vitrine_ess, ''seo'', ''Search'', ''Google Analytics'', ''Suivi statistiques et comportement visiteurs'', false, 4),
  (off_vitrine_ess, ''support'', ''Headphones'', ''Hebergement 1 an'', ''Hebergement Vercel ou Netlify offert'', true, 1),
  (off_vitrine_ess, ''support'', ''Headphones'', ''Formation utilisation'', ''Formation de 1h pour gerer votre site'', true, 2),
  (off_vitrine_ess, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour et corrections pendant 1 an'', false, 3),
  (off_vitrine_ess, ''support'', ''Headphones'', ''Support prioritaire'', ''Reponse sous 4h en jours ouvres'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_vitrine_bus, ''technologies'', ''Code'', ''Next.js / React'', ''Framework moderne pour des performances optimales'', true, 1),
  (off_vitrine_bus, ''technologies'', ''Code'', ''Tailwind CSS'', ''Framework CSS utility-first pour un design sur mesure'', true, 2),
  (off_vitrine_bus, ''technologies'', ''Code'', ''TypeScript'', ''Typage statique pour un code robuste'', true, 3),
  (off_vitrine_bus, ''technologies'', ''Code'', ''Framer Motion'', ''Animations fluides et transitions modernes'', true, 4),
  (off_vitrine_bus, ''technologies'', ''Code'', ''Supabase'', ''Backend-as-a-Service pour le CMS et la base de donnees'', true, 5),
  (off_vitrine_bus, ''technologies'', ''Code'', ''WordPress'', ''CMS traditionnel avec theme sur mesure'', false, 6),
  (off_vitrine_bus, ''technologies'', ''Code'', ''Vue.js / Nuxt'', ''Alternative framework JavaScript progressif'', false, 7),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Blog integre avec CMS'', ''Blog complet avec editeur de contenu'', true, 1),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Formulaires avances'', ''Formulaires multi-etapes avec validation'', true, 2),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Galerie photos/videos'', ''Portfolio ou galerie media interactive'', true, 3),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Newsletter integree'', ''Inscription et envoi de newsletters'', true, 4),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Chat en direct'', ''Widget de chat pour communiquer en temps reel'', false, 5),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Espace membres'', ''Zone privee avec authentification'', false, 6),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Systeme de reservation'', ''Prise de rendez-vous en ligne (Calendly-like)'', false, 7),
  (off_vitrine_bus, ''fonctionnalites'', ''Layers'', ''Multi-langue (2 langues)'', ''Site bilingue avec switch de langue'', false, 8),
  (off_vitrine_bus, ''design'', ''Palette'', ''Design responsive premium'', ''Design pixel-perfect sur tous les ecrans'', true, 1),
  (off_vitrine_bus, ''design'', ''Palette'', ''Maquettes Figma (3 pages)'', ''Maquettes detaillees avant developpement'', true, 2),
  (off_vitrine_bus, ''design'', ''Palette'', ''Animations et transitions'', ''Effets de scroll, hover et transitions de page'', true, 3),
  (off_vitrine_bus, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre elegant en complement'', false, 4),
  (off_vitrine_bus, ''design'', ''Palette'', ''Design system complet'', ''Bibliotheque de composants reutilisables'', false, 5),
  (off_vitrine_bus, ''performance'', ''Zap'', ''SSR/SSG (Server-Side Rendering)'', ''Rendu cote serveur pour des performances maximales'', true, 1),
  (off_vitrine_bus, ''performance'', ''Zap'', ''CDN mondial'', ''Distribution globale du contenu'', true, 2),
  (off_vitrine_bus, ''performance'', ''Zap'', ''Optimisation images (WebP/AVIF)'', ''Formats modernes et compression automatique'', true, 3),
  (off_vitrine_bus, ''performance'', ''Zap'', ''Core Web Vitals A+'', ''Optimisation pour les metriques Google'', true, 4),
  (off_vitrine_bus, ''performance'', ''Zap'', ''Cache avance'', ''Mise en cache intelligente pour des chargements instantanes'', false, 5),
  (off_vitrine_bus, ''seo'', ''Search'', ''SEO on-page complet'', ''Optimisation de toutes les pages'', true, 1),
  (off_vitrine_bus, ''seo'', ''Search'', ''Schema.org (donnees structurees)'', ''Rich snippets pour Google'', true, 2),
  (off_vitrine_bus, ''seo'', ''Search'', ''Google Analytics + Search Console'', ''Configuration et suivi des performances'', true, 3),
  (off_vitrine_bus, ''seo'', ''Search'', ''Strategie de mots-cles'', ''Recherche et ciblage de mots-cles pertinents'', false, 4),
  (off_vitrine_bus, ''seo'', ''Search'', ''SEO local (Google Business)'', ''Optimisation pour le referencement local'', false, 5),
  (off_vitrine_bus, ''support'', ''Headphones'', ''Hebergement inclus'', ''Hebergement haute performance inclus'', true, 1),
  (off_vitrine_bus, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance par email pendant 3 mois'', true, 2),
  (off_vitrine_bus, ''support'', ''Headphones'', ''Formation CMS (2h)'', ''Formation pour gerer votre contenu'', true, 3),
  (off_vitrine_bus, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour et monitoring continu'', false, 4),
  (off_vitrine_bus, ''support'', ''Headphones'', ''Support prioritaire'', ''Reponse sous 4h en jours ouvres'', false, 5);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_vitrine_pre, ''technologies'', ''Code'', ''Next.js / React'', ''Framework moderne hautes performances'', true, 1),
  (off_vitrine_pre, ''technologies'', ''Code'', ''Tailwind CSS'', ''Design system sur mesure'', true, 2),
  (off_vitrine_pre, ''technologies'', ''Code'', ''TypeScript'', ''Code robuste et maintenable'', true, 3),
  (off_vitrine_pre, ''technologies'', ''Code'', ''Framer Motion'', ''Animations avancees et interactions'', true, 4),
  (off_vitrine_pre, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Backend complet avec base de donnees'', true, 5),
  (off_vitrine_pre, ''technologies'', ''Code'', ''Three.js / WebGL'', ''Animations 3D et effets immersifs'', false, 6),
  (off_vitrine_pre, ''technologies'', ''Code'', ''Headless CMS (Strapi/Sanity)'', ''CMS decouple pour plus de flexibilite'', false, 7),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Pages illimitees'', ''Aucune limite sur le nombre de pages'', true, 1),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Multi-langue (3+ langues)'', ''Site multilingue avec gestion i18n'', true, 2),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Espace client securise'', ''Zone privee avec authentification'', true, 3),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Integrations API tierces'', ''Connexion CRM, ERP, outils metier'', true, 4),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Blog avance avec categories'', ''Blog complet avec tags, auteurs, recherche'', true, 5),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Systeme de reservation avance'', ''Planning, creneaux, confirmations auto'', false, 6),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''Chatbot IA integre'', ''Assistant virtuel pour vos visiteurs'', false, 7),
  (off_vitrine_pre, ''fonctionnalites'', ''Layers'', ''E-commerce leger'', ''Vente de quelques produits/services en ligne'', false, 8),
  (off_vitrine_pre, ''design'', ''Palette'', ''Design system dedie'', ''Bibliotheque de composants complete'', true, 1),
  (off_vitrine_pre, ''design'', ''Palette'', ''Maquettes Figma completes'', ''Toutes les pages maquettees en detail'', true, 2),
  (off_vitrine_pre, ''design'', ''Palette'', ''Animations avancees'', ''Parallax, morphing, effets de scroll'', true, 3),
  (off_vitrine_pre, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre natif'', true, 4),
  (off_vitrine_pre, ''design'', ''Palette'', ''Audit UX complet'', ''Analyse ergonomique et recommandations'', true, 5),
  (off_vitrine_pre, ''performance'', ''Zap'', ''Core Web Vitals A+'', ''Scores parfaits sur toutes les metriques'', true, 1),
  (off_vitrine_pre, ''performance'', ''Zap'', ''SSR/ISR avance'', ''Rendu hybride pour performances et fraicheur'', true, 2),
  (off_vitrine_pre, ''performance'', ''Zap'', ''CDN + Edge Computing'', ''Distribution globale avec execution au plus pres'', true, 3),
  (off_vitrine_pre, ''performance'', ''Zap'', ''PWA (Progressive Web App)'', ''Installation sur mobile comme une app native'', false, 4),
  (off_vitrine_pre, ''seo'', ''Search'', ''SEO technique complet'', ''Audit et optimisation en profondeur'', true, 1),
  (off_vitrine_pre, ''seo'', ''Search'', ''Schema.org avance'', ''Donnees structurees completes (FAQ, Breadcrumbs...)'', true, 2),
  (off_vitrine_pre, ''seo'', ''Search'', ''SEO international (hreflang)'', ''Referencement multi-langue'', true, 3),
  (off_vitrine_pre, ''seo'', ''Search'', ''Strategie de contenu SEO'', ''Plan editorial et recherche de mots-cles'', false, 4),
  (off_vitrine_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 2h en jours ouvres'', true, 1),
  (off_vitrine_pre, ''support'', ''Headphones'', ''Maintenance incluse 12 mois'', ''Mises a jour, monitoring, corrections'', true, 2),
  (off_vitrine_pre, ''support'', ''Headphones'', ''Formation complete (4h)'', ''Formation approfondie sur l''''administration'', true, 3),
  (off_vitrine_pre, ''support'', ''Headphones'', ''Hebergement premium'', ''Infrastructure haute disponibilite'', true, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ecommerce_ess, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend moderne et performant'', true, 1),
  (off_ecommerce_ess, ''technologies'', ''Code'', ''Stripe'', ''Paiement securise par carte bancaire'', true, 2),
  (off_ecommerce_ess, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base de donnees pour le catalogue'', true, 3),
  (off_ecommerce_ess, ''technologies'', ''Code'', ''Tailwind CSS'', ''Design responsive sur mesure'', true, 4),
  (off_ecommerce_ess, ''technologies'', ''Code'', ''WooCommerce / WordPress'', ''Solution e-commerce WordPress'', false, 5),
  (off_ecommerce_ess, ''technologies'', ''Code'', ''Shopify (headless)'', ''Backend Shopify avec frontend custom'', false, 6),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Catalogue jusqu''''a 50 produits'', ''Gestion produits avec variantes'', true, 1),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Panier et checkout'', ''Processus d''''achat fluide et optimise'', true, 2),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Gestion de stock basique'', ''Suivi des quantites disponibles'', true, 3),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Emails de confirmation'', ''Confirmation de commande automatique'', true, 4),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Filtres produits'', ''Filtrage par categorie, prix, taille'', false, 5),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Avis clients'', ''Systeme de notation et commentaires'', false, 6),
  (off_ecommerce_ess, ''fonctionnalites'', ''Layers'', ''Codes promo'', ''Systeme de reduction et coupons'', false, 7),
  (off_ecommerce_ess, ''design'', ''Palette'', ''Design responsive e-commerce'', ''Interface optimisee pour la conversion'', true, 1),
  (off_ecommerce_ess, ''design'', ''Palette'', ''Pages produits attractives'', ''Galeries photos, zoom, variantes visuelles'', true, 2),
  (off_ecommerce_ess, ''design'', ''Palette'', ''Maquette Figma boutique'', ''Design de la boutique avant developpement'', true, 3),
  (off_ecommerce_ess, ''design'', ''Palette'', ''Animations produits'', ''Effets de survol et transitions sur les produits'', false, 4),
  (off_ecommerce_ess, ''performance'', ''Zap'', ''Optimisation images produits'', ''Compression et formats modernes automatiques'', true, 1),
  (off_ecommerce_ess, ''performance'', ''Zap'', ''SSL / HTTPS'', ''Securite des transactions'', true, 2),
  (off_ecommerce_ess, ''performance'', ''Zap'', ''Lazy loading catalogue'', ''Chargement progressif pour des performances fluides'', false, 3),
  (off_ecommerce_ess, ''seo'', ''Search'', ''SEO produits basique'', ''Meta tags et URLs optimises pour chaque produit'', true, 1),
  (off_ecommerce_ess, ''seo'', ''Search'', ''Schema.org Product'', ''Donnees structurees pour les produits'', true, 2),
  (off_ecommerce_ess, ''seo'', ''Search'', ''Google Merchant Center'', ''Integration pour Google Shopping'', false, 3),
  (off_ecommerce_ess, ''support'', ''Headphones'', ''Formation gestion boutique (2h)'', ''Apprendre a gerer vos produits et commandes'', true, 1),
  (off_ecommerce_ess, ''support'', ''Headphones'', ''Hebergement inclus'', ''Infrastructure securisee pour votre boutique'', true, 2),
  (off_ecommerce_ess, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance technique par email'', false, 3),
  (off_ecommerce_ess, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour et surveillance continue'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend performant et SEO-friendly'', true, 1),
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Stripe + Monetico'', ''Multi-paiement CB, virements, 3D Secure'', true, 2),
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base de donnees scalable'', true, 3),
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Node.js / API REST'', ''Backend robuste pour le catalogue et les commandes'', true, 4),
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Redis (cache)'', ''Cache pour des performances ultra-rapides'', false, 5),
  (off_ecommerce_bus, ''technologies'', ''Code'', ''Algolia (recherche)'', ''Recherche instantanee et pertinente'', false, 6),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Catalogue jusqu''''a 500 produits'', ''Gestion avancee avec variantes et attributs'', true, 1),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Filtres et recherche avances'', ''Filtrage multi-criteres et recherche en temps reel'', true, 2),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Dashboard analytics vendeur'', ''Statistiques de vente, CA, produits populaires'', true, 3),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Gestion des avis clients'', ''Notes, commentaires et moderation'', true, 4),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Codes promo et reductions'', ''Coupons, ventes flash, reductions par categorie'', true, 5),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Emails transactionnels'', ''Confirmation, expedition, relance panier abandonne'', true, 6),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Suivi de commandes temps reel'', ''Tracking de la commande pour le client'', true, 7),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Wishlist / Favoris'', ''Liste de souhaits pour les clients'', false, 8),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Comparateur de produits'', ''Comparaison cote a cote des produits'', false, 9),
  (off_ecommerce_bus, ''fonctionnalites'', ''Layers'', ''Multi-devises'', ''Affichage et paiement en plusieurs devises'', false, 10),
  (off_ecommerce_bus, ''design'', ''Palette'', ''Design e-commerce premium'', ''Interface de vente haut de gamme'', true, 1),
  (off_ecommerce_bus, ''design'', ''Palette'', ''Maquettes Figma completes'', ''Toutes les pages maquettees'', true, 2),
  (off_ecommerce_bus, ''design'', ''Palette'', ''Animations produits avancees'', ''Zoom, 360, videos produits'', true, 3),
  (off_ecommerce_bus, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre pour la boutique'', false, 4),
  (off_ecommerce_bus, ''performance'', ''Zap'', ''CDN + Edge caching'', ''Distribution rapide des images et pages'', true, 1),
  (off_ecommerce_bus, ''performance'', ''Zap'', ''Optimisation Core Web Vitals'', ''Performances A+ pour le SEO et la conversion'', true, 2),
  (off_ecommerce_bus, ''performance'', ''Zap'', ''Images automatiques WebP/AVIF'', ''Compression optimale automatique'', true, 3),
  (off_ecommerce_bus, ''performance'', ''Zap'', ''Prefetching intelligent'', ''Pre-chargement des pages probables'', false, 4),
  (off_ecommerce_bus, ''seo'', ''Search'', ''SEO e-commerce complet'', ''Optimisation pages categories et produits'', true, 1),
  (off_ecommerce_bus, ''seo'', ''Search'', ''Schema.org Product + Review'', ''Rich snippets produits avec etoiles'', true, 2),
  (off_ecommerce_bus, ''seo'', ''Search'', ''Google Merchant Center'', ''Google Shopping et campagnes PLA'', true, 3),
  (off_ecommerce_bus, ''seo'', ''Search'', ''Strategie de contenu e-commerce'', ''Blog et guides d''''achat pour le trafic organique'', false, 4),
  (off_ecommerce_bus, ''support'', ''Headphones'', ''Support 6 mois'', ''Assistance technique et fonctionnelle'', true, 1),
  (off_ecommerce_bus, ''support'', ''Headphones'', ''Formation complete (3h)'', ''Gestion produits, commandes, analytics'', true, 2),
  (off_ecommerce_bus, ''support'', ''Headphones'', ''Hebergement haute performance'', ''Infrastructure optimisee pour l''''e-commerce'', true, 3),
  (off_ecommerce_bus, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour, surveillance et optimisations'', false, 4),
  (off_ecommerce_bus, ''support'', ''Headphones'', ''Support prioritaire'', ''Reponse sous 4h, support telephonique'', false, 5);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ecommerce_pre, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend ultra-performant'', true, 1),
  (off_ecommerce_pre, ''technologies'', ''Code'', ''Stripe + PayPal + Monetico'', ''Tous les modes de paiement'', true, 2),
  (off_ecommerce_pre, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base scalable pour des milliers de produits'', true, 3),
  (off_ecommerce_pre, ''technologies'', ''Code'', ''Algolia (recherche)'', ''Recherche instantanee et tolerante aux fautes'', true, 4),
  (off_ecommerce_pre, ''technologies'', ''Code'', ''Redis (cache + sessions)'', ''Performance temps reel'', true, 5),
  (off_ecommerce_pre, ''technologies'', ''Code'', ''API GraphQL'', ''API puissante pour les integrations'', false, 6),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Produits illimites'', ''Aucune limite de catalogue'', true, 1),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Marketplace multi-vendeurs'', ''Plusieurs vendeurs sur une meme plateforme'', true, 2),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Systeme d''''abonnements'', ''Vente de produits recurrents (box, services)'', true, 3),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Programme de fidelite'', ''Points, recompenses et niveaux clients'', true, 4),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Recommandations IA'', ''Suggestions personnalisees basees sur le comportement'', true, 5),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Multi-devises et multi-langues'', ''Vente internationale'', true, 6),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''API publique'', ''Integration avec ERP, CRM et outils tiers'', true, 7),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Click & Collect'', ''Retrait en magasin'', false, 8),
  (off_ecommerce_pre, ''fonctionnalites'', ''Layers'', ''Live Shopping'', ''Vente en direct avec video'', false, 9),
  (off_ecommerce_pre, ''design'', ''Palette'', ''Design sur mesure luxe'', ''Experience d''''achat haut de gamme'', true, 1),
  (off_ecommerce_pre, ''design'', ''Palette'', ''Design system e-commerce'', ''Composants reutilisables pour toute la boutique'', true, 2),
  (off_ecommerce_pre, ''design'', ''Palette'', ''AR (Realite Augmentee)'', ''Visualisation produits en realite augmentee'', false, 3),
  (off_ecommerce_pre, ''performance'', ''Zap'', ''Architecture edge-first'', ''Performances mondiales optimales'', true, 1),
  (off_ecommerce_pre, ''performance'', ''Zap'', ''Auto-scaling'', ''Infrastructure qui s''''adapte au trafic'', true, 2),
  (off_ecommerce_pre, ''performance'', ''Zap'', ''Monitoring temps reel'', ''Alertes performances et erreurs'', true, 3),
  (off_ecommerce_pre, ''seo'', ''Search'', ''SEO e-commerce avance'', ''Strategie SEO complete pour le e-commerce'', true, 1),
  (off_ecommerce_pre, ''seo'', ''Search'', ''Google Shopping + Merchant Center'', ''Campagnes shopping automatisees'', true, 2),
  (off_ecommerce_pre, ''seo'', ''Search'', ''SEO international (hreflang)'', ''Referencement multi-pays'', true, 3),
  (off_ecommerce_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 2h, support telephonique'', true, 1),
  (off_ecommerce_pre, ''support'', ''Headphones'', ''Maintenance incluse 12 mois'', ''Mises a jour, monitoring, optimisations'', true, 2),
  (off_ecommerce_pre, ''support'', ''Headphones'', ''Formation approfondie (6h)'', ''Formation complete equipe'', true, 3),
  (off_ecommerce_pre, ''support'', ''Headphones'', ''Account manager dedie'', ''Interlocuteur unique pour votre projet'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_webapp_ess, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend moderne'', true, 1),
  (off_webapp_ess, ''technologies'', ''Code'', ''Node.js'', ''Backend JavaScript performant'', true, 2),
  (off_webapp_ess, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base de donnees et authentification'', true, 3),
  (off_webapp_ess, ''technologies'', ''Code'', ''TypeScript'', ''Code type et robuste'', true, 4),
  (off_webapp_ess, ''technologies'', ''Code'', ''Python / Django'', ''Alternative backend Python'', false, 5),
  (off_webapp_ess, ''technologies'', ''Code'', ''Firebase'', ''Alternative backend Google'', false, 6),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''Authentification securisee'', ''Login, inscription, mot de passe oublie'', true, 1),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''Dashboard utilisateur'', ''Tableau de bord avec donnees cles'', true, 2),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''Interface d''''administration'', ''Back-office pour gerer l''''application'', true, 3),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''API REST basique'', ''Endpoints pour les operations CRUD'', true, 4),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''Gestion de fichiers'', ''Upload et gestion de documents'', false, 5),
  (off_webapp_ess, ''fonctionnalites'', ''Layers'', ''Notifications email'', ''Envoi d''''emails automatises'', false, 6),
  (off_webapp_ess, ''design'', ''Palette'', ''Design responsive'', ''Interface adaptee a tous les ecrans'', true, 1),
  (off_webapp_ess, ''design'', ''Palette'', ''Maquette Figma'', ''1 maquette avant developpement'', true, 2),
  (off_webapp_ess, ''design'', ''Palette'', ''Composants UI modernes'', ''Interface claire et intuitive'', true, 3),
  (off_webapp_ess, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre natif'', false, 4),
  (off_webapp_ess, ''performance'', ''Zap'', ''Deploiement cloud (Vercel)'', ''Hebergement performant et scalable'', true, 1),
  (off_webapp_ess, ''performance'', ''Zap'', ''SSL / HTTPS'', ''Connexion securisee'', true, 2),
  (off_webapp_ess, ''performance'', ''Zap'', ''Monitoring basique'', ''Surveillance de la disponibilite'', false, 3),
  (off_webapp_ess, ''seo'', ''Search'', ''Meta tags'', ''Referencement basique'', true, 1),
  (off_webapp_ess, ''seo'', ''Search'', ''Sitemap XML'', ''Plan du site pour les moteurs'', true, 2),
  (off_webapp_ess, ''support'', ''Headphones'', ''Hebergement inclus'', ''Infrastructure cloud offerte'', true, 1),
  (off_webapp_ess, ''support'', ''Headphones'', ''Formation (2h)'', ''Formation a l''''utilisation'', true, 2),
  (off_webapp_ess, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance technique par email'', false, 3);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_webapp_bus, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend moderne hautes performances'', true, 1),
  (off_webapp_bus, ''technologies'', ''Code'', ''Node.js / Express'', ''Backend robuste et scalable'', true, 2),
  (off_webapp_bus, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base relationnelle performante'', true, 3),
  (off_webapp_bus, ''technologies'', ''Code'', ''TypeScript'', ''Code type pour la maintenabilite'', true, 4),
  (off_webapp_bus, ''technologies'', ''Code'', ''Socket.io / WebSocket'', ''Communication temps reel'', true, 5),
  (off_webapp_bus, ''technologies'', ''Code'', ''Redis'', ''Cache et sessions hautes performances'', false, 6),
  (off_webapp_bus, ''technologies'', ''Code'', ''Docker'', ''Conteneurisation pour le deploiement'', false, 7),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Gestion de roles et permissions'', ''Admin, manager, utilisateur, etc.'', true, 1),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''API REST complete'', ''API documentee avec Swagger/OpenAPI'', true, 2),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Dashboard avance avec graphiques'', ''Visualisations de donnees interactives'', true, 3),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Notifications temps reel'', ''Push notifications et alertes in-app'', true, 4),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Gestion de fichiers avancee'', ''Upload, preview, gestion de dossiers'', true, 5),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Exports PDF/CSV/Excel'', ''Export des donnees dans plusieurs formats'', true, 6),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Recherche avancee'', ''Recherche full-text avec filtres complexes'', true, 7),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Workflow automatise'', ''Automatisation de processus metier'', false, 8),
  (off_webapp_bus, ''fonctionnalites'', ''Layers'', ''Integration CRM/ERP'', ''Connexion avec vos outils existants'', false, 9),
  (off_webapp_bus, ''design'', ''Palette'', ''Design responsive premium'', ''UI moderne et professionnelle'', true, 1),
  (off_webapp_bus, ''design'', ''Palette'', ''Maquettes Figma (5+ pages)'', ''Maquettes detaillees de toutes les vues'', true, 2),
  (off_webapp_bus, ''design'', ''Palette'', ''Composants UI avances'', ''Tableaux, graphiques, drag-and-drop'', true, 3),
  (off_webapp_bus, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre natif'', false, 4),
  (off_webapp_bus, ''design'', ''Palette'', ''Design system complet'', ''Bibliotheque de composants documentee'', false, 5),
  (off_webapp_bus, ''performance'', ''Zap'', ''Tests automatises'', ''Tests unitaires et d''''integration'', true, 1),
  (off_webapp_bus, ''performance'', ''Zap'', ''CDN + Cache intelligent'', ''Distribution rapide du contenu'', true, 2),
  (off_webapp_bus, ''performance'', ''Zap'', ''Monitoring et alertes'', ''Surveillance de la sante de l''''application'', false, 3),
  (off_webapp_bus, ''performance'', ''Zap'', ''CI/CD pipeline'', ''Deploiement continu automatise'', false, 4),
  (off_webapp_bus, ''seo'', ''Search'', ''SEO technique'', ''Optimisation pour les moteurs de recherche'', true, 1),
  (off_webapp_bus, ''seo'', ''Search'', ''Analytics integre'', ''Suivi des utilisateurs et comportements'', true, 2),
  (off_webapp_bus, ''support'', ''Headphones'', ''Support 6 mois'', ''Assistance par email et telephone'', true, 1),
  (off_webapp_bus, ''support'', ''Headphones'', ''Formation equipe (4h)'', ''Formation utilisateurs et administrateurs'', true, 2),
  (off_webapp_bus, ''support'', ''Headphones'', ''Documentation technique'', ''Documentation API et guides utilisateur'', true, 3),
  (off_webapp_bus, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour et optimisations'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_webapp_pre, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend ultra-performant'', true, 1),
  (off_webapp_pre, ''technologies'', ''Code'', ''Node.js microservices'', ''Architecture distribuee scalable'', true, 2),
  (off_webapp_pre, ''technologies'', ''Code'', ''PostgreSQL + Redis'', ''Base + cache hautes performances'', true, 3),
  (off_webapp_pre, ''technologies'', ''Code'', ''GraphQL + REST'', ''APIs flexibles et performantes'', true, 4),
  (off_webapp_pre, ''technologies'', ''Code'', ''Docker + Kubernetes'', ''Orchestration de conteneurs'', true, 5),
  (off_webapp_pre, ''technologies'', ''Code'', ''WebSocket'', ''Communication bidirectionnelle temps reel'', true, 6),
  (off_webapp_pre, ''technologies'', ''Code'', ''Terraform / IaC'', ''Infrastructure as Code'', false, 7),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Architecture microservices'', ''Services independants et scalables'', true, 1),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Temps reel WebSocket'', ''Mises a jour instantanees'', true, 2),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''CI/CD pipeline complet'', ''Tests, build, deploy automatises'', true, 3),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Monitoring avance'', ''Logs, metriques, traces distribuees'', true, 4),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Tests E2E complets'', ''Couverture de tests exhaustive'', true, 5),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Message queue (RabbitMQ)'', ''Communication asynchrone entre services'', false, 6),
  (off_webapp_pre, ''fonctionnalites'', ''Layers'', ''Machine Learning integre'', ''Modeles IA embarques dans l''''app'', false, 7),
  (off_webapp_pre, ''design'', ''Palette'', ''Design system complet'', ''Storybook + composants documentes'', true, 1),
  (off_webapp_pre, ''design'', ''Palette'', ''Maquettes Figma completes'', ''Toutes les vues et interactions'', true, 2),
  (off_webapp_pre, ''design'', ''Palette'', ''Mode sombre natif'', ''Support complet du mode sombre'', true, 3),
  (off_webapp_pre, ''design'', ''Palette'', ''Accessibilite WCAG AA'', ''Conformite accessibilite'', false, 4),
  (off_webapp_pre, ''performance'', ''Zap'', ''Scalabilite automatique'', ''Auto-scaling base sur le trafic'', true, 1),
  (off_webapp_pre, ''performance'', ''Zap'', ''Monitoring temps reel'', ''Dashboards de performance live'', true, 2),
  (off_webapp_pre, ''performance'', ''Zap'', ''Backups automatiques'', ''Sauvegardes et plan de reprise'', true, 3),
  (off_webapp_pre, ''performance'', ''Zap'', ''Load testing'', ''Tests de charge avant mise en production'', false, 4),
  (off_webapp_pre, ''seo'', ''Search'', ''SEO technique avance'', ''Optimisation complete'', true, 1),
  (off_webapp_pre, ''seo'', ''Search'', ''Analytics avance'', ''Suivi detaille et custom events'', true, 2),
  (off_webapp_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 2h, support dedie'', true, 1),
  (off_webapp_pre, ''support'', ''Headphones'', ''Maintenance incluse 12 mois'', ''Mises a jour et monitoring continu'', true, 2),
  (off_webapp_pre, ''support'', ''Headphones'', ''Documentation technique complete'', ''Architecture, API, guides de contribution'', true, 3),
  (off_webapp_pre, ''support'', ''Headphones'', ''Formation equipe (8h)'', ''Formation approfondie developpeurs et admins'', true, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_saas_ess, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend SaaS moderne'', true, 1),
  (off_saas_ess, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Backend et base de donnees'', true, 2),
  (off_saas_ess, ''technologies'', ''Code'', ''Stripe Billing'', ''Facturation et abonnements'', true, 3),
  (off_saas_ess, ''technologies'', ''Code'', ''TypeScript'', ''Code type et maintenable'', true, 4),
  (off_saas_ess, ''technologies'', ''Code'', ''Vercel / AWS'', ''Hebergement cloud performant'', true, 5),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Authentification complete'', ''Login, signup, OAuth, reset password'', true, 1),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Facturation Stripe'', ''Plans, abonnements, factures auto'', true, 2),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Dashboard admin'', ''Vue d''''ensemble et gestion'', true, 3),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''1 role utilisateur'', ''Gestion basique des acces'', true, 4),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Landing page'', ''Page de presentation du produit'', true, 5),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Onboarding utilisateur'', ''Guide de prise en main'', false, 6),
  (off_saas_ess, ''fonctionnalites'', ''Layers'', ''Emails transactionnels'', ''Emails automatiques (bienvenue, facture)'', false, 7),
  (off_saas_ess, ''design'', ''Palette'', ''Design SaaS moderne'', ''Interface clean et fonctionnelle'', true, 1),
  (off_saas_ess, ''design'', ''Palette'', ''Maquettes Figma MVP'', ''Ecrans principaux maquettes'', true, 2),
  (off_saas_ess, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre natif'', false, 3),
  (off_saas_ess, ''performance'', ''Zap'', ''Deploiement cloud'', ''Infrastructure haute disponibilite'', true, 1),
  (off_saas_ess, ''performance'', ''Zap'', ''SSL / HTTPS'', ''Connexion securisee'', true, 2),
  (off_saas_ess, ''seo'', ''Search'', ''SEO landing page'', ''Optimisation de la page d''''accueil'', true, 1),
  (off_saas_ess, ''seo'', ''Search'', ''Analytics integre'', ''Suivi des conversions et usage'', true, 2),
  (off_saas_ess, ''support'', ''Headphones'', ''Hebergement inclus'', ''Cloud hosting performant'', true, 1),
  (off_saas_ess, ''support'', ''Headphones'', ''Formation (2h)'', ''Prise en main de la plateforme'', true, 2),
  (off_saas_ess, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance technique email'', false, 3);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_saas_bus, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend SaaS performant'', true, 1),
  (off_saas_bus, ''technologies'', ''Code'', ''Node.js / Express'', ''Backend API robuste'', true, 2),
  (off_saas_bus, ''technologies'', ''Code'', ''Supabase / PostgreSQL'', ''Base multi-tenant'', true, 3),
  (off_saas_bus, ''technologies'', ''Code'', ''Stripe Billing'', ''Gestion complete des abonnements'', true, 4),
  (off_saas_bus, ''technologies'', ''Code'', ''Redis'', ''Cache et rate limiting'', true, 5),
  (off_saas_bus, ''technologies'', ''Code'', ''Docker'', ''Conteneurisation pour le deploiement'', false, 6),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Architecture multi-tenant'', ''Isolation des donnees par organisation'', true, 1),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Gestion d''''abonnements'', ''Plans, upgrade, downgrade, trial'', true, 2),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''3+ roles utilisateurs'', ''Admin, manager, membre, viewer'', true, 3),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Analytics et metriques'', ''Dashboards avec KPIs metier'', true, 4),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Webhooks configurables'', ''Evenements temps reel vers apps tierces'', true, 5),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''API publique documentee'', ''API REST avec documentation Swagger'', true, 6),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Onboarding guide'', ''Parcours de prise en main interactif'', true, 7),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Integration Zapier/Make'', ''Connexion no-code avec 5000+ apps'', false, 8),
  (off_saas_bus, ''fonctionnalites'', ''Layers'', ''Systeme de notifications'', ''Email, in-app, push notifications'', false, 9),
  (off_saas_bus, ''design'', ''Palette'', ''Design SaaS premium'', ''Interface professionnelle et intuitive'', true, 1),
  (off_saas_bus, ''design'', ''Palette'', ''Maquettes Figma completes'', ''Tous les ecrans et flux'', true, 2),
  (off_saas_bus, ''design'', ''Palette'', ''Mode sombre'', ''Theme sombre natif'', true, 3),
  (off_saas_bus, ''design'', ''Palette'', ''Design system'', ''Composants reutilisables'', false, 4),
  (off_saas_bus, ''performance'', ''Zap'', ''Auto-scaling'', ''Infrastructure qui s''''adapte'', true, 1),
  (off_saas_bus, ''performance'', ''Zap'', ''Rate limiting'', ''Protection contre les abus'', true, 2),
  (off_saas_bus, ''performance'', ''Zap'', ''Monitoring'', ''Surveillance de la sante du SaaS'', true, 3),
  (off_saas_bus, ''performance'', ''Zap'', ''CI/CD pipeline'', ''Deploiement continu automatise'', false, 4),
  (off_saas_bus, ''seo'', ''Search'', ''SEO marketing site'', ''Optimisation pages marketing'', true, 1),
  (off_saas_bus, ''seo'', ''Search'', ''Analytics produit'', ''Suivi de l''''usage et des conversions'', true, 2),
  (off_saas_bus, ''support'', ''Headphones'', ''Support 6 mois'', ''Assistance technique et fonctionnelle'', true, 1),
  (off_saas_bus, ''support'', ''Headphones'', ''Formation equipe (4h)'', ''Formation admins et utilisateurs'', true, 2),
  (off_saas_bus, ''support'', ''Headphones'', ''Documentation API'', ''Documentation developpeur complete'', true, 3),
  (off_saas_bus, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mises a jour et optimisations'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_saas_pre, ''technologies'', ''Code'', ''Next.js / React'', ''Frontend enterprise'', true, 1),
  (off_saas_pre, ''technologies'', ''Code'', ''Node.js microservices'', ''Backend distribue et scalable'', true, 2),
  (off_saas_pre, ''technologies'', ''Code'', ''PostgreSQL + Redis'', ''Stack donnees enterprise'', true, 3),
  (off_saas_pre, ''technologies'', ''Code'', ''Kubernetes'', ''Orchestration de conteneurs'', true, 4),
  (off_saas_pre, ''technologies'', ''Code'', ''Terraform'', ''Infrastructure as Code'', true, 5),
  (off_saas_pre, ''technologies'', ''Code'', ''Elasticsearch'', ''Recherche full-text puissante'', false, 6),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''White-label'', ''Personnalisation complete de la marque'', true, 1),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''SSO / SAML / OAuth2'', ''Authentification enterprise'', true, 2),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''Audit logs complets'', ''Tracabilite de toutes les actions'', true, 3),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''SLA garanti 99.9%'', ''Disponibilite garantie contractuellement'', true, 4),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''Backups automatiques'', ''Sauvegardes et plan de reprise d''''activite'', true, 5),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''Migration de donnees'', ''Import de donnees depuis votre ancien systeme'', true, 6),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''RGPD / Compliance'', ''Conformite reglementaire integree'', false, 7),
  (off_saas_pre, ''fonctionnalites'', ''Layers'', ''API GraphQL'', ''API flexible et performante'', false, 8),
  (off_saas_pre, ''design'', ''Palette'', ''Design system enterprise'', ''Composants documentes et testes'', true, 1),
  (off_saas_pre, ''design'', ''Palette'', ''Maquettes et prototypes'', ''UX research + prototypes interactifs'', true, 2),
  (off_saas_pre, ''design'', ''Palette'', ''Mode sombre'', ''Support complet mode sombre'', true, 3),
  (off_saas_pre, ''design'', ''Palette'', ''Accessibilite WCAG AA'', ''Conformite accessibilite'', false, 4),
  (off_saas_pre, ''performance'', ''Zap'', ''Scalabilite automatique'', ''Auto-scaling horizontal'', true, 1),
  (off_saas_pre, ''performance'', ''Zap'', ''Monitoring avance'', ''APM, logs, metriques, alertes'', true, 2),
  (off_saas_pre, ''performance'', ''Zap'', ''Multi-region'', ''Deploiement geographique distribue'', true, 3),
  (off_saas_pre, ''performance'', ''Zap'', ''Chaos engineering'', ''Tests de resilience automatises'', false, 4),
  (off_saas_pre, ''seo'', ''Search'', ''SEO marketing avance'', ''Optimisation landing pages et blog'', true, 1),
  (off_saas_pre, ''seo'', ''Search'', ''Analytics produit avance'', ''Funnels, cohortes, A/B testing'', true, 2),
  (off_saas_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 2h, support dedie'', true, 1),
  (off_saas_pre, ''support'', ''Headphones'', ''Maintenance incluse 12 mois'', ''Mises a jour, monitoring, patchs securite'', true, 2),
  (off_saas_pre, ''support'', ''Headphones'', ''Account manager dedie'', ''Interlocuteur unique pour votre projet'', true, 3),
  (off_saas_pre, ''support'', ''Headphones'', ''Formation complete (12h)'', ''Formation equipe + documentation interne'', true, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ia_ess, ''technologies'', ''Code'', ''OpenAI GPT-4'', ''Modele de langage le plus avance'', true, 1),
  (off_ia_ess, ''technologies'', ''Code'', ''Claude (Anthropic)'', ''IA conversationnelle sure et capable'', false, 2),
  (off_ia_ess, ''technologies'', ''Code'', ''Mistral AI'', ''Modele francais open-source'', false, 3),
  (off_ia_ess, ''technologies'', ''Code'', ''Next.js / React'', ''Interface web du chatbot'', true, 4),
  (off_ia_ess, ''technologies'', ''Code'', ''Supabase'', ''Stockage des conversations'', true, 5),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''Chatbot integre au site'', ''Widget de chat personnalisable'', true, 1),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''FAQ automatisee'', ''Reponses automatiques aux questions frequentes'', true, 2),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''Reponses pre-configurees'', ''Scenarios de conversation definis'', true, 3),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''Historique conversations'', ''Acces a l''''historique des echanges'', true, 4),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''Collecte de leads'', ''Recuperation d''''emails et informations'', false, 5),
  (off_ia_ess, ''fonctionnalites'', ''Layers'', ''Escalade vers humain'', ''Transfert vers un agent humain'', false, 6),
  (off_ia_ess, ''design'', ''Palette'', ''Widget personnalisable'', ''Couleurs, position, avatar personnalises'', true, 1),
  (off_ia_ess, ''design'', ''Palette'', ''Design responsive'', ''Adapte mobile et desktop'', true, 2),
  (off_ia_ess, ''design'', ''Palette'', ''Animations chat'', ''Effet de frappe et transitions'', false, 3),
  (off_ia_ess, ''performance'', ''Zap'', ''Temps de reponse < 3s'', ''Reponses rapides garanties'', true, 1),
  (off_ia_ess, ''performance'', ''Zap'', ''Cache des reponses'', ''Reponses instantanees pour les questions frequentes'', true, 2),
  (off_ia_ess, ''seo'', ''Search'', ''Donnees structurees FAQ'', ''Schema.org pour les FAQ'', true, 1),
  (off_ia_ess, ''support'', ''Headphones'', ''Formation administration (1h)'', ''Configuration et personnalisation du chatbot'', true, 1),
  (off_ia_ess, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance par email'', true, 2),
  (off_ia_ess, ''support'', ''Headphones'', ''Maintenance mensuelle'', ''Mise a jour du modele et corrections'', false, 3);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ia_bus, ''technologies'', ''Code'', ''OpenAI GPT-4 Turbo'', ''Modele avance rapide'', true, 1),
  (off_ia_bus, ''technologies'', ''Code'', ''Claude (Anthropic)'', ''IA fiable et securisee'', true, 2),
  (off_ia_bus, ''technologies'', ''Code'', ''LangChain'', ''Framework pour chaines IA complexes'', true, 3),
  (off_ia_bus, ''technologies'', ''Code'', ''Pinecone / Weaviate'', ''Base vectorielle pour la recherche semantique'', true, 4),
  (off_ia_bus, ''technologies'', ''Code'', ''Python'', ''Backend IA specialise'', true, 5),
  (off_ia_bus, ''technologies'', ''Code'', ''Mistral AI'', ''Modele francais performant'', false, 6),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Chatbot IA avance'', ''Conversations naturelles et contextuelles'', true, 1),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Connexion CRM'', ''Synchronisation avec votre CRM'', true, 2),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Analyse de sentiment'', ''Detection du ton et de l''''emotion'', true, 3),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Generation de contenu'', ''Creation automatique de textes, emails'', true, 4),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Multi-canal'', ''Site web, WhatsApp, email, Slack'', true, 5),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Escalade agent humain'', ''Transfert intelligent vers support humain'', true, 6),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Dashboard analytics IA'', ''Metriques de performance du chatbot'', true, 7),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Resume automatique'', ''Resumes des conversations et insights'', false, 8),
  (off_ia_bus, ''fonctionnalites'', ''Layers'', ''Traduction automatique'', ''Reponses multilingues en temps reel'', false, 9),
  (off_ia_bus, ''design'', ''Palette'', ''Interface chat premium'', ''Design conversationnel moderne'', true, 1),
  (off_ia_bus, ''design'', ''Palette'', ''Dashboard admin'', ''Interface de gestion et analytics'', true, 2),
  (off_ia_bus, ''design'', ''Palette'', ''Branding personnalise'', ''Integration complete a votre marque'', true, 3),
  (off_ia_bus, ''performance'', ''Zap'', ''Temps de reponse < 2s'', ''Streaming des reponses en temps reel'', true, 1),
  (off_ia_bus, ''performance'', ''Zap'', ''Fallback multi-modele'', ''Basculement automatique si un modele est indisponible'', true, 2),
  (off_ia_bus, ''performance'', ''Zap'', ''Rate limiting intelligent'', ''Protection contre les abus'', true, 3),
  (off_ia_bus, ''seo'', ''Search'', ''Donnees structurees'', ''FAQ et chatbot pour le SEO'', true, 1),
  (off_ia_bus, ''seo'', ''Search'', ''Analytics conversationnel'', ''Insights sur les questions frequentes'', true, 2),
  (off_ia_bus, ''support'', ''Headphones'', ''Support 6 mois'', ''Assistance technique et tuning IA'', true, 1),
  (off_ia_bus, ''support'', ''Headphones'', ''Formation IA (3h)'', ''Formation a la gestion et personnalisation'', true, 2),
  (off_ia_bus, ''support'', ''Headphones'', ''Optimisation mensuelle'', ''Amelioration continue des reponses'', false, 3);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_ia_pre, ''technologies'', ''Code'', ''OpenAI GPT-4 / GPT-4o'', ''Modele le plus puissant'', true, 1),
  (off_ia_pre, ''technologies'', ''Code'', ''Claude 3.5 Sonnet'', ''IA Anthropic fiable et puissante'', true, 2),
  (off_ia_pre, ''technologies'', ''Code'', ''LangChain / LlamaIndex'', ''Frameworks IA avances'', true, 3),
  (off_ia_pre, ''technologies'', ''Code'', ''Pinecone / Weaviate'', ''Base vectorielle pour le RAG'', true, 4),
  (off_ia_pre, ''technologies'', ''Code'', ''Python + FastAPI'', ''Backend IA haute performance'', true, 5),
  (off_ia_pre, ''technologies'', ''Code'', ''Hugging Face'', ''Modeles custom et fine-tuning'', true, 6),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Solution IA sur mesure'', ''Developpement adapte a votre metier'', true, 1),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Fine-tuning de modele'', ''Modele entraine sur vos donnees'', true, 2),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''RAG (documents)'', ''IA qui repond a partir de vos documents'', true, 3),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Automatisation workflow'', ''Processus metier automatises par l''''IA'', true, 4),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Analytics IA avances'', ''Insights et predictions bases sur l''''IA'', true, 5),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Integration multi-sources'', ''Connexion a toutes vos donnees (DB, API, fichiers)'', true, 6),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''API IA dediee'', ''API pour integrer l''''IA dans vos apps'', true, 7),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Vision par ordinateur'', ''Analyse et classification d''''images'', false, 8),
  (off_ia_pre, ''fonctionnalites'', ''Layers'', ''Speech-to-text / TTS'', ''Reconnaissance et synthese vocale'', false, 9),
  (off_ia_pre, ''design'', ''Palette'', ''Interface IA sur mesure'', ''Design adapte a votre cas d''''usage'', true, 1),
  (off_ia_pre, ''design'', ''Palette'', ''Dashboard monitoring IA'', ''Visualisation des performances IA'', true, 2),
  (off_ia_pre, ''design'', ''Palette'', ''Prototypes interactifs'', ''Tests utilisateurs avant developpement'', true, 3),
  (off_ia_pre, ''performance'', ''Zap'', ''GPU dedie si necessaire'', ''Ressources de calcul dediees'', true, 1),
  (off_ia_pre, ''performance'', ''Zap'', ''Cache semantique'', ''Reponses instantanees pour requetes similaires'', true, 2),
  (off_ia_pre, ''performance'', ''Zap'', ''Monitoring IA temps reel'', ''Qualite des reponses et performances'', true, 3),
  (off_ia_pre, ''seo'', ''Search'', ''Content IA pour le SEO'', ''Generation de contenu optimise SEO'', true, 1),
  (off_ia_pre, ''seo'', ''Search'', ''Analytics predictif'', ''Previsions basees sur l''''IA'', true, 2),
  (off_ia_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 2h, support dedie'', true, 1),
  (off_ia_pre, ''support'', ''Headphones'', ''Audit et optimisation continue'', ''Amelioration permanente des performances IA'', true, 2),
  (off_ia_pre, ''support'', ''Headphones'', ''Formation IA avancee (8h)'', ''Formation equipe complete'', true, 3),
  (off_ia_pre, ''support'', ''Headphones'', ''Documentation technique'', ''Documentation architecture et API IA'', true, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_branding_ess, ''technologies'', ''Code'', ''Figma'', ''Design professionnel vectoriel'', true, 1),
  (off_branding_ess, ''technologies'', ''Code'', ''Adobe Illustrator'', ''Creation vectorielle haute qualite'', true, 2),
  (off_branding_ess, ''technologies'', ''Code'', ''Google Search Console'', ''Suivi du referencement'', true, 3),
  (off_branding_ess, ''technologies'', ''Code'', ''Semrush / Ahrefs'', ''Outils d''''analyse SEO professionnels'', false, 4),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Logo professionnel'', ''3 propositions + 2 revisions'', true, 1),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Charte graphique basique'', ''Couleurs, typographies, usage du logo'', true, 2),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Audit SEO technique'', ''Analyse complete de votre site'', true, 3),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Optimisation 5 pages'', ''Meta tags, contenu, structure'', true, 4),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Google Business Profile'', ''Creation et optimisation de la fiche'', true, 5),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Rapport de recommandations'', ''Plan d''''action SEO detaille'', true, 6),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Cartes de visite'', ''Design de cartes professionnelles'', false, 7),
  (off_branding_ess, ''fonctionnalites'', ''Layers'', ''Signature email'', ''Signature professionnelle HTML'', false, 8),
  (off_branding_ess, ''design'', ''Palette'', ''Palette de couleurs'', ''5 couleurs harmonieuses pour votre marque'', true, 1),
  (off_branding_ess, ''design'', ''Palette'', ''Typographies'', ''Selection de 2 polices complementaires'', true, 2),
  (off_branding_ess, ''design'', ''Palette'', ''Declinaisons logo'', ''Versions couleur, N&B, monochrome'', true, 3),
  (off_branding_ess, ''design'', ''Palette'', ''Favicon et icones'', ''Icones pour le web et les reseaux sociaux'', false, 4),
  (off_branding_ess, ''seo'', ''Search'', ''Audit SEO complet'', ''Analyse technique, contenu et backlinks'', true, 1),
  (off_branding_ess, ''seo'', ''Search'', ''Sitemap et robots.txt'', ''Configuration technique de base'', true, 2),
  (off_branding_ess, ''seo'', ''Search'', ''Recherche de mots-cles'', ''Identification des mots-cles pertinents'', true, 3),
  (off_branding_ess, ''seo'', ''Search'', ''SEO local'', ''Optimisation pour la recherche locale'', false, 4),
  (off_branding_ess, ''support'', ''Headphones'', ''Fichiers sources livres'', ''Tous les fichiers source (AI, Figma, PNG, SVG)'', true, 1),
  (off_branding_ess, ''support'', ''Headphones'', ''Guide d''''utilisation logo'', ''Document expliquant l''''usage correct du logo'', true, 2),
  (off_branding_ess, ''support'', ''Headphones'', ''2 revisions incluses'', ''Modifications apres livraison'', true, 3);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_branding_bus, ''technologies'', ''Code'', ''Figma'', ''Design system professionnel'', true, 1),
  (off_branding_bus, ''technologies'', ''Code'', ''Adobe Creative Suite'', ''Illustrator, Photoshop, InDesign'', true, 2),
  (off_branding_bus, ''technologies'', ''Code'', ''Semrush'', ''Outil SEO professionnel'', true, 3),
  (off_branding_bus, ''technologies'', ''Code'', ''Google Analytics 4'', ''Analytics avance'', true, 4),
  (off_branding_bus, ''technologies'', ''Code'', ''Ahrefs'', ''Analyse de backlinks et concurrence'', false, 5),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Identite visuelle complete'', ''Logo, charte, supports, guidelines'', true, 1),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Strategie SEO 3 mois'', ''Plan d''''action SEO sur 3 mois'', true, 2),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Contenu mensuel (4 articles)'', ''Redaction optimisee SEO'', true, 3),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Strategie de backlinks'', ''Acquisition de liens entrants de qualite'', true, 4),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Reporting mensuel'', ''Rapport de performance detaille'', true, 5),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Supports print'', ''Cartes de visite, flyers, brochure'', true, 6),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Social media templates'', ''Templates pour vos publications'', false, 7),
  (off_branding_bus, ''fonctionnalites'', ''Layers'', ''Video de presentation courte'', ''Motion design 30s pour les reseaux'', false, 8),
  (off_branding_bus, ''design'', ''Palette'', ''Brand book complet'', ''Document de marque detaille'', true, 1),
  (off_branding_bus, ''design'', ''Palette'', ''Templates reseaux sociaux'', ''Gabarits pour Instagram, LinkedIn, etc.'', true, 2),
  (off_branding_bus, ''design'', ''Palette'', ''Signaletique'', ''Design enseigne et affichage'', false, 3),
  (off_branding_bus, ''seo'', ''Search'', ''Strategie mots-cles complete'', ''Mapping semantique et clustering'', true, 1),
  (off_branding_bus, ''seo'', ''Search'', ''Optimisation technique continue'', ''Corrections et ameliorations regulieres'', true, 2),
  (off_branding_bus, ''seo'', ''Search'', ''Google Analytics + Search Console'', ''Configuration avancee et suivi'', true, 3),
  (off_branding_bus, ''seo'', ''Search'', ''SEO local avance'', ''Citations, avis, Google Maps'', true, 4),
  (off_branding_bus, ''seo'', ''Search'', ''Analyse concurrentielle'', ''Benchmark de vos concurrents'', false, 5),
  (off_branding_bus, ''support'', ''Headphones'', ''Support 3 mois'', ''Assistance par email et telephone'', true, 1),
  (off_branding_bus, ''support'', ''Headphones'', ''Fichiers sources complets'', ''Tous les fichiers natifs'', true, 2),
  (off_branding_bus, ''support'', ''Headphones'', ''5 revisions incluses'', ''Modifications apres livraison'', true, 3),
  (off_branding_bus, ''support'', ''Headphones'', ''Formation brand guidelines'', ''Comment utiliser votre identite visuelle'', false, 4);

INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
  (off_branding_pre, ''technologies'', ''Code'', ''Figma + Adobe CC'', ''Suite creative complete'', true, 1),
  (off_branding_pre, ''technologies'', ''Code'', ''After Effects'', ''Motion design et animation'', true, 2),
  (off_branding_pre, ''technologies'', ''Code'', ''Semrush + Ahrefs'', ''Double analyse SEO premium'', true, 3),
  (off_branding_pre, ''technologies'', ''Code'', ''Google Ads'', ''Plateforme publicitaire Google'', true, 4),
  (off_branding_pre, ''technologies'', ''Code'', ''Meta Ads Manager'', ''Publicite Facebook et Instagram'', false, 5),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Branding complet'', ''Identite visuelle 360 + book de marque'', true, 1),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Strategie SEO 12 mois'', ''Plan d''''action SEO sur 1 an complet'', true, 2),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Content marketing (8 articles/mois)'', ''Redaction de contenu premium'', true, 3),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Gestion reseaux sociaux'', ''Community management et creation de contenu'', true, 4),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Campagnes Google Ads'', ''Gestion de campagnes publicitaires'', true, 5),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Video de presentation'', ''Motion design 60-90s professionnel'', true, 6),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Strategie d''''influence locale'', ''Partenariats avec influenceurs locaux'', true, 7),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Audit reputation en ligne'', ''Analyse et gestion de votre e-reputation'', true, 8),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Podcast / interview'', ''Creation de contenu audio pour la visibilite'', false, 9),
  (off_branding_pre, ''fonctionnalites'', ''Layers'', ''Campagnes Meta Ads'', ''Publicite Facebook et Instagram'', false, 10),
  (off_branding_pre, ''design'', ''Palette'', ''Brand book premium'', ''Document de marque exhaustif'', true, 1),
  (off_branding_pre, ''design'', ''Palette'', ''Kit reseaux sociaux complet'', ''Tous les formats pour tous les reseaux'', true, 2),
  (off_branding_pre, ''design'', ''Palette'', ''Packaging design'', ''Design d''''emballage si applicable'', false, 3),
  (off_branding_pre, ''design'', ''Palette'', ''Merchandising'', ''Design goodies et objets promotionnels'', false, 4),
  (off_branding_pre, ''seo'', ''Search'', ''Strategie SEO 360'', ''Technique, contenu, netlinking, local'', true, 1),
  (off_branding_pre, ''seo'', ''Search'', ''Content clustering'', ''Strategie de contenu en cocon semantique'', true, 2),
  (off_branding_pre, ''seo'', ''Search'', ''Reporting avance'', ''Tableaux de bord et ROI detaille'', true, 3),
  (off_branding_pre, ''seo'', ''Search'', ''A/B testing SEO'', ''Tests pour optimiser les conversions'', false, 4),
  (off_branding_pre, ''support'', ''Headphones'', ''Support prioritaire 12 mois'', ''Reponse sous 4h, support dedie'', true, 1),
  (off_branding_pre, ''support'', ''Headphones'', ''Account manager dedie'', ''Interlocuteur unique pour votre projet'', true, 2),
  (off_branding_pre, ''support'', ''Headphones'', ''Revisions illimitees'', ''Modifications sans limite pendant le contrat'', true, 3),
  (off_branding_pre, ''support'', ''Headphones'', ''Formation equipe (4h)'', ''Formation communication et brand guidelines'', true, 4);

END $$;