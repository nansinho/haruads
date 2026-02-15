import type { CityPageData } from "./_types";

export const vitrollesData: CityPageData = {
  name: "Vitrolles",
  slug: "vitrolles",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 35400,
  postalCode: "13127",
  latitude: 43.4460,
  longitude: 5.2479,
  distanceFromAgency: 20,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Vitrolles",

  seo: {
    title: "Agence Web Vitrolles | Création de Sites Internet | Agence HDS",
    description: "Agence web près de Vitrolles. Création de sites internet, e-commerce et SEO pour les entreprises vitrollaises. Zone Anjoly et Estroublans. Devis gratuit.",
    keywords: ["agence web vitrolles", "création site internet vitrolles", "développeur web vitrolles", "agence digitale vitrolles"],
  },

  hero: {
    title: "Agence Web à Vitrolles",
    subtitle: "Expertise digitale pour le hub économique des Bouches-du-Rhône",
    description: "À 20 minutes de Vitrolles, Agence HDS crée des sites web et applications pour les entreprises de cette ville stratégique, entre aéroport et zones d'activité.",
  },

  introduction: {
    title: "Votre agence web pour Vitrolles",
    paragraphs: [
      "Vitrolles, ville de 35 000 habitants située entre l'aéroport Marseille-Provence et l'étang de Berre, est un carrefour économique majeur des Bouches-du-Rhône. Les zones d'activité d'Anjoly, des Estroublans et de l'Aéropôle concentrent des centaines d'entreprises dans les secteurs de la logistique, du tertiaire et du commerce.",
      "La proximité de l'aéroport et des axes autoroutiers (A7, A55) fait de Vitrolles un point stratégique pour les entreprises qui rayonnent à l'échelle régionale et nationale. Le parc commercial Grand Vitrolles et la zone des Estroublans sont parmi les plus fréquentés de la métropole.",
      "Agence HDS, à seulement 20 minutes de Vitrolles, accompagne les entreprises vitrollaises dans leur transformation digitale. Nous comprenons les besoins d'un territoire d'activité intense où la concurrence est forte et la visibilité en ligne déterminante.",
    ],
  },

  localStats: [
    { value: "35K", label: "Habitants" },
    { value: "3 800+", label: "Entreprises" },
    { value: "20 km", label: "De notre agence" },
    { value: "1er", label: "Hub logistique des BDR" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises des zones d'activité de Vitrolles" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes SaaS pour les sociétés de l'Aéropôle" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour les entreprises logistiques de Vitrolles" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les marques vitrollaises" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les commerces de Grand Vitrolles" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Référencement local pour les entreprises de Vitrolles" },
  ],

  advantages: [
    {
      title: "20 minutes de Vitrolles",
      description: "Gardanne et Vitrolles sont reliées directement. Rendez-vous rapides dans vos locaux, que ce soit à Anjoly, aux Estroublans ou à l'Aéropôle.",
      icon: "MapPin",
    },
    {
      title: "Expertise zones d'activité",
      description: "Nous comprenons les besoins des entreprises en zone d'activité : visibilité, génération de leads, outils métier et présence web professionnelle.",
      icon: "Building",
    },
    {
      title: "E-commerce performant",
      description: "Pour les commerces de Grand Vitrolles, nous créons des boutiques en ligne qui complètent la vente physique avec un canal digital efficace.",
      icon: "ShoppingCart",
    },
    {
      title: "Solutions B2B",
      description: "Portails clients, intranets, outils de gestion : nous développons des solutions B2B adaptées aux entreprises de services et logistique de Vitrolles.",
      icon: "Briefcase",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous avec des entreprises de la zone d'Anjoly ?",
      answer: "Oui, nous accompagnons des entreprises de toutes les zones d'activité de Vitrolles. Sites vitrines, outils métier, portails clients : nous adaptons nos solutions à vos besoins B2B ou B2C.",
    },
    {
      question: "Combien coûte un site internet pour une entreprise à Vitrolles ?",
      answer: "Un site vitrine professionnel démarre à 1 500€, un e-commerce à partir de 4 000€. Pour les entreprises B2B, un portail client sur mesure à partir de 5 000€.",
    },
    {
      question: "Pouvez-vous créer un site e-commerce pour un commerce de Grand Vitrolles ?",
      answer: "Absolument. Nous développons des boutiques en ligne qui complètent votre magasin physique : click & collect, livraison, gestion des stocks unifiée et paiement sécurisé.",
    },
    {
      question: "Le SEO local est-il pertinent pour Vitrolles ?",
      answer: "Très pertinent. Les zones d'activité de Vitrolles génèrent beaucoup de recherches locales. Un bon référencement vous positionne devant vos voisins de zone et capte les clients de la métropole.",
    },
    {
      question: "Proposez-vous des solutions logistiques digitales ?",
      answer: "Nous développons des outils web sur mesure : tableaux de bord de suivi, portails de commande, interfaces de gestion. Nos solutions s'intègrent à vos processus existants.",
    },
  ],

  nearbyCities: [
    { slug: "gardanne", name: "Gardanne", distance: 20 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 25 },
    { slug: "marseille", name: "Marseille", distance: 25 },
    { slug: "martigues", name: "Martigues", distance: 20 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 25 },
    { slug: "istres", name: "Istres", distance: 30 },
  ],

  lastUpdated: "2026-02-15",
};
