import type { CityPageData } from "./_types";

export const lyonData: CityPageData = {
  name: "Lyon",
  slug: "lyon",
  department: "Rhône",
  departmentCode: "69",
  region: "Auvergne-Rhône-Alpes",
  population: 522250,
  postalCode: "69000",
  latitude: 45.7640,
  longitude: 4.8357,
  distanceFromAgency: 300,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Lyon",

  seo: {
    title: "Agence Web Lyon | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Lyon et la région Rhône-Alpes. Création de sites internet, applications web, SaaS et SEO. Expertise technique pour les entreprises lyonnaises.",
    keywords: ["agence web lyon", "création site internet lyon", "développeur web lyon", "agence digitale lyon"],
  },

  hero: {
    title: "Agence Web à Lyon",
    subtitle: "Solutions digitales pour la capitale des Gaules",
    description: "Agence HDS met son expertise en développement web au service des entreprises lyonnaises. Applications modernes, plateformes SaaS et stratégies digitales pour la deuxième métropole de France.",
  },

  introduction: {
    title: "Lyon, hub tech et digital",
    paragraphs: [
      "Lyon, troisième ville de France avec 522 000 habitants et une métropole de 1,4 million, est le deuxième pôle économique français. La capitale des Gaules excelle dans le numérique (H7, le campus du numérique installé à l'Hôtel-Dieu), la santé (bioMérieux, Sanofi), l'industrie et la gastronomie.",
      "L'écosystème tech lyonnais est mature et compétitif. Le quartier de la Confluence, le campus numérique H7 et les incubateurs (Pulsalys, EM Lyon Incubateur) nourrissent un vivier de startups ambitieuses. Des entreprises comme OVHcloud, Cegid et Esker ont fait de Lyon un pôle majeur du logiciel en France.",
      "Agence HDS collabore avec des entreprises lyonnaises qui recherchent une expertise technique pointue et un accompagnement personnalisé. Notre positionnement en PACA nous permet d'offrir un regard neuf sur des projets ambitieux, avec la flexibilité et la réactivité d'une structure agile.",
    ],
  },

  localStats: [
    { value: "522K", label: "Habitants" },
    { value: "70K+", label: "Entreprises" },
    { value: "300 km", label: "De notre agence" },
    { value: "3e", label: "Ville de France" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Applications web pour l'écosystème numérique lyonnais" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes SaaS pour les éditeurs logiciels de Lyon" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA pour les entreprises health-tech et fintech lyonnaises" },
    { serviceSlug: "design-uiux", localizedSubtitle: "UX/UI pour les produits digitaux de la métropole lyonnaise" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les marques lyonnaises et la gastronomie" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Branding digital pour les entreprises de Lyon" },
  ],

  advantages: [
    {
      title: "Expertise technique pointue",
      description: "React, Next.js, TypeScript, Supabase, IA : notre stack est au niveau des meilleures agences tech lyonnaises, avec un accompagnement plus personnalisé.",
      icon: "Code",
    },
    {
      title: "Agilité d'une petite structure",
      description: "Pas de couches managériales inutiles. Vous travaillez directement avec les développeurs et designers qui réalisent votre projet. Décisions rapides, itérations efficaces.",
      icon: "Zap",
    },
    {
      title: "Tarifs Sud de la France",
      description: "L'expertise technique d'une agence lyonnaise à des tarifs de Provence. Un avantage concurrentiel significatif pour vos budgets de développement.",
      icon: "TrendingUp",
    },
    {
      title: "Collaboration full remote",
      description: "Lyon est à 3h de TGV. Nous maîtrisons le travail à distance avec les mêmes outils que les équipes distribuées de la tech : GitHub, Figma, Slack, Notion.",
      icon: "Monitor",
    },
  ],

  faq: [
    {
      question: "Pourquoi choisir une agence provençale pour un projet lyonnais ?",
      answer: "Pour le rapport qualité-prix. Nos compétences techniques sont identiques aux agences lyonnaises, mais notre coût de structure est inférieur. Vous obtenez la même qualité pour un budget optimisé.",
    },
    {
      question: "Comment se passe la collaboration à distance avec Lyon ?",
      answer: "Très fluidement. GitHub pour le code, Figma pour le design, Slack pour la communication quotidienne, et visioconférence pour les points hebdomadaires. Nous nous déplaçons à Lyon pour le kickoff et les jalons majeurs.",
    },
    {
      question: "Accompagnez-vous les startups lyonnaises ?",
      answer: "Oui. MVP rapide, architecture scalable, intégration Stripe, déploiement sur Vercel : nous connaissons les besoins des startups et livrons des produits fonctionnels en 6-8 semaines.",
    },
    {
      question: "Combien coûte un projet web à Lyon ?",
      answer: "Un site vitrine à partir de 1 500€, une application web à partir de 5 000€, un SaaS complet à partir de 8 000€. 20-30% moins cher que les agences lyonnaises ou parisiennes.",
    },
    {
      question: "Pouvez-vous renforcer une équipe tech lyonnaise ?",
      answer: "Oui, nous proposons du renfort ponctuel ou régulier. Développement frontend React/Next.js, intégration Supabase, design UI/UX : nous complétons votre équipe avec les compétences manquantes.",
    },
  ],

  nearbyCities: [
    { slug: "marseille", name: "Marseille", distance: 315 },
    { slug: "montpellier", name: "Montpellier", distance: 305 },
    { slug: "nice", name: "Nice", distance: 470 },
    { slug: "avignon", name: "Avignon", distance: 230 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 300 },
    { slug: "nimes", name: "Nîmes", distance: 250 },
  ],

  lastUpdated: "2026-02-15",
};
