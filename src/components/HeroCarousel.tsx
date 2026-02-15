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
      "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.",
    image_url: "/images/projects/project-dashboard.jpg",
    tags: ["Next.js", "Supabase", "E-Commerce"],
    slug: "aiako-ecommerce",
  },
  {
    id: "2",
    title: "Dashboard C&CO",
    description: "Plateforme SaaS de formation multi-tenant.",
    image_url: "/images/projects/neuralia-project.webp",
    tags: ["React", "Node.js"],
    slug: "dashboard-cco",
  },
  {
    id: "3",
    title: "Landing Fintech",
    description: "Refonte UI/UX et design system complet.",
    image_url: "/images/projects/project-landing.jpg",
    tags: ["Figma", "GSAP"],
    slug: "landing-fintech",
  },
];

export default function HeroCarousel() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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
  }, [projects.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = projects[current];
  if (!project) return null;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full">
      {/* Main carousel area */}
      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

            {/* Project info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm text-[0.7rem] font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-[1.2rem] lg:text-[1.5rem] font-serif text-white">
                {project.title}
              </h2>
              <p className="text-[0.8rem] text-white/40 mt-1 max-w-[400px]">
                {project.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all cursor-pointer z-10"
              aria-label="Projet précédent"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all cursor-pointer z-10"
              aria-label="Projet suivant"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {projects.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                i === current
                  ? "w-8 bg-accent"
                  : "w-4 bg-white/15 hover:bg-white/25"
              }`}
              aria-label={`Projet ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
