"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const services = [
  {
    num: "01",
    title: "Developpement Web",
    desc: "Sites vitrines, applications web et plateformes SaaS avec les technologies les plus performantes. React, Next.js, Supabase.",
    color: "accent",
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
    color: "violet",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-violet fill-none stroke-[1.5]">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "E-Commerce",
    desc: "Boutiques en ligne sur mesure avec WooCommerce, Stripe et des solutions de paiement securisees et performantes.",
    color: "accent",
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
    color: "violet",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-violet fill-none stroke-[1.5]">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-dark" id="services">
      <div className="absolute inset-0 bg-mesh-1" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet rounded-full" />
              <span className="text-[0.7rem] uppercase tracking-[4px] text-violet font-display font-semibold">
                Services
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
              Ce que nous{" "}
              <span className="text-gradient-violet">faisons le mieux.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col justify-end">
              <p className="text-[1rem] text-white/30 leading-[1.8] max-w-[450px] lg:ml-auto">
                Des solutions digitales completes pour transformer votre presence en ligne
                et generer des resultats concrets.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 100}>
              <GlowCard glowColor={service.color === "accent" ? "rgba(255,85,0,0.06)" : "rgba(139,92,246,0.06)"}>
                <div className="p-8 lg:p-10 relative min-h-[280px] flex flex-col group">
                  {/* Background number */}
                  <div className="absolute top-6 right-8 text-[4rem] font-display font-extrabold text-white/[0.02] leading-none select-none">
                    {service.num}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${
                    service.color === "accent"
                      ? "bg-accent-soft border-accent/10"
                      : "bg-violet-soft border-violet/10"
                  }`}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-[1.25rem] lg:text-[1.4rem] text-cream mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[0.85rem] text-white/30 leading-[1.8] flex-1">
                    {service.desc}
                  </p>

                  {/* Link */}
                  <div className="mt-6">
                    <span className={`text-[0.8rem] font-display font-semibold inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-3 ${
                      service.color === "accent" ? "text-accent" : "text-violet"
                    }`}>
                      En savoir plus
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div className="text-center mt-16">
            <motion.a
              href="#contact"
              className="btn-outline inline-flex items-center gap-2.5 px-8 py-4 text-[0.85rem] font-display cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-line" />
    </section>
  );
}
