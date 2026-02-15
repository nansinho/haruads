import type { CityPageData } from "./_types";

export const arlesData: CityPageData = {
  name: "Arles",
  slug: "arles",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 52510,
  postalCode: "13200",
  latitude: 43.6767,
  longitude: 4.6278,
  distanceFromAgency: 70,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Arles",

  seo: {
    title: "Agence Web Arles | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Arles et la Camargue. Création de sites internet, e-commerce et SEO pour les entreprises arlésiennes. Devis gratuit.",
    keywords: ["agence web arles", "création site internet arles", "développeur web arles", "agence digitale arles camargue"],
  },

  hero: {
    title: "Agence Web à Arles",
    subtitle: "Solutions digitales pour la cité romaine et la Camargue",
    description: "Agence HDS accompagne les entreprises d'Arles et de la Camargue dans leur développement digital. Sites web, e-commerce et référencement pour la plus grande commune de France.",
  },

  introduction: {
    title: "Le digital au service du patrimoine arlésien",
    paragraphs: [
      "Arles, classée au patrimoine mondial de l'UNESCO pour ses monuments romains et romans, est la plus grande commune de France métropolitaine par sa superficie. Ses 52 000 habitants vivent entre patrimoine antique, Camargue sauvage et création contemporaine, symbolisée par la Fondation LUMA et la tour Frank Gehry.",
      "L'économie arlésienne se nourrit de cette richesse : tourisme culturel et naturel, agriculture camarguaise (riz, taureaux, sel), édition photographique (Rencontres d'Arles), et un écosystème créatif en plein essor. Ces entreprises aux identités fortes méritent une présence web qui reflète leur singularité.",
      "Depuis Gardanne, Agence HDS accompagne les entreprises arlésiennes qui veulent concilier authenticité et modernité numérique. Nous créons des sites web qui valorisent l'identité unique de chaque entreprise arlésienne tout en maximisant leur visibilité auprès des visiteurs et clients potentiels.",
    ],
  },

  localStats: [
    { value: "52K", label: "Habitants" },
    { value: "5 000+", label: "Entreprises" },
    { value: "70 km", label: "De notre agence" },
    { value: "UNESCO", label: "Patrimoine mondial" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises et institutions d'Arles" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Outils digitaux pour le secteur culturel arlésien" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA pour valoriser le patrimoine et le tourisme à Arles" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'exception pour les marques créatives d'Arles" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les produits de Camargue et l'artisanat arlésien" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Visibilité web pour le tourisme et la culture à Arles" },
  ],

  advantages: [
    {
      title: "Sensibilité culturelle",
      description: "Arles est une ville d'art et de patrimoine. Nous créons des sites web qui respectent cette identité unique, avec un design soigné et une narration visuelle forte.",
      icon: "Palette",
    },
    {
      title: "Tourisme et patrimoine",
      description: "Nous maîtrisons le web touristique : réservation en ligne, guides interactifs, galeries photo et optimisation pour les recherches de visiteurs internationaux.",
      icon: "Globe",
    },
    {
      title: "E-commerce terroir",
      description: "Riz de Camargue, sel, produits artisanaux : nous créons des boutiques en ligne qui racontent l'histoire de vos produits et séduisent les acheteurs.",
      icon: "ShoppingCart",
    },
    {
      title: "Expertise PACA complète",
      description: "Notre connaissance de toute la région PACA nous permet de positionner votre entreprise arlésienne dans un contexte régional, pas seulement local.",
      icon: "TrendingUp",
    },
  ],

  faq: [
    {
      question: "Pouvez-vous créer un site pour une entreprise touristique à Arles ?",
      answer: "Oui, c'est l'un de nos domaines d'expertise. Réservation en ligne, galeries photos immersives, multilingue, avis clients : nous créons des sites qui convertissent les visiteurs en clients.",
    },
    {
      question: "Faites-vous du e-commerce pour les produits de Camargue ?",
      answer: "Absolument. Nous créons des boutiques en ligne avec storytelling, belles photos produits, gestion des expéditions et paiement sécurisé. Idéal pour le riz, le sel, les produits artisanaux.",
    },
    {
      question: "Combien coûte un site internet pour une entreprise à Arles ?",
      answer: "Un site vitrine démarre à 1 500€, un e-commerce à partir de 4 000€. Pour le secteur culturel et touristique, nous proposons des solutions adaptées avec galeries et réservation.",
    },
    {
      question: "Le SEO local est-il efficace pour Arles ?",
      answer: "Très efficace. Arles génère un volume important de recherches touristiques (restaurants, hébergements, activités). Le SEO local vous place devant vos concurrents dans ces résultats.",
    },
    {
      question: "Travaillez-vous avec des institutions culturelles ?",
      answer: "Nous sommes ouverts aux projets culturels : musées, galeries, festivals, compagnies. Nous créons des sites adaptés aux besoins spécifiques du secteur culturel et patrimonial.",
    },
  ],

  nearbyCities: [
    { slug: "nimes", name: "Nîmes", distance: 30 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 40 },
    { slug: "avignon", name: "Avignon", distance: 35 },
    { slug: "istres", name: "Istres", distance: 40 },
    { slug: "montpellier", name: "Montpellier", distance: 75 },
    { slug: "martigues", name: "Martigues", distance: 55 },
  ],

  lastUpdated: "2026-02-15",
};
