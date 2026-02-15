import type { CityPageData } from "./_types";

export const montpellierData: CityPageData = {
  name: "Montpellier",
  slug: "montpellier",
  department: "Hérault",
  departmentCode: "34",
  region: "Occitanie",
  population: 295542,
  postalCode: "34000",
  latitude: 43.6108,
  longitude: 3.8767,
  distanceFromAgency: 160,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Montpellier",

  seo: {
    title: "Agence Web Montpellier | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Montpellier et l'Hérault. Création de sites internet, applications web, e-commerce et SEO. Expertise tech pour les startups montpelliéraines.",
    keywords: ["agence web montpellier", "création site internet montpellier", "développeur web montpellier", "agence digitale montpellier"],
  },

  hero: {
    title: "Agence Web à Montpellier",
    subtitle: "Solutions digitales pour la French Tech méditerranéenne",
    description: "Agence HDS apporte son expertise en développement web aux entreprises de Montpellier. De la startup tech au commerce de l'Écusson, des solutions digitales sur mesure.",
  },

  introduction: {
    title: "Montpellier, capitale tech du Sud",
    paragraphs: [
      "Montpellier, septième ville de France avec près de 300 000 habitants, est l'une des métropoles les plus dynamiques du pays. Sa croissance démographique record, son université millénaire et son label French Tech en font un pôle d'innovation majeur en Méditerranée.",
      "L'écosystème numérique montpelliérain est particulièrement riche : le BIC de Montpellier (Business & Innovation Centre), le quartier Cambacérès dédié au numérique, et des entreprises comme Dell, IBM ou Ubisoft ont choisi la ville. Les startups y prospèrent grâce à un coût de la vie maîtrisé et une qualité de vie exceptionnelle.",
      "Agence HDS travaille avec des entreprises de Montpellier qui recherchent une expertise technique pointue (React, Next.js, Supabase) combinée à une approche humaine et personnalisée. Notre positionnement en PACA nous donne un regard complémentaire sur le marché méditerranéen.",
    ],
  },

  localStats: [
    { value: "296K", label: "Habitants" },
    { value: "35K+", label: "Entreprises" },
    { value: "160 km", label: "De notre agence" },
    { value: "7e", label: "Ville de France" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Applications web pour l'écosystème tech de Montpellier" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes SaaS pour les startups montpelliéraines" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et machine learning pour les entreprises de Montpellier" },
    { serviceSlug: "design-uiux", localizedSubtitle: "UX/UI design pour les produits digitaux montpelliérains" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les marques et commerces de Montpellier" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Branding et SEO pour les entreprises de l'Hérault" },
  ],

  advantages: [
    {
      title: "Expertise startup & tech",
      description: "Nous parlons le même langage que les startups montpelliéraines : MVP, itérations rapides, stack moderne. React, Next.js, Supabase : notre tech est à la pointe.",
      icon: "Rocket",
    },
    {
      title: "Vision méditerranéenne",
      description: "Notre implantation en PACA nous donne une vision transversale du marché méditerranéen, complémentaire à l'écosystème occitan de Montpellier.",
      icon: "Globe",
    },
    {
      title: "Rapport qualité-prix optimal",
      description: "Les mêmes compétences techniques que les agences parisiennes, à un tarif adapté aux budgets des entreprises du Sud de la France.",
      icon: "TrendingUp",
    },
    {
      title: "Collaboration full remote",
      description: "Montpellier est à 1h30 de Gardanne. Nous maîtrisons parfaitement le travail à distance : Figma, GitHub, Slack, visioconférence quotidienne si nécessaire.",
      icon: "Monitor",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous à distance avec des entreprises de Montpellier ?",
      answer: "Oui, et très efficacement. Nos outils collaboratifs permettent une communication fluide. Nous nous déplaçons à Montpellier pour les jalons importants : kickoff, présentations, formations.",
    },
    {
      question: "Accompagnez-vous les startups montpelliéraines ?",
      answer: "Absolument. MVP en 4-6 semaines, architecture scalable, stack moderne (Next.js, Supabase, Stripe). Nous comprenons les contraintes de vitesse et de budget des startups.",
    },
    {
      question: "Combien coûte un site ou une app web à Montpellier ?",
      answer: "Un site vitrine démarre à 1 500€, une application web à partir de 5 000€, un SaaS complet à partir de 8 000€. Nos tarifs sont 20-30% inférieurs aux agences parisiennes.",
    },
    {
      question: "Pouvez-vous travailler avec notre équipe technique à Montpellier ?",
      answer: "Oui, nous intégrons facilement des équipes existantes. Git, code review, pair programming : nous nous adaptons à vos processus de développement.",
    },
    {
      question: "Quelle est votre stack technique ?",
      answer: "React, Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Vercel. Pour l'IA : OpenAI API, Claude API, LangChain. Une stack moderne et éprouvée.",
    },
  ],

  nearbyCities: [
    { slug: "nimes", name: "Nîmes", distance: 55 },
    { slug: "arles", name: "Arles", distance: 75 },
    { slug: "avignon", name: "Avignon", distance: 95 },
    { slug: "marseille", name: "Marseille", distance: 170 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 155 },
    { slug: "nice", name: "Nice", distance: 330 },
  ],

  lastUpdated: "2026-02-15",
};
