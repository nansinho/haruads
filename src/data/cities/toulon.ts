import type { CityPageData } from "./_types";

export const toulonData: CityPageData = {
  name: "Toulon",
  slug: "toulon",
  department: "Var",
  departmentCode: "83",
  region: "Provence-Alpes-Côte d'Azur",
  population: 176198,
  postalCode: "83000",
  latitude: 43.1242,
  longitude: 5.9280,
  distanceFromAgency: 80,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Toulon",

  seo: {
    title: "Agence Web Toulon | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Toulon et le Var. Création de sites internet, e-commerce, applications web et SEO. Expertise digitale pour les entreprises toulonnaises.",
    keywords: ["agence web toulon", "création site internet toulon", "développeur web toulon", "agence digitale var"],
  },

  hero: {
    title: "Agence Web à Toulon",
    subtitle: "Votre partenaire digital sur la rade de Toulon",
    description: "Agence HDS accompagne les entreprises toulonnaises et du Var dans leur transformation digitale. Création de sites, applications web et référencement pour la préfecture du Var.",
  },

  introduction: {
    title: "Le digital au service des entreprises toulonnaises",
    paragraphs: [
      "Toulon, préfecture du Var et premier port militaire français, est une métropole de 176 000 habitants en pleine mutation économique. Au-delà de sa vocation maritime et militaire, la ville développe un écosystème numérique prometteur autour du technopôle de la Mer et du pôle de compétitivité Mer Méditerranée.",
      "L'économie toulonnaise se diversifie : tourisme balnéaire, naval de défense, technologies maritimes, santé et services. Les entreprises du Var ont besoin de partenaires digitaux capables de comprendre leurs marchés et de les aider à se démarquer en ligne face à une concurrence grandissante.",
      "Depuis Gardanne, Agence HDS intervient régulièrement à Toulon et dans le Var. Nous travaillons avec des entreprises de la rade, du centre-ville et de l'agglomération toulonnaise pour créer des solutions web adaptées aux enjeux du marché varois.",
    ],
  },

  localStats: [
    { value: "176K", label: "Habitants" },
    { value: "18K+", label: "Entreprises" },
    { value: "80 km", label: "De notre agence" },
    { value: "3e", label: "Ville de PACA" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web modernes pour les entreprises de Toulon" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes digitales pour le secteur maritime toulonnais" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour les entreprises du Var" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Interfaces utilisateur pour les marques toulonnaises" },
    { serviceSlug: "e-commerce", localizedSubtitle: "Boutiques en ligne pour les commerces de Toulon" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Visibilité web pour les entreprises de la rade de Toulon" },
  ],

  advantages: [
    {
      title: "Expertise régionale",
      description: "Nous intervenons régulièrement dans le Var et connaissons les spécificités du marché toulonnais : tourisme, naval, technologies maritimes et services.",
      icon: "Globe",
    },
    {
      title: "Travail à distance efficace",
      description: "Nos outils collaboratifs (Figma, GitHub, visioconférence) nous permettent de travailler avec vous aussi efficacement qu'une agence locale, avec des déplacements sur site pour les moments clés.",
      icon: "Monitor",
    },
    {
      title: "Tarifs avantageux",
      description: "Par rapport aux agences parisiennes ou même du littoral varois, notre implantation à Gardanne nous permet d'offrir un excellent rapport qualité-prix.",
      icon: "TrendingUp",
    },
    {
      title: "Stack technique moderne",
      description: "React, Next.js, Supabase : nous utilisons les mêmes technologies que les meilleures agences tech, au service de vos ambitions digitales à Toulon.",
      icon: "Code",
    },
  ],

  faq: [
    {
      question: "Vous déplacez-vous à Toulon pour les rendez-vous ?",
      answer: "Oui, nous nous déplaçons à Toulon pour les rendez-vous de cadrage, les présentations et les livrables importants. Le reste du suivi se fait en visioconférence pour une efficacité maximale.",
    },
    {
      question: "Connaissez-vous le marché toulonnais ?",
      answer: "Nous travaillons avec plusieurs entreprises du Var et comprenons les spécificités du marché toulonnais : forte saisonnalité touristique, secteur naval, services aux particuliers et économie maritime.",
    },
    {
      question: "Combien coûte un site internet pour une entreprise à Toulon ?",
      answer: "Un site vitrine démarre à 1 500€, un e-commerce à partir de 4 000€. Nos tarifs sont particulièrement compétitifs par rapport aux agences du littoral varois.",
    },
    {
      question: "Pouvez-vous référencer mon entreprise sur les recherches locales à Toulon ?",
      answer: "Oui, nous optimisons votre présence sur Google pour les recherches locales à Toulon et dans le Var : Google Business Profile, contenu géolocalisé, avis clients et citations locales.",
    },
    {
      question: "Travaillez-vous avec des entreprises du secteur naval à Toulon ?",
      answer: "Nous sommes ouverts à tous les secteurs. Les entreprises du naval et des technologies maritimes ont des besoins spécifiques (portails internes, outils métier) que nous savons adresser avec nos solutions sur mesure.",
    },
  ],

  nearbyCities: [
    { slug: "marseille", name: "Marseille", distance: 65 },
    { slug: "nice", name: "Nice", distance: 150 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 80 },
    { slug: "aubagne", name: "Aubagne", distance: 45 },
    { slug: "gardanne", name: "Gardanne", distance: 80 },
    { slug: "avignon", name: "Avignon", distance: 130 },
  ],

  lastUpdated: "2026-02-15",
};
