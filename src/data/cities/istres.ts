import type { CityPageData } from "./_types";

export const istresData: CityPageData = {
  name: "Istres",
  slug: "istres",
  department: "Bouches-du-Rhône",
  departmentCode: "13",
  region: "Provence-Alpes-Côte d'Azur",
  population: 44040,
  postalCode: "13800",
  latitude: 43.5133,
  longitude: 4.9876,
  distanceFromAgency: 45,
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Istres",

  seo: {
    title: "Agence Web Istres | Création de Sites Internet | Agence HDS",
    description: "Agence web pour Istres et l'ouest de l'étang de Berre. Création de sites internet, e-commerce et SEO pour les entreprises istréennes. Devis gratuit.",
    keywords: ["agence web istres", "création site internet istres", "développeur web istres", "agence digitale istres"],
  },

  hero: {
    title: "Agence Web à Istres",
    subtitle: "Solutions digitales entre Crau et étang de Berre",
    description: "Agence HDS conçoit des sites web performants pour les entreprises d'Istres et de l'ouest des Bouches-du-Rhône. Expertise technique et proximité régionale.",
  },

  introduction: {
    title: "Le digital pour les entreprises istréennes",
    paragraphs: [
      "Istres, ville de 44 000 habitants sur la rive ouest de l'étang de Berre, est marquée par la présence de la Base aérienne 125, l'une des plus importantes de France. Cette implantation militaire a façonné l'économie locale et attiré un tissu de sous-traitants aéronautiques et de défense.",
      "Au-delà du secteur aéronautique, Istres développe son attractivité économique avec la zone commerciale des Étangs, le pôle d'activités des Cognets et une vie culturelle dynamique (festival de jazz, Magic Mirrors). Les entreprises istréennes ont besoin d'une présence web professionnelle pour rayonner au-delà du bassin de l'étang de Berre.",
      "Agence HDS, implantée à Gardanne à 45 minutes d'Istres, accompagne les entreprises de l'ouest des Bouches-du-Rhône dans leur transformation digitale. Nos solutions web s'adaptent aux besoins variés des sous-traitants industriels comme des commerces de proximité.",
    ],
  },

  localStats: [
    { value: "44K", label: "Habitants" },
    { value: "3 500+", label: "Entreprises" },
    { value: "45 km", label: "De notre agence" },
    { value: "BA 125", label: "Base aérienne majeure" },
  ],

  serviceHighlights: [
    { serviceSlug: "developpement-web", localizedSubtitle: "Sites web pour les entreprises et sous-traitants d'Istres" },
    { serviceSlug: "solutions-saas", localizedSubtitle: "Plateformes digitales pour le secteur aéronautique d'Istres" },
    { serviceSlug: "intelligence-artificielle", localizedSubtitle: "IA et automatisation pour les entreprises istréennes" },
    { serviceSlug: "design-uiux", localizedSubtitle: "Design d'interfaces pour les projets istréens" },
    { serviceSlug: "e-commerce", localizedSubtitle: "Boutiques en ligne pour les commerçants d'Istres" },
    { serviceSlug: "branding-seo", localizedSubtitle: "Référencement local pour être visible à Istres" },
  ],

  advantages: [
    {
      title: "Couverture étang de Berre",
      description: "Nous intervenons sur tout l'ouest des Bouches-du-Rhône : Istres, Fos-sur-Mer, Miramas, Port-Saint-Louis-du-Rhône et les communes voisines.",
      icon: "MapPin",
    },
    {
      title: "Secteur aéronautique",
      description: "Nous comprenons les besoins des sous-traitants de la défense et de l'aéronautique : sites institutionnels conformes, portails sécurisés et outils métier.",
      icon: "Plane",
    },
    {
      title: "Solutions accessibles",
      description: "Des tarifs adaptés aux TPE et PME istréennes, avec la même qualité technique que pour nos clients de la métropole Aix-Marseille.",
      icon: "TrendingUp",
    },
    {
      title: "Technologies modernes",
      description: "React, Next.js, Supabase : nos sites sont rapides, sécurisés et évolutifs. Pas de solutions obsolètes, que du moderne et du performant.",
      icon: "Code",
    },
  ],

  faq: [
    {
      question: "Travaillez-vous avec des entreprises liées à la base aérienne d'Istres ?",
      answer: "Nous travaillons avec tous types d'entreprises, y compris les sous-traitants de la défense et de l'aéronautique. Nous respectons les exigences de confidentialité et de sécurité propres à ces secteurs.",
    },
    {
      question: "Combien coûte un site internet à Istres ?",
      answer: "Un site vitrine professionnel démarre à 1 500€, un e-commerce à partir de 4 000€. Nous proposons des devis personnalisés et gratuits après analyse de vos besoins.",
    },
    {
      question: "Vous déplacez-vous à Istres ?",
      answer: "Oui, pour les rendez-vous de cadrage et les présentations. Le suivi courant se fait en visioconférence pour une efficacité maximale. Istres est à 45 minutes de notre agence.",
    },
    {
      question: "Pouvez-vous référencer mon commerce sur Google à Istres ?",
      answer: "Oui, le SEO local est notre spécialité. Nous optimisons votre fiche Google Business, votre site et votre présence en ligne pour les recherches géolocalisées à Istres et dans l'ouest des BDR.",
    },
    {
      question: "Intervenez-vous aussi à Fos-sur-Mer et Miramas ?",
      answer: "Bien sûr, notre zone d'intervention couvre tout l'ouest des Bouches-du-Rhône. Fos-sur-Mer, Miramas, Port-Saint-Louis-du-Rhône et toutes les communes du bassin.",
    },
  ],

  nearbyCities: [
    { slug: "martigues", name: "Martigues", distance: 15 },
    { slug: "salon-de-provence", name: "Salon-de-Provence", distance: 20 },
    { slug: "arles", name: "Arles", distance: 40 },
    { slug: "vitrolles", name: "Vitrolles", distance: 30 },
    { slug: "aix-en-provence", name: "Aix-en-Provence", distance: 50 },
    { slug: "marseille", name: "Marseille", distance: 55 },
  ],

  lastUpdated: "2026-02-15",
};
