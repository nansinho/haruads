"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tags: string[];
  client: string;
  category: string;
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
              <Link href={`/projets/${featured.slug}`} title={`Voir notre réalisation ${featured.title}`} className="block mb-5 relative overflow-hidden rounded-2xl cursor-pointer group border border-white/[0.06]">
                <div className="aspect-[16/7] relative overflow-hidden">
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md text-[0.7rem] font-medium text-accent border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[1.3rem] lg:text-[1.8rem] font-semibold text-white">
                    {featured.title}
                  </h3>
                  <p className="text-[0.85rem] text-text-muted mt-1.5 max-w-[500px]">
                    {featured.description}
                  </p>
                  <motion.span
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-accent text-dark text-[0.78rem] font-medium"
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
                  <ScrollReveal key={project.id} delay={i * 80}>
                    <Link href={`/projets/${project.slug}`} title={`Voir le projet ${project.title}`} className="block h-full relative overflow-hidden rounded-2xl cursor-pointer group border border-white/[0.06]">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex gap-1.5 mb-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-sm text-[0.65rem] text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-[0.95rem] font-serif text-white">
                          {project.title}
                        </h3>
                        <p className="text-[0.75rem] text-text-muted mt-0.5">
                          {project.description}
                        </p>
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
