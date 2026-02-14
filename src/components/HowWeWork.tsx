"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Brief & Strategie",
    desc: "Analyse de vos besoins, objectifs et cibles pour definir une strategie sur mesure.",
    color: "accent",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Maquettes, prototypes interactifs et validation du design avant developpement.",
    color: "violet",
  },
  {
    num: "03",
    title: "Developpement",
    desc: "Code propre avec les meilleures technologies pour performance et scalabilite.",
    color: "accent",
  },
  {
    num: "04",
    title: "Livraison & Suivi",
    desc: "Deploiement, formation et suivi pour une mise en production sans accroc.",
    color: "violet",
  },
];

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0 bg-mesh-3" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-20">
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-8 h-[2px] bg-accent rounded-full" />
              <span className="text-[0.7rem] uppercase tracking-[4px] text-accent font-display font-semibold">
                Notre Processus
              </span>
              <div className="w-8 h-[2px] bg-accent rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
              Du brief a la{" "}
              <span className="text-gradient-warm">mise en ligne.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps - horizontal timeline on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-0 relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-accent/20 via-violet/20 to-accent/20" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 120}>
              <div className="relative flex flex-col items-center text-center px-4 lg:px-6">
                {/* Step number circle */}
                <motion.div
                  className={`relative w-[64px] h-[64px] rounded-full flex items-center justify-center mb-8 ${
                    step.color === "accent"
                      ? "bg-accent/[0.08] border border-accent/20"
                      : "bg-violet/[0.08] border border-violet/20"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Pulse ring */}
                  <div className={`absolute inset-0 rounded-full animate-[pulse-ring_3s_ease-in-out_infinite] ${
                    step.color === "accent" ? "bg-accent/10" : "bg-violet/10"
                  }`} style={{ animationDelay: `${i * 0.5}s` }} />
                  <span className={`font-mono font-bold text-[0.85rem] relative z-10 ${
                    step.color === "accent" ? "text-accent" : "text-violet"
                  }`}>
                    {step.num}
                  </span>
                </motion.div>

                <h4 className="font-display font-bold text-[1.1rem] text-cream mb-3">
                  {step.title}
                </h4>
                <p className="text-[0.82rem] text-white/30 leading-[1.7] max-w-[250px]">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={500}>
          <div className="text-center mt-20">
            <motion.a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2.5 px-9 py-4 text-[0.9rem] font-display cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Commencer votre projet
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
