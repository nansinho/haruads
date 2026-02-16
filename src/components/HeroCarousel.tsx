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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "8%" : "-8%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-8%" : "8%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <div className="relative w-full">
      {/* Main carousel area */}
      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/[0.06]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* Image with Ken Burns zoom */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08] }}
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

            {/* Gradient bandeau overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Project info overlay — bandeau style */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              {/* Slide counter */}
              <motion.div
                custom={0}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-[0.65rem] font-mono text-white/40 tracking-widest">
                  {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Tags */}
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2 mb-3"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md text-[0.68rem] font-medium text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h2
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-[1.3rem] lg:text-[1.7rem] font-semibold text-white tracking-[-0.01em]"
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-[0.8rem] text-white/50 mt-2 max-w-[420px] leading-[1.6]"
              >
                {project.description}
              </motion.p>

              {/* CTA Button */}
              <motion.a
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                href={`/projets/${project.slug}`}
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-accent text-dark text-[0.78rem] font-medium hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-shadow duration-300"
              >
                En savoir plus
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - glassmorphism style */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer z-10"
              aria-label="Projet précédent"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/15 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer z-10"
              aria-label="Projet suivant"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Progress bar at bottom */}
        {projects.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-20">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.03, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {projects.length > 1 && (
        <div className="flex gap-3 mt-5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                setProgress(0);
              }}
              className={`group flex-1 rounded-xl overflow-hidden transition-all duration-400 border cursor-pointer ${
                i === current
                  ? "border-accent/50 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                  : "border-white/[0.06] opacity-40 hover:opacity-70"
              }`}
              aria-label={`Projet ${i + 1}: ${p.title}`}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="text-[0.6rem] text-white/70 font-medium truncate block">
                    {p.title}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
