import type { CityPageData } from "./_types";

export const avignonData: CityPageData = {
  name: "Avignon",
  slug: "avignon",
  department: "Vaucluse",
  departmentCode: "84",
  region: "Provence-Alpes-Côte d'Azur",
  population: 92130,
  postalCode: "84000",
  latitude: 43.9493,
  longitude: 4.8055,
  distanceFromAgency: 80,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Avignon",

  seo: {
    title: "Agence Web Avignon | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Avignon et le Vaucluse. Création de sites internet, e-commerce et SEO pour les entreprises avignonnaises. Devis gratuit.",
    keywords: ["agence web avignon", "création site internet avignon", "développeur web avignon", "agence digitale vaucluse"],
  },

  hero: {
    title: "Agence Web à Avignon",
    subtitle: "Solutions digitales pour la cité des Papes",
    description: "Agence HDS conçoit des sites web et solutions digitales pour les entreprises d'Avignon et du Vaucluse. Expertise technique et créativité au service de votre visibilité en ligne.",
  },

  introduction: {
    title: "Le digital pour les entreprises avignonnaises",
    paragraphs: [
      "Avignon, cité des Papes classée au patrimoine mondial de l'UNESCO, est bien plus qu'une ville de festivals. Avec 92 000 habitants et une aire urbaine de plus de 500 000 personnes, la préfecture du Vaucluse est un pôle économique majeur du couloir rhodanien, entre Lyon et Marseille.",
      "L'économie avignonnaise repose sur un tissu diversifié : agroalimentaire (MIN d'Avignon, 2e marché d'intérêt national de France), tourisme culturel (Festival d'Avignon, Palais des Papes), logistique et services. La zone d'activité d'Agroparc concentre de nombreuses entreprises technologiques et de services.",
      "Depuis Gardanne, Agence HDS accompagne les entreprises avignonnaises qui souhaitent renforcer leur présence digitale. Nous comprenons les enjeux d'une ville à forte identité culturelle qui doit aussi se positionner sur le web comme un territoire d'innovation et d'entrepreneuriat.",
    ],
  },

  localStats: [
    { value: "92K", label: "Habitants" },
    { value: "10K+", label: "Entreprises" },
    { value: "80 km", label: "De notre agence" },
    { value: "500K", label: "Aire urbaine" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises d'Avignon et du Vaucluse" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Outils digitaux pour les entreprises d'Agroparc" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour le secteur agroalimentaire avignonnais" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les acteurs culturels d'Avignon" },
    { serviceSlug: "e-commerce", localizedSubtitle: "E-commerce pour les producteurs et commerçants du Vaucluse" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Référencement local pour les entreprises avignonnaises" },
  ],

  advantages: [
    {
      title: "Connexion directe",
      description: "Avignon est reliée à notre agence par l'autoroute A7. Nous nous déplaçons pour les rendez-vous importants et assurons le suivi quotidien en visioconférence.",
      icon: "MapPin",
    },
    {
      title: "Sensibilité culturelle",
      description: "Nous comprenons l'importance de l'image de marque dans une ville à forte identité culturelle. Nos créations web allient modernité et respect du patrimoine.",
      icon: "Palette",
    },
    {
      title: "Expertise e-commerce",
      description: "Producteurs locaux, artisans, commerces : nous créons des boutiques en ligne qui valorisent les savoir-faire vauclusiens et génèrent des ventes.",
      icon: "ShoppingCart",
    },
    {
      title: "SEO local performant",
      description: "Nous optimisons votre visibilité sur les recherches locales à Avignon pour capter les touristes et les habitants qui recherchent vos services.",
      icon: "Search",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous avec des entreprises du Festival d'Avignon ?",
      answer: "Oui, nous pouvons accompagner les compagnies, lieux de spectacle et prestataires culturels avignonnais. Nous créons des sites adaptés aux besoins spécifiques du secteur culturel : billetterie, programmation, presse.",
    },
    {
      question: "Pouvez-vous créer un site e-commerce pour un producteur du Vaucluse ?",
      answer: "Absolument. Nous avons l'expérience de la vente en ligne de produits locaux et alimentaires. Gestion des stocks, expédition, paiement sécurisé : nous maîtrisons toute la chaîne.",
    },
    {
      question: "Combien coûte un site internet pour une entreprise à Avignon ?",
      answer: "Un site vitrine professionnel démarre à 1 500€, un e-commerce à partir de 4 000€. Nous proposons des formules adaptées à tous les budgets, de la TPE à l'ETI vauclusienne.",
    },
    {
      question: "Le SEO local fonctionne-t-il pour Avignon ?",
      answer: "Très bien même. Avignon est une ville touristique avec un fort volume de recherches locales. Un bon référencement local permet de capter aussi bien les habitants que les 4 millions de visiteurs annuels.",
    },
    {
      question: "Proposez-vous la maintenance de sites web pour les entreprises d'Avignon ?",
      answer: "Oui, nous proposons des contrats de maintenance incluant mises à jour, sauvegardes, monitoring de performance et support technique. La distance n'est pas un frein grâce à nos outils de gestion à distance.",
    },
  ],

  nearbyCities: [
    { slug: "nimes", name: "Nîmes", distance: 45 },
    { slug: "arles", name: "Arles", distance: 35 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 55 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 80 },
    { slug: "montpellier", name: "Montpellier", distance: 95 },
    { slug: "marseille", name: "Marseille", distance: 100 },
  ],

  lastUpdated: "2026-02-15",
};
