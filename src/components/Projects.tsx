"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const projects = [
  {
    title: "AIAKO E-Commerce",
    desc: "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.",
    tags: ["Next.js", "Supabase", "E-Commerce"],
    image: "/images/projects/project-dashboard.jpg",
    featured: true,
  },
  {
    title: "Dashboard C&CO",
    desc: "Plateforme SaaS de formation multi-tenant.",
    tags: ["React", "Node.js"],
    image: "/images/projects/neuralia-project.webp",
  },
  {
    title: "Landing Fintech",
    desc: "Refonte UI/UX et design system complet.",
    tags: ["Figma", "GSAP"],
    image: "/images/projects/project-landing.jpg",
  },
  {
    title: "Systeme de Reservation",
    desc: "Calendrier de booking avec paiement integre.",
    tags: ["Next.js", "Stripe"],
    image: "/images/projects/reservation-system.webp",
  },
];

export default function Projects() {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <section className="relative overflow-hidden bg-dark" id="projects">
      <div className="absolute inset-0 bg-mesh-2" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-accent rounded-full" />
                <span className="text-[0.7rem] uppercase tracking-[4px] text-accent font-display font-semibold">
                  Projets
                </span>
              </div>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
                Nos dernieres{" "}
                <span className="text-gradient-warm">realisations.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <motion.a
              href="#contact"
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-[0.82rem] font-display cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Voir tous nos projets
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </ScrollReveal>
        </div>

        {/* Featured project */}
        <ScrollReveal>
          <GlowCard className="mb-5">
            <div className="relative overflow-hidden rounded-2xl cursor-pointer group">
              <div className="aspect-[16/7] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md text-[0.7rem] font-medium text-white/60 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-[1.5rem] lg:text-[2rem] text-cream tracking-[-0.02em]">
                  {featured.title}
                </h3>
                <p className="text-[0.9rem] text-white/35 mt-2 max-w-[500px]">
                  {featured.desc}
                </p>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>

        {/* Other projects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          {others.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 100}>
              <GlowCard>
                <div className="relative overflow-hidden rounded-2xl cursor-pointer group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <div className="flex gap-1.5 mb-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-sm text-[0.65rem] text-white/50 border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-display font-bold text-[1rem] text-cream">
                      {project.title}
                    </h4>
                    <p className="text-[0.75rem] text-white/30 mt-1">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="section-line" />
    </section>
  );
}
