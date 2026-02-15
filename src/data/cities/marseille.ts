import type { CityPageData } from "./_types";

export const marseilleData: CityPageData = {
  name: "Marseille",
  slug: "marseille",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 873076,
  postalCode: "13000",
  latitude: 43.2965,
  longitude: 5.3698,
  distanceFromAgency: 25,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Marseille",

  seo: {
    title: "Agence Web Marseille | Création de Sites Internet | Agence HDS",
    description: "Agence web près de Marseille spécialisée en création de sites internet, e-commerce, applications web et SEO. À 25 min de Marseille. Devis gratuit.",
    keywords: ["agence web marseille", "création site internet marseille", "développeur web marseille", "agence digitale marseille"],
  },

  hero: {
    title: "Agence Web à Marseille",
    subtitle: "Solutions digitales pour la deuxième ville de France",
    description: "À 25 minutes du Vieux-Port, Agence HDS conçoit des sites web et applications performantes pour les entreprises marseillaises. Du commerce du Panier aux startups de la French Tech Aix-Marseille.",
  },

  introduction: {
    title: "Une agence web à l'échelle de Marseille",
    paragraphs: [
      "Marseille, deuxième ville de France avec plus de 870 000 habitants, est un carrefour économique unique en Méditerranée. Le port autonome, Euroméditerranée — le plus grand projet de rénovation urbaine d'Europe du Sud —, et le label French Tech Aix-Marseille-Région Sud ont fait de la cité phocéenne un hub incontournable de l'économie numérique.",
      "Le tissu entrepreneurial marseillais est d'une richesse exceptionnelle : des TPE du quartier du Panier aux scale-ups de la Belle de Mai, en passant par les sociétés de logistique du port et les cabinets de la Joliette. Chacune de ces entreprises a besoin d'une présence web qui reflète son ambition sur un marché local et international.",
      "Basée à Gardanne, à 25 minutes de Marseille par l'A52, Agence HDS offre à ses clients marseillais l'avantage d'une agence de proximité sans les contraintes de la métropole. Nous nous déplaçons à Marseille pour chaque rendez-vous et connaissons parfaitement les enjeux digitaux de la deuxième ville de France.",
    ],
  },

  localStats: [
    { value: "873K", label: "Habitants" },
    { value: "90K+", label: "Entreprises" },
    { value: "25 km", label: "De notre agence" },
    { value: "2e", label: "Ville de France" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web sur mesure pour les entreprises marseillaises" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes SaaS pour les startups French Tech Marseille" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour les entreprises du port de Marseille" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les marques marseillaises" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les commerçants et artisans de Marseille" },
    { serviceSlug: "branding-seo", localizedSubtitle: "SEO local pour dominer les recherches sur Marseille" },
  ],

  advantages: [
    {
      title: "Proximité métropolitaine",
      description: "À 25 minutes de Marseille par l'A52, nous offrons la réactivité d'une agence locale avec le calme et la concentration d'un cadre de travail hors métropole.",
      icon: "MapPin",
    },
    {
      title: "Expertise French Tech",
      description: "Nous évoluons dans l'écosystème French Tech Aix-Marseille-Région Sud. Nous comprenons les besoins des startups, scale-ups et entreprises innovantes de la métropole.",
      icon: "Rocket",
    },
    {
      title: "Tarifs compétitifs",
      description: "Notre implantation hors du centre de Marseille nous permet de proposer des tarifs 20 à 30% inférieurs aux agences marseillaises, sans compromis sur la qualité.",
      icon: "TrendingUp",
    },
    {
      title: "Polyvalence sectorielle",
      description: "Commerce, logistique portuaire, tourisme, santé, immobilier : nous avons l'expérience de secteurs variés présents dans le tissu économique marseillais.",
      icon: "Layers",
    },
  ],

  faq: [
    {
      question: "Pourquoi choisir une agence web hors de Marseille ?",
      answer: "Notre implantation à Gardanne (25 min de Marseille) nous permet de proposer des tarifs plus compétitifs tout en garantissant une proximité réelle. Nous nous déplaçons à Marseille pour chaque rendez-vous client.",
    },
    {
      question: "Travaillez-vous avec des entreprises de tous les arrondissements de Marseille ?",
      answer: "Oui, nous accompagnons des entreprises dans toute la métropole Aix-Marseille-Provence : du Vieux-Port à Euroméditerranée, de la Valentine à Plan-de-Campagne, de la Belle de Mai aux Calanques.",
    },
    {
      question: "Combien coûte un site web pour une entreprise marseillaise ?",
      answer: "Un site vitrine professionnel démarre à 1 500€, un e-commerce à partir de 4 000€, une application web sur mesure à partir de 5 000€. Nous établissons un devis précis et gratuit après étude de vos besoins.",
    },
    {
      question: "Pouvez-vous améliorer le référencement d'un site existant à Marseille ?",
      answer: "Oui, nous réalisons des audits SEO complets et mettons en place des stratégies de référencement local pour Marseille : optimisation Google Business, citations locales, contenu géolocalisé et netlinking régional.",
    },
    {
      question: "Quel type de sites créez-vous pour les entreprises marseillaises ?",
      answer: "Sites vitrines, e-commerce, applications web métier, plateformes SaaS, landing pages et portails. Nous adaptons la solution à votre secteur d'activité et à vos objectifs commerciaux sur le marché marseillais.",
    },
  ],

  nearbyCities: [
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 30 },
    { slug: "gardanne", name: "Gardanne", distance: 25 },
    { slug: "aubagne", name: "Aubagne", distance: 18 },
    { slug: "martigues", name: "Martigues", distance: 40 },
    { slug: "vitrolles", name: "Vitrolles", distance: 25 },
    { slug: "toulon", name: "Toulon", distance: 65 },
  ],

  lastUpdated: "2026-02-15",
};
