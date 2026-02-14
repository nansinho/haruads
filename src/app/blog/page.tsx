"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const articles = [
  {
    slug: "pourquoi-nextjs-en-2024",
    title: "Pourquoi choisir Next.js en 2024 ?",
    excerpt:
      "Next.js s\u2019est imposé comme le framework React de référence. Découvrez pourquoi nous l\u2019utilisons pour tous nos projets web.",
    category: "Développement",
    date: "15 Jan 2024",
    readTime: "5 min",
    image: "/images/projects/project-dashboard.jpg",
  },
  {
    slug: "ux-design-conversions",
    title: "Comment le design UX booste vos conversions",
    excerpt:
      "Un bon design ne se limite pas à l\u2019esthétique. Découvrez comment l\u2019UX peut transformer votre taux de conversion.",
    category: "Design",
    date: "8 Jan 2024",
    readTime: "4 min",
    image: "/images/projects/project-landing.jpg",
  },
  {
    slug: "seo-erreurs-courantes",
    title: "5 erreurs SEO qui plombent votre visibilité",
    excerpt:
      "Le référencement naturel est essentiel pour votre visibilité. Voici les erreurs les plus courantes et comment les éviter.",
    category: "SEO",
    date: "2 Jan 2024",
    readTime: "6 min",
    image: "/images/projects/neuralia-project.webp",
  },
  {
    slug: "ecommerce-tendances",
    title: "E-commerce : les tendances à suivre",
    excerpt:
      "Le e-commerce évolue rapidement. Paiement mobile, personnalisation IA, commerce social : ce qui va changer.",
    category: "E-Commerce",
    date: "20 Dec 2023",
    readTime: "7 min",
    image: "/images/projects/reservation-system.webp",
  },
];

export default function BlogPage() {
  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                Blog
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Actualités & </span>
                <span className="font-serif italic text-accent">ressources.</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[500px] leading-[1.8] font-light">
                Conseils, tendances et retours d&apos;expérience sur le développement web,
                le design et le marketing digital.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured article */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <a
                href={`/blog/${featured.slug}`}
                className="block group"
              >
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
                  <div className="rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[0.72rem] font-medium">
                        {featured.category}
                      </span>
                      <span className="text-[0.72rem] text-text-body">
                        {featured.date} &bull; {featured.readTime} de lecture
                      </span>
                    </div>
                    <h2 className="text-[1.4rem] lg:text-[2rem] font-serif text-text-dark group-hover:text-accent transition-colors leading-[1.2]">
                      {featured.title}
                    </h2>
                    <p className="text-[0.9rem] text-text-body leading-[1.7] mt-4">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[0.85rem] text-accent font-medium mt-6">
                      Lire l&apos;article
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Other articles */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <h3 className="text-[1.3rem] lg:text-[1.6rem] leading-[1.1] tracking-[-0.02em] mb-10">
                <span className="font-light">Tous les </span>
                <span className="font-serif italic">articles.</span>
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 80}>
                  <a
                    href={`/blog/${article.slug}`}
                    className="block group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[0.65rem] font-medium text-text-dark">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 lg:p-6">
                      <div className="text-[0.7rem] text-text-body mb-3">
                        {article.date} &bull; {article.readTime} de lecture
                      </div>
                      <h4 className="text-[1rem] font-serif text-text-dark group-hover:text-accent transition-colors leading-[1.3]">
                        {article.title}
                      </h4>
                      <p className="text-[0.8rem] text-text-body leading-[1.7] mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[500px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Restez </span>
                  <span className="font-serif italic">informé.</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Recevez nos derniers articles et conseils directement dans votre boîte mail.
                </p>
                <div className="flex gap-3 mt-8 max-w-[400px] mx-auto">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-[0.85rem] text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all"
                  />
                  <motion.button
                    className="px-6 py-3 rounded-full bg-white text-accent font-medium text-[0.85rem] cursor-pointer border-none shrink-0"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    S&apos;abonner
                  </motion.button>
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
