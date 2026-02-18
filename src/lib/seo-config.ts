export const seoConfig = {
  siteName: "Agence HDS",
  siteUrl: "https://agencehds.fr",
  defaultImage: "/images/og-default.jpg",
  locale: "fr_FR",
  twitterHandle: "@agencehds",
};

export const pageSeo: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "/": {
    title:
      "Agence HDS — Création de Sites Internet & Applications Web | Aix-en-Provence",
    description:
      "Agence web créative à Aix-en-Provence. Création de sites internet, applications web, e-commerce et solutions digitales sur mesure. Devis gratuit.",
    keywords: [
      "agence web aix-en-provence",
      "création site internet",
      "développement web",
      "e-commerce",
      "application web sur mesure",
      "agence digitale gardanne",
    ],
  },
  "/services": {
    title: "Services Web — Développement, E-Commerce, UI/UX, IA | Agence HDS",
    description:
      "Découvrez nos services : développement web Next.js & React, e-commerce WooCommerce, design UI/UX, solutions SaaS, intégration IA et SEO. Aix-en-Provence.",
    keywords: [
      "développement web next.js",
      "création e-commerce",
      "design ui/ux",
      "solutions saas",
      "intégration ia",
      "seo aix-en-provence",
    ],
  },
  "/projets": {
    title: "Nos Projets & Réalisations Web | Agence HDS Aix-en-Provence",
    description:
      "Portfolio de nos réalisations : sites e-commerce, applications web, dashboards SaaS et landing pages. Découvrez nos projets clients.",
    keywords: [
      "portfolio agence web",
      "réalisations web",
      "projets e-commerce",
      "études de cas",
    ],
  },
  "/tarifs": {
    title: "Tarifs Création de Site Internet — Devis Gratuit | Agence HDS",
    description:
      "Nos formules de création de site web : site vitrine dès 80€/mois, application web 299€/mois, e-commerce 349€/mois. Devis personnalisé gratuit.",
    keywords: [
      "tarif création site internet",
      "prix site web",
      "devis site internet",
      "agence web tarif",
    ],
  },
  "/a-propos": {
    title: "À Propos — Agence Web Créative depuis 2014 | Agence HDS",
    description:
      "Découvrez l'Agence HDS, agence web à taille humaine basée à Gardanne près d'Aix-en-Provence. Plus de 12 ans d'expertise en développement web.",
    keywords: [
      "agence web gardanne",
      "développeur web aix-en-provence",
      "nans harua",
      "agence digitale provence",
    ],
  },
  "/blog": {
    title: "Blog Développement Web, IA & Digital | Agence HDS",
    description:
      "Conseils, tutoriels et actualités sur le développement web, l'e-commerce, l'IA et le digital. Par l'Agence HDS, Aix-en-Provence.",
    keywords: [
      "blog développement web",
      "actualités digital",
      "tutoriels web",
      "conseils e-commerce",
    ],
  },
  "/contact": {
    title: "Contactez-nous — Devis Gratuit | Agence HDS Aix-en-Provence",
    description:
      "Parlons de votre projet web ! Contactez l'Agence HDS à Aix-en-Provence. Premier rendez-vous gratuit et sans engagement. Réponse sous 24h.",
    keywords: [
      "contact agence web",
      "devis gratuit site internet",
      "agence web aix-en-provence contact",
    ],
  },
  "/projets/aiako-ecommerce": {
    title:
      "AIAKO E-Commerce — Migration WooCommerce vers Next.js | Agence HDS",
    description:
      "Étude de cas : migration de la boutique AIAKO de WooCommerce vers Next.js + Supabase. Performance x3, +45% de conversions. Paiement Monetico.",
    keywords: [
      "migration woocommerce",
      "e-commerce next.js",
      "étude de cas e-commerce",
      "supabase e-commerce",
    ],
  },
};
