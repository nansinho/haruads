-- ============================================
-- Migration 013: Seed Offers Data
-- Catégories, Offres (18), Options détaillées
-- ============================================

-- ---- NETTOYAGE (safe re-run) ----
DELETE FROM public.offer_options;
DELETE FROM public.offers WHERE category_id IS NOT NULL;
DELETE FROM public.offer_categories;

-- ============================================
-- 1. CATÉGORIES D'OFFRES (6 types de services)
-- ============================================
INSERT INTO public.offer_categories (id, name, slug, description, icon, sort_order) VALUES
  ('c0000001-0000-4000-a000-000000000001', 'Site Vitrine', 'site-vitrine', 'Sites vitrines modernes, responsive et performants pour présenter votre activité en ligne.', 'Globe', 1),
  ('c0000001-0000-4000-a000-000000000002', 'E-Commerce', 'e-commerce', 'Boutiques en ligne sur mesure avec paiement sécurisé et gestion de catalogue.', 'ShoppingCart', 2),
  ('c0000001-0000-4000-a000-000000000003', 'Application Web', 'application-web', 'Applications web complexes, dashboards et outils métier sur mesure.', 'Code', 3),
  ('c0000001-0000-4000-a000-000000000004', 'Solution SaaS', 'solution-saas', 'Plateformes SaaS multi-tenant, scalables et sécurisées.', 'Cloud', 4),
  ('c0000001-0000-4000-a000-000000000005', 'Intelligence Artificielle', 'intelligence-artificielle', 'Chatbots IA, automatisation et intégration de modèles de langage.', 'Brain', 5),
  ('c0000001-0000-4000-a000-000000000006', 'Branding & SEO', 'branding-seo', 'Identité visuelle forte et référencement naturel pour une visibilité maximale.', 'Palette', 6);

-- ============================================
-- 2. OFFRES (3 niveaux × 6 catégories = 18)
-- Prix = 0 car "Sur devis uniquement"
-- ============================================

-- ---- SITE VITRINE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000001',
  'Site Vitrine Essentiel',
  'site-vitrine-essentiel',
  'Un site one-page moderne et responsive pour présenter votre activité avec un design soigné.',
  0, 'custom',
  ARRAY['Site one-page responsive', 'Design moderne sur mesure', 'Formulaire de contact', 'Intégration réseaux sociaux', 'Optimisation mobile', 'Hébergement offert 1 an', 'Certificat SSL inclus', 'Livraison sous 2 semaines'],
  false, true, 1,
  'c0000001-0000-4000-a000-000000000001', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000002',
  'Site Vitrine Business',
  'site-vitrine-business',
  'Site multi-pages complet avec blog intégré, CMS headless et optimisations SEO avancées.',
  0, 'custom',
  ARRAY['Site multi-pages (5 à 10 pages)', 'Animations et transitions fluides', 'Blog intégré avec CMS', 'SEO on-page complet', 'CMS headless (édition facile)', 'Formulaires avancés', 'Google Analytics intégré', 'Support 3 mois inclus'],
  true, true, 2,
  'c0000001-0000-4000-a000-000000000001', 'business'
),
(
  '00000001-0000-4000-a000-000000000003',
  'Site Vitrine Premium',
  'site-vitrine-premium',
  'Site sur mesure sans limite de pages, avec animations avancées, multilingue et espace client.',
  0, 'custom',
  ARRAY['Pages illimitées', 'Animations avancées (Framer Motion)', 'Site multilingue (2+ langues)', 'Espace client sécurisé', 'Intégration API tierces', 'Audit UX complet', 'Design system dédié', 'Performance A+ (Core Web Vitals)', 'Support prioritaire 12 mois'],
  false, true, 3,
  'c0000001-0000-4000-a000-000000000001', 'premium'
);

-- ---- E-COMMERCE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000004',
  'E-Commerce Essentiel',
  'e-commerce-essentiel',
  'Boutique en ligne clé en main jusqu''à 50 produits avec paiement Stripe sécurisé.',
  0, 'custom',
  ARRAY['Jusqu''à 50 produits', 'Paiement sécurisé Stripe', 'Design responsive sur mesure', 'Gestion de stock basique', 'Pages produits optimisées', 'Panier et checkout fluide', 'Emails de confirmation', 'Livraison sous 3 semaines'],
  false, true, 4,
  'c0000001-0000-4000-a000-000000000002', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000005',
  'E-Commerce Business',
  'e-commerce-business',
  'Boutique complète jusqu''à 500 produits avec filtres avancés, multi-paiement et analytics.',
  0, 'custom',
  ARRAY['Jusqu''à 500 produits', 'Multi-paiement (Stripe + Monetico)', 'Filtres et recherche avancés', 'Emails transactionnels automatisés', 'Dashboard analytics vendeur', 'Gestion des avis clients', 'Codes promo et réductions', 'Suivi de commandes temps réel', 'Support 6 mois inclus'],
  true, true, 5,
  'c0000001-0000-4000-a000-000000000002', 'business'
),
(
  '00000001-0000-4000-a000-000000000006',
  'E-Commerce Premium',
  'e-commerce-premium',
  'Solution e-commerce illimitée avec marketplace multi-vendeurs, abonnements et IA.',
  0, 'custom',
  ARRAY['Produits illimités', 'Marketplace multi-vendeurs', 'Système d''abonnements', 'Programme de fidélité', 'Recommandations IA', 'Multi-devises et multi-langues', 'API publique pour intégrations', 'Reporting avancé et exports', 'Support prioritaire 12 mois'],
  false, true, 6,
  'c0000001-0000-4000-a000-000000000002', 'premium'
);

-- ---- APPLICATION WEB ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000007',
  'Application Web Essentiel',
  'application-web-essentiel',
  'Application web simple avec authentification, dashboard basique et déploiement cloud.',
  0, 'custom',
  ARRAY['Application web responsive', 'Authentification sécurisée', 'Dashboard utilisateur basique', 'Base de données PostgreSQL', 'Déploiement cloud (Vercel)', 'Interface d''administration', 'API REST basique', 'Livraison sous 4 semaines'],
  false, true, 7,
  'c0000001-0000-4000-a000-000000000003', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000008',
  'Application Web Business',
  'application-web-business',
  'Application complexe avec gestion de rôles, API REST complète et notifications temps réel.',
  0, 'custom',
  ARRAY['Gestion de rôles et permissions', 'API REST complète et documentée', 'Tableau de bord avancé avec graphiques', 'Notifications temps réel', 'Gestion de fichiers et uploads', 'Système de recherche avancé', 'Exports PDF/CSV', 'Tests automatisés', 'Support 6 mois inclus'],
  true, true, 8,
  'c0000001-0000-4000-a000-000000000003', 'business'
),
(
  '00000001-0000-4000-a000-000000000009',
  'Application Web Premium',
  'application-web-premium',
  'Application sur mesure avec architecture microservices, WebSocket et monitoring avancé.',
  0, 'custom',
  ARRAY['Architecture microservices', 'API GraphQL + REST', 'Temps réel WebSocket', 'CI/CD pipeline complet', 'Monitoring et alertes', 'Scalabilité automatique', 'Tests E2E complets', 'Documentation technique', 'Support prioritaire 12 mois'],
  false, true, 9,
  'c0000001-0000-4000-a000-000000000003', 'premium'
);

-- ---- SOLUTION SAAS ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000010',
  'SaaS Essentiel',
  'saas-essentiel',
  'MVP SaaS avec authentification, facturation et dashboard admin. Idéal pour valider votre idée.',
  0, 'custom',
  ARRAY['MVP fonctionnel', 'Authentification complète', 'Facturation Stripe intégrée', 'Dashboard admin', '1 rôle utilisateur', 'Base PostgreSQL', 'Landing page incluse', 'Livraison sous 6 semaines'],
  false, true, 10,
  'c0000001-0000-4000-a000-000000000004', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000011',
  'SaaS Business',
  'saas-business',
  'SaaS multi-tenant complet avec gestion d''abonnements, analytics et API publique.',
  0, 'custom',
  ARRAY['Architecture multi-tenant', 'Gestion d''abonnements Stripe', '3+ rôles utilisateurs', 'Analytics et métriques', 'Webhooks configurables', 'API publique documentée', 'Onboarding utilisateur guidé', 'Emails transactionnels', 'Support 6 mois inclus'],
  true, true, 11,
  'c0000001-0000-4000-a000-000000000004', 'business'
),
(
  '00000001-0000-4000-a000-000000000012',
  'SaaS Premium',
  'saas-premium',
  'SaaS enterprise avec white-label, SSO/SAML, audit logs et SLA garanti.',
  0, 'custom',
  ARRAY['White-label personnalisable', 'SSO / SAML / OAuth2', 'Audit logs complets', 'SLA garanti 99.9%', 'Scalabilité automatique', 'Backups automatiques', 'Support dédié multi-canal', 'Migration de données assistée', 'Support prioritaire 12 mois'],
  false, true, 12,
  'c0000001-0000-4000-a000-000000000004', 'premium'
);

-- ---- INTELLIGENCE ARTIFICIELLE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000013',
  'IA Essentiel',
  'ia-essentiel',
  'Chatbot IA basique intégré à votre site web avec FAQ automatisée et réponses configurables.',
  0, 'custom',
  ARRAY['Chatbot IA intégré au site', 'FAQ automatisée', 'Réponses pré-configurées', 'Widget personnalisable', 'Historique des conversations', 'Interface d''administration', 'Intégration simple (widget JS)', 'Livraison sous 2 semaines'],
  false, true, 13,
  'c0000001-0000-4000-a000-000000000005', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000014',
  'IA Business',
  'ia-business',
  'Chatbot IA avancé avec connexion CRM, analyse de sentiment et génération de contenu.',
  0, 'custom',
  ARRAY['Chatbot IA avancé (GPT/Claude)', 'Connexion CRM et outils métier', 'Analyse de sentiment', 'Génération de contenu IA', 'Multi-canal (site, WhatsApp, email)', 'Escalade vers agent humain', 'Tableau de bord analytics', 'Formation et personnalisation', 'Support 6 mois inclus'],
  true, true, 14,
  'c0000001-0000-4000-a000-000000000005', 'business'
),
(
  '00000001-0000-4000-a000-000000000015',
  'IA Premium',
  'ia-premium',
  'Solution IA sur mesure avec fine-tuning, RAG sur vos documents et automatisation workflow.',
  0, 'custom',
  ARRAY['Solution IA sur mesure', 'Fine-tuning de modèle dédié', 'RAG (Retrieval Augmented Generation)', 'Automatisation de workflows', 'Analytics IA avancés', 'Intégration multi-sources', 'API IA dédiée', 'Audit et optimisation continue', 'Support prioritaire 12 mois'],
  false, true, 15,
  'c0000001-0000-4000-a000-000000000005', 'premium'
);

-- ---- BRANDING & SEO ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  '00000001-0000-4000-a000-000000000016',
  'Branding & SEO Essentiel',
  'branding-seo-essentiel',
  'Logo, charte graphique basique et audit SEO avec optimisation de 5 pages clés.',
  0, 'custom',
  ARRAY['Création de logo professionnel', 'Charte graphique basique', 'Audit SEO technique', 'Optimisation de 5 pages', 'Google Business Profile', 'Fichier sitemap.xml', 'Meta tags optimisés', 'Rapport de recommandations'],
  false, true, 16,
  'c0000001-0000-4000-a000-000000000006', 'essentiel'
),
(
  '00000001-0000-4000-a000-000000000017',
  'Branding & SEO Business',
  'branding-seo-business',
  'Identité visuelle complète, stratégie SEO 3 mois avec création de contenu et reporting.',
  0, 'custom',
  ARRAY['Identité visuelle complète', 'Stratégie SEO 3 mois', 'Création de contenu mensuel (4 articles)', 'Stratégie de backlinks', 'Reporting mensuel détaillé', 'Google Analytics + Search Console', 'Optimisation technique continue', 'Supports print (cartes de visite, flyers)', 'Support 3 mois inclus'],
  true, true, 17,
  'c0000001-0000-4000-a000-000000000006', 'business'
),
(
  '00000001-0000-4000-a000-000000000018',
  'Branding & SEO Premium',
  'branding-seo-premium',
  'Branding complet, stratégie SEO 12 mois, content marketing et gestion des réseaux sociaux.',
  0, 'custom',
  ARRAY['Branding complet et book de marque', 'Stratégie SEO 12 mois', 'Content marketing (8 articles/mois)', 'Gestion réseaux sociaux', 'Campagnes publicitaires (Google Ads)', 'Vidéo de présentation', 'Stratégie d''influence locale', 'Audit de réputation en ligne', 'Support prioritaire 12 mois'],
  false, true, 18,
  'c0000001-0000-4000-a000-000000000006', 'premium'
);


-- ============================================
-- 3. OPTIONS PAR OFFRE (organisées par catégorie)
-- ============================================

-- ========================================
-- SITE VITRINE ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000001', 'technologies', 'Code', 'Next.js / React', 'Framework moderne pour des performances optimales', true, 1),
('00000001-0000-4000-a000-000000000001', 'technologies', 'Code', 'Tailwind CSS', 'Framework CSS utility-first pour un design sur mesure', true, 2),
('00000001-0000-4000-a000-000000000001', 'technologies', 'Code', 'TypeScript', 'Typage statique pour un code robuste et maintenable', true, 3),
('00000001-0000-4000-a000-000000000001', 'technologies', 'Code', 'WordPress', 'CMS traditionnel avec thème sur mesure', false, 4),
('00000001-0000-4000-a000-000000000001', 'technologies', 'Code', 'Framer Motion', 'Animations fluides et interactions modernes', false, 5),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Formulaire de contact', 'Formulaire avec validation et envoi par email', true, 1),
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Intégration réseaux sociaux', 'Liens et feeds vers vos profils sociaux', true, 2),
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Google Maps intégré', 'Carte interactive avec votre localisation', true, 3),
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Blog', 'Section blog avec gestion de contenu', false, 4),
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Chat en direct', 'Widget de chat pour communiquer avec vos visiteurs', false, 5),
('00000001-0000-4000-a000-000000000001', 'fonctionnalites', 'Layers', 'Newsletter', 'Inscription newsletter avec envoi automatisé', false, 6),
-- Design
('00000001-0000-4000-a000-000000000001', 'design', 'Palette', 'Design responsive', 'Adapté mobile, tablette et desktop', true, 1),
('00000001-0000-4000-a000-000000000001', 'design', 'Palette', 'Maquette Figma', '1 maquette Figma avant développement', true, 2),
('00000001-0000-4000-a000-000000000001', 'design', 'Palette', 'Mode sombre', 'Thème sombre en complément du thème clair', false, 3),
('00000001-0000-4000-a000-000000000001', 'design', 'Palette', 'Animations avancées', 'Micro-interactions et transitions élaborées', false, 4),
-- Performance
('00000001-0000-4000-a000-000000000001', 'performance', 'Zap', 'Optimisation images (WebP)', 'Compression et format moderne des images', true, 1),
('00000001-0000-4000-a000-000000000001', 'performance', 'Zap', 'SSL / HTTPS', 'Certificat de sécurité inclus', true, 2),
('00000001-0000-4000-a000-000000000001', 'performance', 'Zap', 'CDN mondial', 'Distribution globale pour des temps de chargement rapides', false, 3),
('00000001-0000-4000-a000-000000000001', 'performance', 'Zap', 'Lazy loading', 'Chargement différé des images et composants', false, 4),
-- SEO
('00000001-0000-4000-a000-000000000001', 'seo', 'Search', 'Meta tags optimisés', 'Title, description et Open Graph configurés', true, 1),
('00000001-0000-4000-a000-000000000001', 'seo', 'Search', 'Sitemap XML', 'Plan du site pour les moteurs de recherche', true, 2),
('00000001-0000-4000-a000-000000000001', 'seo', 'Search', 'Schema.org (données structurées)', 'Rich snippets pour un meilleur affichage Google', false, 3),
('00000001-0000-4000-a000-000000000001', 'seo', 'Search', 'Google Analytics', 'Suivi statistiques et comportement visiteurs', false, 4),
-- Support
('00000001-0000-4000-a000-000000000001', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement Vercel ou Netlify offert', true, 1),
('00000001-0000-4000-a000-000000000001', 'support', 'Headphones', 'Formation utilisation', 'Formation de 1h pour gérer votre site', true, 2),
('00000001-0000-4000-a000-000000000001', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et corrections pendant 1 an', false, 3),
('00000001-0000-4000-a000-000000000001', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h en jours ouvrés', false, 4);

-- ========================================
-- SITE VITRINE BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'Next.js / React', 'Framework moderne pour des performances optimales', true, 1),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'Tailwind CSS', 'Framework CSS utility-first pour un design sur mesure', true, 2),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'TypeScript', 'Typage statique pour un code robuste', true, 3),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'Framer Motion', 'Animations fluides et transitions modernes', true, 4),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'Supabase', 'Backend-as-a-Service pour le CMS et la base de données', true, 5),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'WordPress', 'CMS traditionnel avec thème sur mesure', false, 6),
('00000001-0000-4000-a000-000000000002', 'technologies', 'Code', 'Vue.js / Nuxt', 'Alternative framework JavaScript progressif', false, 7),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Blog intégré avec CMS', 'Blog complet avec éditeur de contenu', true, 1),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Formulaires avancés', 'Formulaires multi-étapes avec validation', true, 2),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Galerie photos/vidéos', 'Portfolio ou galerie média interactive', true, 3),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Newsletter intégrée', 'Inscription et envoi de newsletters', true, 4),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Chat en direct', 'Widget de chat pour communiquer en temps réel', false, 5),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Espace membres', 'Zone privée avec authentification', false, 6),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Système de réservation', 'Prise de rendez-vous en ligne (Calendly-like)', false, 7),
('00000001-0000-4000-a000-000000000002', 'fonctionnalites', 'Layers', 'Multi-langue (2 langues)', 'Site bilingue avec switch de langue', false, 8),
-- Design
('00000001-0000-4000-a000-000000000002', 'design', 'Palette', 'Design responsive premium', 'Design pixel-perfect sur tous les écrans', true, 1),
('00000001-0000-4000-a000-000000000002', 'design', 'Palette', 'Maquettes Figma (3 pages)', 'Maquettes détaillées avant développement', true, 2),
('00000001-0000-4000-a000-000000000002', 'design', 'Palette', 'Animations et transitions', 'Effets de scroll, hover et transitions de page', true, 3),
('00000001-0000-4000-a000-000000000002', 'design', 'Palette', 'Mode sombre', 'Thème sombre élégant en complément', false, 4),
('00000001-0000-4000-a000-000000000002', 'design', 'Palette', 'Design system complet', 'Bibliothèque de composants réutilisables', false, 5),
-- Performance
('00000001-0000-4000-a000-000000000002', 'performance', 'Zap', 'SSR/SSG (Server-Side Rendering)', 'Rendu côté serveur pour des performances maximales', true, 1),
('00000001-0000-4000-a000-000000000002', 'performance', 'Zap', 'CDN mondial', 'Distribution globale du contenu', true, 2),
('00000001-0000-4000-a000-000000000002', 'performance', 'Zap', 'Optimisation images (WebP/AVIF)', 'Formats modernes et compression automatique', true, 3),
('00000001-0000-4000-a000-000000000002', 'performance', 'Zap', 'Core Web Vitals A+', 'Optimisation pour les métriques Google', true, 4),
('00000001-0000-4000-a000-000000000002', 'performance', 'Zap', 'Cache avancé', 'Mise en cache intelligente pour des chargements instantanés', false, 5),
-- SEO
('00000001-0000-4000-a000-000000000002', 'seo', 'Search', 'SEO on-page complet', 'Optimisation de toutes les pages', true, 1),
('00000001-0000-4000-a000-000000000002', 'seo', 'Search', 'Schema.org (données structurées)', 'Rich snippets pour Google', true, 2),
('00000001-0000-4000-a000-000000000002', 'seo', 'Search', 'Google Analytics + Search Console', 'Configuration et suivi des performances', true, 3),
('00000001-0000-4000-a000-000000000002', 'seo', 'Search', 'Stratégie de mots-clés', 'Recherche et ciblage de mots-clés pertinents', false, 4),
('00000001-0000-4000-a000-000000000002', 'seo', 'Search', 'SEO local (Google Business)', 'Optimisation pour le référencement local', false, 5),
-- Support
('00000001-0000-4000-a000-000000000002', 'support', 'Headphones', 'Hébergement inclus', 'Hébergement haute performance inclus', true, 1),
('00000001-0000-4000-a000-000000000002', 'support', 'Headphones', 'Support 3 mois', 'Assistance par email pendant 3 mois', true, 2),
('00000001-0000-4000-a000-000000000002', 'support', 'Headphones', 'Formation CMS (2h)', 'Formation pour gérer votre contenu', true, 3),
('00000001-0000-4000-a000-000000000002', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et monitoring continu', false, 4),
('00000001-0000-4000-a000-000000000002', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h en jours ouvrés', false, 5);

-- ========================================
-- SITE VITRINE PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Next.js / React', 'Framework moderne hautes performances', true, 1),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Tailwind CSS', 'Design system sur mesure', true, 2),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'TypeScript', 'Code robuste et maintenable', true, 3),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Framer Motion', 'Animations avancées et interactions', true, 4),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Backend complet avec base de données', true, 5),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Three.js / WebGL', 'Animations 3D et effets immersifs', false, 6),
('00000001-0000-4000-a000-000000000003', 'technologies', 'Code', 'Headless CMS (Strapi/Sanity)', 'CMS découplé pour plus de flexibilité', false, 7),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Pages illimitées', 'Aucune limite sur le nombre de pages', true, 1),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Multi-langue (3+ langues)', 'Site multilingue avec gestion i18n', true, 2),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Espace client sécurisé', 'Zone privée avec authentification', true, 3),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Intégrations API tierces', 'Connexion CRM, ERP, outils métier', true, 4),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Blog avancé avec catégories', 'Blog complet avec tags, auteurs, recherche', true, 5),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Système de réservation avancé', 'Planning, créneaux, confirmations auto', false, 6),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'Chatbot IA intégré', 'Assistant virtuel pour vos visiteurs', false, 7),
('00000001-0000-4000-a000-000000000003', 'fonctionnalites', 'Layers', 'E-commerce léger', 'Vente de quelques produits/services en ligne', false, 8),
-- Design
('00000001-0000-4000-a000-000000000003', 'design', 'Palette', 'Design system dédié', 'Bibliothèque de composants complète', true, 1),
('00000001-0000-4000-a000-000000000003', 'design', 'Palette', 'Maquettes Figma complètes', 'Toutes les pages maquettées en détail', true, 2),
('00000001-0000-4000-a000-000000000003', 'design', 'Palette', 'Animations avancées', 'Parallax, morphing, effets de scroll', true, 3),
('00000001-0000-4000-a000-000000000003', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', true, 4),
('00000001-0000-4000-a000-000000000003', 'design', 'Palette', 'Audit UX complet', 'Analyse ergonomique et recommandations', true, 5),
-- Performance
('00000001-0000-4000-a000-000000000003', 'performance', 'Zap', 'Core Web Vitals A+', 'Scores parfaits sur toutes les métriques', true, 1),
('00000001-0000-4000-a000-000000000003', 'performance', 'Zap', 'SSR/ISR avancé', 'Rendu hybride pour performances et fraîcheur', true, 2),
('00000001-0000-4000-a000-000000000003', 'performance', 'Zap', 'CDN + Edge Computing', 'Distribution globale avec exécution au plus près', true, 3),
('00000001-0000-4000-a000-000000000003', 'performance', 'Zap', 'PWA (Progressive Web App)', 'Installation sur mobile comme une app native', false, 4),
-- SEO
('00000001-0000-4000-a000-000000000003', 'seo', 'Search', 'SEO technique complet', 'Audit et optimisation en profondeur', true, 1),
('00000001-0000-4000-a000-000000000003', 'seo', 'Search', 'Schema.org avancé', 'Données structurées complètes (FAQ, Breadcrumbs...)', true, 2),
('00000001-0000-4000-a000-000000000003', 'seo', 'Search', 'SEO international (hreflang)', 'Référencement multi-langue', true, 3),
('00000001-0000-4000-a000-000000000003', 'seo', 'Search', 'Stratégie de contenu SEO', 'Plan éditorial et recherche de mots-clés', false, 4),
-- Support
('00000001-0000-4000-a000-000000000003', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 2h en jours ouvrés', true, 1),
('00000001-0000-4000-a000-000000000003', 'support', 'Headphones', 'Maintenance incluse 12 mois', 'Mises à jour, monitoring, corrections', true, 2),
('00000001-0000-4000-a000-000000000003', 'support', 'Headphones', 'Formation complète (4h)', 'Formation approfondie sur l''administration', true, 3),
('00000001-0000-4000-a000-000000000003', 'support', 'Headphones', 'Hébergement premium', 'Infrastructure haute disponibilité', true, 4);


-- ========================================
-- E-COMMERCE ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'Next.js / React', 'Frontend moderne et performant', true, 1),
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'Stripe', 'Paiement sécurisé par carte bancaire', true, 2),
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base de données pour le catalogue', true, 3),
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'Tailwind CSS', 'Design responsive sur mesure', true, 4),
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'WooCommerce / WordPress', 'Solution e-commerce WordPress', false, 5),
('00000001-0000-4000-a000-000000000004', 'technologies', 'Code', 'Shopify (headless)', 'Backend Shopify avec frontend custom', false, 6),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Catalogue jusqu''à 50 produits', 'Gestion produits avec variantes', true, 1),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Panier et checkout', 'Processus d''achat fluide et optimisé', true, 2),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Gestion de stock basique', 'Suivi des quantités disponibles', true, 3),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Emails de confirmation', 'Confirmation de commande automatique', true, 4),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Filtres produits', 'Filtrage par catégorie, prix, taille', false, 5),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Avis clients', 'Système de notation et commentaires', false, 6),
('00000001-0000-4000-a000-000000000004', 'fonctionnalites', 'Layers', 'Codes promo', 'Système de réduction et coupons', false, 7),
-- Design
('00000001-0000-4000-a000-000000000004', 'design', 'Palette', 'Design responsive e-commerce', 'Interface optimisée pour la conversion', true, 1),
('00000001-0000-4000-a000-000000000004', 'design', 'Palette', 'Pages produits attractives', 'Galeries photos, zoom, variantes visuelles', true, 2),
('00000001-0000-4000-a000-000000000004', 'design', 'Palette', 'Maquette Figma boutique', 'Design de la boutique avant développement', true, 3),
('00000001-0000-4000-a000-000000000004', 'design', 'Palette', 'Animations produits', 'Effets de survol et transitions sur les produits', false, 4),
-- Performance
('00000001-0000-4000-a000-000000000004', 'performance', 'Zap', 'Optimisation images produits', 'Compression et formats modernes automatiques', true, 1),
('00000001-0000-4000-a000-000000000004', 'performance', 'Zap', 'SSL / HTTPS', 'Sécurité des transactions', true, 2),
('00000001-0000-4000-a000-000000000004', 'performance', 'Zap', 'Lazy loading catalogue', 'Chargement progressif pour des performances fluides', false, 3),
-- SEO
('00000001-0000-4000-a000-000000000004', 'seo', 'Search', 'SEO produits basique', 'Meta tags et URLs optimisés pour chaque produit', true, 1),
('00000001-0000-4000-a000-000000000004', 'seo', 'Search', 'Schema.org Product', 'Données structurées pour les produits', true, 2),
('00000001-0000-4000-a000-000000000004', 'seo', 'Search', 'Google Merchant Center', 'Intégration pour Google Shopping', false, 3),
-- Support
('00000001-0000-4000-a000-000000000004', 'support', 'Headphones', 'Formation gestion boutique (2h)', 'Apprendre à gérer vos produits et commandes', true, 1),
('00000001-0000-4000-a000-000000000004', 'support', 'Headphones', 'Hébergement inclus', 'Infrastructure sécurisée pour votre boutique', true, 2),
('00000001-0000-4000-a000-000000000004', 'support', 'Headphones', 'Support 3 mois', 'Assistance technique par email', false, 3),
('00000001-0000-4000-a000-000000000004', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et surveillance continue', false, 4);

-- ========================================
-- E-COMMERCE BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Next.js / React', 'Frontend performant et SEO-friendly', true, 1),
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Stripe + Monetico', 'Multi-paiement CB, virements, 3D Secure', true, 2),
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base de données scalable', true, 3),
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Node.js / API REST', 'Backend robuste pour le catalogue et les commandes', true, 4),
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Redis (cache)', 'Cache pour des performances ultra-rapides', false, 5),
('00000001-0000-4000-a000-000000000005', 'technologies', 'Code', 'Algolia (recherche)', 'Recherche instantanée et pertinente', false, 6),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Catalogue jusqu''à 500 produits', 'Gestion avancée avec variantes et attributs', true, 1),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Filtres et recherche avancés', 'Filtrage multi-critères et recherche en temps réel', true, 2),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Dashboard analytics vendeur', 'Statistiques de vente, CA, produits populaires', true, 3),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Gestion des avis clients', 'Notes, commentaires et modération', true, 4),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Codes promo et réductions', 'Coupons, ventes flash, réductions par catégorie', true, 5),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Emails transactionnels', 'Confirmation, expédition, relance panier abandonné', true, 6),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Suivi de commandes temps réel', 'Tracking de la commande pour le client', true, 7),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Wishlist / Favoris', 'Liste de souhaits pour les clients', false, 8),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Comparateur de produits', 'Comparaison côte à côte des produits', false, 9),
('00000001-0000-4000-a000-000000000005', 'fonctionnalites', 'Layers', 'Multi-devises', 'Affichage et paiement en plusieurs devises', false, 10),
-- Design
('00000001-0000-4000-a000-000000000005', 'design', 'Palette', 'Design e-commerce premium', 'Interface de vente haut de gamme', true, 1),
('00000001-0000-4000-a000-000000000005', 'design', 'Palette', 'Maquettes Figma complètes', 'Toutes les pages maquettées', true, 2),
('00000001-0000-4000-a000-000000000005', 'design', 'Palette', 'Animations produits avancées', 'Zoom, 360°, vidéos produits', true, 3),
('00000001-0000-4000-a000-000000000005', 'design', 'Palette', 'Mode sombre', 'Thème sombre pour la boutique', false, 4),
-- Performance
('00000001-0000-4000-a000-000000000005', 'performance', 'Zap', 'CDN + Edge caching', 'Distribution rapide des images et pages', true, 1),
('00000001-0000-4000-a000-000000000005', 'performance', 'Zap', 'Optimisation Core Web Vitals', 'Performances A+ pour le SEO et la conversion', true, 2),
('00000001-0000-4000-a000-000000000005', 'performance', 'Zap', 'Images automatiques WebP/AVIF', 'Compression optimale automatique', true, 3),
('00000001-0000-4000-a000-000000000005', 'performance', 'Zap', 'Prefetching intelligent', 'Pré-chargement des pages probables', false, 4),
-- SEO
('00000001-0000-4000-a000-000000000005', 'seo', 'Search', 'SEO e-commerce complet', 'Optimisation pages catégories et produits', true, 1),
('00000001-0000-4000-a000-000000000005', 'seo', 'Search', 'Schema.org Product + Review', 'Rich snippets produits avec étoiles', true, 2),
('00000001-0000-4000-a000-000000000005', 'seo', 'Search', 'Google Merchant Center', 'Google Shopping et campagnes PLA', true, 3),
('00000001-0000-4000-a000-000000000005', 'seo', 'Search', 'Stratégie de contenu e-commerce', 'Blog et guides d''achat pour le trafic organique', false, 4),
-- Support
('00000001-0000-4000-a000-000000000005', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et fonctionnelle', true, 1),
('00000001-0000-4000-a000-000000000005', 'support', 'Headphones', 'Formation complète (3h)', 'Gestion produits, commandes, analytics', true, 2),
('00000001-0000-4000-a000-000000000005', 'support', 'Headphones', 'Hébergement haute performance', 'Infrastructure optimisée pour l''e-commerce', true, 3),
('00000001-0000-4000-a000-000000000005', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour, surveillance et optimisations', false, 4),
('00000001-0000-4000-a000-000000000005', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h, support téléphonique', false, 5);

-- ========================================
-- E-COMMERCE PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
-- Technologies
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'Next.js / React', 'Frontend ultra-performant', true, 1),
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'Stripe + PayPal + Monetico', 'Tous les modes de paiement', true, 2),
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base scalable pour des milliers de produits', true, 3),
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'Algolia (recherche)', 'Recherche instantanée et tolérante aux fautes', true, 4),
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'Redis (cache + sessions)', 'Performance temps réel', true, 5),
('00000001-0000-4000-a000-000000000006', 'technologies', 'Code', 'API GraphQL', 'API puissante pour les intégrations', false, 6),
-- Fonctionnalités
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Produits illimités', 'Aucune limite de catalogue', true, 1),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Marketplace multi-vendeurs', 'Plusieurs vendeurs sur une même plateforme', true, 2),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Système d''abonnements', 'Vente de produits récurrents (box, services)', true, 3),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Programme de fidélité', 'Points, récompenses et niveaux clients', true, 4),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Recommandations IA', 'Suggestions personnalisées basées sur le comportement', true, 5),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Multi-devises et multi-langues', 'Vente internationale', true, 6),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'API publique', 'Intégration avec ERP, CRM et outils tiers', true, 7),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Click & Collect', 'Retrait en magasin', false, 8),
('00000001-0000-4000-a000-000000000006', 'fonctionnalites', 'Layers', 'Live Shopping', 'Vente en direct avec vidéo', false, 9),
-- Design
('00000001-0000-4000-a000-000000000006', 'design', 'Palette', 'Design sur mesure luxe', 'Expérience d''achat haut de gamme', true, 1),
('00000001-0000-4000-a000-000000000006', 'design', 'Palette', 'Design system e-commerce', 'Composants réutilisables pour toute la boutique', true, 2),
('00000001-0000-4000-a000-000000000006', 'design', 'Palette', 'AR (Réalité Augmentée)', 'Visualisation produits en réalité augmentée', false, 3),
-- Performance
('00000001-0000-4000-a000-000000000006', 'performance', 'Zap', 'Architecture edge-first', 'Performances mondiales optimales', true, 1),
('00000001-0000-4000-a000-000000000006', 'performance', 'Zap', 'Auto-scaling', 'Infrastructure qui s''adapte au trafic', true, 2),
('00000001-0000-4000-a000-000000000006', 'performance', 'Zap', 'Monitoring temps réel', 'Alertes performances et erreurs', true, 3),
-- SEO
('00000001-0000-4000-a000-000000000006', 'seo', 'Search', 'SEO e-commerce avancé', 'Stratégie SEO complète pour le e-commerce', true, 1),
('00000001-0000-4000-a000-000000000006', 'seo', 'Search', 'Google Shopping + Merchant Center', 'Campagnes shopping automatisées', true, 2),
('00000001-0000-4000-a000-000000000006', 'seo', 'Search', 'SEO international (hreflang)', 'Référencement multi-pays', true, 3),
-- Support
('00000001-0000-4000-a000-000000000006', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 2h, support téléphonique', true, 1),
('00000001-0000-4000-a000-000000000006', 'support', 'Headphones', 'Maintenance incluse 12 mois', 'Mises à jour, monitoring, optimisations', true, 2),
('00000001-0000-4000-a000-000000000006', 'support', 'Headphones', 'Formation approfondie (6h)', 'Formation complète équipe', true, 3),
('00000001-0000-4000-a000-000000000006', 'support', 'Headphones', 'Account manager dédié', 'Interlocuteur unique pour votre projet', false, 4);


-- ========================================
-- APPLICATION WEB ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'Next.js / React', 'Frontend moderne', true, 1),
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'Node.js', 'Backend JavaScript performant', true, 2),
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base de données et authentification', true, 3),
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'TypeScript', 'Code typé et robuste', true, 4),
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'Python / Django', 'Alternative backend Python', false, 5),
('00000001-0000-4000-a000-000000000007', 'technologies', 'Code', 'Firebase', 'Alternative backend Google', false, 6),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'Authentification sécurisée', 'Login, inscription, mot de passe oublié', true, 1),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'Dashboard utilisateur', 'Tableau de bord avec données clés', true, 2),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'Interface d''administration', 'Back-office pour gérer l''application', true, 3),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'API REST basique', 'Endpoints pour les opérations CRUD', true, 4),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'Gestion de fichiers', 'Upload et gestion de documents', false, 5),
('00000001-0000-4000-a000-000000000007', 'fonctionnalites', 'Layers', 'Notifications email', 'Envoi d''emails automatisés', false, 6),
('00000001-0000-4000-a000-000000000007', 'design', 'Palette', 'Design responsive', 'Interface adaptée à tous les écrans', true, 1),
('00000001-0000-4000-a000-000000000007', 'design', 'Palette', 'Maquette Figma', '1 maquette avant développement', true, 2),
('00000001-0000-4000-a000-000000000007', 'design', 'Palette', 'Composants UI modernes', 'Interface claire et intuitive', true, 3),
('00000001-0000-4000-a000-000000000007', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', false, 4),
('00000001-0000-4000-a000-000000000007', 'performance', 'Zap', 'Déploiement cloud (Vercel)', 'Hébergement performant et scalable', true, 1),
('00000001-0000-4000-a000-000000000007', 'performance', 'Zap', 'SSL / HTTPS', 'Connexion sécurisée', true, 2),
('00000001-0000-4000-a000-000000000007', 'performance', 'Zap', 'Monitoring basique', 'Surveillance de la disponibilité', false, 3),
('00000001-0000-4000-a000-000000000007', 'seo', 'Search', 'Meta tags', 'Référencement basique', true, 1),
('00000001-0000-4000-a000-000000000007', 'seo', 'Search', 'Sitemap XML', 'Plan du site pour les moteurs', true, 2),
('00000001-0000-4000-a000-000000000007', 'support', 'Headphones', 'Hébergement inclus', 'Infrastructure cloud offerte', true, 1),
('00000001-0000-4000-a000-000000000007', 'support', 'Headphones', 'Formation (2h)', 'Formation à l''utilisation', true, 2),
('00000001-0000-4000-a000-000000000007', 'support', 'Headphones', 'Support 3 mois', 'Assistance technique par email', false, 3);

-- ========================================
-- APPLICATION WEB BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Next.js / React', 'Frontend moderne hautes performances', true, 1),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Node.js / Express', 'Backend robuste et scalable', true, 2),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base relationnelle performante', true, 3),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'TypeScript', 'Code typé pour la maintenabilité', true, 4),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Socket.io / WebSocket', 'Communication temps réel', true, 5),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Redis', 'Cache et sessions hautes performances', false, 6),
('00000001-0000-4000-a000-000000000008', 'technologies', 'Code', 'Docker', 'Conteneurisation pour le déploiement', false, 7),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Gestion de rôles et permissions', 'Admin, manager, utilisateur, etc.', true, 1),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'API REST complète', 'API documentée avec Swagger/OpenAPI', true, 2),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Dashboard avancé avec graphiques', 'Visualisations de données interactives', true, 3),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Notifications temps réel', 'Push notifications et alertes in-app', true, 4),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Gestion de fichiers avancée', 'Upload, preview, gestion de dossiers', true, 5),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Exports PDF/CSV/Excel', 'Export des données dans plusieurs formats', true, 6),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Recherche avancée', 'Recherche full-text avec filtres complexes', true, 7),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Workflow automatisé', 'Automatisation de processus métier', false, 8),
('00000001-0000-4000-a000-000000000008', 'fonctionnalites', 'Layers', 'Intégration CRM/ERP', 'Connexion avec vos outils existants', false, 9),
('00000001-0000-4000-a000-000000000008', 'design', 'Palette', 'Design responsive premium', 'UI moderne et professionnelle', true, 1),
('00000001-0000-4000-a000-000000000008', 'design', 'Palette', 'Maquettes Figma (5+ pages)', 'Maquettes détaillées de toutes les vues', true, 2),
('00000001-0000-4000-a000-000000000008', 'design', 'Palette', 'Composants UI avancés', 'Tableaux, graphiques, drag-and-drop', true, 3),
('00000001-0000-4000-a000-000000000008', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', false, 4),
('00000001-0000-4000-a000-000000000008', 'design', 'Palette', 'Design system complet', 'Bibliothèque de composants documentée', false, 5),
('00000001-0000-4000-a000-000000000008', 'performance', 'Zap', 'Tests automatisés', 'Tests unitaires et d''intégration', true, 1),
('00000001-0000-4000-a000-000000000008', 'performance', 'Zap', 'CDN + Cache intelligent', 'Distribution rapide du contenu', true, 2),
('00000001-0000-4000-a000-000000000008', 'performance', 'Zap', 'Monitoring et alertes', 'Surveillance de la santé de l''application', false, 3),
('00000001-0000-4000-a000-000000000008', 'performance', 'Zap', 'CI/CD pipeline', 'Déploiement continu automatisé', false, 4),
('00000001-0000-4000-a000-000000000008', 'seo', 'Search', 'SEO technique', 'Optimisation pour les moteurs de recherche', true, 1),
('00000001-0000-4000-a000-000000000008', 'seo', 'Search', 'Analytics intégré', 'Suivi des utilisateurs et comportements', true, 2),
('00000001-0000-4000-a000-000000000008', 'support', 'Headphones', 'Support 6 mois', 'Assistance par email et téléphone', true, 1),
('00000001-0000-4000-a000-000000000008', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation utilisateurs et administrateurs', true, 2),
('00000001-0000-4000-a000-000000000008', 'support', 'Headphones', 'Documentation technique', 'Documentation API et guides utilisateur', true, 3),
('00000001-0000-4000-a000-000000000008', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et optimisations', false, 4);

-- ========================================
-- APPLICATION WEB PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'Next.js / React', 'Frontend ultra-performant', true, 1),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'Node.js microservices', 'Architecture distribuée scalable', true, 2),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'PostgreSQL + Redis', 'Base + cache hautes performances', true, 3),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'GraphQL + REST', 'APIs flexibles et performantes', true, 4),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'Docker + Kubernetes', 'Orchestration de conteneurs', true, 5),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'WebSocket', 'Communication bidirectionnelle temps réel', true, 6),
('00000001-0000-4000-a000-000000000009', 'technologies', 'Code', 'Terraform / IaC', 'Infrastructure as Code', false, 7),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Architecture microservices', 'Services indépendants et scalables', true, 1),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Temps réel WebSocket', 'Mises à jour instantanées', true, 2),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'CI/CD pipeline complet', 'Tests, build, deploy automatisés', true, 3),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Monitoring avancé', 'Logs, métriques, traces distribuées', true, 4),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Tests E2E complets', 'Couverture de tests exhaustive', true, 5),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Message queue (RabbitMQ)', 'Communication asynchrone entre services', false, 6),
('00000001-0000-4000-a000-000000000009', 'fonctionnalites', 'Layers', 'Machine Learning intégré', 'Modèles IA embarqués dans l''app', false, 7),
('00000001-0000-4000-a000-000000000009', 'design', 'Palette', 'Design system complet', 'Storybook + composants documentés', true, 1),
('00000001-0000-4000-a000-000000000009', 'design', 'Palette', 'Maquettes Figma complètes', 'Toutes les vues et interactions', true, 2),
('00000001-0000-4000-a000-000000000009', 'design', 'Palette', 'Mode sombre natif', 'Support complet du mode sombre', true, 3),
('00000001-0000-4000-a000-000000000009', 'design', 'Palette', 'Accessibilité WCAG AA', 'Conformité accessibilité', false, 4),
('00000001-0000-4000-a000-000000000009', 'performance', 'Zap', 'Scalabilité automatique', 'Auto-scaling basé sur le trafic', true, 1),
('00000001-0000-4000-a000-000000000009', 'performance', 'Zap', 'Monitoring temps réel', 'Dashboards de performance live', true, 2),
('00000001-0000-4000-a000-000000000009', 'performance', 'Zap', 'Backups automatiques', 'Sauvegardes et plan de reprise', true, 3),
('00000001-0000-4000-a000-000000000009', 'performance', 'Zap', 'Load testing', 'Tests de charge avant mise en production', false, 4),
('00000001-0000-4000-a000-000000000009', 'seo', 'Search', 'SEO technique avancé', 'Optimisation complète', true, 1),
('00000001-0000-4000-a000-000000000009', 'seo', 'Search', 'Analytics avancé', 'Suivi détaillé et custom events', true, 2),
('00000001-0000-4000-a000-000000000009', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 2h, support dédié', true, 1),
('00000001-0000-4000-a000-000000000009', 'support', 'Headphones', 'Maintenance incluse 12 mois', 'Mises à jour et monitoring continu', true, 2),
('00000001-0000-4000-a000-000000000009', 'support', 'Headphones', 'Documentation technique complète', 'Architecture, API, guides de contribution', true, 3),
('00000001-0000-4000-a000-000000000009', 'support', 'Headphones', 'Formation équipe (8h)', 'Formation approfondie développeurs et admins', true, 4);


-- ========================================
-- SAAS ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000010', 'technologies', 'Code', 'Next.js / React', 'Frontend SaaS moderne', true, 1),
('00000001-0000-4000-a000-000000000010', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Backend et base de données', true, 2),
('00000001-0000-4000-a000-000000000010', 'technologies', 'Code', 'Stripe Billing', 'Facturation et abonnements', true, 3),
('00000001-0000-4000-a000-000000000010', 'technologies', 'Code', 'TypeScript', 'Code typé et maintenable', true, 4),
('00000001-0000-4000-a000-000000000010', 'technologies', 'Code', 'Vercel / AWS', 'Hébergement cloud performant', true, 5),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Authentification complète', 'Login, signup, OAuth, reset password', true, 1),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Facturation Stripe', 'Plans, abonnements, factures auto', true, 2),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Dashboard admin', 'Vue d''ensemble et gestion', true, 3),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', '1 rôle utilisateur', 'Gestion basique des accès', true, 4),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Landing page', 'Page de présentation du produit', true, 5),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Onboarding utilisateur', 'Guide de prise en main', false, 6),
('00000001-0000-4000-a000-000000000010', 'fonctionnalites', 'Layers', 'Emails transactionnels', 'Emails automatiques (bienvenue, facture)', false, 7),
('00000001-0000-4000-a000-000000000010', 'design', 'Palette', 'Design SaaS moderne', 'Interface clean et fonctionnelle', true, 1),
('00000001-0000-4000-a000-000000000010', 'design', 'Palette', 'Maquettes Figma MVP', 'Écrans principaux maquettés', true, 2),
('00000001-0000-4000-a000-000000000010', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', false, 3),
('00000001-0000-4000-a000-000000000010', 'performance', 'Zap', 'Déploiement cloud', 'Infrastructure haute disponibilité', true, 1),
('00000001-0000-4000-a000-000000000010', 'performance', 'Zap', 'SSL / HTTPS', 'Connexion sécurisée', true, 2),
('00000001-0000-4000-a000-000000000010', 'seo', 'Search', 'SEO landing page', 'Optimisation de la page d''accueil', true, 1),
('00000001-0000-4000-a000-000000000010', 'seo', 'Search', 'Analytics intégré', 'Suivi des conversions et usage', true, 2),
('00000001-0000-4000-a000-000000000010', 'support', 'Headphones', 'Hébergement inclus', 'Cloud hosting performant', true, 1),
('00000001-0000-4000-a000-000000000010', 'support', 'Headphones', 'Formation (2h)', 'Prise en main de la plateforme', true, 2),
('00000001-0000-4000-a000-000000000010', 'support', 'Headphones', 'Support 3 mois', 'Assistance technique email', false, 3);

-- ========================================
-- SAAS BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Next.js / React', 'Frontend SaaS performant', true, 1),
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Node.js / Express', 'Backend API robuste', true, 2),
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Supabase / PostgreSQL', 'Base multi-tenant', true, 3),
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Stripe Billing', 'Gestion complète des abonnements', true, 4),
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Redis', 'Cache et rate limiting', true, 5),
('00000001-0000-4000-a000-000000000011', 'technologies', 'Code', 'Docker', 'Conteneurisation pour le déploiement', false, 6),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Architecture multi-tenant', 'Isolation des données par organisation', true, 1),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Gestion d''abonnements', 'Plans, upgrade, downgrade, trial', true, 2),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', '3+ rôles utilisateurs', 'Admin, manager, membre, viewer', true, 3),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Analytics et métriques', 'Dashboards avec KPIs métier', true, 4),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Webhooks configurables', 'Événements temps réel vers apps tierces', true, 5),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'API publique documentée', 'API REST avec documentation Swagger', true, 6),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Onboarding guidé', 'Parcours de prise en main interactif', true, 7),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Intégration Zapier/Make', 'Connexion no-code avec 5000+ apps', false, 8),
('00000001-0000-4000-a000-000000000011', 'fonctionnalites', 'Layers', 'Système de notifications', 'Email, in-app, push notifications', false, 9),
('00000001-0000-4000-a000-000000000011', 'design', 'Palette', 'Design SaaS premium', 'Interface professionnelle et intuitive', true, 1),
('00000001-0000-4000-a000-000000000011', 'design', 'Palette', 'Maquettes Figma complètes', 'Tous les écrans et flux', true, 2),
('00000001-0000-4000-a000-000000000011', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', true, 3),
('00000001-0000-4000-a000-000000000011', 'design', 'Palette', 'Design system', 'Composants réutilisables', false, 4),
('00000001-0000-4000-a000-000000000011', 'performance', 'Zap', 'Auto-scaling', 'Infrastructure qui s''adapte', true, 1),
('00000001-0000-4000-a000-000000000011', 'performance', 'Zap', 'Rate limiting', 'Protection contre les abus', true, 2),
('00000001-0000-4000-a000-000000000011', 'performance', 'Zap', 'Monitoring', 'Surveillance de la santé du SaaS', true, 3),
('00000001-0000-4000-a000-000000000011', 'performance', 'Zap', 'CI/CD pipeline', 'Déploiement continu automatisé', false, 4),
('00000001-0000-4000-a000-000000000011', 'seo', 'Search', 'SEO marketing site', 'Optimisation pages marketing', true, 1),
('00000001-0000-4000-a000-000000000011', 'seo', 'Search', 'Analytics produit', 'Suivi de l''usage et des conversions', true, 2),
('00000001-0000-4000-a000-000000000011', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et fonctionnelle', true, 1),
('00000001-0000-4000-a000-000000000011', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation admins et utilisateurs', true, 2),
('00000001-0000-4000-a000-000000000011', 'support', 'Headphones', 'Documentation API', 'Documentation développeur complète', true, 3),
('00000001-0000-4000-a000-000000000011', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et optimisations', false, 4);

-- ========================================
-- SAAS PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'Next.js / React', 'Frontend enterprise', true, 1),
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'Node.js microservices', 'Backend distribué et scalable', true, 2),
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'PostgreSQL + Redis', 'Stack données enterprise', true, 3),
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'Kubernetes', 'Orchestration de conteneurs', true, 4),
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'Terraform', 'Infrastructure as Code', true, 5),
('00000001-0000-4000-a000-000000000012', 'technologies', 'Code', 'Elasticsearch', 'Recherche full-text puissante', false, 6),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'White-label', 'Personnalisation complète de la marque', true, 1),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'SSO / SAML / OAuth2', 'Authentification enterprise', true, 2),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'Audit logs complets', 'Traçabilité de toutes les actions', true, 3),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'SLA garanti 99.9%', 'Disponibilité garantie contractuellement', true, 4),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'Backups automatiques', 'Sauvegardes et plan de reprise d''activité', true, 5),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'Migration de données', 'Import de données depuis votre ancien système', true, 6),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'RGPD / Compliance', 'Conformité réglementaire intégrée', false, 7),
('00000001-0000-4000-a000-000000000012', 'fonctionnalites', 'Layers', 'API GraphQL', 'API flexible et performante', false, 8),
('00000001-0000-4000-a000-000000000012', 'design', 'Palette', 'Design system enterprise', 'Composants documentés et testés', true, 1),
('00000001-0000-4000-a000-000000000012', 'design', 'Palette', 'Maquettes et prototypes', 'UX research + prototypes interactifs', true, 2),
('00000001-0000-4000-a000-000000000012', 'design', 'Palette', 'Mode sombre', 'Support complet mode sombre', true, 3),
('00000001-0000-4000-a000-000000000012', 'design', 'Palette', 'Accessibilité WCAG AA', 'Conformité accessibilité', false, 4),
('00000001-0000-4000-a000-000000000012', 'performance', 'Zap', 'Scalabilité automatique', 'Auto-scaling horizontal', true, 1),
('00000001-0000-4000-a000-000000000012', 'performance', 'Zap', 'Monitoring avancé', 'APM, logs, métriques, alertes', true, 2),
('00000001-0000-4000-a000-000000000012', 'performance', 'Zap', 'Multi-région', 'Déploiement géographique distribué', true, 3),
('00000001-0000-4000-a000-000000000012', 'performance', 'Zap', 'Chaos engineering', 'Tests de résilience automatisés', false, 4),
('00000001-0000-4000-a000-000000000012', 'seo', 'Search', 'SEO marketing avancé', 'Optimisation landing pages et blog', true, 1),
('00000001-0000-4000-a000-000000000012', 'seo', 'Search', 'Analytics produit avancé', 'Funnels, cohortes, A/B testing', true, 2),
('00000001-0000-4000-a000-000000000012', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 2h, support dédié', true, 1),
('00000001-0000-4000-a000-000000000012', 'support', 'Headphones', 'Maintenance incluse 12 mois', 'Mises à jour, monitoring, patchs sécurité', true, 2),
('00000001-0000-4000-a000-000000000012', 'support', 'Headphones', 'Account manager dédié', 'Interlocuteur unique pour votre projet', true, 3),
('00000001-0000-4000-a000-000000000012', 'support', 'Headphones', 'Formation complète (12h)', 'Formation équipe + documentation interne', true, 4);


-- ========================================
-- IA ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000013', 'technologies', 'Code', 'OpenAI GPT-4', 'Modèle de langage le plus avancé', true, 1),
('00000001-0000-4000-a000-000000000013', 'technologies', 'Code', 'Claude (Anthropic)', 'IA conversationnelle sûre et capable', false, 2),
('00000001-0000-4000-a000-000000000013', 'technologies', 'Code', 'Mistral AI', 'Modèle français open-source', false, 3),
('00000001-0000-4000-a000-000000000013', 'technologies', 'Code', 'Next.js / React', 'Interface web du chatbot', true, 4),
('00000001-0000-4000-a000-000000000013', 'technologies', 'Code', 'Supabase', 'Stockage des conversations', true, 5),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'Chatbot intégré au site', 'Widget de chat personnalisable', true, 1),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'FAQ automatisée', 'Réponses automatiques aux questions fréquentes', true, 2),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'Réponses pré-configurées', 'Scénarios de conversation définis', true, 3),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'Historique conversations', 'Accès à l''historique des échanges', true, 4),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'Collecte de leads', 'Récupération d''emails et informations', false, 5),
('00000001-0000-4000-a000-000000000013', 'fonctionnalites', 'Layers', 'Escalade vers humain', 'Transfert vers un agent humain', false, 6),
('00000001-0000-4000-a000-000000000013', 'design', 'Palette', 'Widget personnalisable', 'Couleurs, position, avatar personnalisés', true, 1),
('00000001-0000-4000-a000-000000000013', 'design', 'Palette', 'Design responsive', 'Adapté mobile et desktop', true, 2),
('00000001-0000-4000-a000-000000000013', 'design', 'Palette', 'Animations chat', 'Effet de frappe et transitions', false, 3),
('00000001-0000-4000-a000-000000000013', 'performance', 'Zap', 'Temps de réponse < 3s', 'Réponses rapides garanties', true, 1),
('00000001-0000-4000-a000-000000000013', 'performance', 'Zap', 'Cache des réponses', 'Réponses instantanées pour les questions fréquentes', true, 2),
('00000001-0000-4000-a000-000000000013', 'seo', 'Search', 'Données structurées FAQ', 'Schema.org pour les FAQ', true, 1),
('00000001-0000-4000-a000-000000000013', 'support', 'Headphones', 'Formation administration (1h)', 'Configuration et personnalisation du chatbot', true, 1),
('00000001-0000-4000-a000-000000000013', 'support', 'Headphones', 'Support 3 mois', 'Assistance par email', true, 2),
('00000001-0000-4000-a000-000000000013', 'support', 'Headphones', 'Maintenance mensuelle', 'Mise à jour du modèle et corrections', false, 3);

-- ========================================
-- IA BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'OpenAI GPT-4 Turbo', 'Modèle avancé rapide', true, 1),
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'Claude (Anthropic)', 'IA fiable et sécurisée', true, 2),
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'LangChain', 'Framework pour chaînes IA complexes', true, 3),
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'Pinecone / Weaviate', 'Base vectorielle pour la recherche sémantique', true, 4),
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'Python', 'Backend IA spécialisé', true, 5),
('00000001-0000-4000-a000-000000000014', 'technologies', 'Code', 'Mistral AI', 'Modèle français performant', false, 6),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Chatbot IA avancé', 'Conversations naturelles et contextuelles', true, 1),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Connexion CRM', 'Synchronisation avec votre CRM', true, 2),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Analyse de sentiment', 'Détection du ton et de l''émotion', true, 3),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Génération de contenu', 'Création automatique de textes, emails', true, 4),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Multi-canal', 'Site web, WhatsApp, email, Slack', true, 5),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Escalade agent humain', 'Transfert intelligent vers support humain', true, 6),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Dashboard analytics IA', 'Métriques de performance du chatbot', true, 7),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Résumé automatique', 'Résumés des conversations et insights', false, 8),
('00000001-0000-4000-a000-000000000014', 'fonctionnalites', 'Layers', 'Traduction automatique', 'Réponses multilingues en temps réel', false, 9),
('00000001-0000-4000-a000-000000000014', 'design', 'Palette', 'Interface chat premium', 'Design conversationnel moderne', true, 1),
('00000001-0000-4000-a000-000000000014', 'design', 'Palette', 'Dashboard admin', 'Interface de gestion et analytics', true, 2),
('00000001-0000-4000-a000-000000000014', 'design', 'Palette', 'Branding personnalisé', 'Intégration complète à votre marque', true, 3),
('00000001-0000-4000-a000-000000000014', 'performance', 'Zap', 'Temps de réponse < 2s', 'Streaming des réponses en temps réel', true, 1),
('00000001-0000-4000-a000-000000000014', 'performance', 'Zap', 'Fallback multi-modèle', 'Basculement automatique si un modèle est indisponible', true, 2),
('00000001-0000-4000-a000-000000000014', 'performance', 'Zap', 'Rate limiting intelligent', 'Protection contre les abus', true, 3),
('00000001-0000-4000-a000-000000000014', 'seo', 'Search', 'Données structurées', 'FAQ et chatbot pour le SEO', true, 1),
('00000001-0000-4000-a000-000000000014', 'seo', 'Search', 'Analytics conversationnel', 'Insights sur les questions fréquentes', true, 2),
('00000001-0000-4000-a000-000000000014', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et tuning IA', true, 1),
('00000001-0000-4000-a000-000000000014', 'support', 'Headphones', 'Formation IA (3h)', 'Formation à la gestion et personnalisation', true, 2),
('00000001-0000-4000-a000-000000000014', 'support', 'Headphones', 'Optimisation mensuelle', 'Amélioration continue des réponses', false, 3);

-- ========================================
-- IA PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'OpenAI GPT-4 / GPT-4o', 'Modèle le plus puissant', true, 1),
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'Claude 3.5 Sonnet', 'IA Anthropic fiable et puissante', true, 2),
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'LangChain / LlamaIndex', 'Frameworks IA avancés', true, 3),
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'Pinecone / Weaviate', 'Base vectorielle pour le RAG', true, 4),
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'Python + FastAPI', 'Backend IA haute performance', true, 5),
('00000001-0000-4000-a000-000000000015', 'technologies', 'Code', 'Hugging Face', 'Modèles custom et fine-tuning', true, 6),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Solution IA sur mesure', 'Développement adapté à votre métier', true, 1),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Fine-tuning de modèle', 'Modèle entraîné sur vos données', true, 2),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'RAG (documents)', 'IA qui répond à partir de vos documents', true, 3),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Automatisation workflow', 'Processus métier automatisés par l''IA', true, 4),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Analytics IA avancés', 'Insights et prédictions basés sur l''IA', true, 5),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Intégration multi-sources', 'Connexion à toutes vos données (DB, API, fichiers)', true, 6),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'API IA dédiée', 'API pour intégrer l''IA dans vos apps', true, 7),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Vision par ordinateur', 'Analyse et classification d''images', false, 8),
('00000001-0000-4000-a000-000000000015', 'fonctionnalites', 'Layers', 'Speech-to-text / TTS', 'Reconnaissance et synthèse vocale', false, 9),
('00000001-0000-4000-a000-000000000015', 'design', 'Palette', 'Interface IA sur mesure', 'Design adapté à votre cas d''usage', true, 1),
('00000001-0000-4000-a000-000000000015', 'design', 'Palette', 'Dashboard monitoring IA', 'Visualisation des performances IA', true, 2),
('00000001-0000-4000-a000-000000000015', 'design', 'Palette', 'Prototypes interactifs', 'Tests utilisateurs avant développement', true, 3),
('00000001-0000-4000-a000-000000000015', 'performance', 'Zap', 'GPU dédié si nécessaire', 'Ressources de calcul dédiées', true, 1),
('00000001-0000-4000-a000-000000000015', 'performance', 'Zap', 'Cache sémantique', 'Réponses instantanées pour requêtes similaires', true, 2),
('00000001-0000-4000-a000-000000000015', 'performance', 'Zap', 'Monitoring IA temps réel', 'Qualité des réponses et performances', true, 3),
('00000001-0000-4000-a000-000000000015', 'seo', 'Search', 'Content IA pour le SEO', 'Génération de contenu optimisé SEO', true, 1),
('00000001-0000-4000-a000-000000000015', 'seo', 'Search', 'Analytics prédictif', 'Prévisions basées sur l''IA', true, 2),
('00000001-0000-4000-a000-000000000015', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 2h, support dédié', true, 1),
('00000001-0000-4000-a000-000000000015', 'support', 'Headphones', 'Audit et optimisation continue', 'Amélioration permanente des performances IA', true, 2),
('00000001-0000-4000-a000-000000000015', 'support', 'Headphones', 'Formation IA avancée (8h)', 'Formation équipe complète', true, 3),
('00000001-0000-4000-a000-000000000015', 'support', 'Headphones', 'Documentation technique', 'Documentation architecture et API IA', true, 4);

-- ========================================
-- BRANDING & SEO ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000016', 'technologies', 'Code', 'Figma', 'Design professionnel vectoriel', true, 1),
('00000001-0000-4000-a000-000000000016', 'technologies', 'Code', 'Adobe Illustrator', 'Création vectorielle haute qualité', true, 2),
('00000001-0000-4000-a000-000000000016', 'technologies', 'Code', 'Google Search Console', 'Suivi du référencement', true, 3),
('00000001-0000-4000-a000-000000000016', 'technologies', 'Code', 'Semrush / Ahrefs', 'Outils d''analyse SEO professionnels', false, 4),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Logo professionnel', '3 propositions + 2 révisions', true, 1),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Charte graphique basique', 'Couleurs, typographies, usage du logo', true, 2),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Audit SEO technique', 'Analyse complète de votre site', true, 3),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Optimisation 5 pages', 'Meta tags, contenu, structure', true, 4),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Google Business Profile', 'Création et optimisation de la fiche', true, 5),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Rapport de recommandations', 'Plan d''action SEO détaillé', true, 6),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Cartes de visite', 'Design de cartes professionnelles', false, 7),
('00000001-0000-4000-a000-000000000016', 'fonctionnalites', 'Layers', 'Signature email', 'Signature professionnelle HTML', false, 8),
('00000001-0000-4000-a000-000000000016', 'design', 'Palette', 'Palette de couleurs', '5 couleurs harmonieuses pour votre marque', true, 1),
('00000001-0000-4000-a000-000000000016', 'design', 'Palette', 'Typographies', 'Sélection de 2 polices complémentaires', true, 2),
('00000001-0000-4000-a000-000000000016', 'design', 'Palette', 'Déclinaisons logo', 'Versions couleur, N&B, monochrome', true, 3),
('00000001-0000-4000-a000-000000000016', 'design', 'Palette', 'Favicon et icônes', 'Icônes pour le web et les réseaux sociaux', false, 4),
('00000001-0000-4000-a000-000000000016', 'seo', 'Search', 'Audit SEO complet', 'Analyse technique, contenu et backlinks', true, 1),
('00000001-0000-4000-a000-000000000016', 'seo', 'Search', 'Sitemap et robots.txt', 'Configuration technique de base', true, 2),
('00000001-0000-4000-a000-000000000016', 'seo', 'Search', 'Recherche de mots-clés', 'Identification des mots-clés pertinents', true, 3),
('00000001-0000-4000-a000-000000000016', 'seo', 'Search', 'SEO local', 'Optimisation pour la recherche locale', false, 4),
('00000001-0000-4000-a000-000000000016', 'support', 'Headphones', 'Fichiers sources livrés', 'Tous les fichiers source (AI, Figma, PNG, SVG)', true, 1),
('00000001-0000-4000-a000-000000000016', 'support', 'Headphones', 'Guide d''utilisation logo', 'Document expliquant l''usage correct du logo', true, 2),
('00000001-0000-4000-a000-000000000016', 'support', 'Headphones', '2 révisions incluses', 'Modifications après livraison', true, 3);

-- ========================================
-- BRANDING & SEO BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000017', 'technologies', 'Code', 'Figma', 'Design system professionnel', true, 1),
('00000001-0000-4000-a000-000000000017', 'technologies', 'Code', 'Adobe Creative Suite', 'Illustrator, Photoshop, InDesign', true, 2),
('00000001-0000-4000-a000-000000000017', 'technologies', 'Code', 'Semrush', 'Outil SEO professionnel', true, 3),
('00000001-0000-4000-a000-000000000017', 'technologies', 'Code', 'Google Analytics 4', 'Analytics avancé', true, 4),
('00000001-0000-4000-a000-000000000017', 'technologies', 'Code', 'Ahrefs', 'Analyse de backlinks et concurrence', false, 5),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Identité visuelle complète', 'Logo, charte, supports, guidelines', true, 1),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Stratégie SEO 3 mois', 'Plan d''action SEO sur 3 mois', true, 2),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Contenu mensuel (4 articles)', 'Rédaction optimisée SEO', true, 3),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Stratégie de backlinks', 'Acquisition de liens entrants de qualité', true, 4),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Reporting mensuel', 'Rapport de performance détaillé', true, 5),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Supports print', 'Cartes de visite, flyers, brochure', true, 6),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Social media templates', 'Templates pour vos publications', false, 7),
('00000001-0000-4000-a000-000000000017', 'fonctionnalites', 'Layers', 'Vidéo de présentation courte', 'Motion design 30s pour les réseaux', false, 8),
('00000001-0000-4000-a000-000000000017', 'design', 'Palette', 'Brand book complet', 'Document de marque détaillé', true, 1),
('00000001-0000-4000-a000-000000000017', 'design', 'Palette', 'Templates réseaux sociaux', 'Gabarits pour Instagram, LinkedIn, etc.', true, 2),
('00000001-0000-4000-a000-000000000017', 'design', 'Palette', 'Signalétique', 'Design enseigne et affichage', false, 3),
('00000001-0000-4000-a000-000000000017', 'seo', 'Search', 'Stratégie mots-clés complète', 'Mapping sémantique et clustering', true, 1),
('00000001-0000-4000-a000-000000000017', 'seo', 'Search', 'Optimisation technique continue', 'Corrections et améliorations régulières', true, 2),
('00000001-0000-4000-a000-000000000017', 'seo', 'Search', 'Google Analytics + Search Console', 'Configuration avancée et suivi', true, 3),
('00000001-0000-4000-a000-000000000017', 'seo', 'Search', 'SEO local avancé', 'Citations, avis, Google Maps', true, 4),
('00000001-0000-4000-a000-000000000017', 'seo', 'Search', 'Analyse concurrentielle', 'Benchmark de vos concurrents', false, 5),
('00000001-0000-4000-a000-000000000017', 'support', 'Headphones', 'Support 3 mois', 'Assistance par email et téléphone', true, 1),
('00000001-0000-4000-a000-000000000017', 'support', 'Headphones', 'Fichiers sources complets', 'Tous les fichiers natifs', true, 2),
('00000001-0000-4000-a000-000000000017', 'support', 'Headphones', '5 révisions incluses', 'Modifications après livraison', true, 3),
('00000001-0000-4000-a000-000000000017', 'support', 'Headphones', 'Formation brand guidelines', 'Comment utiliser votre identité visuelle', false, 4);

-- ========================================
-- BRANDING & SEO PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('00000001-0000-4000-a000-000000000018', 'technologies', 'Code', 'Figma + Adobe CC', 'Suite créative complète', true, 1),
('00000001-0000-4000-a000-000000000018', 'technologies', 'Code', 'After Effects', 'Motion design et animation', true, 2),
('00000001-0000-4000-a000-000000000018', 'technologies', 'Code', 'Semrush + Ahrefs', 'Double analyse SEO premium', true, 3),
('00000001-0000-4000-a000-000000000018', 'technologies', 'Code', 'Google Ads', 'Plateforme publicitaire Google', true, 4),
('00000001-0000-4000-a000-000000000018', 'technologies', 'Code', 'Meta Ads Manager', 'Publicité Facebook et Instagram', false, 5),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Branding complet', 'Identité visuelle 360° + book de marque', true, 1),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Stratégie SEO 12 mois', 'Plan d''action SEO sur 1 an complet', true, 2),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Content marketing (8 articles/mois)', 'Rédaction de contenu premium', true, 3),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Gestion réseaux sociaux', 'Community management et création de contenu', true, 4),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Campagnes Google Ads', 'Gestion de campagnes publicitaires', true, 5),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Vidéo de présentation', 'Motion design 60-90s professionnel', true, 6),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Stratégie d''influence locale', 'Partenariats avec influenceurs locaux', true, 7),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Audit réputation en ligne', 'Analyse et gestion de votre e-réputation', true, 8),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Podcast / interview', 'Création de contenu audio pour la visibilité', false, 9),
('00000001-0000-4000-a000-000000000018', 'fonctionnalites', 'Layers', 'Campagnes Meta Ads', 'Publicité Facebook et Instagram', false, 10),
('00000001-0000-4000-a000-000000000018', 'design', 'Palette', 'Brand book premium', 'Document de marque exhaustif', true, 1),
('00000001-0000-4000-a000-000000000018', 'design', 'Palette', 'Kit réseaux sociaux complet', 'Tous les formats pour tous les réseaux', true, 2),
('00000001-0000-4000-a000-000000000018', 'design', 'Palette', 'Packaging design', 'Design d''emballage si applicable', false, 3),
('00000001-0000-4000-a000-000000000018', 'design', 'Palette', 'Merchandising', 'Design goodies et objets promotionnels', false, 4),
('00000001-0000-4000-a000-000000000018', 'seo', 'Search', 'Stratégie SEO 360°', 'Technique, contenu, netlinking, local', true, 1),
('00000001-0000-4000-a000-000000000018', 'seo', 'Search', 'Content clustering', 'Stratégie de contenu en cocon sémantique', true, 2),
('00000001-0000-4000-a000-000000000018', 'seo', 'Search', 'Reporting avancé', 'Tableaux de bord et ROI détaillé', true, 3),
('00000001-0000-4000-a000-000000000018', 'seo', 'Search', 'A/B testing SEO', 'Tests pour optimiser les conversions', false, 4),
('00000001-0000-4000-a000-000000000018', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 4h, support dédié', true, 1),
('00000001-0000-4000-a000-000000000018', 'support', 'Headphones', 'Account manager dédié', 'Interlocuteur unique pour votre projet', true, 2),
('00000001-0000-4000-a000-000000000018', 'support', 'Headphones', 'Révisions illimitées', 'Modifications sans limite pendant le contrat', true, 3),
('00000001-0000-4000-a000-000000000018', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation communication et brand guidelines', true, 4);

