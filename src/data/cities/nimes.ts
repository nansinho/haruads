import type { CityPageData } from "./_types";

export const nimesData: CityPageData = {
  name: "Nîmes",
  slug: "nimes",
  department: "Gard",
  departmentCode: "30",
  region: "Occitanie",
  population: 151001,
  postalCode: "30000",
  latitude: 43.8367,
  longitude: 4.3601,
  distanceFromAgency: 110,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/N%C3%AEmes",

  seo: {
    title: "Agence Web Nîmes | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Nîmes et le Gard. Création de sites internet, e-commerce, applications web et SEO pour les entreprises nîmoises. Devis gratuit.",
    keywords: ["agence web nîmes", "création site internet nîmes", "développeur web nîmes", "agence digitale gard"],
  },

  hero: {
    title: "Agence Web à Nîmes",
    subtitle: "Expertise digitale pour la Rome française",
    description: "Agence HDS accompagne les entreprises nîmoises et du Gard dans leur transformation digitale. Solutions web sur mesure, du site vitrine à la plateforme e-commerce.",
  },

  introduction: {
    title: "Le digital pour les entreprises nîmoises",
    paragraphs: [
      "Nîmes, la Rome française, est une métropole de 151 000 habitants qui brille par son patrimoine antique exceptionnel — les Arènes, la Maison Carrée, le Pont du Gard — et un dynamisme économique croissant. Le Musée de la Romanité, inauguré en 2018, symbolise la capacité de la ville à marier héritage et modernité.",
      "L'économie nîmoise est portée par le tourisme, l'agroalimentaire (vignoble des Costières), le textile historique (le denim tire son nom de « de Nîmes ») et un secteur tertiaire en expansion. La gare TGV place Nîmes à 1h de Lyon et 2h45 de Paris, renforçant son attractivité pour les entreprises à vocation nationale.",
      "Agence HDS intervient à Nîmes et dans le Gard pour accompagner les entreprises qui veulent se démarquer en ligne. Notre expertise technique et notre connaissance du marché régional nous permettent de créer des solutions web parfaitement adaptées aux enjeux de l'économie nîmoise.",
    ],
  },

  localStats: [
    { value: "151K", label: "Habitants" },
    { value: "16K+", label: "Entreprises" },
    { value: "110 km", label: "De notre agence" },
    { value: "TGV", label: "Paris en 2h45" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises de Nîmes et du Gard" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes digitales pour les entreprises nîmoises" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA pour le tourisme et l'agroalimentaire nîmois" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces alliant modernité et patrimoine nîmois" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les vignerons et commerçants de Nîmes" },
    { serviceSlug: "branding-seo", localizedSubtitle: "SEO local pour dominer les recherches sur Nîmes" },
  ],

  advantages: [
    {
      title: "Expertise inter-régionale",
      description: "Nîmes est à la frontière PACA-Occitanie. Notre présence en PACA nous donne une vision complémentaire pour positionner votre entreprise sur les deux régions.",
      icon: "Globe",
    },
    {
      title: "Tourisme et culture",
      description: "Arènes, Maison Carrée, Pont du Gard : nous créons des expériences web à la hauteur du patrimoine exceptionnel de Nîmes pour le secteur touristique.",
      icon: "Landmark",
    },
    {
      title: "E-commerce viticole",
      description: "Les Costières de Nîmes méritent une boutique en ligne digne de leurs vins. Nous concevons des e-commerces qui racontent le terroir et génèrent des ventes.",
      icon: "ShoppingCart",
    },
    {
      title: "Travail collaboratif à distance",
      description: "Nos outils numériques (Figma, GitHub, visio) permettent une collaboration fluide. Nous nous déplaçons à Nîmes pour les jalons clés du projet.",
      icon: "Monitor",
    },
  ],

  faq: [
    {
      question: "Vous déplacez-vous à Nîmes pour les rendez-vous ?",
      answer: "Oui, nous nous déplaçons à Nîmes pour les rendez-vous de cadrage, les présentations de maquettes et les livrables. Le suivi quotidien se fait en visioconférence.",
    },
    {
      question: "Pouvez-vous créer un site pour un domaine viticole des Costières de Nîmes ?",
      answer: "Absolument. Site vitrine avec storytelling du domaine, boutique en ligne avec expédition, réservation de visites et dégustations : nous maîtrisons le web viticole.",
    },
    {
      question: "Combien coûte un site internet à Nîmes ?",
      answer: "Un site vitrine démarre à 1 500€, un e-commerce à partir de 4 000€. Nos tarifs sont compétitifs par rapport aux agences parisiennes, avec une proximité que celles-ci ne peuvent offrir.",
    },
    {
      question: "Le référencement local marche-t-il pour Nîmes ?",
      answer: "Très bien. Nîmes est une ville touristique avec un fort volume de recherches. Le SEO local vous positionne devant vos concurrents pour les habitants comme pour les visiteurs.",
    },
    {
      question: "Travaillez-vous avec des entreprises du secteur textile à Nîmes ?",
      answer: "Le denim est né à Nîmes ! Nous sommes prêts à accompagner les entreprises textiles nîmoises avec des sites e-commerce haut de gamme et des identités de marque fortes.",
    },
  ],

  nearbyCities: [
    { slug: "arles", name: "Arles", distance: 30 },
    { slug: "avignon", name: "Avignon", distance: 45 },
    { slug: "montpellier", name: "Montpellier", distance: 55 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 75 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 110 },
    { slug: "marseille", name: "Marseille", distance: 120 },
  ],

  lastUpdated: "2026-02-15",
};
