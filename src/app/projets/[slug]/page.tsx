"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import { formatCompletedAt } from "@/lib/utils";
import { renderRichText } from "@/lib/renderRichText";
import type { Project } from "@/types/database";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/projects?slug=${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch related projects
    fetch("/api/projects")
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        const others = (Array.isArray(data) ? data : data.projects || [])
          .filter((p: Project) => p.slug !== slug && p.status === "published")
          .slice(0, 3);
        setRelatedProjects(others);
      })
      .catch(() => {});
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2rem] font-serif italic text-accent">Projet introuvable</h1>
            <p className="text-text-muted mt-4">
              Ce projet n&apos;existe pas ou n&apos;est plus disponible.
            </p>
            <a href="/projets" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-accent text-dark font-medium text-[0.9rem]">
              Voir tous les projets
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const allImages = [project.image_url, ...(project.gallery || [])];

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
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Breadcrumb items={[
                { label: "Accueil", href: "/" },
                { label: "Projets", href: "/projets" },
                { label: project.title },
              ]} />
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {project.category && (
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[0.72rem] font-medium">
                    {project.category}
                  </span>
                )}
                {project.completed_at && (
                  <span className="text-[0.72rem] text-text-muted">{formatCompletedAt(project.completed_at)}</span>
                )}
                {project.client && (
                  <>
                    <span className="text-[0.72rem] text-text-muted">&bull;</span>
                    <span className="text-[0.72rem] text-text-muted">{project.client}</span>
                  </>
                )}
              </div>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
                <span className="font-semibold">{project.title}</span>
              </h1>
              <p className="text-[0.95rem] text-text-muted mt-5 max-w-[600px] leading-[1.8] font-light whitespace-pre-line" dangerouslySetInnerHTML={{ __html: renderRichText(project.description) }} />
              {project.external_url && (
                <motion.a
                  href={project.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[0.85rem] font-medium hover:bg-accent/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Visiter le site
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Featured image */}
        {project.image_url && (
          <section className="bg-dark text-white pb-20">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden aspect-video relative">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Challenge & Solution */}
        {(project.challenge || project.solution) && (
          <section className="bg-white text-text-dark">
            <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {project.challenge && (
                  <ScrollReveal>
                    <div>
                      <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                        Le Défi
                      </span>
                      <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.15] tracking-[-0.02em] mt-4">
                        <span className="font-light">Comprendre le </span>
                        <span className="font-serif italic">problème.</span>
                      </h2>
                      <p className="text-[0.95rem] text-text-dark/70 mt-5 leading-[1.8] whitespace-pre-line" dangerouslySetInnerHTML={{ __html: renderRichText(project.challenge || "") }} />
                    </div>
                  </ScrollReveal>
                )}

                {project.solution && (
                  <ScrollReveal delay={150}>
                    <div>
                      <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                        La Solution
                      </span>
                      <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.15] tracking-[-0.02em] mt-4">
                        <span className="font-light">Notre </span>
                        <span className="font-serif italic">réponse.</span>
                      </h2>
                      <p className="text-[0.95rem] text-text-dark/70 mt-5 leading-[1.8] whitespace-pre-line" dangerouslySetInnerHTML={{ __html: renderRichText(project.solution || "") }} />
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section className="bg-accent text-white">
            <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-white/70 font-semibold">
                    Performances
                  </span>
                  <h2 className="text-[1.6rem] lg:text-[2rem] leading-[1.08] tracking-[-0.02em] mt-4 text-white">
                    <span className="font-light">Les </span>
                    <span className="font-serif italic">résultats.</span>
                  </h2>
                </div>
                <div className={`grid grid-cols-2 gap-4 lg:gap-6 ${
                  project.results.length <= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}>
                  {project.results.map((r, i) => (
                    <motion.div
                      key={i}
                      className="text-center p-6 lg:p-8 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-[2.5rem] lg:text-[3rem] font-serif text-white leading-none block">
                        {r.value}
                      </span>
                      <span className="text-[0.8rem] text-white/70 mt-2 block">
                        {r.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="bg-white text-text-dark">
            <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
              <ScrollReveal>
                <div className="text-center mb-10">
                  <h3 className="text-[1.3rem] lg:text-[1.6rem] leading-[1.1] tracking-[-0.02em]">
                    <span className="font-light">Galerie </span>
                    <span className="font-serif italic">du projet.</span>
                  </h3>
                </div>
                <div className={`grid gap-4 ${
                  project.gallery.length === 1
                    ? "grid-cols-1"
                    : project.gallery.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {project.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl overflow-hidden cursor-pointer group aspect-[3/2] relative"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setGalleryIndex(i)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} - Image ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Lightbox */}
        {galleryIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setGalleryIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              onClick={() => setGalleryIndex(null)}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none stroke-2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {galleryIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex(galleryIndex - 1); }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {galleryIndex < allImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setGalleryIndex(galleryIndex + 1); }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
            <img
              src={allImages[galleryIndex]}
              alt={`${project.title} - Image ${galleryIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-muted text-sm">
              {galleryIndex + 1} / {allImages.length}
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.tags && project.tags.length > 0 && (
          <section className="bg-light text-text-dark">
            <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
              <ScrollReveal>
                <div className="text-center mb-10">
                  <h3 className="text-[1.3rem] lg:text-[1.6rem] leading-[1.1] tracking-[-0.02em]">
                    <span className="font-light">Stack </span>
                    <span className="font-serif italic">technique.</span>
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[0.82rem] font-medium text-text-dark"
                      whileHover={{ scale: 1.05, borderColor: "rgb(var(--accent))" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Autres projets */}
        {relatedProjects.length > 0 && (
          <section className="bg-white text-text-dark">
            <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-[1.6rem] lg:text-[2rem] leading-[1.08] tracking-[-0.02em]">
                    <span className="font-light">Découvrez d&apos;autres </span>
                    <span className="font-serif italic">projets.</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProjects.map((p) => (
                    <motion.a
                      key={p.id}
                      href={`/projets/${p.slug}`}
                      className="group rounded-2xl overflow-hidden bg-light border border-gray-100 hover:shadow-lg transition-shadow"
                      whileHover={{ y: -4 }}
                    >
                      {p.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={p.image_url}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        {p.category && (
                          <span className="text-[0.7rem] uppercase tracking-[2px] text-accent font-semibold">
                            {p.category}
                          </span>
                        )}
                        <h3 className="text-[1.05rem] font-semibold mt-1 leading-tight">
                          {p.title}
                        </h3>
                        <p className="text-[0.82rem] text-text-dark/50 mt-2 line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <a
                    href="/projets"
                    className="inline-flex items-center gap-2 text-accent text-[0.85rem] font-medium hover:underline"
                  >
                    Voir tous nos projets
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Un projet </span>
                  <span className="font-serif italic text-accent">similaire ?</span>
                </h2>
                <p className="text-[0.9rem] text-text-muted mt-4 leading-[1.7]">
                  Discutons de la meilleure approche pour votre projet.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Parlons de votre projet
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-text-secondary font-medium text-[0.9rem] cursor-pointer hover:border-white/40 hover:text-white transition-colors"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Découvrir nos services
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
