"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const steps = [
  {
    num: "01",
    title: "Brief & Strategie",
    desc: "Analyse de vos besoins, objectifs et cibles pour definir une strategie sur mesure.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Conception",
    desc: "Maquettes, prototypes interactifs et validation du design avant developpement.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-cyan fill-none stroke-[1.5]">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Developpement",
    desc: "Code propre avec les meilleures technologies pour performance et scalabilite.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Livraison & Suivi",
    desc: "Deploiement, formation et suivi pour une mise en production sans accroc.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-cyan fill-none stroke-[1.5]">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowWeWork() {
  return (
    <div className="bg-dark-2 text-white relative overflow-hidden">
      {/* Glow orb */}
      <motion.div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              Notre Processus
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Du brief a la{" "}
              <span className="text-gradient">mise en ligne.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <GlowCard className="h-full">
                <div className="p-6 lg:p-7 h-full relative">
                  <div className="absolute top-5 right-5 text-[2.5rem] font-extrabold text-white/[0.03] font-mono leading-none">
                    {step.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                    {step.icon}
                  </div>
                  <h4 className="text-[1rem] font-bold mb-2 relative z-2">
                    {step.title}
                  </h4>
                  <p className="text-[0.78rem] text-white/30 leading-[1.7] relative z-2">
                    {step.desc}
                  </p>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-14">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-dark font-bold text-[0.85rem] cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              Commencer votre projet
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
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
