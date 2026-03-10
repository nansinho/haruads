"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Loader2,
  Heart,
  MessageCircle,
  Share2,
  Copy,
  Check,
  Send,
  ArrowLeft,
  Eye,
  Clock,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";

/* ─── Types ─── */

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
  excerpt?: string | null;
  category: string | null;
  cover_image: string | null;
  published_at?: string | null;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

/* ─── Helpers ─── */

function markdownToHtml(md: string): string {
  if (!md) return "";

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent font-medium underline decoration-accent/30 underline-offset-2 hover:decoration-accent transition-all">$1</a>'
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong class=\"font-semibold text-text-dark\">$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/__([^_]+)__/g, "<u>$1</u>");

  html = html.replace(/((?:^|\n)- .+(?:\n- .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line) =>
      `<li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-accent/60 mt-2 shrink-0"></span><span>${line.replace(/^- /, "")}</span></li>`
    ).join("");
    return `<ul class="space-y-3 my-6 text-[0.92rem] text-text-body leading-[1.8]">${items}</ul>`;
  });

  html = html.replace(/((?:^|\n)\d+\. .+(?:\n\d+\. .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line, i) =>
      `<li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${i + 1}</span><span>${line.replace(/^\d+\. /, "")}</span></li>`
    ).join("");
    return `<ol class="space-y-3 my-6 text-[0.92rem] text-text-body leading-[1.8]">${items}</ol>`;
  });

  html = html.replace(/\n\n/g, '</p><p class="text-[0.92rem] text-text-body leading-[1.9] my-5">');
  html = html.replace(/\n/g, "<br>");
  html = `<p class="text-[0.92rem] text-text-body leading-[1.9] my-5">${html}</p>`;

  // Standalone bold as section headings
  html = html.replace(
    /<p([^>]*)><strong class="font-semibold text-text-dark">([^<]+)<\/strong><\/p>/g,
    '<h2 class="text-[1.25rem] lg:text-[1.4rem] font-bold text-text-dark mt-12 mb-4 pb-2 border-b border-gray-100">$2</h2>'
  );

  html = html.replace(/<p[^>]*>\s*<\/p>/g, "");
  html = html.replace(/<p[^>]*><br><\/p>/g, "");

  return html;
}

function getReadTime(content: string): number {
  return Math.max(1, Math.ceil((content?.split(/\s+/).length || 0) / 200));
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `il y a ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `il y a ${days}j`;
  return formatDate(dateStr);
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("hds_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("hds_visitor_id", id);
  }
  return id;
}

const avatarColors = [
  "bg-accent", "bg-blue-500", "bg-emerald-500", "bg-purple-500",
  "bg-pink-500", "bg-amber-500", "bg-cyan-500", "bg-rose-500",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

/* ─── Page Component ─── */

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Likes
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  // Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // Share
  const [copied, setCopied] = useState(false);

  // Reading progress — track full page scroll (no target ref needed)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Fetch article
  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then((json) => { setArticle(json.data); setRelated(json.related || []); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch likes + check if already liked
  useEffect(() => {
    if (!article) return;
    const vid = getVisitorId();
    const url = vid ? `/api/blog/${slug}/like?visitor_id=${encodeURIComponent(vid)}` : `/api/blog/${slug}/like`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setLikes(d.count || 0);
        if (d.liked !== undefined) setLiked(d.liked);
      })
      .catch(() => {});
  }, [article, slug]);

  // Fetch comments
  useEffect(() => {
    if (!article) return;
    fetch(`/api/blog/${slug}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.data || []))
      .catch(() => {});
  }, [article, slug]);

  const handleLike = useCallback(async () => {
    const vid = getVisitorId();
    if (!vid) return;
    setLikeAnimating(true);
    try {
      const res = await fetch(`/api/blog/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: vid }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikes(data.count);
    } catch {}
    setTimeout(() => setLikeAnimating(false), 600);
  }, [slug]);

  const handleShare = useCallback((platform: string) => {
    const url = window.location.href;
    const text = article?.title || "";
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank", "width=600,height=400");
  }, [article]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleCommentSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: commentName,
          author_email: commentEmail || undefined,
          content: commentContent,
        }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setCommentContent("");
      }
    } catch {}
    setSubmittingComment(false);
  }, [slug, commentName, commentEmail, commentContent]);

  /* ─── Loading / 404 states ─── */

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
            <h1 className="text-[2rem] font-bold text-accent">Article introuvable</h1>
            <a href="/blog" className="inline-flex items-center gap-2 mt-6 text-accent hover:underline">
              <ArrowLeft size={16} /> Retour au blog
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const contentHtml = markdownToHtml(article.content);
  const readMins = getReadTime(article.content);
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Navbar />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-accent/60 origin-left z-[200]"
        style={{ scaleX }}
      />

      <main>
        {/* JSON-LD */}
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
              author: { "@type": "Organization", name: "Agence HDS", url: "https://agencehds.com" },
              publisher: { "@type": "Organization", name: "Agence HDS" },
              mainEntityOfPage: { "@type": "WebPage", "@id": `https://agencehds.com/blog/${article.slug}` },
              ...(article.aeo_answer ? {
                mainEntity: { "@type": "Question", name: article.title, acceptedAnswer: { "@type": "Answer", text: article.aeo_answer } },
              } : {}),
            }),
          }}
        />

        {/* Hero with cover image */}
        <section className="relative bg-dark text-white overflow-hidden">
          {/* Background image or gradient */}
          {article.cover_image ? (
            <div className="absolute inset-0">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-accent/10" />
          )}

          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

          <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-12 pt-32 pb-16 lg:pt-36 lg:pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]} />

              <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">
                {article.category && (
                  <span className="px-3.5 py-1.5 rounded-full bg-accent text-dark text-[0.72rem] font-bold uppercase tracking-wide">
                    {article.category}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[0.75rem] text-white/60">
                  <Calendar size={13} />
                  {formatDate(article.published_at)}
                </span>
                <span className="flex items-center gap-1.5 text-[0.75rem] text-white/60">
                  <Clock size={13} />
                  {readMins} min de lecture
                </span>
                <span className="flex items-center gap-1.5 text-[0.75rem] text-white/60">
                  <Eye size={13} />
                  {article.views_count} vues
                </span>
              </div>

              <h1 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] leading-[1.12] tracking-[-0.02em] font-bold text-white">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-[0.95rem] text-white/60 mt-5 max-w-[650px] leading-[1.7] font-light">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center gap-3 mt-8">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark text-[0.8rem] font-bold">
                  H
                </div>
                <div>
                  <p className="text-[0.85rem] font-medium text-white">Agence HDS</p>
                  <p className="text-[0.72rem] text-white/40">Agence web &middot; Aix-en-Provence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-12 py-12 lg:py-16">
            <div className="flex gap-8 lg:gap-12">

              {/* Sticky sidebar (desktop) */}
              <aside className="hidden lg:flex flex-col items-center gap-4 sticky top-24 self-start pt-4">
                {/* Like button */}
                <motion.button
                  onClick={handleLike}
                  className="group flex flex-col items-center gap-1"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                      liked
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-gray-50 border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                    }`}
                    animate={likeAnimating ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Heart size={18} className={liked ? "fill-red-500" : ""} />
                  </motion.div>
                  <span className="text-xs font-medium text-text-body">{likes}</span>
                </motion.button>

                {/* Comment count */}
                <a href="#commentaires" className="flex flex-col items-center gap-1 group">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 border-2 border-gray-200 text-gray-400 group-hover:border-accent/30 group-hover:text-accent transition-all">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-xs font-medium text-text-body">{comments.length}</span>
                </a>

                <div className="w-px h-6 bg-gray-200" />

                {/* Share buttons */}
                <button onClick={() => handleShare("twitter")} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2] transition-all" title="Partager sur X">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </button>
                <button onClick={() => handleShare("linkedin")} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] transition-all" title="Partager sur LinkedIn">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </button>
                <button onClick={() => handleShare("facebook")} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 hover:text-[#1877F2] transition-all" title="Partager sur Facebook">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </button>
                <button onClick={handleCopyLink} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all" title="Copier le lien">
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </aside>

              {/* Article content */}
              <article className="flex-1 min-w-0 max-w-[720px]">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <a
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="px-3.5 py-1.5 rounded-full bg-gray-50 text-text-body text-[0.78rem] font-medium border border-gray-100 hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all"
                        >
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author card */}
                <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-dark text-lg font-bold shrink-0">
                      H
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark">Agence HDS</p>
                      <p className="text-[0.82rem] text-text-body mt-0.5">
                        Agence web créative à Aix-en-Provence. Développement web, design UI/UX, SEO et solutions sur mesure.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Mobile action bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-3">
          <div className="flex items-center justify-around max-w-[400px] mx-auto">
            <motion.button onClick={handleLike} whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5">
              <Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
              <span className="text-sm font-medium">{likes}</span>
            </motion.button>
            <a href="#commentaires" className="flex items-center gap-1.5 text-gray-400">
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{comments.length}</span>
            </a>
            <button onClick={() => handleShare("twitter")} className="text-gray-400 hover:text-[#1DA1F2]">
              <Share2 size={20} />
            </button>
            <button onClick={handleCopyLink} className="text-gray-400 hover:text-accent">
              {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Comments section */}
        <section id="commentaires" className="bg-gray-50 text-text-dark border-t border-gray-100">
          <div className="max-w-[720px] mx-auto px-5 py-16 lg:px-12">
            <ScrollReveal>
              <h3 className="text-[1.3rem] font-bold text-text-dark flex items-center gap-2">
                <MessageCircle size={22} className="text-accent" />
                Commentaires ({comments.length})
              </h3>

              {/* Comment form */}
              <form onSubmit={handleCommentSubmit} className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[0.78rem] font-medium text-text-body mb-1.5">Nom *</label>
                    <input
                      type="text"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Votre nom"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.78rem] font-medium text-text-body mb-1.5">Email <span className="text-gray-400">(optionnel)</span></label>
                    <input
                      type="email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[0.78rem] font-medium text-text-body mb-1.5">Commentaire *</label>
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Partagez votre avis..."
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={submittingComment || !commentName.trim() || !commentContent.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-dark font-semibold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submittingComment ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    Publier
                  </motion.button>
                </div>
              </form>

              {/* Comments list */}
              <div className="mt-8 space-y-4">
                {comments.length === 0 ? (
                  <p className="text-center text-text-body/60 py-8">
                    Soyez le premier à commenter cet article !
                  </p>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl border border-gray-100 p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-full ${getAvatarColor(comment.author_name)} flex items-center justify-center text-white text-sm font-bold`}>
                          {comment.author_name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[0.85rem] font-semibold text-text-dark">{comment.author_name}</p>
                          <p className="text-[0.72rem] text-text-body/60">{timeAgo(comment.created_at)}</p>
                        </div>
                      </div>
                      <p className="text-[0.88rem] text-text-body leading-[1.7]">{comment.content}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-white text-text-dark border-t border-gray-100">
            <div className="max-w-[1100px] mx-auto px-5 py-16 lg:px-12">
              <ScrollReveal>
                <h3 className="text-[1.3rem] font-bold text-text-dark mb-8">
                  Articles similaires
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <a
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 bg-white"
                    >
                      <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                        {rel.cover_image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={rel.cover_image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                            <span className="text-accent/30 text-3xl font-bold">{rel.title[0]}</span>
                          </div>
                        )}
                        {rel.category && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent text-dark text-[0.65rem] font-bold">
                            {rel.category}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="text-[0.95rem] font-semibold text-text-dark leading-[1.3] group-hover:text-accent transition-colors">
                          {rel.title}
                        </h4>
                        {rel.excerpt && (
                          <p className="text-[0.8rem] text-text-body mt-2 line-clamp-2">{rel.excerpt}</p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-dark text-white">
          <div className="max-w-[1400px] mx-auto px-5 py-20 lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[500px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] font-bold">
                  Un projet en tête ?
                </h2>
                <p className="text-[0.9rem] text-white/50 mt-4 leading-[1.7]">
                  Discutons de vos besoins. Premier rendez-vous gratuit.
                </p>
                <div className="mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-semibold text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nous contacter
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bottom spacer for mobile action bar */}
        <div className="h-16 lg:hidden" />
      </main>
      <Footer />
    </>
  );
}
