"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/database";

const VISIBLE_COUNT = 6;
const SWAP_INTERVAL = 4000;

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Projects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [visibleSlots, setVisibleSlots] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { amount: 0.2 });
  const isPausedRef = useRef(false);
  const queueRef = useRef<number[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const projects: Project[] = Array.isArray(data) ? data : [];
          setAllProjects(projects);
          // Initialize with first 6 (or fewer) shuffled projects
          const shuffled = shuffle(projects);
          setVisibleSlots(shuffled.slice(0, VISIBLE_COUNT));
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Build the replacement queue when allProjects changes
  const buildQueue = useCallback(
    (currentVisible: Project[]) => {
      const visibleIds = new Set(currentVisible.map((p) => p.id));
      const remaining = allProjects
        .map((_, i) => i)
        .filter((i) => !visibleIds.has(allProjects[i].id));
      queueRef.current = shuffle(remaining);
    },
    [allProjects]
  );

  // Progressive replacement interval
  useEffect(() => {
    if (allProjects.length <= VISIBLE_COUNT) return;

    // Initialize queue
    buildQueue(visibleSlots);

    const interval = setInterval(() => {
      if (!isInView || isPausedRef.current) return;

      setVisibleSlots((prev) => {
        // Refill queue if empty
        if (queueRef.current.length === 0) {
          const visibleIds = new Set(prev.map((p) => p.id));
          const refill = allProjects
            .map((_, i) => i)
            .filter((i) => !visibleIds.has(allProjects[i].id));
          queueRef.current = shuffle(refill);
        }

        if (queueRef.current.length === 0) return prev;

        const slotToReplace = Math.floor(Math.random() * prev.length);
        const nextIndex = queueRef.current.shift()!;

        // Preload next image
        if (queueRef.current.length > 0) {
          const img = new Image();
          img.src = allProjects[queueRef.current[0]].image_url;
        }

        const next = [...prev];
        next[slotToReplace] = allProjects[nextIndex];
        return next;
      });
    }, SWAP_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProjects, isInView, buildQueue]);

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
        ) : allProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-[0.95rem]">Aucun projet pour le moment.</p>
          </div>
        ) : (
          <div
            ref={gridRef}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visibleSlots.map((project, slotIndex) => (
              <div
                key={`slot-${slotIndex}`}
                className={slotIndex >= 3 ? "hidden sm:block" : ""}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </AnimatePresence>
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
