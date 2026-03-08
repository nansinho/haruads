"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/database";

const VISIBLE_COUNT = 6;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const all: Project[] = Array.isArray(data) ? data : [];
          setProjects(all.slice(0, VISIBLE_COUNT));
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="bg-dark text-white relative overflow-hidden" id="projects">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${index >= 3 ? "hidden sm:block" : ""} h-full`}
              >
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </div>
            ))}
          </div>
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
