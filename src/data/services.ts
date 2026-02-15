export interface ServiceData {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; desc: string }[];
  technologies: string[];
  process: { step: string; title: string; desc: string }[];
}

export const servicesData: Record<string, ServiceData> = {
  "developpement-web": {
    num: "01",
    title: "Développement Web",
    subtitle: "Sites et applications web performantes avec les technologies modernes.",
    description:
      "Nous concevons des solutions web sur mesure, du site vitrine à la plateforme SaaS complexe. Notre stack technique (React, Next.js, Supabase) garantit des performances optimales, une maintenance facilitée et une scalabilité sans limites.",
    features: [
      {
        title: "Sites vitrines responsive",
        desc: "Des sites élégants, rapides et parfaitement adaptés à tous les écrans.",
      },
      {
        title: "Applications web sur mesure",
        desc: "Des apps métier, dashboards et outils internes taillés pour vos processus.",
      },
      {
        title: "Plateformes SaaS",
        desc: "Architecture multi-tenant, gestion d\u2019abonnements et facturation intégrée.",
      },
      {
        title: "API & Intégrations",
        desc: "Connexion à vos outils existants via API REST, GraphQL ou webhooks.",
      },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    process: [
      { step: "01", title: "Analyse", desc: "Audit de vos besoins et définition du cahier des charges." },
      { step: "02", title: "Architecture", desc: "Choix techniques et structuration du projet." },
      { step: "03", title: "Développement", desc: "Sprints itératifs avec demos régulières." },
      { step: "04", title: "Déploiement", desc: "Mise en production, tests et formation." },
    ],
  },
  "solutions-saas": {
    num: "02",
    title: "Solutions SaaS",
    subtitle: "Des plateformes cloud scalables et sécurisées pour votre business.",
    description:
      "Nous concevons des plateformes SaaS complètes, de l\u2019architecture multi-tenant à la gestion des abonnements. Notre expertise Supabase et Next.js garantit des solutions performantes, sécurisées et évolutives.",
    features: [
      {
        title: "Architecture multi-tenant",
        desc: "Isolation des données par client avec une base de code unique et maintenable.",
      },
      {
        title: "Dashboards admin",
        desc: "Interfaces d\u2019administration riches pour gérer utilisateurs, données et analytics.",
      },
      {
        title: "Gestion d\u2019abonnements",
        desc: "Intégration Stripe pour facturation récurrente, essais gratuits et upgrades.",
      },
      {
        title: "Authentification & rôles",
        desc: "Système de permissions granulaire avec SSO, 2FA et gestion des équipes.",
      },
    ],
    technologies: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "TypeScript", "Vercel"],
    process: [
      { step: "01", title: "Discovery", desc: "Analyse du modèle business et des besoins utilisateurs." },
      { step: "02", title: "Architecture", desc: "Conception technique, modèle de données et sécurité." },
      { step: "03", title: "Développement", desc: "Sprints itératifs avec démos et feedback continu." },
      { step: "04", title: "Lancement", desc: "Déploiement, monitoring et onboarding des premiers clients." },
    ],
  },
  "intelligence-artificielle": {
    num: "03",
    title: "Intelligence Artificielle",
    subtitle: "L\u2019IA au service de votre entreprise, concrètement.",
    description:
      "Nous intégrons l\u2019intelligence artificielle dans vos processus métier : chatbots, automatisation, analyse de données et génération de contenu. Pas de buzzwords, des solutions concrètes qui créent de la valeur.",
    features: [
      {
        title: "Chatbots IA",
        desc: "Assistants conversationnels intelligents pour le support client et la vente.",
      },
      {
        title: "Automatisation",
        desc: "Automatisation des tâches répétitives avec des workflows IA sur mesure.",
      },
      {
        title: "Intégration API IA",
        desc: "Connexion à OpenAI, Claude, Mistral et autres modèles pour vos apps.",
      },
      {
        title: "Analyse intelligente",
        desc: "Extraction d\u2019insights et prédictions à partir de vos données existantes.",
      },
    ],
    technologies: ["OpenAI API", "Claude API", "LangChain", "Python", "Next.js", "Supabase"],
    process: [
      { step: "01", title: "Audit", desc: "Identification des cas d\u2019usage IA à fort impact dans votre activité." },
      { step: "02", title: "Prototypage", desc: "POC rapide pour valider la faisabilité et la valeur ajoutée." },
      { step: "03", title: "Développement", desc: "Intégration production avec monitoring et fine-tuning." },
      { step: "04", title: "Optimisation", desc: "Amélioration continue des performances et des coûts." },
    ],
  },
  "design-uiux": {
    num: "04",
    title: "Design UI/UX",
    subtitle: "Des interfaces qui marquent les esprits et convertissent les visiteurs.",
    description:
      "Le design n\u2019est pas qu\u2019une question d\u2019esthétique : c\u2019est un levier de conversion. Nous créons des interfaces intuitives, accessibles et mémorables qui transforment vos utilisateurs en ambassadeurs.",
    features: [
      {
        title: "Recherche utilisateur",
        desc: "Personas, parcours utilisateur et tests pour comprendre vos cibles.",
      },
      {
        title: "Wireframes & Prototypes",
        desc: "Validation rapide des concepts avant tout investissement visuel.",
      },
      {
        title: "Design System",
        desc: "Composants réutilisables pour une cohérence visuelle à long terme.",
      },
      {
        title: "Maquettes Figma",
        desc: "Designs pixel-perfect livrés dans un format collaboratif et évolutif.",
      },
    ],
    technologies: ["Figma", "Framer", "Adobe Suite", "Maze", "Hotjar", "Storybook"],
    process: [
      { step: "01", title: "Découverte", desc: "Immersion dans votre univers, vos utilisateurs et concurrents." },
      { step: "02", title: "Idéation", desc: "Exploration créative et wireframes basse fidélité." },
      { step: "03", title: "Design", desc: "Maquettes haute fidélité et prototypes interactifs." },
      { step: "04", title: "Validation", desc: "Tests utilisateurs et itérations finales." },
    ],
  },
  "e-commerce": {
    num: "05",
    title: "E-Commerce",
    subtitle: "Des boutiques en ligne qui vendent, pas juste qui existent.",
    description:
      "Nous créons des expériences e-commerce complètes : de la fiche produit au tunnel de paiement, chaque détail est pensé pour maximiser vos conversions et fidéliser vos clients.",
    features: [
      {
        title: "Boutique sur mesure",
        desc: "Interface adaptée à votre marque, pas un template générique.",
      },
      {
        title: "Paiement sécurisé",
        desc: "Intégration Stripe, Monetico et solutions bancaires françaises.",
      },
      {
        title: "Gestion produits",
        desc: "Back-office intuitif pour gérer catalogue, stocks et promotions.",
      },
      {
        title: "Analytics avancés",
        desc: "Suivi des conversions, paniers abandonnés et comportements d\u2019achat.",
      },
    ],
    technologies: ["Next.js", "Stripe", "WooCommerce", "Monetico", "Supabase", "Vercel"],
    process: [
      { step: "01", title: "Stratégie", desc: "Analyse du marché, positionnement et objectifs de vente." },
      { step: "02", title: "Catalogue", desc: "Architecture produits, catégories et filtres." },
      { step: "03", title: "Développement", desc: "Front-end, back-office et intégration paiement." },
      { step: "04", title: "Lancement", desc: "Tests, optimisation et suivi des performances." },
    ],
  },
  "branding-seo": {
    num: "06",
    title: "Branding & SEO",
    subtitle: "Une identité forte et une visibilité maximale sur le web.",
    description:
      "Votre marque mérite d\u2019être vue et reconnue. Nous construisons des identités visuelles cohérentes et des stratégies SEO durables pour vous positionner en première page.",
    features: [
      {
        title: "Identité visuelle",
        desc: "Logo, palette de couleurs, typographies et guidelines de marque.",
      },
      {
        title: "Charte graphique",
        desc: "Document complet pour assurer la cohérence sur tous vos supports.",
      },
      {
        title: "SEO technique",
        desc: "Audit, optimisation on-page, vitesse, balisage et indexation.",
      },
      {
        title: "Stratégie de contenu",
        desc: "Mots-clés, calendrier éditorial et optimisation des pages.",
      },
    ],
    technologies: ["Figma", "Google Search Console", "SEMrush", "Ahrefs", "Google Analytics", "Lighthouse"],
    process: [
      { step: "01", title: "Audit", desc: "Analyse de l\u2019existant, concurrence et opportunités." },
      { step: "02", title: "Stratégie", desc: "Positionnement, mots-clés et plan d\u2019action." },
      { step: "03", title: "Création", desc: "Design de l\u2019identité et optimisations SEO." },
      { step: "04", title: "Suivi", desc: "Reporting mensuel et ajustements continus." },
    ],
  },
};

export const servicesSlugs = Object.keys(servicesData);
