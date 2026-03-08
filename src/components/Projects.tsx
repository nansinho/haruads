"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { formatCompletedAt } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tags: string[];
  client: string;
  category: string;
  completed_at: string | null;
  featured: boolean;
  sort_order: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const featured = projects[0];
  const others = projects.slice(1, 4);

  return (
    <section className="bg-dark text-white relative overflow-hidden" id="projects">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Projets
            </span>
            <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Nos derni&egrave;res </span>
              <span className="font-serif italic">r&eacute;alisations.</span>
            </h2>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-[0.95rem]">Aucun projet pour le moment.</p>
          </div>
        ) : (
          <>
            {/* Featured project */}
            <ScrollReveal animation="scaleUp">
              <Link href={`/projets/${featured.slug}`} title={`Voir notre réalisation ${featured.title}`} className="flex flex-col mb-5 group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                <div className="aspect-[1884/1148] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {featured.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[0.7rem] font-medium text-text-dark">
                        {featured.category}
                      </span>
                    </div>
                  )}
                  {featured.completed_at && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-dark/70 backdrop-blur-sm text-[0.7rem] font-medium text-white">
                        {formatCompletedAt(featured.completed_at)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[1.3rem] lg:text-[1.8rem] font-semibold text-text-dark">
                        {featured.title}
                      </h3>
                      {featured.client && (
                        <p className="text-[0.75rem] text-text-body/60 mt-1">
                          Client : {featured.client}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[0.85rem] text-text-body leading-[1.7] mt-2 max-w-[500px] line-clamp-2">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-accent/10 text-[0.7rem] font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-accent text-dark text-[0.78rem] font-medium"
                    whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                  >
                    En savoir plus
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-dark fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Other projects */}
            {others.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {others.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 80} className="h-full">
                    <Link href={`/projets/${project.slug}`} title={`Voir le projet ${project.title}`} className="flex flex-col h-full group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                      <div className="aspect-[1884/1148] relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[0.7rem] font-medium text-text-dark">
                              {project.category}
                            </span>
                          </div>
                        )}
                        {project.completed_at && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full bg-dark/70 backdrop-blur-sm text-[0.7rem] font-medium text-white">
                              {formatCompletedAt(project.completed_at)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-[0.95rem] font-semibold text-text-dark">
                              {project.title}
                            </h3>
                            {project.client && (
                              <p className="text-[0.7rem] text-text-body/60 mt-0.5">
                                Client : {project.client}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-2">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-[0.8rem] text-text-body leading-[1.7] mt-1.5 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-accent/10 text-[0.65rem] font-medium text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}

        <ScrollReveal delay={300}>
          <div className="text-center mt-14">
            <motion.a
              href="/projets"
              title="Découvrez tous nos projets et réalisations web"
              className="inline-flex items-center gap-2 text-[0.85rem] text-accent font-medium hover:gap-3 transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              Voir tous nos projets
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
