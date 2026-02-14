"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const articlesData: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    content: { type: "paragraph" | "heading" | "list"; text: string; items?: string[] }[];
    related: { slug: string; title: string; category: string }[];
  }
> = {
  "pourquoi-nextjs-en-2024": {
    title: "Pourquoi choisir Next.js en 2024 ?",
    category: "Développement",
    date: "15 Janvier 2024",
    readTime: "5 min",
    image: "/images/projects/project-dashboard.jpg",
    author: "Agence HDS",
    content: [
      {
        type: "paragraph",
        text: "Next.js s\u2019est imposé comme le framework React de référence pour le développement web moderne. Avec sa version 14, il apporte des innovations majeures qui changent la donne pour les développeurs et les entreprises.",
      },
      {
        type: "heading",
        text: "Performance et SEO natifs",
      },
      {
        type: "paragraph",
        text: "Grâce au Server-Side Rendering (SSR) et à la génération statique (SSG), Next.js offre des temps de chargement ultra-rapides et un référencement naturel optimal. Google indexe parfaitement les pages générées côté serveur, un avantage considérable par rapport aux SPA classiques.",
      },
      {
        type: "heading",
        text: "Les avantages clés",
      },
      {
        type: "list",
        text: "",
        items: [
          "Rendu hybride : SSR, SSG et ISR selon les besoins de chaque page",
          "App Router : système de routing intuitif basé sur le file system",
          "Server Components : réduction drastique du JavaScript côté client",
          "Image Optimization : optimisation automatique des images",
          "Edge Runtime : déploiement au plus proche des utilisateurs",
        ],
      },
      {
        type: "heading",
        text: "L\u2019écosystème React",
      },
      {
        type: "paragraph",
        text: "Next.js bénéficie de l\u2019immense écosystème React : des milliers de bibliothèques, une communauté massive et des outils de développement matures. C\u2019est un investissement sûr pour vos projets à long terme.",
      },
      {
        type: "paragraph",
        text: "Chez Agence HDS, nous utilisons Next.js pour tous nos projets web, des sites vitrines aux applications SaaS complexes. Sa flexibilité et ses performances en font le choix idéal pour des solutions pérennes et évolutives.",
      },
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
      {
        type: "paragraph",
        text: "Le design UX (User Experience) va bien au-delà de l\u2019esthétique. C\u2019est une discipline stratégique qui influence directement vos résultats business. Un site bien conçu peut multiplier votre taux de conversion par 2 ou 3.",
      },
      {
        type: "heading",
        text: "L\u2019impact mesurable du design",
      },
      {
        type: "paragraph",
        text: "Selon une étude Forrester, chaque euro investi en UX rapporte entre 10 et 100 euros. Les utilisateurs forment leur première impression en 50 millisecondes. Si votre interface est confuse ou datée, vous perdez des clients avant même qu\u2019ils ne découvrent votre offre.",
      },
      {
        type: "heading",
        text: "Les principes qui convertissent",
      },
      {
        type: "list",
        text: "",
        items: [
          "Hiérarchie visuelle claire : guidez le regard vers les actions importantes",
          "Réduction des frictions : simplifiez chaque étape du parcours utilisateur",
          "Social proof : témoignages et chiffres clés placés stratégiquement",
          "Call-to-action : boutons visibles, texte orienté bénéfice utilisateur",
          "Mobile-first : 60% du trafic est mobile, concevez pour le smartphone d\u2019abord",
        ],
      },
      {
        type: "paragraph",
        text: "Chez Agence HDS, chaque design que nous créons est pensé pour convertir. Nous testons, itérons et optimisons jusqu\u2019à obtenir les résultats que vous méritez.",
      },
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
      {
        type: "paragraph",
        text: "Le référencement naturel est un levier incontournable pour votre visibilité en ligne. Pourtant, de nombreuses entreprises commettent des erreurs qui pénalisent leur positionnement sur Google.",
      },
      {
        type: "heading",
        text: "Erreur #1 : Ignorer les performances",
      },
      {
        type: "paragraph",
        text: "Google prend en compte les Core Web Vitals dans son algorithme de classement. Un site lent, avec un mauvais score Lighthouse, sera systématiquement pénalisé. Optimisez vos images, utilisez le lazy loading et choisissez un hébergement performant.",
      },
      {
        type: "heading",
        text: "Erreur #2 : Pas de stratégie de contenu",
      },
      {
        type: "paragraph",
        text: "Publier du contenu sans stratégie est inefficace. Identifiez vos mots-clés cibles, créez un calendrier éditorial et produisez du contenu de qualité qui répond aux questions de vos utilisateurs.",
      },
      {
        type: "heading",
        text: "Les 5 erreurs à éviter",
      },
      {
        type: "list",
        text: "",
        items: [
          "Performances médiocres (Core Web Vitals)",
          "Absence de stratégie de contenu et de mots-clés",
          "Balises meta manquantes ou dupliquées",
          "Pas de données structurées (Schema.org)",
          "Négliger le maillage interne et les backlinks",
        ],
      },
      {
        type: "paragraph",
        text: "Un audit SEO complet est la première étape pour identifier et corriger ces erreurs. Contactez-nous pour un diagnostic gratuit de votre site.",
      },
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
      {
        type: "paragraph",
        text: "Le e-commerce évolue à une vitesse folle. Pour rester compétitif, il est essentiel d\u2019anticiper les tendances qui façonneront le commerce en ligne dans les prochaines années.",
      },
      {
        type: "heading",
        text: "Le commerce mobile domine",
      },
      {
        type: "paragraph",
        text: "Plus de 70% des achats en ligne se font depuis un mobile. Les boutiques qui n\u2019offrent pas une expérience mobile irréprochable perdent la majorité de leurs clients potentiels. Le responsive ne suffit plus : il faut concevoir mobile-first.",
      },
      {
        type: "heading",
        text: "Tendances clés",
      },
      {
        type: "list",
        text: "",
        items: [
          "Commerce social : achat direct depuis Instagram, TikTok et Pinterest",
          "IA et personnalisation : recommandations produits ultra-ciblées",
          "Paiement fractionné : BNPL (Buy Now Pay Later) en forte croissance",
          "Livraison ultra-rapide : attentes de livraison J+1 voire J+0",
          "Durabilité : les consommateurs privilégient les marques responsables",
        ],
      },
      {
        type: "paragraph",
        text: "Chez Agence HDS, nous intégrons ces tendances dans chaque projet e-commerce que nous réalisons, pour vous positionner en avance sur votre marché.",
      },
    ],
    related: [
      { slug: "seo-erreurs-courantes", title: "5 erreurs SEO qui plombent votre visibilité", category: "SEO" },
      { slug: "ux-design-conversions", title: "Comment le design UX booste vos conversions", category: "Design" },
    ],
  },
};

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2rem] font-serif italic text-accent">Article introuvable</h1>
            <p className="text-white/40 mt-4">
              <a href="/blog" className="text-accent hover:underline">
                Retour au blog
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-12">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[800px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-[0.78rem] text-white/40 hover:text-accent transition-colors mb-8"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Retour au blog
              </a>
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[0.72rem] font-medium">
                  {article.category}
                </span>
                <span className="text-[0.72rem] text-white/30">
                  {article.date} &bull; {article.readTime} de lecture
                </span>
              </div>
              <h1 className="text-fluid-h2 leading-[1.15] tracking-[-0.02em] font-serif">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-dark text-[0.7rem] font-semibold">
                  H
                </div>
                <span className="text-[0.82rem] text-white/50">{article.author}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured image */}
        <section className="bg-dark text-white pb-16">
          <div className="max-w-[800px] mx-auto px-5 lg:px-12">
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[700px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="space-y-6">
              {article.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={i} className="text-[1.3rem] lg:text-[1.5rem] font-serif text-text-dark mt-10 mb-4">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "list" && block.items) {
                  return (
                    <ul key={i} className="space-y-2 my-6">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[0.9rem] text-text-body leading-[1.8]">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-[0.9rem] text-text-body leading-[1.9]">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related articles */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <h3 className="text-[1.3rem] lg:text-[1.5rem] leading-[1.1] tracking-[-0.02em] mb-8">
                <span className="font-light">Articles </span>
                <span className="font-serif italic">similaires.</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {article.related.map((rel) => (
                  <a
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="block p-5 bg-white rounded-xl border border-gray-100 hover:border-accent/20 hover:shadow-sm transition-all duration-300 group"
                  >
                    <span className="text-[0.7rem] text-accent font-medium uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-[0.95rem] font-serif text-text-dark group-hover:text-accent transition-colors mt-2 leading-[1.3]">
                      {rel.title}
                    </h4>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[500px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Un projet en </span>
                  <span className="font-serif italic">tête ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Discutons de vos besoins. Premier rendez-vous gratuit.
                </p>
                <div className="mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nous contacter
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
