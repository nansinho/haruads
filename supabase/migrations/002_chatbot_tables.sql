-- ============================================
-- Tables: chatbot_nodes + chatbot_options
-- Arbre décisionnel pour le chatbot guidé
-- À exécuter manuellement dans Supabase SQL Editor
-- ============================================

-- Nœuds du chatbot (questions/messages)
CREATE TABLE IF NOT EXISTS public.chatbot_nodes (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  is_end BOOLEAN DEFAULT false,
  action_url TEXT,          -- URL de redirection (si fin de parcours)
  action_label TEXT,        -- Label du bouton d'action (si fin de parcours)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Options de réponse (liens entre nœuds)
CREATE TABLE IF NOT EXISTS public.chatbot_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id TEXT NOT NULL REFERENCES public.chatbot_nodes(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  next_node_id TEXT NOT NULL REFERENCES public.chatbot_nodes(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_chatbot_options_node ON public.chatbot_options (node_id, sort_order);

-- RLS
ALTER TABLE public.chatbot_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chatbot nodes are viewable by everyone"
  ON public.chatbot_nodes FOR SELECT USING (true);

CREATE POLICY "Chatbot options are viewable by everyone"
  ON public.chatbot_options FOR SELECT USING (true);

-- ============================================
-- Données initiales — Arbre décisionnel
-- ============================================

-- Nœud racine
INSERT INTO public.chatbot_nodes (id, message) VALUES
  ('start', 'Bonjour ! 👋 Je suis l''assistant de l''Agence HDS. Comment puis-je vous aider ?');

-- Niveau 1 : Catégories principales
INSERT INTO public.chatbot_nodes (id, message) VALUES
  ('services', 'Quel type de service vous intéresse ?'),
  ('tarifs', 'Voici nos formules adaptées à chaque besoin.'),
  ('contact', 'Comment souhaitez-vous nous contacter ?'),
  ('projets', 'Découvrez nos dernières réalisations.');

INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('start', '🛠 Découvrir nos services', 'services', 1),
  ('start', '💰 Voir les tarifs', 'tarifs', 2),
  ('start', '📬 Nous contacter', 'contact', 3),
  ('start', '🎨 Voir nos projets', 'projets', 4);

-- Niveau 2 : Services détaillés
INSERT INTO public.chatbot_nodes (id, message) VALUES
  ('service-web', 'Nous créons des sites vitrines, applications web et landing pages avec React et Next.js. Vous souhaitez en savoir plus ?'),
  ('service-saas', 'Nous développons des plateformes SaaS multi-tenant, dashboards admin et outils métier sur mesure.'),
  ('service-ia', 'Nous intégrons des chatbots IA, automatisons vos processus et connectons les API IA (OpenAI, Claude) à vos outils.'),
  ('service-design', 'Nous concevons des interfaces intuitives : maquettes Figma, prototypes interactifs et design systems complets.'),
  ('service-ecommerce', 'Nous créons des boutiques en ligne sur mesure avec paiement sécurisé (Stripe, Monetico).'),
  ('service-seo', 'Nous construisons votre identité visuelle et optimisons votre référencement naturel pour une visibilité maximale.');

INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('services', '🌐 Développement Web', 'service-web', 1),
  ('services', '☁️ Solutions SaaS', 'service-saas', 2),
  ('services', '🤖 Intelligence Artificielle', 'service-ia', 3),
  ('services', '🎨 Design UI/UX', 'service-design', 4),
  ('services', '🛒 E-Commerce', 'service-ecommerce', 5),
  ('services', '📈 Branding & SEO', 'service-seo', 6);

-- Nœuds de fin avec actions
INSERT INTO public.chatbot_nodes (id, message, is_end, action_url, action_label) VALUES
  ('end-devis', 'Parfait ! Remplissez notre formulaire et nous vous recontacterons sous 24h.', true, '/contact', 'Demander un devis'),
  ('end-tarifs', 'Consultez notre page tarifs pour trouver la formule qui vous convient.', true, '/tarifs', 'Voir les tarifs'),
  ('end-projets', 'Découvrez nos réalisations pour vous inspirer.', true, '/projets', 'Voir les projets'),
  ('end-email', 'Envoyez-nous un email à contact@agencehds.fr, nous répondons sous 24h.', true, 'mailto:contact@agencehds.fr', 'Envoyer un email'),
  ('end-rdv', 'Réservez un créneau pour un premier échange gratuit et sans engagement.', true, '/contact', 'Prendre rendez-vous');

-- Options de fin depuis les services
INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('service-web', '📝 Demander un devis', 'end-devis', 1),
  ('service-web', '💰 Voir les tarifs', 'end-tarifs', 2),
  ('service-saas', '📝 Demander un devis', 'end-devis', 1),
  ('service-saas', '💰 Voir les tarifs', 'end-tarifs', 2),
  ('service-ia', '📝 Demander un devis', 'end-devis', 1),
  ('service-ia', '💰 Voir les tarifs', 'end-tarifs', 2),
  ('service-design', '📝 Demander un devis', 'end-devis', 1),
  ('service-design', '🎨 Voir nos projets', 'end-projets', 2),
  ('service-ecommerce', '📝 Demander un devis', 'end-devis', 1),
  ('service-ecommerce', '💰 Voir les tarifs', 'end-tarifs', 2),
  ('service-seo', '📝 Demander un devis', 'end-devis', 1),
  ('service-seo', '💰 Voir les tarifs', 'end-tarifs', 2);

-- Options depuis tarifs
INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('tarifs', '💰 Voir les tarifs', 'end-tarifs', 1),
  ('tarifs', '📝 Devis personnalisé', 'end-devis', 2);

-- Options depuis contact
INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('contact', '📝 Formulaire de contact', 'end-devis', 1),
  ('contact', '📧 Envoyer un email', 'end-email', 2),
  ('contact', '📅 Prendre rendez-vous', 'end-rdv', 3);

-- Options depuis projets
INSERT INTO public.chatbot_options (node_id, label, next_node_id, sort_order) VALUES
  ('projets', '🎨 Voir les projets', 'end-projets', 1),
  ('projets', '📝 Demander un devis', 'end-devis', 2);
