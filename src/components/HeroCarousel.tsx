"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  slug: string;
}

// Static fallback when Supabase isn't connected
const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "AIAKO E-Commerce",
    description:
      "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico. Performance x3 et +45% de conversions.",
    image_url: "/images/projects/project-dashboard.jpg",
    tags: ["Next.js", "Supabase", "E-Commerce"],
    slug: "aiako-ecommerce",
  },
  {
    id: "2",
    title: "Dashboard C&CO",
    description: "Plateforme SaaS de formation multi-tenant avec gestion complète des apprenants et reporting avancé.",
    image_url: "/images/projects/neuralia-project.webp",
    tags: ["React", "Node.js", "SaaS"],
    slug: "dashboard-cco",
  },
  {
    id: "3",
    title: "Landing Fintech",
    description: "Refonte UI/UX complète et design system pour une startup fintech. +60% d'engagement utilisateur.",
    image_url: "/images/projects/project-landing.jpg",
    tags: ["Figma", "GSAP", "UI/UX"],
    slug: "landing-fintech",
  },
];

export default function HeroCarousel() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  // Try to fetch from Supabase
  useEffect(() => {
    async function fetchProjects() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        const { data, error } = await supabase
          .from("projects")
          .select("id, title, description, image_url, tags, slug")
          .eq("hero_visible", true)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setProjects(data);
        }
      } catch {
        // Supabase not configured, use fallback
      }
    }
    fetchProjects();
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
  }, [projects.length]);

  // Auto-advance with progress bar
  useEffect(() => {
    const duration = 6000;
    const interval = 30;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [next]);

  const project = projects[current];
  if (!project) return null;

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "6%" : "-6%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-6%" : "6%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
      {/* Image area — fully visible */}
      <div className="relative aspect-[16/9] overflow-hidden bg-dark-2">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`img-${project.id}`}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* Ken Burns zoom */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.06] }}
              transition={{ duration: 6, ease: "linear" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Light vignette — just enough to see arrows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

        {/* Navigation arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 cursor-pointer z-10"
              aria-label="Projet précédent"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300 cursor-pointer z-10"
              aria-label="Projet suivant"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Slide counter — top right corner */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 z-10">
          <span className="text-[0.65rem] font-mono text-white/70 tracking-wider">
            {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Bandeau info — separated below the image */}
      <div className="bg-dark-2 border-t border-white/[0.06] px-5 lg:px-6 py-4 lg:py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${project.id}`}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: project info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-accent/10 text-[0.65rem] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-[1.05rem] lg:text-[1.2rem] font-semibold text-white truncate">
                  {project.title}
                </h2>
                <p className="text-[0.75rem] text-white/40 mt-1 leading-[1.5] line-clamp-1">
                  {project.description}
                </p>
              </div>

              {/* Right: CTA */}
              <a
                href={`/projets/${project.slug}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-dark text-[0.78rem] font-medium hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-shadow duration-300"
              >
                En savoir plus
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        {projects.length > 1 && (
          <div className="mt-4 flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                  setProgress(0);
                }}
                className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden cursor-pointer border-none"
                aria-label={`Projet ${i + 1}`}
              >
                <div
                  className="h-full rounded-full bg-accent transition-all duration-100 ease-linear"
                  style={{
                    width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
