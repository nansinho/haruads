"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
    featured: false,
  },
  {
    title: "Landing Fintech",
    desc: "Refonte UI/UX et design system complet.",
    tags: ["Figma", "GSAP"],
    image: "/images/projects/project-landing.jpg",
    featured: false,
  },
  {
    title: "Systeme de Reservation",
    desc: "Calendrier de booking avec paiement integre.",
    tags: ["Next.js", "Stripe"],
    image: "/images/projects/reservation-system.webp",
    featured: false,
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
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4 flex items-center gap-2.5">
                <span className="w-8 h-px bg-accent" />
                Projets
              </div>
              <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Nos dernieres <span className="text-gradient">realisations.</span>
              </h2>
            </div>
            <motion.a
              href="#"
              className="text-[0.82rem] text-accent font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              Voir tous les projets
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>

        {/* Featured project */}
        <ScrollReveal>
          <motion.div
            className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer mb-4"
            whileHover={{ scale: 0.995 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-[16/7] relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              {/* Blue overlay on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          </motion.div>
        </ScrollReveal>

        {/* Other projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 80}>
              <motion.div
                className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  {/* Blue glow overlay */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <h4 className="text-[0.95rem] font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-[0.75rem] text-white/35 mt-0.5">{project.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
