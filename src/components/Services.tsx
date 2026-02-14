"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const services = [
  {
    num: "01",
    title: "Developpement Web",
    desc: "Sites vitrines, applications web et plateformes SaaS avec les technologies les plus performantes. React, Next.js, Supabase.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-[1.5]">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Design UI/UX",
    desc: "Interfaces intuitives et experiences utilisateur memorables. Maquettes Figma, prototypes interactifs, design systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-cyan fill-none stroke-[1.5]">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "E-Commerce",
    desc: "Boutiques en ligne sur mesure avec WooCommerce, Stripe et des solutions de paiement securisees et performantes.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-[1.5]">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Branding & SEO",
    desc: "Identite visuelle forte et referencement naturel pour une visibilite maximale sur Google et les reseaux sociaux.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-cyan fill-none stroke-[1.5]">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <div className="bg-dark text-white relative overflow-hidden" id="services">
      {/* Glow orb */}
      <motion.div
        className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
              Services
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Ce que nous{" "}
              <span className="text-gradient">faisons le mieux.</span>
            </h2>
            <p className="text-[0.88rem] text-white/30 mt-4 leading-[1.7]">
              Des solutions digitales completes pour transformer votre presence en ligne.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 100}>
              <GlowCard>
                <div className="p-7 lg:p-8 relative min-h-[240px] flex flex-col">
                  <div className="absolute top-6 right-6 text-[3rem] font-extrabold text-white/[0.03] font-mono leading-none">
                    {service.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-[1.15rem] lg:text-[1.25rem] font-bold mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-[0.82rem] text-white/30 leading-[1.7] flex-1">
                    {service.desc}
                  </p>
                  <div className="mt-5">
                    <span className="text-[0.78rem] text-accent font-semibold inline-flex items-center gap-1.5">
                      En savoir plus
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-14">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white font-semibold text-[0.85rem] hover:border-accent/40 hover:text-accent transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
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
