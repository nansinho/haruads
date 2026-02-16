"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "AIAKO E-Commerce",
    desc: "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.",
    tags: ["Next.js", "Supabase", "E-Commerce"],
    image: "/images/projects/project-dashboard.jpg",
    alt: "Dashboard e-commerce AIAKO - Migration WooCommerce vers Next.js",
    featured: true,
  },
  {
    title: "Dashboard C&CO",
    desc: "Plateforme SaaS de formation multi-tenant.",
    tags: ["React", "Node.js"],
    image: "/images/projects/neuralia-project.webp",
    alt: "Dashboard SaaS C&CO Formation - Plateforme multi-tenant",
  },
  {
    title: "Landing Fintech",
    desc: "Refonte UI/UX et design system complet.",
    tags: ["Figma", "GSAP"],
    image: "/images/projects/project-landing.jpg",
    alt: "Landing page Fintech - Refonte UI/UX par Agence HDS",
  },
  {
    title: "Système de Réservation",
    desc: "Calendrier de booking avec paiement intégré.",
    tags: ["Next.js", "Stripe"],
    image: "/images/projects/reservation-system.webp",
    alt: "Système de réservation en ligne avec calendrier et paiement Stripe",
  },
];

export default function Projects() {
  const featured = projects[0];
  const others = projects.slice(1);

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
              <span className="font-serif italic text-accent">r&eacute;alisations.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Featured project */}
        <ScrollReveal animation="scaleUp">
          <div className="mb-5 relative overflow-hidden rounded-2xl cursor-pointer group border border-white/[0.06]">
            <div className="aspect-[16/7] relative overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.alt || featured.title}
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
              <p className="text-[0.85rem] text-white/40 mt-1.5 max-w-[500px]">
                {featured.desc}
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
          </div>
        </ScrollReveal>

        {/* Other projects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 80}>
              <div className="relative overflow-hidden rounded-2xl cursor-pointer group border border-white/[0.06]">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt || project.title}
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
                        className="px-2 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-sm text-[0.65rem] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[0.95rem] font-serif text-white">
                    {project.title}
                  </h3>
                  <p className="text-[0.75rem] text-white/35 mt-0.5">
                    {project.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-14">
            <motion.a
              href="/projets"
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
