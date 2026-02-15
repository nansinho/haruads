import type { CityPageData } from "./_types";

export const niceData: CityPageData = {
  name: "Nice",
  slug: "nice",
  department: "Alpes-Maritimes",
  departmentCode: "06",
  region: "Provence-Alpes-Côte d'Azur",
  population: 342669,
  postalCode: "06000",
  latitude: 43.7102,
  longitude: 7.2620,
  distanceFromAgency: 200,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Nice",

  seo: {
    title: "Agence Web Nice | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Nice et la Côte d'Azur. Création de sites internet, e-commerce, applications web et SEO pour les entreprises niçoises. Devis gratuit.",
    keywords: ["agence web nice", "création site internet nice", "développeur web nice", "agence digitale côte d'azur"],
  },

  hero: {
    title: "Agence Web à Nice",
    subtitle: "Expertise digitale sur la Côte d'Azur",
    description: "Agence HDS accompagne les entreprises de Nice et de la Côte d'Azur dans leur présence digitale. Sites premium, applications web et stratégies de référencement pour la capitale azuréenne.",
  },

  introduction: {
    title: "Nice, vitrine digitale de la Côte d'Azur",
    paragraphs: [
      "Nice, cinquième ville de France avec 343 000 habitants, est la capitale économique de la Côte d'Azur. La Promenade des Anglais, le Vieux-Nice et la baie des Anges attirent des millions de visiteurs, mais la ville est aussi un pôle technologique majeur avec Sophia Antipolis, la première technopole d'Europe, à 20 minutes.",
      "L'économie niçoise est tirée par le tourisme international, l'hôtellerie de luxe, les technologies (Sophia Antipolis accueille Amadeus, Thales, SAP), la santé (CHU de Nice, Institut Pasteur) et l'événementiel (Carnaval, Ironman). Ce mélange unique exige des solutions web d'excellence, capables de s'adresser à une clientèle locale et internationale.",
      "Agence HDS apporte aux entreprises niçoises une expertise technique de haut niveau à des tarifs compétitifs. Notre stack moderne (React, Next.js, Supabase) et notre approche sur mesure répondent aux exigences d'un marché azuréen habitué à l'excellence.",
    ],
  },

  localStats: [
    { value: "343K", label: "Habitants" },
    { value: "45K+", label: "Entreprises" },
    { value: "200 km", label: "De notre agence" },
    { value: "5e", label: "Ville de France" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web premium pour les entreprises de la Côte d'Azur" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "SaaS pour les entreprises tech de Sophia Antipolis" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA pour le tourisme et l'hôtellerie de Nice" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design haut de gamme pour les marques azuréennes" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce luxe pour les boutiques de Nice" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Branding et SEO pour la visibilité Côte d'Azur" },
  ],

  advantages: [
    {
      title: "Qualité premium",
      description: "Nice et la Côte d'Azur exigent l'excellence. Nos créations web reflètent ce niveau d'exigence : design soigné, performances optimales, code irréprochable.",
      icon: "Sparkles",
    },
    {
      title: "Multilingue ready",
      description: "La clientèle niçoise est internationale. Nous créons des sites multilingues (FR, EN, IT, RU) qui s'adressent à vos visiteurs du monde entier.",
      icon: "Globe",
    },
    {
      title: "Expérience Sophia Antipolis",
      description: "Nous partageons l'ADN tech de Sophia Antipolis. Nos compétences en React, Next.js et IA s'intègrent naturellement dans l'écosystème azuréen.",
      icon: "Cpu",
    },
    {
      title: "Tarifs compétitifs",
      description: "L'expertise d'une agence tech sans les tarifs de la Promenade des Anglais. Notre implantation hors des Alpes-Maritimes est votre avantage économique.",
      icon: "TrendingUp",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous à distance avec des entreprises de Nice ?",
      answer: "Oui, très efficacement. Figma, GitHub, Slack et visioconférence nous permettent de collaborer en temps réel. Nous nous déplaçons à Nice pour les moments clés du projet.",
    },
    {
      question: "Pouvez-vous créer un site multilingue pour un hôtel à Nice ?",
      answer: "Absolument. Nous développons des sites hôteliers multilingues avec réservation en ligne, galeries immersives, avis intégrés et optimisation pour les moteurs de recherche internationaux.",
    },
    {
      question: "Combien coûte un site web pour une entreprise niçoise ?",
      answer: "Un site vitrine démarre à 1 500€, un e-commerce premium à partir de 5 000€, une application web à partir de 6 000€. Nos tarifs sont significativement inférieurs aux agences de la Côte d'Azur.",
    },
    {
      question: "Travaillez-vous avec des entreprises de Sophia Antipolis ?",
      answer: "Oui, nous sommes prêts à collaborer avec les entreprises tech de Sophia. Notre stack (React, Next.js, TypeScript) est parfaitement alignée avec les standards de la technopole.",
    },
    {
      question: "Le SEO local fonctionne-t-il sur Nice et la Côte d'Azur ?",
      answer: "Extrêmement bien. Le volume de recherches locales à Nice est énorme, porté par le tourisme et les résidents. Un bon SEO local génère un flux constant de prospects qualifiés.",
    },
  ],

  nearbyCities: [
    { slug: "toulon", name: "Toulon", distance: 150 },
    { slug: "marseille", name: "Marseille", distance: 200 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 180 },
    { slug: "montpellier", name: "Montpellier", distance: 330 },
    { slug: "avignon", name: "Avignon", distance: 260 },
    { slug: "lyon", name: "Lyon", distance: 470 },
  ],

  lastUpdated: "2026-02-15",
};
