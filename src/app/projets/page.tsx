"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/database";

export default function ProjetsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
                Portfolio
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Nos </span>
                <span className="font-serif italic text-accent">réalisations.</span>
              </h1>
              <p className="text-[0.95rem] text-text-muted mt-5 max-w-[500px] leading-[1.8] font-light">
                Chaque projet est une histoire unique. Découvrez comment nous avons
                aidé nos clients à atteindre leurs objectifs.
              </p>
            </motion.div>

            {/* Category filter */}
            {categories.length > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-10"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as string)}
                    className={`px-4 py-2 rounded-full text-[0.78rem] font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-accent text-dark"
                        : "bg-white/[0.06] text-text-muted hover:bg-white/[0.10] hover:text-white/80 border border-white/[0.06]"
                    }`}
                  >
                    {cat === "all" ? "Tous les projets" : cat}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Projects grid */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-body text-lg">Aucun projet pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 80} className="h-full">
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Votre projet </span>
                  <span className="font-serif italic">est le prochain ?</span>
                </h2>
                <p className="text-[0.9rem] text-text-secondary mt-4 leading-[1.7]">
                  Rejoignez nos clients satisfaits et donnons vie à votre vision.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Démarrer un projet
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
