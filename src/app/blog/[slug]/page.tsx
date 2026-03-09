"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  published_at: string | null;
  views_count: number;
  seo_title: string | null;
  seo_description: string | null;
  aeo_answer: string | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  cover_image: string | null;
}

function markdownToHtml(md: string): string {
  if (!md) return "";

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Links: [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-accent/80 transition-colors">$1</a>'
  );

  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic: *text*
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Underline: __text__
  html = html.replace(/__([^_]+)__/g, "<u>$1</u>");

  // Unordered lists
  html = html.replace(/((?:^|\n)- .+(?:\n- .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line) =>
      `<li class="flex items-start gap-3 text-[0.9rem] text-text-body leading-[1.8]"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span><span>${line.replace(/^- /, "")}</span></li>`
    ).join("");
    return `<ul class="space-y-2 my-6">${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^|\n)\d+\. .+(?:\n\d+\. .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line, i) =>
      `<li class="flex items-start gap-3 text-[0.9rem] text-text-body leading-[1.8]"><span class="text-accent font-semibold mt-0.5 shrink-0">${i + 1}.</span><span>${line.replace(/^\d+\. /, "")}</span></li>`
    ).join("");
    return `<ol class="space-y-2 my-6">${items}</ol>`;
  });

  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p class="text-[0.9rem] text-text-body leading-[1.9] my-4">');

  // Single line breaks
  html = html.replace(/\n/g, "<br>");

  // Wrap in paragraph
  html = `<p class="text-[0.9rem] text-text-body leading-[1.9] my-4">${html}</p>`;

  // Bold as section titles (standalone bold lines)
  html = html.replace(
    /<p([^>]*)><strong>([^<]+)<\/strong><\/p>/g,
    '<h2 class="text-[1.3rem] lg:text-[1.5rem] font-serif text-text-dark mt-10 mb-4">$2</h2>'
  );

  // Clean up empty paragraphs
  html = html.replace(/<p[^>]*>\s*<\/p>/g, "");
  html = html.replace(/<p[^>]*><br><\/p>/g, "");

  return html;
}

function readTime(content: string): string {
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => {
        setArticle(json.data);
        setRelated(json.related || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="text-accent animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !article) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2rem] font-serif italic text-accent">Article introuvable</h1>
            <p className="text-text-muted mt-4">
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

  const contentHtml = markdownToHtml(article.content);

  return (
    <>
      <Navbar />
      <main>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.seo_title || article.title,
              description: article.seo_description || article.excerpt || "",
              image: article.cover_image || "",
              datePublished: article.published_at,
              author: {
                "@type": "Organization",
                name: "Agence HDS",
                url: "https://agencehds.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Agence HDS",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://agencehds.com/blog/${article.slug}`,
              },
              ...(article.aeo_answer
                ? {
                    mainEntity: {
                      "@type": "Question",
                      name: article.title,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: article.aeo_answer,
                      },
                    },
                  }
                : {}),
            }),
          }}
        />

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
              <Breadcrumb items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: article.title },
              ]} />
              <div className="flex items-center gap-3 mb-5">
                {article.category && (
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[0.72rem] font-medium">
                    {article.category}
                  </span>
                )}
                <span className="text-[0.72rem] text-text-muted">
                  {formatDate(article.published_at)} &bull; {readTime(article.content)} de lecture
                </span>
              </div>
              <h1 className="text-fluid-h2 leading-[1.15] tracking-[-0.02em] font-serif">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-dark text-[0.7rem] font-semibold">
                  H
                </div>
                <span className="text-[0.82rem] text-text-muted">Agence HDS</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured image */}
        {article.cover_image && (
          <section className="bg-dark text-white pb-16">
            <div className="max-w-[800px] mx-auto px-5 lg:px-12">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[700px] mx-auto px-5 py-[80px] lg:px-12">
            <div
              className="blog-content space-y-1"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </section>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <section className="bg-white text-text-dark border-t border-gray-100">
            <div className="max-w-[700px] mx-auto px-5 py-6 lg:px-12">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-text-body text-[0.75rem] font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-light text-text-dark">
            <div className="max-w-[800px] mx-auto px-5 py-[80px] lg:px-12">
              <ScrollReveal>
                <h3 className="text-[1.3rem] lg:text-[1.5rem] leading-[1.1] tracking-[-0.02em] mb-8">
                  <span className="font-light">Articles </span>
                  <span className="font-serif italic">similaires.</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map((rel) => (
                    <a
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="block p-5 bg-white rounded-xl border border-gray-100 hover:border-accent/20 hover:shadow-sm transition-all duration-300 group"
                    >
                      {rel.category && (
                        <span className="text-[0.7rem] text-accent font-medium uppercase tracking-wider">
                          {rel.category}
                        </span>
                      )}
                      <h4 className="text-[0.95rem] font-serif text-text-dark mt-2 leading-[1.3]">
                        {rel.title}
                      </h4>
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[500px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Un projet en </span>
                  <span className="font-serif italic">tête ?</span>
                </h2>
                <p className="text-[0.9rem] text-text-secondary mt-4 leading-[1.7]">
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
