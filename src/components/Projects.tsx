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
    <div className="bg-dark text-white relative overflow-hidden" id="projects">
      {/* Glow orbs */}
      <motion.div
        className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot grid */}
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
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              Projets
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Nos dernieres{" "}
              <span className="text-gradient">realisations.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Featured project */}
        <ScrollReveal>
          <GlowCard className="mb-4">
            <div className="relative overflow-hidden rounded-2xl cursor-pointer group">
              <div className="aspect-[16/7] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-sm text-[0.7rem] font-medium text-white/70 border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[1.3rem] lg:text-[1.8rem] font-bold text-white">
                  {featured.title}
                </h3>
                <p className="text-[0.85rem] text-white/40 mt-1.5 max-w-[500px]">
                  {featured.desc}
                </p>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>

        {/* Other projects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 80}>
              <GlowCard>
                <div className="relative overflow-hidden rounded-2xl cursor-pointer group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-2/80 via-dark-2/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex gap-1.5 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-sm text-[0.65rem] text-white/60 border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-[0.95rem] font-bold text-white">
                      {project.title}
                    </h4>
                    <p className="text-[0.75rem] text-white/35 mt-0.5">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="text-center mt-14">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-[0.85rem] text-accent font-semibold hover:gap-3 transition-all duration-300"
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
    </div>
  );
}
