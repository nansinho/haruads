import type { CityPageData } from "./_types";

export const gardanneData: CityPageData = {
  name: "Gardanne",
  slug: "gardanne",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 21000,
  postalCode: "13120",
  latitude: 43.4545,
  longitude: 5.4694,
  distanceFromAgency: 0,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Gardanne",

  seo: {
    title: "Agence Web Gardanne | Création de Sites Internet | Agence HDS",
    description: "Agence web basée à Gardanne, spécialisée en création de sites internet, applications web et solutions digitales. Votre partenaire local. Devis gratuit.",
    keywords: ["agence web gardanne", "création site internet gardanne", "développeur web gardanne", "agence digitale gardanne"],
  },

  hero: {
    title: "Agence Web à Gardanne",
    subtitle: "Votre partenaire digital au cœur du bassin minier",
    description: "Installée à Gardanne, Agence HDS accompagne les entreprises locales dans leur transformation digitale. Proximité immédiate, expertise technique et connaissance du tissu économique local.",
  },

  introduction: {
    title: "Votre agence web au cœur de Gardanne",
    paragraphs: [
      "Gardanne, ancienne cité minière en pleine reconversion, est devenue un pôle technologique dynamique grâce à la présence de l'École des Mines de Saint-Étienne - campus Georges Charpak et du centre de microélectronique de Provence. Cette ville de 21 000 habitants conjugue patrimoine industriel et innovation numérique.",
      "C'est au cœur de cette ville en mouvement que nous avons choisi d'installer Agence HDS. Notre implantation locale nous permet de rencontrer nos clients facilement, de comprendre les enjeux spécifiques des entreprises gardannaises et de proposer des solutions web parfaitement adaptées au tissu économique provençal.",
      "De la TPE artisanale aux startups technologiques nées autour de l'École des Mines, nous accompagnons tous les profils d'entreprises gardannaises dans leur présence en ligne : sites vitrines, e-commerce, applications métier et stratégies de référencement local.",
    ],
  },

  localStats: [
    { value: "21K", label: "Habitants" },
    { value: "1 500+", label: "Entreprises" },
    { value: "0 km", label: "De notre agence" },
    { value: "Top 3", label: "Pôle tech des BDR" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web performants pour les entreprises de Gardanne" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes SaaS pour les startups gardannaises" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "Solutions IA pour les entreprises innovantes de Gardanne" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les projets gardannais" },
    { serviceSlug: "e-commerce", localizedSubtitle: "Boutiques en ligne pour les commerçants de Gardanne" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Référencement local pour être visible à Gardanne" },
  ],

  advantages: [
    {
      title: "Implantation locale",
      description: "Notre agence est basée à Gardanne. Pas de déplacement, pas d'intermédiaire : nous sommes vos voisins. Rendez-vous en personne quand vous le souhaitez.",
      icon: "MapPin",
    },
    {
      title: "Écosystème tech",
      description: "Gardanne accueille l'École des Mines et un pôle microélectronique. Nous baignons dans cet écosystème d'innovation et en tirons le meilleur pour vos projets.",
      icon: "Cpu",
    },
    {
      title: "Réactivité immédiate",
      description: "Étant sur place, nous intervenons rapidement pour toute urgence technique, modification de contenu ou évolution de votre site web.",
      icon: "Zap",
    },
    {
      title: "Réseau local",
      description: "Nous connaissons le tissu économique gardannais et pouvons vous mettre en relation avec des partenaires locaux complémentaires.",
      icon: "Users",
    },
  ],

  faq: [
    {
      question: "Où se trouve exactement Agence HDS à Gardanne ?",
      answer: "Notre agence est située à Gardanne (13120), au cœur de la ville. Nous recevons nos clients sur rendez-vous et nous déplaçons également dans toute la zone d'Aix-Marseille.",
    },
    {
      question: "Combien coûte un site internet à Gardanne ?",
      answer: "Un site vitrine professionnel démarre à partir de 1 500€. Une boutique e-commerce à partir de 4 000€. Nous établissons un devis gratuit et personnalisé après analyse de vos besoins spécifiques.",
    },
    {
      question: "Travaillez-vous uniquement avec des entreprises de Gardanne ?",
      answer: "Non, nous travaillons avec des entreprises de toute la région PACA et au-delà. Mais notre implantation à Gardanne nous permet d'offrir un service de proximité unique aux entreprises locales.",
    },
    {
      question: "Proposez-vous un accompagnement SEO local pour Gardanne ?",
      answer: "Oui, le référencement local est l'une de nos spécialités. Nous optimisons votre fiche Google Business, votre présence sur les annuaires locaux et votre site pour les recherches géolocalisées sur Gardanne et ses environs.",
    },
    {
      question: "Quel est le délai pour créer un site web à Gardanne ?",
      answer: "Un site vitrine est livré en 3 à 4 semaines. Pour un projet plus complexe (e-commerce, application web), comptez 6 à 12 semaines. La proximité facilite les échanges et accélère le processus.",
    },
  ],

  nearbyCities: [
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 15 },
    { slug: "marseille", name: "Marseille", distance: 25 },
    { slug: "aubagne", name: "Aubagne", distance: 20 },
    { slug: "vitrolles", name: "Vitrolles", distance: 20 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 35 },
    { slug: "martigues", name: "Martigues", distance: 35 },
  ],

  lastUpdated: "2026-02-15",
};
