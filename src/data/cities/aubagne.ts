import type { CityPageData } from "./_types";

export const aubagneData: CityPageData = {
  name: "Aubagne",
  slug: "aubagne",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 46423,
  postalCode: "13400",
  latitude: 43.2926,
  longitude: 5.5679,
  distanceFromAgency: 20,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Aubagne",

  seo: {
    title: "Agence Web Aubagne | Création de Sites Internet | Agence HDS",
    description: "Agence web à proximité d'Aubagne. Création de sites internet, e-commerce et solutions web pour les entreprises aubagnaises. À 20 min. Devis gratuit.",
    keywords: ["agence web aubagne", "création site internet aubagne", "développeur web aubagne", "agence digitale aubagne"],
  },

  hero: {
    title: "Agence Web à Aubagne",
    subtitle: "Expertise digitale au pays de Marcel Pagnol",
    description: "À 20 minutes d'Aubagne, Agence HDS crée des sites web et solutions digitales pour les entreprises de la cité des santons. Proximité, qualité et accompagnement personnalisé.",
  },

  introduction: {
    title: "Votre agence web près d'Aubagne",
    paragraphs: [
      "Aubagne, ville de 46 000 habitants nichée entre Marseille et les collines de Pagnol, est un pôle économique dynamique des Bouches-du-Rhône. La zone commerciale de La Martelle, le parc d'activités des Paluds et le marché provençal en font un carrefour commercial incontournable de l'est marseillais.",
      "Capitale française du santon et de la céramique, Aubagne allie tradition artisanale et modernité économique. Ses PME, artisans et commerçants ont besoin d'une présence web qui reflète cette dualité : authenticité provençale et professionnalisme numérique.",
      "Depuis Gardanne, à seulement 20 minutes d'Aubagne, nous accompagnons les entreprises aubagnaises dans leur digitalisation. Notre connaissance du bassin économique local et notre proximité géographique nous permettent de proposer un service réactif et personnalisé.",
    ],
  },

  localStats: [
    { value: "46K", label: "Habitants" },
    { value: "4 500+", label: "Entreprises" },
    { value: "20 km", label: "De notre agence" },
    { value: "Top 5", label: "Villes des BDR" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises et artisans d'Aubagne" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Outils digitaux pour les PME aubagnaises" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "Automatisation pour les entreprises de la zone des Paluds" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design authentique pour les marques d'Aubagne" },
    { serviceSlug: "e-commerce", localizedSubtitle: "Boutiques en ligne pour les santonniers et artisans d'Aubagne" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Visibilité locale pour les commerces d'Aubagne" },
  ],

  advantages: [
    {
      title: "20 minutes d'Aubagne",
      description: "Gardanne et Aubagne sont voisines. Nous pouvons nous retrouver en un quart d'heure pour un café et un point projet, sans les complications d'un déplacement à Marseille.",
      icon: "MapPin",
    },
    {
      title: "E-commerce artisanal",
      description: "Aubagne est la capitale du santon. Nous aidons les artisans et commerçants locaux à vendre en ligne avec des boutiques e-commerce qui valorisent le savoir-faire provençal.",
      icon: "ShoppingCart",
    },
    {
      title: "Accompagnement PME",
      description: "Les PME d'Aubagne et de la zone des Paluds ont des besoins concrets : site vitrine, outil de gestion, présence Google. Nous proposons des solutions adaptées à chaque budget.",
      icon: "Briefcase",
    },
    {
      title: "Support réactif",
      description: "Un problème sur votre site ? Notre proximité nous permet d'intervenir rapidement, que ce soit à distance ou sur place à Aubagne.",
      icon: "Zap",
    },
  ],

  faq: [
    {
      question: "Pouvez-vous créer un site e-commerce pour un santonnier d'Aubagne ?",
      answer: "Absolument ! Nous avons l'expérience du e-commerce artisanal. Nous créons des boutiques qui mettent en valeur chaque pièce avec de belles photos, des descriptions détaillées et un tunnel d'achat optimisé.",
    },
    {
      question: "Combien coûte un site internet pour une entreprise à Aubagne ?",
      answer: "Un site vitrine professionnel démarre à 1 500€, un e-commerce à partir de 4 000€. Nous adaptons nos offres au budget des TPE et PME aubagnaises.",
    },
    {
      question: "Faites-vous du référencement local pour Aubagne ?",
      answer: "Oui, nous optimisons votre visibilité sur Google pour les recherches locales à Aubagne : fiche Google Business, avis clients, contenu optimisé et présence dans les annuaires locaux.",
    },
    {
      question: "Travaillez-vous avec des entreprises de la zone des Paluds ?",
      answer: "Oui, nous accompagnons des entreprises de toutes les zones d'activité d'Aubagne. Nos solutions s'adaptent aussi bien aux besoins d'un artisan qu'à ceux d'une PME industrielle.",
    },
    {
      question: "Proposez-vous des formations au digital pour les commerçants d'Aubagne ?",
      answer: "Nous formons nos clients à la gestion de leur site web et de leurs outils digitaux. Chaque livraison inclut une session de formation personnalisée pour vous rendre autonome.",
    },
  ],

  nearbyCities: [
    { slug: "marseille", name: "Marseille", distance: 18 },
    { slug: "gardanne", name: "Gardanne", distance: 20 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 30 },
    { slug: "toulon", name: "Toulon", distance: 45 },
    { slug: "vitrolles", name: "Vitrolles", distance: 35 },
    { slug: "martigues", name: "Martigues", distance: 50 },
  ],

  lastUpdated: "2026-02-15",
};
