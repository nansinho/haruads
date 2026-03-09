-- ============================================
-- Migration 015: Recréation complète des offres
-- 7 catégories × 3 tiers = 21 offres + options
-- ============================================

-- ---- NETTOYAGE ----
DELETE FROM public.offer_options;
DELETE FROM public.offers WHERE category_id IS NOT NULL;
DELETE FROM public.offer_categories;

-- ============================================
-- 1. CATÉGORIES (7 services)
-- ============================================
INSERT INTO public.offer_categories (id, name, slug, description, icon, sort_order) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'Site Vitrine', 'site-vitrine', 'Sites vitrines modernes, responsive et performants pour présenter votre activité en ligne.', 'Globe', 1),
  ('c0000001-0000-0000-0000-000000000002', 'E-Commerce', 'e-commerce', 'Boutiques en ligne sur mesure avec paiement sécurisé et gestion de catalogue.', 'ShoppingCart', 2),
  ('c0000001-0000-0000-0000-000000000003', 'Application Web', 'application-web', 'Applications web complexes, dashboards et outils métier sur mesure.', 'Code', 3),
  ('c0000001-0000-0000-0000-000000000004', 'Solution SaaS', 'solution-saas', 'Plateformes SaaS multi-tenant, scalables et sécurisées.', 'Cloud', 4),
  ('c0000001-0000-0000-0000-000000000005', 'Intelligence Artificielle', 'intelligence-artificielle', 'Chatbots IA, automatisation et intégration de modèles de langage.', 'Brain', 5),
  ('c0000001-0000-0000-0000-000000000006', 'Design UI/UX', 'design-uiux', 'Maquettes, prototypes et design systems pour des interfaces utilisateur exceptionnelles.', 'PenTool', 6),
  ('c0000001-0000-0000-0000-000000000007', 'Branding & SEO', 'branding-seo', 'Identité visuelle forte et référencement naturel pour une visibilité maximale.', 'Palette', 7);

-- ============================================
-- 2. OFFRES (21 = 7 catégories × 3 tiers)
-- ============================================

-- ---- SITE VITRINE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000001',
  'Site Vitrine Essentiel',
  'site-vitrine-essentiel',
  'Un site one-page moderne et responsive pour présenter votre activité avec un design soigné.',
  0, 'custom',
  ARRAY['Site one-page responsive', 'Design moderne sur mesure', 'Formulaire de contact', 'Intégration réseaux sociaux', 'Optimisation mobile', 'Hébergement offert 1 an', 'Certificat SSL inclus', 'Livraison sous 2 semaines'],
  false, true, 1,
  'c0000001-0000-0000-0000-000000000001', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000002',
  'Site Vitrine Business',
  'site-vitrine-business',
  'Site multi-pages complet avec blog intégré, CMS headless et optimisations SEO avancées.',
  0, 'custom',
  ARRAY['Site multi-pages (5 à 10 pages)', 'Animations et transitions fluides', 'Blog intégré avec CMS', 'SEO on-page complet', 'CMS headless (édition facile)', 'Formulaires avancés', 'Google Analytics intégré', 'Support 3 mois inclus'],
  true, true, 2,
  'c0000001-0000-0000-0000-000000000001', 'business'
),
(
  'o0000001-0000-0000-0000-000000000003',
  'Site Vitrine Premium',
  'site-vitrine-premium',
  'Site sur mesure sans limite de pages, avec animations avancées, multilingue et espace client.',
  0, 'custom',
  ARRAY['Pages illimitées', 'Animations avancées (Framer Motion)', 'Site multilingue (2+ langues)', 'Espace client sécurisé', 'Intégration API tierces', 'Audit UX complet', 'Design system dédié', 'Performance A+ (Core Web Vitals)', 'Support prioritaire 12 mois'],
  false, true, 3,
  'c0000001-0000-0000-0000-000000000001', 'premium'
);

-- ---- E-COMMERCE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000004',
  'E-Commerce Essentiel',
  'e-commerce-essentiel',
  'Boutique en ligne clé en main jusqu''à 50 produits avec paiement Stripe sécurisé.',
  0, 'custom',
  ARRAY['Jusqu''à 50 produits', 'Paiement sécurisé Stripe', 'Design responsive sur mesure', 'Gestion de stock basique', 'Pages produits optimisées', 'Panier et checkout fluide', 'Emails de confirmation', 'Livraison sous 3 semaines'],
  false, true, 4,
  'c0000001-0000-0000-0000-000000000002', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000005',
  'E-Commerce Business',
  'e-commerce-business',
  'Boutique complète jusqu''à 500 produits avec filtres avancés, multi-paiement et analytics.',
  0, 'custom',
  ARRAY['Jusqu''à 500 produits', 'Multi-paiement (Stripe + Monetico)', 'Filtres et recherche avancés', 'Emails transactionnels automatisés', 'Dashboard analytics vendeur', 'Gestion des avis clients', 'Codes promo et réductions', 'Suivi de commandes temps réel', 'Support 6 mois inclus'],
  true, true, 5,
  'c0000001-0000-0000-0000-000000000002', 'business'
),
(
  'o0000001-0000-0000-0000-000000000006',
  'E-Commerce Premium',
  'e-commerce-premium',
  'Solution e-commerce illimitée avec marketplace multi-vendeurs, abonnements et IA.',
  0, 'custom',
  ARRAY['Produits illimités', 'Marketplace multi-vendeurs', 'Système d''abonnements', 'Programme de fidélité', 'Recommandations IA', 'Multi-devises et multi-langues', 'API publique pour intégrations', 'Reporting avancé et exports', 'Support prioritaire 12 mois'],
  false, true, 6,
  'c0000001-0000-0000-0000-000000000002', 'premium'
);

-- ---- APPLICATION WEB ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000007',
  'Application Web Essentiel',
  'application-web-essentiel',
  'Application web simple avec authentification, dashboard basique et déploiement cloud.',
  0, 'custom',
  ARRAY['Application web responsive', 'Authentification sécurisée', 'Dashboard utilisateur basique', 'Base de données PostgreSQL', 'Déploiement cloud (Vercel)', 'Interface d''administration', 'API REST basique', 'Livraison sous 4 semaines'],
  false, true, 7,
  'c0000001-0000-0000-0000-000000000003', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000008',
  'Application Web Business',
  'application-web-business',
  'Application complexe avec gestion de rôles, API REST complète et notifications temps réel.',
  0, 'custom',
  ARRAY['Gestion de rôles et permissions', 'API REST complète et documentée', 'Tableau de bord avancé avec graphiques', 'Notifications temps réel', 'Gestion de fichiers et uploads', 'Système de recherche avancé', 'Exports PDF/CSV', 'Tests automatisés', 'Support 6 mois inclus'],
  true, true, 8,
  'c0000001-0000-0000-0000-000000000003', 'business'
),
(
  'o0000001-0000-0000-0000-000000000009',
  'Application Web Premium',
  'application-web-premium',
  'Application sur mesure avec architecture microservices, WebSocket et monitoring avancé.',
  0, 'custom',
  ARRAY['Architecture microservices', 'API GraphQL + REST', 'Temps réel WebSocket', 'CI/CD pipeline complet', 'Monitoring et alertes', 'Scalabilité automatique', 'Tests E2E complets', 'Documentation technique', 'Support prioritaire 12 mois'],
  false, true, 9,
  'c0000001-0000-0000-0000-000000000003', 'premium'
);

-- ---- SOLUTION SAAS ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000010',
  'SaaS Essentiel',
  'saas-essentiel',
  'MVP SaaS avec authentification, facturation et dashboard admin. Idéal pour valider votre idée.',
  0, 'custom',
  ARRAY['MVP fonctionnel', 'Authentification complète', 'Facturation Stripe intégrée', 'Dashboard admin', '1 rôle utilisateur', 'Base PostgreSQL', 'Landing page incluse', 'Livraison sous 6 semaines'],
  false, true, 10,
  'c0000001-0000-0000-0000-000000000004', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000011',
  'SaaS Business',
  'saas-business',
  'SaaS multi-tenant complet avec gestion d''abonnements, analytics et API publique.',
  0, 'custom',
  ARRAY['Architecture multi-tenant', 'Gestion d''abonnements Stripe', '3+ rôles utilisateurs', 'Analytics et métriques', 'Webhooks configurables', 'API publique documentée', 'Onboarding utilisateur guidé', 'Emails transactionnels', 'Support 6 mois inclus'],
  true, true, 11,
  'c0000001-0000-0000-0000-000000000004', 'business'
),
(
  'o0000001-0000-0000-0000-000000000012',
  'SaaS Premium',
  'saas-premium',
  'SaaS enterprise avec white-label, SSO/SAML, audit logs et SLA garanti.',
  0, 'custom',
  ARRAY['White-label personnalisable', 'SSO / SAML / OAuth2', 'Audit logs complets', 'SLA garanti 99.9%', 'Scalabilité automatique', 'Backups automatiques', 'Support dédié multi-canal', 'Migration de données assistée', 'Support prioritaire 12 mois'],
  false, true, 12,
  'c0000001-0000-0000-0000-000000000004', 'premium'
);

-- ---- INTELLIGENCE ARTIFICIELLE ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000013',
  'IA Essentiel',
  'ia-essentiel',
  'Chatbot IA basique intégré à votre site web avec FAQ automatisée et réponses configurables.',
  0, 'custom',
  ARRAY['Chatbot IA intégré au site', 'FAQ automatisée', 'Réponses pré-configurées', 'Widget personnalisable', 'Historique des conversations', 'Interface d''administration', 'Intégration simple (widget JS)', 'Livraison sous 2 semaines'],
  false, true, 13,
  'c0000001-0000-0000-0000-000000000005', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000014',
  'IA Business',
  'ia-business',
  'Chatbot IA avancé avec connexion CRM, analyse de sentiment et génération de contenu.',
  0, 'custom',
  ARRAY['Chatbot IA avancé (GPT/Claude)', 'Connexion CRM et outils métier', 'Analyse de sentiment', 'Génération de contenu IA', 'Multi-canal (site, WhatsApp, email)', 'Escalade vers agent humain', 'Tableau de bord analytics', 'Formation et personnalisation', 'Support 6 mois inclus'],
  true, true, 14,
  'c0000001-0000-0000-0000-000000000005', 'business'
),
(
  'o0000001-0000-0000-0000-000000000015',
  'IA Premium',
  'ia-premium',
  'Solution IA sur mesure avec fine-tuning, RAG sur vos documents et automatisation workflow.',
  0, 'custom',
  ARRAY['Solution IA sur mesure', 'Fine-tuning de modèle dédié', 'RAG (Retrieval Augmented Generation)', 'Automatisation de workflows', 'Analytics IA avancés', 'Intégration multi-sources', 'API IA dédiée', 'Audit et optimisation continue', 'Support prioritaire 12 mois'],
  false, true, 15,
  'c0000001-0000-0000-0000-000000000005', 'premium'
);

-- ---- DESIGN UI/UX ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000016',
  'Design UI/UX Essentiel',
  'design-uiux-essentiel',
  'Audit UX rapide, wireframes et maquette Figma pour votre page clé. Idéal pour un refresh visuel.',
  0, 'custom',
  ARRAY['Audit UX rapide', 'Wireframes basse fidélité', 'Maquette Figma (1 page clé)', 'Palette de couleurs', 'Choix typographique', 'Responsive mobile/desktop', 'Export assets', 'Livraison sous 1 semaine'],
  false, true, 16,
  'c0000001-0000-0000-0000-000000000006', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000017',
  'Design UI/UX Business',
  'design-uiux-business',
  'Recherche utilisateur, wireframes interactifs et maquettes complètes avec prototype cliquable.',
  0, 'custom',
  ARRAY['Recherche utilisateur complète', 'Wireframes interactifs', 'Maquettes Figma (5-10 pages)', 'Prototype cliquable', 'Design System basique', 'Composants réutilisables', 'Tests utilisateurs (3 sessions)', 'Guide d''utilisation', 'Support 3 mois inclus'],
  true, true, 17,
  'c0000001-0000-0000-0000-000000000006', 'business'
),
(
  'o0000001-0000-0000-0000-000000000018',
  'Design UI/UX Premium',
  'design-uiux-premium',
  'Design system complet, recherche approfondie, audit accessibilité et motion design sur mesure.',
  0, 'custom',
  ARRAY['Recherche utilisateur approfondie', 'Audit accessibilité WCAG', 'Maquettes Figma illimitées', 'Prototype haute fidélité', 'Design System complet + Storybook', 'Motion design et micro-interactions', 'Tests A/B et optimisation', 'Formation équipe design', 'Support prioritaire 12 mois'],
  false, true, 18,
  'c0000001-0000-0000-0000-000000000006', 'premium'
);

-- ---- BRANDING & SEO ----
INSERT INTO public.offers (id, name, slug, description, price, price_type, features, is_popular, is_active, sort_order, category_id, tier) VALUES
(
  'o0000001-0000-0000-0000-000000000019',
  'Branding & SEO Essentiel',
  'branding-seo-essentiel',
  'Logo, charte graphique basique et audit SEO avec optimisation de 5 pages clés.',
  0, 'custom',
  ARRAY['Création de logo professionnel', 'Charte graphique basique', 'Audit SEO technique', 'Optimisation de 5 pages', 'Google Business Profile', 'Fichier sitemap.xml', 'Meta tags optimisés', 'Rapport de recommandations'],
  false, true, 19,
  'c0000001-0000-0000-0000-000000000007', 'essentiel'
),
(
  'o0000001-0000-0000-0000-000000000020',
  'Branding & SEO Business',
  'branding-seo-business',
  'Identité visuelle complète, stratégie SEO 3 mois avec création de contenu et reporting.',
  0, 'custom',
  ARRAY['Identité visuelle complète', 'Stratégie SEO 3 mois', 'Création de contenu mensuel (4 articles)', 'Stratégie de backlinks', 'Reporting mensuel détaillé', 'Google Analytics + Search Console', 'Optimisation technique continue', 'Supports print (cartes de visite, flyers)', 'Support 3 mois inclus'],
  true, true, 20,
  'c0000001-0000-0000-0000-000000000007', 'business'
),
(
  'o0000001-0000-0000-0000-000000000021',
  'Branding & SEO Premium',
  'branding-seo-premium',
  'Branding complet, stratégie SEO 12 mois, content marketing et gestion des réseaux sociaux.',
  0, 'custom',
  ARRAY['Branding complet et book de marque', 'Stratégie SEO 12 mois', 'Content marketing (8 articles/mois)', 'Gestion réseaux sociaux', 'Campagnes publicitaires (Google Ads)', 'Vidéo de présentation', 'Stratégie d''influence locale', 'Audit de réputation en ligne', 'Support prioritaire 12 mois'],
  false, true, 21,
  'c0000001-0000-0000-0000-000000000007', 'premium'
);

-- ============================================
-- 3. OPTIONS PAR OFFRE (organisées par catégorie)
-- ============================================

-- ========================================
-- SITE VITRINE ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000001', 'technologies', 'Code', 'Next.js / React', 'Framework moderne pour des performances optimales', true, 1),
('o0000001-0000-0000-0000-000000000001', 'technologies', 'Code', 'Tailwind CSS', 'Framework CSS utility-first pour un design sur mesure', true, 2),
('o0000001-0000-0000-0000-000000000001', 'technologies', 'Code', 'TypeScript', 'Typage statique pour un code robuste et maintenable', true, 3),
('o0000001-0000-0000-0000-000000000001', 'technologies', 'Code', 'WordPress', 'CMS traditionnel avec thème sur mesure', false, 4),
('o0000001-0000-0000-0000-000000000001', 'technologies', 'Code', 'Framer Motion', 'Animations fluides et interactions modernes', false, 5),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Formulaire de contact', 'Formulaire avec validation et envoi par email', true, 1),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Intégration réseaux sociaux', 'Liens et feeds vers vos profils sociaux', true, 2),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Google Maps intégré', 'Carte interactive avec votre localisation', true, 3),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Blog', 'Section blog avec gestion de contenu', false, 4),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Chat en direct', 'Widget de chat pour communiquer avec vos visiteurs', false, 5),
('o0000001-0000-0000-0000-000000000001', 'fonctionnalites', 'Layers', 'Newsletter', 'Inscription newsletter avec envoi automatisé', false, 6),
('o0000001-0000-0000-0000-000000000001', 'design', 'Palette', 'Design responsive', 'Adapté mobile, tablette et desktop', true, 1),
('o0000001-0000-0000-0000-000000000001', 'design', 'Palette', 'Maquette Figma', '1 maquette Figma avant développement', true, 2),
('o0000001-0000-0000-0000-000000000001', 'design', 'Palette', 'Mode sombre', 'Thème sombre en complément du thème clair', false, 3),
('o0000001-0000-0000-0000-000000000001', 'design', 'Palette', 'Animations avancées', 'Micro-interactions et transitions élaborées', false, 4),
('o0000001-0000-0000-0000-000000000001', 'performance', 'Zap', 'Optimisation images (WebP)', 'Compression et format moderne des images', true, 1),
('o0000001-0000-0000-0000-000000000001', 'performance', 'Zap', 'SSL / HTTPS', 'Certificat de sécurité inclus', true, 2),
('o0000001-0000-0000-0000-000000000001', 'performance', 'Zap', 'CDN mondial', 'Distribution globale pour des temps de chargement rapides', false, 3),
('o0000001-0000-0000-0000-000000000001', 'performance', 'Zap', 'Lazy loading', 'Chargement différé des images et composants', false, 4),
('o0000001-0000-0000-0000-000000000001', 'seo', 'Search', 'Meta tags optimisés', 'Title, description et Open Graph configurés', true, 1),
('o0000001-0000-0000-0000-000000000001', 'seo', 'Search', 'Sitemap XML', 'Plan du site pour les moteurs de recherche', true, 2),
('o0000001-0000-0000-0000-000000000001', 'seo', 'Search', 'Schema.org (données structurées)', 'Rich snippets pour un meilleur affichage Google', false, 3),
('o0000001-0000-0000-0000-000000000001', 'seo', 'Search', 'Google Analytics', 'Suivi statistiques et comportement visiteurs', false, 4),
('o0000001-0000-0000-0000-000000000001', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement Vercel ou Netlify offert', true, 1),
('o0000001-0000-0000-0000-000000000001', 'support', 'Headphones', 'Formation utilisation', 'Formation de 1h pour gérer votre site', true, 2),
('o0000001-0000-0000-0000-000000000001', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et corrections pendant 1 an', false, 3),
('o0000001-0000-0000-0000-000000000001', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h en jours ouvrés', false, 4);

-- ========================================
-- SITE VITRINE BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'Next.js / React', 'Framework moderne pour des performances optimales', true, 1),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'Tailwind CSS', 'Framework CSS utility-first pour un design sur mesure', true, 2),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'TypeScript', 'Typage statique pour un code robuste', true, 3),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'Framer Motion', 'Animations fluides et transitions modernes', true, 4),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'Supabase', 'Backend-as-a-Service pour le CMS et la base de données', true, 5),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'WordPress', 'CMS traditionnel avec thème sur mesure', false, 6),
('o0000001-0000-0000-0000-000000000002', 'technologies', 'Code', 'Vue.js / Nuxt', 'Alternative framework JavaScript progressif', false, 7),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Blog intégré avec CMS', 'Blog complet avec éditeur de contenu', true, 1),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Formulaires avancés', 'Formulaires multi-étapes avec validation', true, 2),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Galerie photos/vidéos', 'Portfolio ou galerie média interactive', true, 3),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Newsletter intégrée', 'Inscription et envoi de newsletters', true, 4),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Chat en direct', 'Widget de chat pour communiquer en temps réel', false, 5),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Espace membres', 'Zone privée avec authentification', false, 6),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Système de réservation', 'Prise de rendez-vous en ligne (Calendly-like)', false, 7),
('o0000001-0000-0000-0000-000000000002', 'fonctionnalites', 'Layers', 'Multi-langue (2 langues)', 'Site bilingue avec switch de langue', false, 8),
('o0000001-0000-0000-0000-000000000002', 'design', 'Palette', 'Design responsive premium', 'Design pixel-perfect sur tous les écrans', true, 1),
('o0000001-0000-0000-0000-000000000002', 'design', 'Palette', 'Maquettes Figma (3 pages)', 'Maquettes détaillées avant développement', true, 2),
('o0000001-0000-0000-0000-000000000002', 'design', 'Palette', 'Animations et transitions', 'Effets de scroll, hover et transitions de page', true, 3),
('o0000001-0000-0000-0000-000000000002', 'design', 'Palette', 'Mode sombre', 'Thème sombre élégant en complément', false, 4),
('o0000001-0000-0000-0000-000000000002', 'design', 'Palette', 'Design system complet', 'Bibliothèque de composants réutilisables', false, 5),
('o0000001-0000-0000-0000-000000000002', 'performance', 'Zap', 'SSR/SSG (Server-Side Rendering)', 'Rendu côté serveur pour des performances maximales', true, 1),
('o0000001-0000-0000-0000-000000000002', 'performance', 'Zap', 'CDN mondial', 'Distribution globale du contenu', true, 2),
('o0000001-0000-0000-0000-000000000002', 'performance', 'Zap', 'Optimisation images (WebP/AVIF)', 'Formats modernes et compression automatique', true, 3),
('o0000001-0000-0000-0000-000000000002', 'performance', 'Zap', 'Core Web Vitals A+', 'Optimisation pour les métriques Google', true, 4),
('o0000001-0000-0000-0000-000000000002', 'performance', 'Zap', 'Cache intelligent', 'Stratégie ISR pour un cache optimisé', false, 5),
('o0000001-0000-0000-0000-000000000002', 'seo', 'Search', 'SEO on-page complet', 'Optimisation de toutes les pages', true, 1),
('o0000001-0000-0000-0000-000000000002', 'seo', 'Search', 'Sitemap XML dynamique', 'Génération automatique du plan de site', true, 2),
('o0000001-0000-0000-0000-000000000002', 'seo', 'Search', 'Schema.org', 'Données structurées pour rich snippets', true, 3),
('o0000001-0000-0000-0000-000000000002', 'seo', 'Search', 'Google Analytics + Search Console', 'Suivi complet du trafic et des performances', true, 4),
('o0000001-0000-0000-0000-000000000002', 'seo', 'Search', 'Stratégie de contenu SEO', 'Recommandations éditoriales pour le blog', false, 5),
('o0000001-0000-0000-0000-000000000002', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement premium inclus', true, 1),
('o0000001-0000-0000-0000-000000000002', 'support', 'Headphones', 'Formation CMS (2h)', 'Formation complète à la gestion du site', true, 2),
('o0000001-0000-0000-0000-000000000002', 'support', 'Headphones', 'Support 3 mois', 'Assistance technique et corrections', true, 3),
('o0000001-0000-0000-0000-000000000002', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et monitoring continu', false, 4),
('o0000001-0000-0000-0000-000000000002', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 2h en jours ouvrés', false, 5);

-- ========================================
-- SITE VITRINE PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Next.js / React', 'Framework de pointe avec App Router', true, 1),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Tailwind CSS + Radix UI', 'Design system professionnel', true, 2),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'TypeScript strict', 'Typage complet pour un code sans failles', true, 3),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Framer Motion', 'Animations et transitions avancées', true, 4),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Supabase + Prisma', 'Backend complet avec ORM professionnel', true, 5),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Three.js / WebGL', 'Expériences 3D immersives', false, 6),
('o0000001-0000-0000-0000-000000000003', 'technologies', 'Code', 'Headless CMS (Sanity/Strapi)', 'CMS professionnel pour contenu complexe', false, 7),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Pages illimitées', 'Aucune limite sur le nombre de pages', true, 1),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Site multilingue (2+ langues)', 'Gestion complète i18n', true, 2),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Espace client sécurisé', 'Portail privé avec authentification', true, 3),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Intégration API tierces', 'Connexion avec vos outils métier', true, 4),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Blog avancé + CMS', 'Blog multilingue avec catégories et tags', true, 5),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'Système de réservation', 'Module de prise de rendez-vous avancé', false, 6),
('o0000001-0000-0000-0000-000000000003', 'fonctionnalites', 'Layers', 'E-commerce léger', 'Vente de quelques produits/services', false, 7),
('o0000001-0000-0000-0000-000000000003', 'design', 'Palette', 'Design system complet', 'Bibliothèque de composants Figma', true, 1),
('o0000001-0000-0000-0000-000000000003', 'design', 'Palette', 'Animations avancées', 'Scroll animations, page transitions, parallax', true, 2),
('o0000001-0000-0000-0000-000000000003', 'design', 'Palette', 'Mode sombre', 'Thème sombre élégant', true, 3),
('o0000001-0000-0000-0000-000000000003', 'design', 'Palette', 'Audit UX complet', 'Analyse ergonomique professionnelle', true, 4),
('o0000001-0000-0000-0000-000000000003', 'design', 'Palette', 'Illustrations sur mesure', 'Illustrations vectorielles personnalisées', false, 5),
('o0000001-0000-0000-0000-000000000003', 'performance', 'Zap', 'Performance A+ (Core Web Vitals)', 'Score parfait sur toutes les métriques', true, 1),
('o0000001-0000-0000-0000-000000000003', 'performance', 'Zap', 'Edge computing', 'Rendu en périphérie pour une latence minimale', true, 2),
('o0000001-0000-0000-0000-000000000003', 'performance', 'Zap', 'CDN mondial premium', 'Distribution globale ultra-rapide', true, 3),
('o0000001-0000-0000-0000-000000000003', 'performance', 'Zap', 'Monitoring temps réel', 'Alertes et dashboards de performance', true, 4),
('o0000001-0000-0000-0000-000000000003', 'performance', 'Zap', 'Progressive Web App', 'Version installable de votre site', false, 5),
('o0000001-0000-0000-0000-000000000003', 'seo', 'Search', 'SEO technique avancé', 'Optimisation complète on-page et technique', true, 1),
('o0000001-0000-0000-0000-000000000003', 'seo', 'Search', 'Schema.org complet', 'Données structurées pour tous les contenus', true, 2),
('o0000001-0000-0000-0000-000000000003', 'seo', 'Search', 'SEO international', 'Hreflang et optimisation multilingue', true, 3),
('o0000001-0000-0000-0000-000000000003', 'seo', 'Search', 'Analytics avancés', 'GA4, Search Console, rapports personnalisés', true, 4),
('o0000001-0000-0000-0000-000000000003', 'seo', 'Search', 'Audit SEO trimestriel', 'Suivi et recommandations tous les 3 mois', false, 5),
('o0000001-0000-0000-0000-000000000003', 'support', 'Headphones', 'Hébergement premium illimité', 'Infrastructure haute disponibilité', true, 1),
('o0000001-0000-0000-0000-000000000003', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation complète pour votre équipe', true, 2),
('o0000001-0000-0000-0000-000000000003', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 1h, 7j/7', true, 3),
('o0000001-0000-0000-0000-000000000003', 'support', 'Headphones', 'Maintenance proactive', 'Monitoring, mises à jour et optimisations', true, 4),
('o0000001-0000-0000-0000-000000000003', 'support', 'Headphones', 'SLA garanti 99.9%', 'Disponibilité garantie contractuellement', false, 5);

-- ========================================
-- E-COMMERCE ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000004', 'technologies', 'Code', 'Next.js / React', 'Framework moderne pour un e-commerce performant', true, 1),
('o0000001-0000-0000-0000-000000000004', 'technologies', 'Code', 'Stripe', 'Paiement sécurisé par carte bancaire', true, 2),
('o0000001-0000-0000-0000-000000000004', 'technologies', 'Code', 'Supabase', 'Base de données et authentification', true, 3),
('o0000001-0000-0000-0000-000000000004', 'technologies', 'Code', 'Tailwind CSS', 'Design responsive et moderne', true, 4),
('o0000001-0000-0000-0000-000000000004', 'technologies', 'Code', 'Shopify Headless', 'Alternative CMS e-commerce professionnel', false, 5),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Catalogue produits (50)', 'Gestion de jusqu''à 50 produits', true, 1),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Panier et checkout', 'Processus d''achat fluide et sécurisé', true, 2),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Gestion de stock', 'Suivi basique des quantités disponibles', true, 3),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Emails de confirmation', 'Notifications automatiques de commande', true, 4),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Codes promo', 'Système de réductions et bons d''achat', false, 5),
('o0000001-0000-0000-0000-000000000004', 'fonctionnalites', 'Layers', 'Avis clients', 'Système de notation et commentaires', false, 6),
('o0000001-0000-0000-0000-000000000004', 'design', 'Palette', 'Design responsive', 'Boutique optimisée mobile/tablette/desktop', true, 1),
('o0000001-0000-0000-0000-000000000004', 'design', 'Palette', 'Pages produits optimisées', 'Fiches produits attractives et détaillées', true, 2),
('o0000001-0000-0000-0000-000000000004', 'design', 'Palette', 'Mode sombre', 'Thème sombre pour votre boutique', false, 3),
('o0000001-0000-0000-0000-000000000004', 'design', 'Palette', 'Animations produits', 'Effets visuels sur les fiches produits', false, 4),
('o0000001-0000-0000-0000-000000000004', 'performance', 'Zap', 'Optimisation images produits', 'Compression et formats modernes', true, 1),
('o0000001-0000-0000-0000-000000000004', 'performance', 'Zap', 'SSL / HTTPS', 'Transactions 100% sécurisées', true, 2),
('o0000001-0000-0000-0000-000000000004', 'performance', 'Zap', 'CDN mondial', 'Chargement rapide partout dans le monde', false, 3),
('o0000001-0000-0000-0000-000000000004', 'performance', 'Zap', 'Cache produits', 'Mise en cache intelligente du catalogue', false, 4),
('o0000001-0000-0000-0000-000000000004', 'seo', 'Search', 'SEO produits', 'Meta tags optimisés pour chaque produit', true, 1),
('o0000001-0000-0000-0000-000000000004', 'seo', 'Search', 'Sitemap XML', 'Plan de site pour l''indexation', true, 2),
('o0000001-0000-0000-0000-000000000004', 'seo', 'Search', 'Schema.org Product', 'Rich snippets pour les résultats Google', false, 3),
('o0000001-0000-0000-0000-000000000004', 'seo', 'Search', 'Google Merchant Center', 'Intégration avec Google Shopping', false, 4),
('o0000001-0000-0000-0000-000000000004', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement e-commerce inclus', true, 1),
('o0000001-0000-0000-0000-000000000004', 'support', 'Headphones', 'Formation boutique (1h)', 'Formation à la gestion de votre boutique', true, 2),
('o0000001-0000-0000-0000-000000000004', 'support', 'Headphones', 'Support 1 mois', 'Assistance post-lancement', false, 3),
('o0000001-0000-0000-0000-000000000004', 'support', 'Headphones', 'Maintenance mensuelle', 'Suivi technique et mises à jour', false, 4);

-- ========================================
-- E-COMMERCE BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Next.js / React', 'Framework hautes performances pour e-commerce', true, 1),
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Stripe + Monetico', 'Multi-paiement carte bancaire sécurisé', true, 2),
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Supabase + Prisma', 'Backend robuste avec ORM', true, 3),
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Redis', 'Cache haute performance pour les sessions', true, 4),
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Algolia', 'Moteur de recherche instantané', false, 5),
('o0000001-0000-0000-0000-000000000005', 'technologies', 'Code', 'Shopify Headless', 'CMS e-commerce professionnel en option', false, 6),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Catalogue (500 produits)', 'Gestion de jusqu''à 500 produits', true, 1),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Filtres et recherche avancés', 'Navigation par catégories, prix, taille...', true, 2),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Dashboard analytics', 'Tableau de bord vendeur avec métriques', true, 3),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Avis et notes clients', 'Système de notation et modération', true, 4),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Codes promo et réductions', 'Système de coupons et ventes flash', true, 5),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Suivi commandes temps réel', 'Tracking et notifications de livraison', true, 6),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Programme de fidélité', 'Points de fidélité et récompenses', false, 7),
('o0000001-0000-0000-0000-000000000005', 'fonctionnalites', 'Layers', 'Multi-devises', 'Support de plusieurs devises', false, 8),
('o0000001-0000-0000-0000-000000000005', 'design', 'Palette', 'Design responsive premium', 'Expérience d''achat optimale sur tous les écrans', true, 1),
('o0000001-0000-0000-0000-000000000005', 'design', 'Palette', 'Animations produits', 'Effets de zoom, galerie et carrousel', true, 2),
('o0000001-0000-0000-0000-000000000005', 'design', 'Palette', 'Mode sombre', 'Thème sombre pour votre boutique', true, 3),
('o0000001-0000-0000-0000-000000000005', 'design', 'Palette', 'Checkout personnalisé', 'Processus d''achat aux couleurs de votre marque', false, 4),
('o0000001-0000-0000-0000-000000000005', 'performance', 'Zap', 'CDN mondial', 'Distribution globale du contenu et images', true, 1),
('o0000001-0000-0000-0000-000000000005', 'performance', 'Zap', 'Core Web Vitals A+', 'Performances optimales pour le référencement', true, 2),
('o0000001-0000-0000-0000-000000000005', 'performance', 'Zap', 'Cache intelligent', 'Stratégie ISR et cache produits', true, 3),
('o0000001-0000-0000-0000-000000000005', 'performance', 'Zap', 'Monitoring performances', 'Suivi des temps de chargement', false, 4),
('o0000001-0000-0000-0000-000000000005', 'seo', 'Search', 'SEO e-commerce complet', 'Optimisation de toutes les pages produits', true, 1),
('o0000001-0000-0000-0000-000000000005', 'seo', 'Search', 'Schema.org Product + Offer', 'Rich snippets avec prix et disponibilité', true, 2),
('o0000001-0000-0000-0000-000000000005', 'seo', 'Search', 'Google Merchant Center', 'Synchronisation avec Google Shopping', true, 3),
('o0000001-0000-0000-0000-000000000005', 'seo', 'Search', 'Stratégie de contenu', 'Blog e-commerce et guides d''achat', false, 4),
('o0000001-0000-0000-0000-000000000005', 'support', 'Headphones', 'Hébergement 1 an', 'Infrastructure e-commerce haute performance', true, 1),
('o0000001-0000-0000-0000-000000000005', 'support', 'Headphones', 'Formation complète (3h)', 'Formation à la gestion du catalogue et commandes', true, 2),
('o0000001-0000-0000-0000-000000000005', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et corrections', true, 3),
('o0000001-0000-0000-0000-000000000005', 'support', 'Headphones', 'Maintenance mensuelle', 'Mises à jour et monitoring continu', false, 4),
('o0000001-0000-0000-0000-000000000005', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 2h, 7j/7', false, 5);

-- ========================================
-- E-COMMERCE PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Next.js / React', 'Architecture e-commerce de pointe', true, 1),
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Multi-paiement avancé', 'Stripe, PayPal, Monetico, Apple Pay', true, 2),
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Supabase + Prisma + Redis', 'Infrastructure scalable haute disponibilité', true, 3),
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Algolia / Meilisearch', 'Recherche instantanée et facettée', true, 4),
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Elasticsearch', 'Moteur de recherche enterprise', false, 5),
('o0000001-0000-0000-0000-000000000006', 'technologies', 'Code', 'Microservices', 'Architecture distribuée et scalable', false, 6),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Produits illimités', 'Aucune limite sur le catalogue', true, 1),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Marketplace multi-vendeurs', 'Plateforme de vente multi-marchands', true, 2),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Système d''abonnements', 'Vente récurrente et box mensuelles', true, 3),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Programme de fidélité', 'Points, récompenses et gamification', true, 4),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Recommandations IA', 'Suggestions de produits personnalisées', true, 5),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'Multi-devises et multi-langues', 'Vente internationale complète', true, 6),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'API publique', 'API REST pour intégrations tierces', false, 7),
('o0000001-0000-0000-0000-000000000006', 'fonctionnalites', 'Layers', 'B2B / Grossiste', 'Tarifs professionnels et commandes en gros', false, 8),
('o0000001-0000-0000-0000-000000000006', 'design', 'Palette', 'Design system e-commerce', 'Composants réutilisables et cohérents', true, 1),
('o0000001-0000-0000-0000-000000000006', 'design', 'Palette', 'Animations premium', 'Expérience d''achat immersive', true, 2),
('o0000001-0000-0000-0000-000000000006', 'design', 'Palette', 'Personnalisation vendeur', 'Chaque vendeur peut customiser sa boutique', true, 3),
('o0000001-0000-0000-0000-000000000006', 'design', 'Palette', 'AR/VR produits', 'Réalité augmentée pour visualiser les produits', false, 4),
('o0000001-0000-0000-0000-000000000006', 'performance', 'Zap', 'Infrastructure enterprise', 'Haute disponibilité et scalabilité auto', true, 1),
('o0000001-0000-0000-0000-000000000006', 'performance', 'Zap', 'CDN mondial premium', 'Distribution globale ultra-rapide', true, 2),
('o0000001-0000-0000-0000-000000000006', 'performance', 'Zap', 'Monitoring 24/7', 'Alertes et dashboards en temps réel', true, 3),
('o0000001-0000-0000-0000-000000000006', 'performance', 'Zap', 'Load balancing', 'Équilibrage de charge automatique', false, 4),
('o0000001-0000-0000-0000-000000000006', 'seo', 'Search', 'SEO e-commerce avancé', 'Stratégie SEO complète multilingue', true, 1),
('o0000001-0000-0000-0000-000000000006', 'seo', 'Search', 'Google Shopping avancé', 'Feed produits optimisé et automatique', true, 2),
('o0000001-0000-0000-0000-000000000006', 'seo', 'Search', 'Reporting avancé', 'Analytics e-commerce et exports détaillés', true, 3),
('o0000001-0000-0000-0000-000000000006', 'seo', 'Search', 'Marketing automation', 'Emails automatisés et retargeting', false, 4),
('o0000001-0000-0000-0000-000000000006', 'support', 'Headphones', 'Infrastructure dédiée', 'Serveurs haute performance dédiés', true, 1),
('o0000001-0000-0000-0000-000000000006', 'support', 'Headphones', 'Formation équipe (6h)', 'Formation complète pour votre équipe', true, 2),
('o0000001-0000-0000-0000-000000000006', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Assistance 7j/7, réponse sous 1h', true, 3),
('o0000001-0000-0000-0000-000000000006', 'support', 'Headphones', 'SLA garanti 99.9%', 'Disponibilité garantie contractuellement', true, 4),
('o0000001-0000-0000-0000-000000000006', 'support', 'Headphones', 'Account manager dédié', 'Interlocuteur unique pour votre projet', false, 5);

-- ========================================
-- APPLICATION WEB ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000007', 'technologies', 'Code', 'Next.js / React', 'Framework frontend moderne', true, 1),
('o0000001-0000-0000-0000-000000000007', 'technologies', 'Code', 'Node.js', 'Runtime JavaScript côté serveur', true, 2),
('o0000001-0000-0000-0000-000000000007', 'technologies', 'Code', 'PostgreSQL', 'Base de données relationnelle robuste', true, 3),
('o0000001-0000-0000-0000-000000000007', 'technologies', 'Code', 'Supabase Auth', 'Authentification sécurisée clé en main', true, 4),
('o0000001-0000-0000-0000-000000000007', 'technologies', 'Code', 'Docker', 'Conteneurisation pour déploiement simplifié', false, 5),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'Authentification complète', 'Login, register, reset password, OAuth', true, 1),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'Dashboard utilisateur', 'Tableau de bord avec widgets personnalisés', true, 2),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'Interface admin', 'Panneau d''administration pour gérer l''app', true, 3),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'API REST basique', 'Endpoints CRUD pour vos données', true, 4),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'Notifications email', 'Envoi d''emails transactionnels', false, 5),
('o0000001-0000-0000-0000-000000000007', 'fonctionnalites', 'Layers', 'Upload de fichiers', 'Gestion de fichiers et images', false, 6),
('o0000001-0000-0000-0000-000000000007', 'design', 'Palette', 'Design responsive', 'Interface adaptée à tous les écrans', true, 1),
('o0000001-0000-0000-0000-000000000007', 'design', 'Palette', 'UI Kit professionnel', 'Composants Shadcn/Radix pré-configurés', true, 2),
('o0000001-0000-0000-0000-000000000007', 'design', 'Palette', 'Mode sombre', 'Thème sombre intégré', false, 3),
('o0000001-0000-0000-0000-000000000007', 'design', 'Palette', 'Maquettes Figma', 'Maquettes UI avant développement', false, 4),
('o0000001-0000-0000-0000-000000000007', 'performance', 'Zap', 'Déploiement cloud', 'Hébergement Vercel/Railway/Render', true, 1),
('o0000001-0000-0000-0000-000000000007', 'performance', 'Zap', 'SSL / HTTPS', 'Connexions sécurisées', true, 2),
('o0000001-0000-0000-0000-000000000007', 'performance', 'Zap', 'Backups quotidiens', 'Sauvegardes automatiques de la base', false, 3),
('o0000001-0000-0000-0000-000000000007', 'performance', 'Zap', 'CI/CD basique', 'Déploiement automatisé sur push', false, 4),
('o0000001-0000-0000-0000-000000000007', 'seo', 'Search', 'Meta tags', 'Optimisation pour le partage social', true, 1),
('o0000001-0000-0000-0000-000000000007', 'seo', 'Search', 'Sitemap', 'Plan du site pour référencement', false, 2),
('o0000001-0000-0000-0000-000000000007', 'seo', 'Search', 'Analytics', 'Suivi des utilisateurs et comportements', false, 3),
('o0000001-0000-0000-0000-000000000007', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement cloud inclus', true, 1),
('o0000001-0000-0000-0000-000000000007', 'support', 'Headphones', 'Documentation technique', 'Guide d''utilisation de l''application', true, 2),
('o0000001-0000-0000-0000-000000000007', 'support', 'Headphones', 'Support 1 mois', 'Assistance post-lancement', false, 3),
('o0000001-0000-0000-0000-000000000007', 'support', 'Headphones', 'Formation (1h)', 'Formation à l''utilisation', false, 4);

-- ========================================
-- APPLICATION WEB BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'Next.js / React', 'Architecture frontend avancée', true, 1),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'Node.js + Express/tRPC', 'API backend structurée et typée', true, 2),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'PostgreSQL + Prisma', 'ORM professionnel pour requêtes complexes', true, 3),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'Redis', 'Cache et sessions haute performance', true, 4),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'Socket.io', 'Communication temps réel WebSocket', true, 5),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'Docker', 'Conteneurisation pour scalabilité', false, 6),
('o0000001-0000-0000-0000-000000000008', 'technologies', 'Code', 'GraphQL', 'API flexible et performante', false, 7),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Gestion de rôles', 'Permissions granulaires par utilisateur', true, 1),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'API REST complète', 'Endpoints documentés avec Swagger', true, 2),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Dashboard avancé', 'Graphiques, KPIs et widgets configurables', true, 3),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Notifications temps réel', 'Alertes push et in-app', true, 4),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Gestion fichiers/uploads', 'Upload, prévisualisation et stockage cloud', true, 5),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Exports PDF/CSV', 'Génération de rapports exportables', true, 6),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Workflow automatisé', 'Automatisation de processus métier', false, 7),
('o0000001-0000-0000-0000-000000000008', 'fonctionnalites', 'Layers', 'Intégration CRM', 'Connexion avec Salesforce, HubSpot...', false, 8),
('o0000001-0000-0000-0000-000000000008', 'design', 'Palette', 'Design system professionnel', 'Composants réutilisables et cohérents', true, 1),
('o0000001-0000-0000-0000-000000000008', 'design', 'Palette', 'Maquettes Figma (5 pages)', 'Wireframes et maquettes détaillées', true, 2),
('o0000001-0000-0000-0000-000000000008', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', true, 3),
('o0000001-0000-0000-0000-000000000008', 'design', 'Palette', 'Responsive adaptatif', 'Layout adapté mobile/tablette/desktop', true, 4),
('o0000001-0000-0000-0000-000000000008', 'design', 'Palette', 'Micro-interactions', 'Animations subtiles pour l''UX', false, 5),
('o0000001-0000-0000-0000-000000000008', 'performance', 'Zap', 'CI/CD complet', 'Pipeline de déploiement automatisé', true, 1),
('o0000001-0000-0000-0000-000000000008', 'performance', 'Zap', 'Tests automatisés', 'Tests unitaires et d''intégration', true, 2),
('o0000001-0000-0000-0000-000000000008', 'performance', 'Zap', 'CDN et cache', 'Performances optimales', true, 3),
('o0000001-0000-0000-0000-000000000008', 'performance', 'Zap', 'Monitoring', 'Suivi des erreurs et performances', false, 4),
('o0000001-0000-0000-0000-000000000008', 'seo', 'Search', 'SEO technique', 'Optimisation pour les moteurs de recherche', true, 1),
('o0000001-0000-0000-0000-000000000008', 'seo', 'Search', 'Analytics avancés', 'Tracking utilisateur et métriques', true, 2),
('o0000001-0000-0000-0000-000000000008', 'seo', 'Search', 'Schema.org', 'Données structurées', false, 3),
('o0000001-0000-0000-0000-000000000008', 'support', 'Headphones', 'Hébergement premium', 'Infrastructure cloud haute performance', true, 1),
('o0000001-0000-0000-0000-000000000008', 'support', 'Headphones', 'Documentation complète', 'Documentation technique et utilisateur', true, 2),
('o0000001-0000-0000-0000-000000000008', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et corrections', true, 3),
('o0000001-0000-0000-0000-000000000008', 'support', 'Headphones', 'Formation équipe (3h)', 'Formation à l''utilisation et admin', true, 4),
('o0000001-0000-0000-0000-000000000008', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 2h en jours ouvrés', false, 5);

-- ========================================
-- APPLICATION WEB PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'Next.js / React', 'Architecture de pointe', true, 1),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'API GraphQL + REST', 'Double API pour flexibilité maximale', true, 2),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'PostgreSQL + Prisma + Redis', 'Stack data enterprise', true, 3),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'WebSocket natif', 'Temps réel bidirectionnel', true, 4),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'Docker + Kubernetes', 'Orchestration de conteneurs', true, 5),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'Message Queue (RabbitMQ)', 'Communication asynchrone entre services', false, 6),
('o0000001-0000-0000-0000-000000000009', 'technologies', 'Code', 'Terraform', 'Infrastructure as Code', false, 7),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Architecture microservices', 'Services découplés et scalables', true, 1),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Temps réel WebSocket', 'Collaboration et notifications live', true, 2),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'CI/CD pipeline complet', 'Tests, build, déploiement automatisés', true, 3),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Monitoring et alertes', 'Observabilité complète de l''application', true, 4),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Tests E2E complets', 'Couverture de test maximale', true, 5),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Scalabilité automatique', 'Auto-scaling selon la charge', true, 6),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Système de plugins', 'Architecture extensible par modules', false, 7),
('o0000001-0000-0000-0000-000000000009', 'fonctionnalites', 'Layers', 'Multi-tenant', 'Isolation des données par organisation', false, 8),
('o0000001-0000-0000-0000-000000000009', 'design', 'Palette', 'Design system enterprise', 'Storybook + composants documentés', true, 1),
('o0000001-0000-0000-0000-000000000009', 'design', 'Palette', 'Motion design', 'Animations et transitions avancées', true, 2),
('o0000001-0000-0000-0000-000000000009', 'design', 'Palette', 'Accessibilité WCAG AA', 'Conformité aux standards d''accessibilité', true, 3),
('o0000001-0000-0000-0000-000000000009', 'design', 'Palette', 'Thèmes personnalisables', 'White-label avec thèmes configurables', false, 4),
('o0000001-0000-0000-0000-000000000009', 'performance', 'Zap', 'Infrastructure enterprise', 'Haute disponibilité garantie', true, 1),
('o0000001-0000-0000-0000-000000000009', 'performance', 'Zap', 'Monitoring 24/7', 'Observabilité complète (Grafana, Sentry)', true, 2),
('o0000001-0000-0000-0000-000000000009', 'performance', 'Zap', 'Auto-scaling', 'Scalabilité horizontale automatique', true, 3),
('o0000001-0000-0000-0000-000000000009', 'performance', 'Zap', 'Disaster recovery', 'Plan de reprise d''activité', false, 4),
('o0000001-0000-0000-0000-000000000009', 'seo', 'Search', 'Documentation API', 'Documentation Swagger/OpenAPI complète', true, 1),
('o0000001-0000-0000-0000-000000000009', 'seo', 'Search', 'Analytics avancés', 'Métriques business et techniques', true, 2),
('o0000001-0000-0000-0000-000000000009', 'seo', 'Search', 'Audit de sécurité', 'Pentest et rapport de vulnérabilités', false, 3),
('o0000001-0000-0000-0000-000000000009', 'support', 'Headphones', 'Infrastructure dédiée', 'Serveurs haute performance dédiés', true, 1),
('o0000001-0000-0000-0000-000000000009', 'support', 'Headphones', 'Documentation technique', 'Docs architecture, API et utilisateur', true, 2),
('o0000001-0000-0000-0000-000000000009', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 1h, 7j/7', true, 3),
('o0000001-0000-0000-0000-000000000009', 'support', 'Headphones', 'Formation équipe (6h)', 'Formation technique et fonctionnelle', true, 4),
('o0000001-0000-0000-0000-000000000009', 'support', 'Headphones', 'SLA garanti 99.9%', 'Contrat de niveau de service', false, 5);

-- ========================================
-- SAAS ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000010', 'technologies', 'Code', 'Next.js / React', 'Frontend moderne et performant', true, 1),
('o0000001-0000-0000-0000-000000000010', 'technologies', 'Code', 'Supabase', 'Backend-as-a-Service complet', true, 2),
('o0000001-0000-0000-0000-000000000010', 'technologies', 'Code', 'Stripe Billing', 'Facturation et abonnements', true, 3),
('o0000001-0000-0000-0000-000000000010', 'technologies', 'Code', 'PostgreSQL', 'Base de données relationnelle', true, 4),
('o0000001-0000-0000-0000-000000000010', 'technologies', 'Code', 'Resend', 'Emails transactionnels fiables', false, 5),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'MVP fonctionnel', 'Produit minimum viable prêt à lancer', true, 1),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Authentification complète', 'Login, register, OAuth, magic links', true, 2),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Facturation Stripe', 'Plans d''abonnement et paiements', true, 3),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Dashboard admin', 'Panel pour gérer utilisateurs et données', true, 4),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Landing page', 'Page de présentation marketing incluse', true, 5),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Onboarding utilisateur', 'Guide interactif de première utilisation', false, 6),
('o0000001-0000-0000-0000-000000000010', 'fonctionnalites', 'Layers', 'Notifications email', 'Emails de bienvenue et d''activité', false, 7),
('o0000001-0000-0000-0000-000000000010', 'design', 'Palette', 'Design responsive', 'Interface adaptée tous écrans', true, 1),
('o0000001-0000-0000-0000-000000000010', 'design', 'Palette', 'UI Kit SaaS', 'Composants optimisés pour SaaS', true, 2),
('o0000001-0000-0000-0000-000000000010', 'design', 'Palette', 'Mode sombre', 'Thème sombre intégré', false, 3),
('o0000001-0000-0000-0000-000000000010', 'design', 'Palette', 'Branding personnalisé', 'Couleurs et logo sur mesure', false, 4),
('o0000001-0000-0000-0000-000000000010', 'performance', 'Zap', 'Déploiement cloud', 'Hébergement Vercel optimisé', true, 1),
('o0000001-0000-0000-0000-000000000010', 'performance', 'Zap', 'SSL / HTTPS', 'Sécurité des données', true, 2),
('o0000001-0000-0000-0000-000000000010', 'performance', 'Zap', 'Backups automatiques', 'Sauvegardes quotidiennes', false, 3),
('o0000001-0000-0000-0000-000000000010', 'performance', 'Zap', 'Monitoring basique', 'Alertes en cas de panne', false, 4),
('o0000001-0000-0000-0000-000000000010', 'seo', 'Search', 'SEO landing page', 'Optimisation de la page marketing', true, 1),
('o0000001-0000-0000-0000-000000000010', 'seo', 'Search', 'Open Graph', 'Partage social optimisé', true, 2),
('o0000001-0000-0000-0000-000000000010', 'seo', 'Search', 'Analytics', 'Suivi des conversions', false, 3),
('o0000001-0000-0000-0000-000000000010', 'support', 'Headphones', 'Hébergement 1 an', 'Hébergement cloud inclus', true, 1),
('o0000001-0000-0000-0000-000000000010', 'support', 'Headphones', 'Documentation', 'Guide utilisateur et technique', true, 2),
('o0000001-0000-0000-0000-000000000010', 'support', 'Headphones', 'Support 1 mois', 'Assistance post-lancement', false, 3),
('o0000001-0000-0000-0000-000000000010', 'support', 'Headphones', 'Formation (1h)', 'Prise en main de la plateforme', false, 4);

-- ========================================
-- SAAS BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Next.js / React', 'Architecture frontend avancée', true, 1),
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Supabase + Prisma', 'Backend robuste avec ORM', true, 2),
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Stripe Billing avancé', 'Abonnements, essais gratuits, upgrades', true, 3),
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Redis', 'Cache et rate limiting', true, 4),
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Resend + webhooks', 'Emails et événements automatisés', true, 5),
('o0000001-0000-0000-0000-000000000011', 'technologies', 'Code', 'Bull/BullMQ', 'File d''attente pour tâches asynchrones', false, 6),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'Architecture multi-tenant', 'Isolation des données par organisation', true, 1),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'Gestion d''abonnements', 'Plans, essais gratuits, facturation', true, 2),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', '3+ rôles utilisateurs', 'Admin, manager, membre, invité...', true, 3),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'Analytics et métriques', 'KPIs, graphiques et tableaux de bord', true, 4),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'API publique documentée', 'API REST pour intégrations tierces', true, 5),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'Webhooks configurables', 'Événements envoyés à des URLs externes', true, 6),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'Onboarding interactif', 'Guide pas-à-pas pour nouveaux utilisateurs', true, 7),
('o0000001-0000-0000-0000-000000000011', 'fonctionnalites', 'Layers', 'White-label basique', 'Personnalisation logo et couleurs', false, 8),
('o0000001-0000-0000-0000-000000000011', 'design', 'Palette', 'Design system SaaS', 'Composants réutilisables professionnels', true, 1),
('o0000001-0000-0000-0000-000000000011', 'design', 'Palette', 'Dashboard analytics', 'Tableaux de bord visuels et interactifs', true, 2),
('o0000001-0000-0000-0000-000000000011', 'design', 'Palette', 'Mode sombre', 'Thème sombre natif', true, 3),
('o0000001-0000-0000-0000-000000000011', 'design', 'Palette', 'Composants interactifs', 'Drag & drop, filtres avancés, datepickers', false, 4),
('o0000001-0000-0000-0000-000000000011', 'performance', 'Zap', 'CI/CD pipeline', 'Tests et déploiement automatisés', true, 1),
('o0000001-0000-0000-0000-000000000011', 'performance', 'Zap', 'CDN mondial', 'Distribution globale du contenu', true, 2),
('o0000001-0000-0000-0000-000000000011', 'performance', 'Zap', 'Backups automatiques', 'Sauvegardes avec rétention 30 jours', true, 3),
('o0000001-0000-0000-0000-000000000011', 'performance', 'Zap', 'Rate limiting', 'Protection contre les abus d''API', true, 4),
('o0000001-0000-0000-0000-000000000011', 'performance', 'Zap', 'Monitoring avancé', 'Alertes, logs centralisés, métriques', false, 5),
('o0000001-0000-0000-0000-000000000011', 'seo', 'Search', 'SEO marketing pages', 'Optimisation des pages publiques', true, 1),
('o0000001-0000-0000-0000-000000000011', 'seo', 'Search', 'Schema.org SaaS', 'Données structurées SoftwareApplication', true, 2),
('o0000001-0000-0000-0000-000000000011', 'seo', 'Search', 'Analytics conversion', 'Tracking des inscriptions et upgrades', true, 3),
('o0000001-0000-0000-0000-000000000011', 'seo', 'Search', 'Blog marketing', 'Section blog pour le content marketing', false, 4),
('o0000001-0000-0000-0000-000000000011', 'support', 'Headphones', 'Hébergement premium', 'Infrastructure cloud scalable', true, 1),
('o0000001-0000-0000-0000-000000000011', 'support', 'Headphones', 'Documentation complète', 'Docs technique, API et utilisateur', true, 2),
('o0000001-0000-0000-0000-000000000011', 'support', 'Headphones', 'Support 6 mois', 'Assistance technique et évolutions', true, 3),
('o0000001-0000-0000-0000-000000000011', 'support', 'Headphones', 'Formation (3h)', 'Formation admin et utilisation', true, 4),
('o0000001-0000-0000-0000-000000000011', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h en jours ouvrés', false, 5);

-- ========================================
-- SAAS PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Next.js / React', 'Architecture enterprise', true, 1),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Microservices', 'Architecture distribuée scalable', true, 2),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Stripe + factures', 'Facturation avancée avec devis et factures', true, 3),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Kubernetes', 'Orchestration de conteneurs', true, 4),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Redis + Message Queue', 'Cache, sessions et traitement asynchrone', true, 5),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Terraform', 'Infrastructure as Code', false, 6),
('o0000001-0000-0000-0000-000000000012', 'technologies', 'Code', 'Elasticsearch', 'Recherche et analytics enterprise', false, 7),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'White-label complet', 'Personnalisation totale par client', true, 1),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'SSO / SAML / OAuth2', 'Authentification enterprise', true, 2),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'Audit logs complets', 'Traçabilité de toutes les actions', true, 3),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'API publique complète', 'API versionnée avec SDK', true, 4),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'Scalabilité automatique', 'Auto-scaling selon la charge', true, 5),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'Backups et DR', 'Sauvegardes automatiques et plan de reprise', true, 6),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'Migration de données', 'Import depuis d''autres plateformes', false, 7),
('o0000001-0000-0000-0000-000000000012', 'fonctionnalites', 'Layers', 'Marketplace de plugins', 'Écosystème d''extensions tierces', false, 8),
('o0000001-0000-0000-0000-000000000012', 'design', 'Palette', 'Design system enterprise', 'Storybook + documentation design', true, 1),
('o0000001-0000-0000-0000-000000000012', 'design', 'Palette', 'Thèmes white-label', 'Thèmes personnalisables par tenant', true, 2),
('o0000001-0000-0000-0000-000000000012', 'design', 'Palette', 'Accessibilité WCAG AA', 'Standards d''accessibilité respectés', true, 3),
('o0000001-0000-0000-0000-000000000012', 'design', 'Palette', 'Design ops', 'Processus et outils de design à l''échelle', false, 4),
('o0000001-0000-0000-0000-000000000012', 'performance', 'Zap', 'Infrastructure enterprise', 'Haute disponibilité multi-régions', true, 1),
('o0000001-0000-0000-0000-000000000012', 'performance', 'Zap', 'Monitoring 24/7', 'Grafana, Sentry, Datadog', true, 2),
('o0000001-0000-0000-0000-000000000012', 'performance', 'Zap', 'Auto-scaling', 'Scalabilité horizontale automatique', true, 3),
('o0000001-0000-0000-0000-000000000012', 'performance', 'Zap', 'SLA 99.9%', 'Disponibilité garantie contractuellement', true, 4),
('o0000001-0000-0000-0000-000000000012', 'performance', 'Zap', 'Disaster recovery', 'Plan de reprise sur autre région', false, 5),
('o0000001-0000-0000-0000-000000000012', 'seo', 'Search', 'Documentation API publique', 'Portail développeur complet', true, 1),
('o0000001-0000-0000-0000-000000000012', 'seo', 'Search', 'Analytics business', 'Métriques MRR, churn, LTV...', true, 2),
('o0000001-0000-0000-0000-000000000012', 'seo', 'Search', 'Compliance RGPD', 'Conformité des données personnelles', true, 3),
('o0000001-0000-0000-0000-000000000012', 'seo', 'Search', 'Audit de sécurité', 'Pentest et analyse de vulnérabilités', false, 4),
('o0000001-0000-0000-0000-000000000012', 'support', 'Headphones', 'Infrastructure dédiée', 'Cluster Kubernetes dédié', true, 1),
('o0000001-0000-0000-0000-000000000012', 'support', 'Headphones', 'Support multi-canal dédié', 'Email, chat, téléphone, visio', true, 2),
('o0000001-0000-0000-0000-000000000012', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 1h, 7j/7', true, 3),
('o0000001-0000-0000-0000-000000000012', 'support', 'Headphones', 'Formation équipe (8h)', 'Formation technique et fonctionnelle', true, 4),
('o0000001-0000-0000-0000-000000000012', 'support', 'Headphones', 'Account manager dédié', 'Interlocuteur unique pour votre projet', false, 5);

-- ========================================
-- IA ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000013', 'technologies', 'Code', 'OpenAI GPT / Claude', 'Modèle de langage de pointe', true, 1),
('o0000001-0000-0000-0000-000000000013', 'technologies', 'Code', 'Next.js / React', 'Interface chatbot moderne', true, 2),
('o0000001-0000-0000-0000-000000000013', 'technologies', 'Code', 'Supabase', 'Stockage des conversations', true, 3),
('o0000001-0000-0000-0000-000000000013', 'technologies', 'Code', 'Vercel AI SDK', 'Streaming des réponses en temps réel', true, 4),
('o0000001-0000-0000-0000-000000000013', 'technologies', 'Code', 'LangChain', 'Framework d''orchestration IA', false, 5),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Chatbot IA intégré', 'Widget de chat intelligent sur votre site', true, 1),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'FAQ automatisée', 'Réponses automatiques aux questions fréquentes', true, 2),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Widget personnalisable', 'Couleurs, position et style sur mesure', true, 3),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Historique conversations', 'Suivi et export des échanges', true, 4),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Interface admin', 'Gestion des réponses et statistiques', true, 5),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Escalade vers humain', 'Transfert vers un agent en cas de besoin', false, 6),
('o0000001-0000-0000-0000-000000000013', 'fonctionnalites', 'Layers', 'Multi-langue', 'Chatbot multilingue automatique', false, 7),
('o0000001-0000-0000-0000-000000000013', 'design', 'Palette', 'Widget responsive', 'Adapté mobile et desktop', true, 1),
('o0000001-0000-0000-0000-000000000013', 'design', 'Palette', 'Thème personnalisable', 'Aux couleurs de votre marque', true, 2),
('o0000001-0000-0000-0000-000000000013', 'design', 'Palette', 'Animations de chat', 'Bulles animées et indicateur de frappe', false, 3),
('o0000001-0000-0000-0000-000000000013', 'design', 'Palette', 'Avatar IA', 'Avatar personnalisé pour votre assistant', false, 4),
('o0000001-0000-0000-0000-000000000013', 'performance', 'Zap', 'Réponses streaming', 'Affichage progressif des réponses', true, 1),
('o0000001-0000-0000-0000-000000000013', 'performance', 'Zap', 'Cache intelligent', 'Réponses mises en cache pour les questions fréquentes', true, 2),
('o0000001-0000-0000-0000-000000000013', 'performance', 'Zap', 'Rate limiting', 'Protection contre les abus', false, 3),
('o0000001-0000-0000-0000-000000000013', 'performance', 'Zap', 'Fallback hors-ligne', 'Réponses pré-configurées si l''API est down', false, 4),
('o0000001-0000-0000-0000-000000000013', 'seo', 'Search', 'Schema.org FAQ', 'Rich snippets pour les questions fréquentes', true, 1),
('o0000001-0000-0000-0000-000000000013', 'seo', 'Search', 'Analytics chatbot', 'Statistiques d''utilisation du chatbot', false, 2),
('o0000001-0000-0000-0000-000000000013', 'support', 'Headphones', 'Configuration initiale', 'Personnalisation des réponses et du ton', true, 1),
('o0000001-0000-0000-0000-000000000013', 'support', 'Headphones', 'Formation (1h)', 'Prise en main de l''interface admin', true, 2),
('o0000001-0000-0000-0000-000000000013', 'support', 'Headphones', 'Support 1 mois', 'Assistance post-lancement', false, 3),
('o0000001-0000-0000-0000-000000000013', 'support', 'Headphones', 'Mises à jour du modèle', 'Accès aux nouvelles versions du modèle IA', false, 4);

-- ========================================
-- IA BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'GPT-4 / Claude 3.5', 'Modèles de dernière génération', true, 1),
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'LangChain', 'Orchestration avancée de chaînes IA', true, 2),
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'Pinecone / Qdrant', 'Base vectorielle pour la mémoire IA', true, 3),
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'Supabase + Prisma', 'Backend robuste pour les données', true, 4),
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'Whisper (Speech-to-Text)', 'Reconnaissance vocale IA', false, 5),
('o0000001-0000-0000-0000-000000000014', 'technologies', 'Code', 'ElevenLabs (Text-to-Speech)', 'Synthèse vocale IA réaliste', false, 6),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Chatbot IA avancé', 'Conversations contextuelles et naturelles', true, 1),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Connexion CRM', 'Intégration Salesforce, HubSpot, Pipedrive', true, 2),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Analyse de sentiment', 'Détection du ton et des émotions', true, 3),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Génération de contenu', 'Articles, emails, descriptions produits', true, 4),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Multi-canal', 'Site, WhatsApp, email, Messenger', true, 5),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Escalade intelligente', 'Transfert contextualisé vers agent humain', true, 6),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Dashboard analytics IA', 'Métriques d''efficacité et satisfaction', true, 7),
('o0000001-0000-0000-0000-000000000014', 'fonctionnalites', 'Layers', 'Voice assistant', 'Assistant vocal intégré', false, 8),
('o0000001-0000-0000-0000-000000000014', 'design', 'Palette', 'Interface conversationnelle', 'Chat design premium et accessible', true, 1),
('o0000001-0000-0000-0000-000000000014', 'design', 'Palette', 'Dashboard analytics', 'Visualisations et graphiques IA', true, 2),
('o0000001-0000-0000-0000-000000000014', 'design', 'Palette', 'Mode sombre', 'Thème sombre pour le chat et le dashboard', true, 3),
('o0000001-0000-0000-0000-000000000014', 'design', 'Palette', 'Animations conversationnelles', 'Transitions et effets de chat avancés', false, 4),
('o0000001-0000-0000-0000-000000000014', 'performance', 'Zap', 'Streaming temps réel', 'Réponses affichées au fur et à mesure', true, 1),
('o0000001-0000-0000-0000-000000000014', 'performance', 'Zap', 'Cache sémantique', 'Réponses similaires servies depuis le cache', true, 2),
('o0000001-0000-0000-0000-000000000014', 'performance', 'Zap', 'Rate limiting avancé', 'Quotas par utilisateur et par plan', true, 3),
('o0000001-0000-0000-0000-000000000014', 'performance', 'Zap', 'Monitoring IA', 'Suivi des coûts et de la qualité des réponses', false, 4),
('o0000001-0000-0000-0000-000000000014', 'seo', 'Search', 'Schema.org FAQ', 'Rich snippets pour les FAQ IA', true, 1),
('o0000001-0000-0000-0000-000000000014', 'seo', 'Search', 'Analytics conversationnel', 'Rapports d''engagement et satisfaction', true, 2),
('o0000001-0000-0000-0000-000000000014', 'seo', 'Search', 'Content SEO IA', 'Contenu généré optimisé pour le SEO', false, 3),
('o0000001-0000-0000-0000-000000000014', 'support', 'Headphones', 'Configuration complète', 'Setup CRM, canaux, personnalité IA', true, 1),
('o0000001-0000-0000-0000-000000000014', 'support', 'Headphones', 'Formation équipe (3h)', 'Formation à l''utilisation et admin', true, 2),
('o0000001-0000-0000-0000-000000000014', 'support', 'Headphones', 'Support 6 mois', 'Assistance et optimisation continue', true, 3),
('o0000001-0000-0000-0000-000000000014', 'support', 'Headphones', 'Mises à jour modèle', 'Accès aux nouvelles versions IA', true, 4),
('o0000001-0000-0000-0000-000000000014', 'support', 'Headphones', 'Support prioritaire', 'Réponse sous 4h en jours ouvrés', false, 5);

-- ========================================
-- IA PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'GPT-4 / Claude Opus', 'Modèles les plus puissants', true, 1),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'LangChain + LangGraph', 'Orchestration d''agents IA complexes', true, 2),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'Pinecone / Weaviate', 'Base vectorielle enterprise', true, 3),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'Fine-tuning dédié', 'Modèle personnalisé sur vos données', true, 4),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'Kubernetes + GPU', 'Infrastructure IA scalable', true, 5),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'Modèle open-source', 'Llama, Mistral en auto-hébergé', false, 6),
('o0000001-0000-0000-0000-000000000015', 'technologies', 'Code', 'Computer Vision', 'Analyse d''images et OCR', false, 7),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Solution IA sur mesure', 'Architecture IA adaptée à votre métier', true, 1),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'RAG avancé', 'Recherche augmentée sur vos documents', true, 2),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Automatisation workflows', 'Agents IA qui exécutent des tâches', true, 3),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Analytics IA avancés', 'Métriques de qualité, coûts, latence', true, 4),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Intégration multi-sources', 'Connexion à vos bases, APIs, fichiers', true, 5),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'API IA dédiée', 'Endpoints IA pour vos applications', true, 6),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Agent autonome', 'IA qui planifie et exécute des tâches complexes', false, 7),
('o0000001-0000-0000-0000-000000000015', 'fonctionnalites', 'Layers', 'Multi-modal', 'Texte, image, audio, vidéo', false, 8),
('o0000001-0000-0000-0000-000000000015', 'design', 'Palette', 'Interface IA premium', 'Expérience conversationnelle de pointe', true, 1),
('o0000001-0000-0000-0000-000000000015', 'design', 'Palette', 'Dashboard IA complet', 'Monitoring et analytics visuels', true, 2),
('o0000001-0000-0000-0000-000000000015', 'design', 'Palette', 'Visualisation de données', 'Graphiques et rapports IA interactifs', true, 3),
('o0000001-0000-0000-0000-000000000015', 'design', 'Palette', 'Interface d''annotation', 'Outil pour améliorer le modèle IA', false, 4),
('o0000001-0000-0000-0000-000000000015', 'performance', 'Zap', 'Infrastructure GPU', 'Serveurs avec GPU dédiés', true, 1),
('o0000001-0000-0000-0000-000000000015', 'performance', 'Zap', 'Auto-scaling IA', 'Scalabilité automatique selon la charge', true, 2),
('o0000001-0000-0000-0000-000000000015', 'performance', 'Zap', 'Monitoring 24/7', 'Suivi des modèles et de la qualité', true, 3),
('o0000001-0000-0000-0000-000000000015', 'performance', 'Zap', 'Optimisation des coûts', 'Routage intelligent entre modèles', true, 4),
('o0000001-0000-0000-0000-000000000015', 'performance', 'Zap', 'Modèle on-premise', 'Hébergement sur vos propres serveurs', false, 5),
('o0000001-0000-0000-0000-000000000015', 'seo', 'Search', 'Documentation IA', 'Guide technique et d''utilisation complet', true, 1),
('o0000001-0000-0000-0000-000000000015', 'seo', 'Search', 'Analytics avancés', 'Métriques de performance et ROI IA', true, 2),
('o0000001-0000-0000-0000-000000000015', 'seo', 'Search', 'Audit continu', 'Évaluation régulière de la qualité IA', true, 3),
('o0000001-0000-0000-0000-000000000015', 'seo', 'Search', 'Compliance IA', 'Conformité RGPD et AI Act', false, 4),
('o0000001-0000-0000-0000-000000000015', 'support', 'Headphones', 'Infrastructure dédiée', 'GPU et compute dédiés', true, 1),
('o0000001-0000-0000-0000-000000000015', 'support', 'Headphones', 'Formation équipe (6h)', 'Formation technique IA complète', true, 2),
('o0000001-0000-0000-0000-000000000015', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Réponse sous 1h, 7j/7', true, 3),
('o0000001-0000-0000-0000-000000000015', 'support', 'Headphones', 'Audit et optimisation', 'Amélioration continue des modèles', true, 4),
('o0000001-0000-0000-0000-000000000015', 'support', 'Headphones', 'Consultant IA dédié', 'Expert IA attitré pour votre projet', false, 5);

-- ========================================
-- DESIGN UI/UX ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000016', 'technologies', 'Code', 'Figma', 'Outil de design collaboratif n°1', true, 1),
('o0000001-0000-0000-0000-000000000016', 'technologies', 'Code', 'Adobe Illustrator', 'Création d''assets vectoriels', true, 2),
('o0000001-0000-0000-0000-000000000016', 'technologies', 'Code', 'Photoshop', 'Retouche et composition d''images', false, 3),
('o0000001-0000-0000-0000-000000000016', 'technologies', 'Code', 'Framer', 'Prototypage interactif avancé', false, 4),
('o0000001-0000-0000-0000-000000000016', 'technologies', 'Code', 'Maze', 'Tests utilisateurs à distance', false, 5),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Audit UX rapide', 'Analyse des points de friction', true, 1),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Wireframes basse fidélité', 'Schémas de navigation et structure', true, 2),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Maquette Figma (1 page)', 'Design détaillé d''une page clé', true, 3),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Palette de couleurs', 'Sélection cohérente de couleurs', true, 4),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Choix typographique', 'Polices adaptées à votre marque', true, 5),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Maquettes supplémentaires', 'Pages additionnelles en option', false, 6),
('o0000001-0000-0000-0000-000000000016', 'fonctionnalites', 'Layers', 'Prototype cliquable', 'Navigation entre les écrans', false, 7),
('o0000001-0000-0000-0000-000000000016', 'design', 'Palette', 'Design responsive', 'Maquettes mobile et desktop', true, 1),
('o0000001-0000-0000-0000-000000000016', 'design', 'Palette', 'Export assets', 'Export des éléments graphiques (SVG, PNG)', true, 2),
('o0000001-0000-0000-0000-000000000016', 'design', 'Palette', 'Mode sombre', 'Déclinaison en thème sombre', false, 3),
('o0000001-0000-0000-0000-000000000016', 'design', 'Palette', 'Iconographie sur mesure', 'Set d''icônes personnalisées', false, 4),
('o0000001-0000-0000-0000-000000000016', 'performance', 'Zap', 'Optimisation mobile-first', 'Design pensé d''abord pour le mobile', true, 1),
('o0000001-0000-0000-0000-000000000016', 'performance', 'Zap', 'Guidelines de développement', 'Specs pour les développeurs', true, 2),
('o0000001-0000-0000-0000-000000000016', 'performance', 'Zap', 'Audit accessibilité basique', 'Vérification des contrastes et lisibilité', false, 3),
('o0000001-0000-0000-0000-000000000016', 'seo', 'Search', 'Architecture de l''information', 'Structure optimale du contenu', true, 1),
('o0000001-0000-0000-0000-000000000016', 'seo', 'Search', 'Hiérarchie visuelle', 'Guidage de l''oeil et call-to-actions', true, 2),
('o0000001-0000-0000-0000-000000000016', 'seo', 'Search', 'Benchmark concurrentiel', 'Analyse des designs concurrents', false, 3),
('o0000001-0000-0000-0000-000000000016', 'support', 'Headphones', 'Fichiers source Figma', 'Accès complet aux fichiers de design', true, 1),
('o0000001-0000-0000-0000-000000000016', 'support', 'Headphones', 'Révisions (2 tours)', '2 cycles de corrections inclus', true, 2),
('o0000001-0000-0000-0000-000000000016', 'support', 'Headphones', 'Support 2 semaines', 'Ajustements post-livraison', false, 3),
('o0000001-0000-0000-0000-000000000016', 'support', 'Headphones', 'Formation Figma', 'Prise en main de vos fichiers', false, 4);

-- ========================================
-- DESIGN UI/UX BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Figma', 'Design et prototypage collaboratif', true, 1),
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Framer', 'Prototypage haute fidélité', true, 2),
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Maze', 'Tests utilisateurs en ligne', true, 3),
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Adobe Creative Suite', 'Illustrator, Photoshop, After Effects', true, 4),
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Storybook', 'Documentation de composants UI', false, 5),
('o0000001-0000-0000-0000-000000000017', 'technologies', 'Code', 'Hotjar', 'Analyse comportementale (heatmaps)', false, 6),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Recherche utilisateur', 'Interviews, personas, parcours utilisateur', true, 1),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Wireframes interactifs', 'Maquettes filaires cliquables', true, 2),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Maquettes Figma (5-10 pages)', 'Design détaillé de toutes les pages clés', true, 3),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Prototype cliquable', 'Navigation interactive entre les écrans', true, 4),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Design System basique', 'Composants réutilisables et documentés', true, 5),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Tests utilisateurs', '3 sessions de tests avec rapport', true, 6),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Motion design basique', 'Animations de transitions et interactions', false, 7),
('o0000001-0000-0000-0000-000000000017', 'fonctionnalites', 'Layers', 'Audit accessibilité', 'Vérification WCAG basique', false, 8),
('o0000001-0000-0000-0000-000000000017', 'design', 'Palette', 'Design responsive complet', 'Desktop, tablette et mobile', true, 1),
('o0000001-0000-0000-0000-000000000017', 'design', 'Palette', 'Mode sombre', 'Déclinaison thème sombre complète', true, 2),
('o0000001-0000-0000-0000-000000000017', 'design', 'Palette', 'Composants réutilisables', 'Bibliothèque de composants Figma', true, 3),
('o0000001-0000-0000-0000-000000000017', 'design', 'Palette', 'Illustrations', 'Illustrations vectorielles sur mesure', false, 4),
('o0000001-0000-0000-0000-000000000017', 'design', 'Palette', 'Iconographie complète', 'Set d''icônes personnalisé complet', false, 5),
('o0000001-0000-0000-0000-000000000017', 'performance', 'Zap', 'Mobile-first design', 'Approche mobile prioritaire', true, 1),
('o0000001-0000-0000-0000-000000000017', 'performance', 'Zap', 'Specs développeurs', 'Documentation technique de chaque composant', true, 2),
('o0000001-0000-0000-0000-000000000017', 'performance', 'Zap', 'Audit accessibilité', 'Vérification WCAG niveau A', true, 3),
('o0000001-0000-0000-0000-000000000017', 'performance', 'Zap', 'Optimisation de conversion', 'CTA et parcours optimisés', false, 4),
('o0000001-0000-0000-0000-000000000017', 'seo', 'Search', 'Architecture de l''information', 'Structure de contenu optimisée', true, 1),
('o0000001-0000-0000-0000-000000000017', 'seo', 'Search', 'Parcours utilisateur', 'User flows et customer journey maps', true, 2),
('o0000001-0000-0000-0000-000000000017', 'seo', 'Search', 'Benchmark UX', 'Analyse concurrentielle approfondie', true, 3),
('o0000001-0000-0000-0000-000000000017', 'seo', 'Search', 'Audit de contenu', 'Recommandations UX writing', false, 4),
('o0000001-0000-0000-0000-000000000017', 'support', 'Headphones', 'Fichiers source complets', 'Figma, assets, illustrations', true, 1),
('o0000001-0000-0000-0000-000000000017', 'support', 'Headphones', 'Guide d''utilisation', 'Documentation du design system', true, 2),
('o0000001-0000-0000-0000-000000000017', 'support', 'Headphones', 'Révisions (4 tours)', '4 cycles de corrections inclus', true, 3),
('o0000001-0000-0000-0000-000000000017', 'support', 'Headphones', 'Support 3 mois', 'Assistance et ajustements', true, 4),
('o0000001-0000-0000-0000-000000000017', 'support', 'Headphones', 'Formation Figma (2h)', 'Formation à l''utilisation du design system', false, 5);

-- ========================================
-- DESIGN UI/UX PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Figma', 'Design et design system enterprise', true, 1),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Framer', 'Prototypage et animations avancées', true, 2),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Storybook', 'Documentation interactive des composants', true, 3),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Maze + Hotjar', 'Tests et analytics comportementaux', true, 4),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'After Effects / Lottie', 'Motion design et animations exportables', true, 5),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Spline 3D', 'Éléments 3D interactifs pour le web', false, 6),
('o0000001-0000-0000-0000-000000000018', 'technologies', 'Code', 'Design tokens', 'Variables design multi-plateforme', false, 7),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Recherche approfondie', 'Études terrain, analytics, interviews', true, 1),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Audit accessibilité WCAG', 'Conformité WCAG AA complète', true, 2),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Maquettes illimitées', 'Design de toutes les pages et états', true, 3),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Prototype haute fidélité', 'Prototype interactif proche du produit final', true, 4),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Design System complet', 'Bibliothèque complète avec Storybook', true, 5),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Motion design', 'Animations, transitions, micro-interactions', true, 6),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Tests A/B', 'Tests comparatifs et optimisation', true, 7),
('o0000001-0000-0000-0000-000000000018', 'fonctionnalites', 'Layers', 'Design multi-plateforme', 'Web, mobile natif, desktop', false, 8),
('o0000001-0000-0000-0000-000000000018', 'design', 'Palette', 'Design system enterprise', 'Bibliothèque complète et documentée', true, 1),
('o0000001-0000-0000-0000-000000000018', 'design', 'Palette', 'Mode sombre + thèmes', 'Multi-thèmes configurables', true, 2),
('o0000001-0000-0000-0000-000000000018', 'design', 'Palette', 'Illustrations sur mesure', 'Illustrations vectorielles personnalisées', true, 3),
('o0000001-0000-0000-0000-000000000018', 'design', 'Palette', 'Iconographie complète', 'Set d''icônes custom exhaustif', true, 4),
('o0000001-0000-0000-0000-000000000018', 'design', 'Palette', 'Motion guidelines', 'Règles d''animation et de transition', false, 5),
('o0000001-0000-0000-0000-000000000018', 'performance', 'Zap', 'Accessibilité WCAG AA', 'Conformité complète aux standards', true, 1),
('o0000001-0000-0000-0000-000000000018', 'performance', 'Zap', 'Design tokens', 'Variables synchronisées code/design', true, 2),
('o0000001-0000-0000-0000-000000000018', 'performance', 'Zap', 'Optimisation de conversion', 'UX optimisée pour la conversion', true, 3),
('o0000001-0000-0000-0000-000000000018', 'performance', 'Zap', 'Performance perçue', 'Skeleton screens, loading states optimisés', true, 4),
('o0000001-0000-0000-0000-000000000018', 'performance', 'Zap', 'Audit UX continu', 'Tests et optimisation réguliers', false, 5),
('o0000001-0000-0000-0000-000000000018', 'seo', 'Search', 'Stratégie de contenu UX', 'UX writing et content strategy', true, 1),
('o0000001-0000-0000-0000-000000000018', 'seo', 'Search', 'Parcours utilisateur optimisé', 'Funnels de conversion analysés', true, 2),
('o0000001-0000-0000-0000-000000000018', 'seo', 'Search', 'Benchmark complet', 'Analyse UX concurrentielle détaillée', true, 3),
('o0000001-0000-0000-0000-000000000018', 'seo', 'Search', 'Audit ergonomique', 'Évaluation experte de l''interface', false, 4),
('o0000001-0000-0000-0000-000000000018', 'support', 'Headphones', 'Fichiers source complets', 'Figma, Storybook, assets, tokens', true, 1),
('o0000001-0000-0000-0000-000000000018', 'support', 'Headphones', 'Documentation design system', 'Guide complet d''utilisation et contribution', true, 2),
('o0000001-0000-0000-0000-000000000018', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation design system et Figma', true, 3),
('o0000001-0000-0000-0000-000000000018', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Assistance et évolutions du design', true, 4),
('o0000001-0000-0000-0000-000000000018', 'support', 'Headphones', 'Révisions illimitées', 'Cycles de corrections sans limite', false, 5);

-- ========================================
-- BRANDING & SEO ESSENTIEL - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000019', 'technologies', 'Code', 'Adobe Illustrator', 'Création vectorielle professionnelle', true, 1),
('o0000001-0000-0000-0000-000000000019', 'technologies', 'Code', 'Adobe Photoshop', 'Retouche et composition d''images', true, 2),
('o0000001-0000-0000-0000-000000000019', 'technologies', 'Code', 'Google Search Console', 'Outil officiel d''analyse SEO Google', true, 3),
('o0000001-0000-0000-0000-000000000019', 'technologies', 'Code', 'Semrush / Ahrefs', 'Outils d''audit SEO professionnels', false, 4),
('o0000001-0000-0000-0000-000000000019', 'technologies', 'Code', 'Figma', 'Design de supports visuels', false, 5),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Création de logo', 'Logo professionnel avec 3 propositions', true, 1),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Charte graphique basique', 'Couleurs, typographies, usage du logo', true, 2),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Audit SEO technique', 'Analyse des performances SEO actuelles', true, 3),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Optimisation 5 pages', 'SEO on-page pour vos pages principales', true, 4),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Google Business Profile', 'Création et optimisation de votre fiche', true, 5),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Carte de visite', 'Design de carte de visite pro', false, 6),
('o0000001-0000-0000-0000-000000000019', 'fonctionnalites', 'Layers', 'Favicon et icônes', 'Icônes pour navigateur et réseaux', false, 7),
('o0000001-0000-0000-0000-000000000019', 'design', 'Palette', 'Palette de couleurs', 'Sélection harmonieuse de couleurs', true, 1),
('o0000001-0000-0000-0000-000000000019', 'design', 'Palette', 'Choix typographique', 'Polices adaptées à votre marque', true, 2),
('o0000001-0000-0000-0000-000000000019', 'design', 'Palette', 'Déclinaisons logo', 'Versions couleur, N&B, favicon', true, 3),
('o0000001-0000-0000-0000-000000000019', 'design', 'Palette', 'Templates réseaux sociaux', 'Modèles pour vos posts sociaux', false, 4),
('o0000001-0000-0000-0000-000000000019', 'performance', 'Zap', 'Sitemap XML', 'Plan du site pour les moteurs', true, 1),
('o0000001-0000-0000-0000-000000000019', 'performance', 'Zap', 'Meta tags optimisés', 'Title et description de chaque page', true, 2),
('o0000001-0000-0000-0000-000000000019', 'performance', 'Zap', 'Robots.txt optimisé', 'Configuration pour les crawlers', true, 3),
('o0000001-0000-0000-0000-000000000019', 'performance', 'Zap', 'Vitesse de chargement', 'Recommandations d''optimisation', false, 4),
('o0000001-0000-0000-0000-000000000019', 'seo', 'Search', 'Recherche de mots-clés', 'Identification des termes à cibler', true, 1),
('o0000001-0000-0000-0000-000000000019', 'seo', 'Search', 'Rapport SEO', 'Rapport complet de recommandations', true, 2),
('o0000001-0000-0000-0000-000000000019', 'seo', 'Search', 'Analyse concurrentielle', 'Benchmark SEO de vos concurrents', false, 3),
('o0000001-0000-0000-0000-000000000019', 'seo', 'Search', 'Stratégie de contenu', 'Plan éditorial recommandé', false, 4),
('o0000001-0000-0000-0000-000000000019', 'support', 'Headphones', 'Fichiers source', 'Logo en AI, SVG, PNG, PDF', true, 1),
('o0000001-0000-0000-0000-000000000019', 'support', 'Headphones', 'Guide d''utilisation', 'Mode d''emploi de votre identité', true, 2),
('o0000001-0000-0000-0000-000000000019', 'support', 'Headphones', 'Révisions (2 tours)', '2 cycles de corrections logo', true, 3),
('o0000001-0000-0000-0000-000000000019', 'support', 'Headphones', 'Suivi SEO (1 mois)', 'Monitoring des positions initiales', false, 4);

-- ========================================
-- BRANDING & SEO BUSINESS - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Adobe Creative Suite', 'Illustrator, Photoshop, InDesign', true, 1),
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Figma', 'Design de supports digitaux', true, 2),
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Semrush', 'Analyse SEO avancée et suivi', true, 3),
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Google Analytics 4', 'Tracking et analyse de trafic', true, 4),
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Mailchimp / Brevo', 'Email marketing et newsletters', false, 5),
('o0000001-0000-0000-0000-000000000020', 'technologies', 'Code', 'Canva Pro', 'Création de contenu social', false, 6),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Identité visuelle complète', 'Logo, charte, supports complets', true, 1),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Stratégie SEO 3 mois', 'Plan d''action SEO sur 3 mois', true, 2),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Contenu mensuel (4 articles)', 'Rédaction d''articles optimisés SEO', true, 3),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Stratégie de backlinks', 'Acquisition de liens de qualité', true, 4),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Reporting mensuel', 'Rapport de performances détaillé', true, 5),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Supports print', 'Cartes de visite, flyers, brochures', true, 6),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Gestion réseaux sociaux', 'Création et publication de contenu', false, 7),
('o0000001-0000-0000-0000-000000000020', 'fonctionnalites', 'Layers', 'Google Ads basique', 'Campagne de lancement', false, 8),
('o0000001-0000-0000-0000-000000000020', 'design', 'Palette', 'Charte graphique complète', 'Guide visuel exhaustif', true, 1),
('o0000001-0000-0000-0000-000000000020', 'design', 'Palette', 'Templates sociaux', 'Modèles pour Instagram, LinkedIn, Facebook', true, 2),
('o0000001-0000-0000-0000-000000000020', 'design', 'Palette', 'Signature email', 'Signature email professionnelle', true, 3),
('o0000001-0000-0000-0000-000000000020', 'design', 'Palette', 'Bannières web', 'Visuels pour campagnes et réseaux', false, 4),
('o0000001-0000-0000-0000-000000000020', 'performance', 'Zap', 'Optimisation technique SEO', 'Vitesse, crawlabilité, indexation', true, 1),
('o0000001-0000-0000-0000-000000000020', 'performance', 'Zap', 'Google Analytics + GSC', 'Tracking complet et rapports', true, 2),
('o0000001-0000-0000-0000-000000000020', 'performance', 'Zap', 'Schema.org', 'Données structurées pour rich snippets', true, 3),
('o0000001-0000-0000-0000-000000000020', 'performance', 'Zap', 'Core Web Vitals', 'Optimisation des métriques de performance', false, 4),
('o0000001-0000-0000-0000-000000000020', 'seo', 'Search', 'Recherche de mots-clés avancée', 'Clustering thématique et opportunités', true, 1),
('o0000001-0000-0000-0000-000000000020', 'seo', 'Search', 'Suivi de positions', 'Monitoring des rankings hebdomadaire', true, 2),
('o0000001-0000-0000-0000-000000000020', 'seo', 'Search', 'Analyse concurrentielle', 'Benchmark SEO détaillé', true, 3),
('o0000001-0000-0000-0000-000000000020', 'seo', 'Search', 'SEO local', 'Optimisation pour la recherche locale', false, 4),
('o0000001-0000-0000-0000-000000000020', 'support', 'Headphones', 'Fichiers source complets', 'Tous les fichiers AI, PSD, Figma', true, 1),
('o0000001-0000-0000-0000-000000000020', 'support', 'Headphones', 'Brand book', 'Guide de marque complet', true, 2),
('o0000001-0000-0000-0000-000000000020', 'support', 'Headphones', 'Support 3 mois', 'Assistance et ajustements', true, 3),
('o0000001-0000-0000-0000-000000000020', 'support', 'Headphones', 'Formation (2h)', 'Formation utilisation de la charte', true, 4),
('o0000001-0000-0000-0000-000000000020', 'support', 'Headphones', 'Révisions illimitées', 'Corrections sans limite pendant 3 mois', false, 5);

-- ========================================
-- BRANDING & SEO PREMIUM - Options
-- ========================================
INSERT INTO public.offer_options (offer_id, category, icon, name, description, is_included, sort_order) VALUES
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'Adobe Creative Suite', 'Suite complète print et digital', true, 1),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'Figma', 'Design digital avancé', true, 2),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'Semrush + Ahrefs', 'Double outil SEO pour analyse complète', true, 3),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'Google Ads', 'Publicité payante Google', true, 4),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'HubSpot / Brevo', 'CRM et marketing automation', true, 5),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'Meta Business Suite', 'Gestion des publicités Facebook/Instagram', false, 6),
('o0000001-0000-0000-0000-000000000021', 'technologies', 'Code', 'After Effects', 'Motion design et vidéo', false, 7),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Branding complet', 'Identité de marque exhaustive', true, 1),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Book de marque', 'Document de référence complet de la marque', true, 2),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Stratégie SEO 12 mois', 'Plan d''action SEO sur 1 an', true, 3),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Content marketing (8/mois)', 'Création de contenu optimisé régulier', true, 4),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Gestion réseaux sociaux', 'Création, publication et community management', true, 5),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Campagnes Google Ads', 'Gestion de campagnes publicitaires', true, 6),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Vidéo de présentation', 'Vidéo motion design de votre marque', true, 7),
('o0000001-0000-0000-0000-000000000021', 'fonctionnalites', 'Layers', 'Influence locale', 'Partenariats avec influenceurs locaux', false, 8),
('o0000001-0000-0000-0000-000000000021', 'design', 'Palette', 'Brand guidelines complètes', 'Guide visuel et éditorial exhaustif', true, 1),
('o0000001-0000-0000-0000-000000000021', 'design', 'Palette', 'Templates multi-supports', 'Modèles print, web et social', true, 2),
('o0000001-0000-0000-0000-000000000021', 'design', 'Palette', 'Vidéo motion design', 'Animations de marque professionnelles', true, 3),
('o0000001-0000-0000-0000-000000000021', 'design', 'Palette', 'Packaging', 'Design d''emballages et étiquettes', false, 4),
('o0000001-0000-0000-0000-000000000021', 'design', 'Palette', 'Signalétique', 'Design pour enseignes et espaces', false, 5),
('o0000001-0000-0000-0000-000000000021', 'performance', 'Zap', 'SEO technique avancé', 'Optimisation technique complète', true, 1),
('o0000001-0000-0000-0000-000000000021', 'performance', 'Zap', 'Analytics conversion', 'Tracking des objectifs et funnels', true, 2),
('o0000001-0000-0000-0000-000000000021', 'performance', 'Zap', 'A/B testing', 'Tests d''optimisation des conversions', true, 3),
('o0000001-0000-0000-0000-000000000021', 'performance', 'Zap', 'Audit de réputation', 'Veille et gestion de l''e-réputation', true, 4),
('o0000001-0000-0000-0000-000000000021', 'performance', 'Zap', 'ROI tracking', 'Mesure du retour sur investissement', false, 5),
('o0000001-0000-0000-0000-000000000021', 'seo', 'Search', 'Stratégie SEO complète', 'Plan éditorial, technique et netlinking', true, 1),
('o0000001-0000-0000-0000-000000000021', 'seo', 'Search', 'Suivi de positions quotidien', 'Monitoring permanent des rankings', true, 2),
('o0000001-0000-0000-0000-000000000021', 'seo', 'Search', 'Link building premium', 'Acquisition de backlinks haute qualité', true, 3),
('o0000001-0000-0000-0000-000000000021', 'seo', 'Search', 'SEO international', 'Optimisation multilingue et multi-pays', false, 4),
('o0000001-0000-0000-0000-000000000021', 'support', 'Headphones', 'Fichiers source complets', 'Tous les fichiers de production', true, 1),
('o0000001-0000-0000-0000-000000000021', 'support', 'Headphones', 'Brand book premium', 'Guide de marque exhaustif et illustré', true, 2),
('o0000001-0000-0000-0000-000000000021', 'support', 'Headphones', 'Support prioritaire 12 mois', 'Assistance permanente sur tous les sujets', true, 3),
('o0000001-0000-0000-0000-000000000021', 'support', 'Headphones', 'Reporting trimestriel', 'Bilans détaillés tous les 3 mois', true, 4),
('o0000001-0000-0000-0000-000000000021', 'support', 'Headphones', 'Formation équipe (4h)', 'Formation marque, SEO et contenu', false, 5);
