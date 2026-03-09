"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  published_at: string | null;
  views_count: number;
  content: string;
}

function readTime(content: string): string {
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((json) => setArticles(json.data || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

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
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-2">
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
                <span className="font-serif italic">ressources.</span>
              </h1>
              <p className="text-[0.95rem] text-text-muted mt-5 max-w-[500px] leading-[1.8] font-light">
                Conseils, tendances et retours d&apos;expérience sur le développement web,
                le design et le marketing digital.
              </p>
            </motion.div>
          </div>
        </section>

        {loading ? (
          <section className="bg-white text-text-dark">
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="text-accent animate-spin" />
            </div>
          </section>
        ) : articles.length === 0 ? (
          <section className="bg-white text-text-dark">
            <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12 text-center">
              <p className="text-text-body text-lg">Aucun article publié pour le moment.</p>
              <p className="text-text-body/60 mt-2">Revenez bientôt pour découvrir nos actualités !</p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <section className="bg-white text-text-dark">
                <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12">
                  <ScrollReveal>
                    <a href={`/blog/${featured.slug}`} className="block group">
                      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
                          {featured.cover_image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={featured.cover_image}
                              alt={featured.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                              <span className="text-accent/40 text-6xl font-serif italic">{featured.title[0]}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            {featured.category && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-[0.72rem] font-medium">
                                <Tag className="w-3 h-3" />
                                {featured.category}
                              </span>
                            )}
                            <span className="text-[0.72rem] text-text-body">
                              {formatDate(featured.published_at)} &bull; {readTime(featured.content)} de lecture
                            </span>
                          </div>
                          <h2 className="text-[1.4rem] lg:text-[2rem] font-semibold text-text-dark leading-[1.2]">
                            {featured.title}
                          </h2>
                          <p className="text-[0.9rem] text-text-body leading-[1.7] mt-4">
                            {featured.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-accent text-white text-[0.82rem] font-medium group-hover:shadow-accent/20 transition-all duration-300">
                            Lire l&apos;article
                            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2">
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
            )}

            {/* Other articles */}
            {others.length > 0 && (
              <section className="bg-light text-text-dark">
                <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12">
                  <ScrollReveal>
                    <h3 className="text-[1.3rem] lg:text-[1.6rem] leading-[1.1] tracking-[-0.02em] mb-10">
                      <span className="font-light">Tous les </span>
                      <span className="font-serif italic">articles.</span>
                    </h3>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {others.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i * 80}>
                        <a
                          href={`/blog/${article.slug}`}
                          className="flex flex-col h-full group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                        >
                          <div className="aspect-[16/10] relative overflow-hidden shrink-0 bg-gray-100">
                            {article.cover_image ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={article.cover_image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                <span className="text-accent/40 text-4xl font-serif italic">{article.title[0]}</span>
                              </div>
                            )}
                            {article.category && (
                              <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-[0.65rem] font-medium shadow-sm">
                                  <Tag className="w-3 h-3" />
                                  {article.category}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col flex-1 p-5 lg:p-6">
                            <div className="text-[0.7rem] text-text-body mb-3">
                              {formatDate(article.published_at)} &bull; {readTime(article.content)} de lecture
                            </div>
                            <h4 className="text-[1rem] font-semibold text-text-dark leading-[1.3]">
                              {article.title}
                            </h4>
                            <p className="text-[0.8rem] text-text-body leading-[1.7] mt-2 line-clamp-2">
                              {article.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-[0.78rem] text-accent font-medium mt-auto pt-4 group-hover:gap-3 transition-all duration-300">
                              Lire la suite
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </span>
                          </div>
                        </a>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[500px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Restez </span>
                  <span className="font-serif italic">informé.</span>
                </h2>
                <p className="text-[0.9rem] text-text-secondary mt-4 leading-[1.7]">
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
