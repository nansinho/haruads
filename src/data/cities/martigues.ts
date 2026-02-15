import type { CityPageData } from "./_types";

export const martiguesData: CityPageData = {
  name: "Martigues",
  slug: "martigues",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 49605,
  postalCode: "13500",
  latitude: 43.4053,
  longitude: 5.0476,
  distanceFromAgency: 35,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Martigues",

  seo: {
    title: "Agence Web Martigues | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Martigues et l'étang de Berre. Création de sites internet, e-commerce et SEO. Expertise digitale pour les entreprises martégales. Devis gratuit.",
    keywords: ["agence web martigues", "création site internet martigues", "développeur web martigues", "agence digitale martigues"],
  },

  hero: {
    title: "Agence Web à Martigues",
    subtitle: "Votre partenaire digital sur la Venise provençale",
    description: "Agence HDS accompagne les entreprises de Martigues et de l'étang de Berre dans leur développement digital. Sites web, e-commerce et référencement local.",
  },

  introduction: {
    title: "Le digital pour les entreprises de Martigues",
    paragraphs: [
      "Martigues, surnommée la Venise provençale pour ses canaux pittoresques, est une ville de 50 000 habitants à la croisée de l'étang de Berre et de la Méditerranée. Au-delà de son patrimoine touristique, la ville est un pôle industriel majeur avec la zone pétrochimique de Lavéra et le port pétrolier de Fos-sur-Mer à proximité.",
      "L'économie martégale est contrastée : grande industrie pétrochimique, pêche traditionnelle, tourisme balnéaire et activités portuaires. Les entreprises locales, qu'elles soient sous-traitantes industrielles ou commerces du quartier de l'Île, ont besoin d'une vitrine web à la hauteur de leurs ambitions.",
      "Depuis Gardanne, Agence HDS intervient à Martigues et sur tout le pourtour de l'étang de Berre. Nous comprenons les spécificités d'un territoire où coexistent industrie lourde, artisanat provençal et tourisme, et nous adaptons nos solutions web à chaque profil d'entreprise.",
    ],
  },

  localStats: [
    { value: "50K", label: "Habitants" },
    { value: "4 200+", label: "Entreprises" },
    { value: "35 km", label: "De notre agence" },
    { value: "1er", label: "Port pétrolier de France" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises de Martigues et l'étang de Berre" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Outils digitaux pour les sous-traitants industriels martégaux" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour l'industrie de Martigues" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les marques de Martigues" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les commerces de la Venise provençale" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Visibilité locale pour les entreprises martégales" },
  ],

  advantages: [
    {
      title: "Proximité étang de Berre",
      description: "À 35 minutes de Martigues, nous intervenons sur tout le pourtour de l'étang de Berre : Martigues, Istres, Vitrolles, Berre-l'Étang.",
      icon: "MapPin",
    },
    {
      title: "Industrie et digital",
      description: "Nous comprenons les besoins des sous-traitants industriels : portails de suivi, intranets, outils de reporting et sites institutionnels.",
      icon: "Factory",
    },
    {
      title: "Tourisme et commerce",
      description: "Martigues attire les touristes. Nous créons des sites optimisés pour capter cette clientèle : réservation en ligne, guides et vitrines attractives.",
      icon: "Compass",
    },
    {
      title: "Solutions évolutives",
      description: "Des sites simples aux plateformes complexes, nos solutions grandissent avec votre entreprise grâce à une architecture technique moderne.",
      icon: "TrendingUp",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous avec des entreprises de la zone industrielle de Lavéra ?",
      answer: "Oui, nous accompagnons des entreprises industrielles et leurs sous-traitants. Sites institutionnels, portails internes, outils de gestion et de reporting : nous maîtrisons les besoins du secteur.",
    },
    {
      question: "Combien coûte un site internet à Martigues ?",
      answer: "Un site vitrine démarre à 1 500€, un e-commerce à partir de 4 000€. Nous nous adaptons aux budgets des TPE et PME martégales avec des solutions sur mesure.",
    },
    {
      question: "Pouvez-vous créer un site pour un restaurant ou hôtel à Martigues ?",
      answer: "Oui, nous concevons des sites pour le secteur touristique : réservation en ligne, menus, galeries photos, avis clients et référencement local pour attirer les visiteurs.",
    },
    {
      question: "Le SEO local fonctionne-t-il pour Martigues ?",
      answer: "Très bien. Martigues reçoit beaucoup de recherches locales, notamment liées au tourisme et aux services. Un bon référencement vous positionne devant vos concurrents locaux.",
    },
    {
      question: "Intervenez-vous aussi à Istres, Port-de-Bouc et Fos-sur-Mer ?",
      answer: "Oui, nous couvrons tout le bassin de l'étang de Berre. Les entreprises d'Istres, Port-de-Bouc, Fos-sur-Mer et des communes voisines font partie de notre zone d'intervention.",
    },
  ],

  nearbyCities: [
    { slug: "istres", name: "Istres", distance: 15 },
    { slug: "vitrolles", name: "Vitrolles", distance: 20 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 30 },
    { slug: "marseille", name: "Marseille", distance: 40 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 45 },
    { slug: "gardanne", name: "Gardanne", distance: 35 },
  ],

  lastUpdated: "2026-02-15",
};
