export interface ArticleContentBlock {
  type: "paragraph" | "heading" | "list";
  text: string;
  items?: string[];
}

export interface ArticleData {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: ArticleContentBlock[];
  related: { slug: string; title: string; category: string }[];
}

const frenchMonths: Record<string, string> = {
  "Janvier": "01", "Février": "02", "Mars": "03", "Avril": "04",
  "Mai": "05", "Juin": "06", "Juillet": "07", "Août": "08",
  "Septembre": "09", "Octobre": "10", "Novembre": "11", "Décembre": "12",
};

export function parseFrenchDate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length !== 3) return dateStr;
  const [day, month, year] = parts;
  const monthNum = frenchMonths[month];
  if (!monthNum) return dateStr;
  return `${year}-${monthNum}-${day.padStart(2, "0")}`;
}

export const articlesData: Record<string, ArticleData> = {
  "pourquoi-nextjs-en-2024": {
    title: "Pourquoi choisir Next.js en 2024 ?",
    category: "Développement",
    date: "15 Janvier 2024",
    readTime: "5 min",
    image: "/images/projects/project-dashboard.jpg",
    author: "Agence HDS",
    content: [
      { type: "paragraph", text: "Next.js s\u2019est imposé comme le framework React de référence pour le développement web moderne. Avec sa version 14, il apporte des innovations majeures qui changent la donne pour les développeurs et les entreprises." },
      { type: "heading", text: "Performance et SEO natifs" },
      { type: "paragraph", text: "Grâce au Server-Side Rendering (SSR) et à la génération statique (SSG), Next.js offre des temps de chargement ultra-rapides et un référencement naturel optimal. Google indexe parfaitement les pages générées côté serveur, un avantage considérable par rapport aux SPA classiques." },
      { type: "heading", text: "Les avantages clés" },
      { type: "list", text: "", items: [
        "Rendu hybride : SSR, SSG et ISR selon les besoins de chaque page",
        "App Router : système de routing intuitif basé sur le file system",
        "Server Components : réduction drastique du JavaScript côté client",
        "Image Optimization : optimisation automatique des images",
        "Edge Runtime : déploiement au plus proche des utilisateurs",
      ] },
      { type: "heading", text: "L\u2019écosystème React" },
      { type: "paragraph", text: "Next.js bénéficie de l\u2019immense écosystème React : des milliers de bibliothèques, une communauté massive et des outils de développement matures. C\u2019est un investissement sûr pour vos projets à long terme." },
      { type: "paragraph", text: "Chez Agence HDS, nous utilisons Next.js pour tous nos projets web, des sites vitrines aux applications SaaS complexes. Sa flexibilité et ses performances en font le choix idéal pour des solutions pérennes et évolutives." },
    ],
    related: [
      { slug: "ux-design-conversions", title: "Comment le design UX booste vos conversions", category: "Design" },
      { slug: "seo-erreurs-courantes", title: "5 erreurs SEO qui plombent votre visibilité", category: "SEO" },
    ],
  },
  "ux-design-conversions": {
    title: "Comment le design UX booste vos conversions",
    category: "Design",
    date: "8 Janvier 2024",
    readTime: "4 min",
    image: "/images/projects/project-landing.jpg",
    author: "Agence HDS",
    content: [
      { type: "paragraph", text: "Le design UX (User Experience) va bien au-delà de l\u2019esthétique. C\u2019est une discipline stratégique qui influence directement vos résultats business. Un site bien conçu peut multiplier votre taux de conversion par 2 ou 3." },
      { type: "heading", text: "L\u2019impact mesurable du design" },
      { type: "paragraph", text: "Selon une étude Forrester, chaque euro investi en UX rapporte entre 10 et 100 euros. Les utilisateurs forment leur première impression en 50 millisecondes. Si votre interface est confuse ou datée, vous perdez des clients avant même qu\u2019ils ne découvrent votre offre." },
      { type: "heading", text: "Les principes qui convertissent" },
      { type: "list", text: "", items: [
        "Hiérarchie visuelle claire : guidez le regard vers les actions importantes",
        "Réduction des frictions : simplifiez chaque étape du parcours utilisateur",
        "Social proof : témoignages et chiffres clés placés stratégiquement",
        "Call-to-action : boutons visibles, texte orienté bénéfice utilisateur",
        "Mobile-first : 60% du trafic est mobile, concevez pour le smartphone d\u2019abord",
      ] },
      { type: "paragraph", text: "Chez Agence HDS, chaque design que nous créons est pensé pour convertir. Nous testons, itérons et optimisons jusqu\u2019à obtenir les résultats que vous méritez." },
    ],
    related: [
      { slug: "pourquoi-nextjs-en-2024", title: "Pourquoi choisir Next.js en 2024 ?", category: "Développement" },
      { slug: "ecommerce-tendances", title: "E-commerce : les tendances à suivre", category: "E-Commerce" },
    ],
  },
  "seo-erreurs-courantes": {
    title: "5 erreurs SEO qui plombent votre visibilité",
    category: "SEO",
    date: "2 Janvier 2024",
    readTime: "6 min",
    image: "/images/projects/neuralia-project.webp",
    author: "Agence HDS",
    content: [
      { type: "paragraph", text: "Le référencement naturel est un levier incontournable pour votre visibilité en ligne. Pourtant, de nombreuses entreprises commettent des erreurs qui pénalisent leur positionnement sur Google." },
      { type: "heading", text: "Erreur #1 : Ignorer les performances" },
      { type: "paragraph", text: "Google prend en compte les Core Web Vitals dans son algorithme de classement. Un site lent, avec un mauvais score Lighthouse, sera systématiquement pénalisé. Optimisez vos images, utilisez le lazy loading et choisissez un hébergement performant." },
      { type: "heading", text: "Erreur #2 : Pas de stratégie de contenu" },
      { type: "paragraph", text: "Publier du contenu sans stratégie est inefficace. Identifiez vos mots-clés cibles, créez un calendrier éditorial et produisez du contenu de qualité qui répond aux questions de vos utilisateurs." },
      { type: "heading", text: "Les 5 erreurs à éviter" },
      { type: "list", text: "", items: [
        "Performances médiocres (Core Web Vitals)",
        "Absence de stratégie de contenu et de mots-clés",
        "Balises meta manquantes ou dupliquées",
        "Pas de données structurées (Schema.org)",
        "Négliger le maillage interne et les backlinks",
      ] },
      { type: "paragraph", text: "Un audit SEO complet est la première étape pour identifier et corriger ces erreurs. Contactez-nous pour un diagnostic gratuit de votre site." },
    ],
    related: [
      { slug: "pourquoi-nextjs-en-2024", title: "Pourquoi choisir Next.js en 2024 ?", category: "Développement" },
      { slug: "ux-design-conversions", title: "Comment le design UX booste vos conversions", category: "Design" },
    ],
  },
  "ecommerce-tendances": {
    title: "E-commerce : les tendances à suivre",
    category: "E-Commerce",
    date: "20 Décembre 2023",
    readTime: "7 min",
    image: "/images/projects/reservation-system.webp",
    author: "Agence HDS",
    content: [
      { type: "paragraph", text: "Le e-commerce évolue à une vitesse folle. Pour rester compétitif, il est essentiel d\u2019anticiper les tendances qui façonneront le commerce en ligne dans les prochaines années." },
      { type: "heading", text: "Le commerce mobile domine" },
      { type: "paragraph", text: "Plus de 70% des achats en ligne se font depuis un mobile. Les boutiques qui n\u2019offrent pas une expérience mobile irréprochable perdent la majorité de leurs clients potentiels. Le responsive ne suffit plus : il faut concevoir mobile-first." },
      { type: "heading", text: "Tendances clés" },
      { type: "list", text: "", items: [
        "Commerce social : achat direct depuis Instagram, TikTok et Pinterest",
        "IA et personnalisation : recommandations produits ultra-ciblées",
        "Paiement fractionné : BNPL (Buy Now Pay Later) en forte croissance",
        "Livraison ultra-rapide : attentes de livraison J+1 voire J+0",
        "Durabilité : les consommateurs privilégient les marques responsables",
      ] },
      { type: "paragraph", text: "Chez Agence HDS, nous intégrons ces tendances dans chaque projet e-commerce que nous réalisons, pour vous positionner en avance sur votre marché." },
    ],
    related: [
      { slug: "seo-erreurs-courantes", title: "5 erreurs SEO qui plombent votre visibilité", category: "SEO" },
      { slug: "ux-design-conversions", title: "Comment le design UX booste vos conversions", category: "Design" },
    ],
  },
};

export const articlesSlugs = Object.keys(articlesData);
