"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              Notre Processus
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Du brief a la <span className="text-gradient">mise en ligne.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <motion.div
                className="relative group"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="glass-card p-6 lg:p-7 rounded-2xl h-full relative overflow-hidden">
                  {/* Glow corner on hover */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-500">
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <div className="text-[2.5rem] font-extrabold text-white/[0.04] font-mono leading-none mb-4 group-hover:text-accent/10 transition-colors duration-500 absolute top-5 right-5">
                    {step.num}
                  </div>

                  <h4 className="text-[1rem] font-bold mb-2 group-hover:text-accent transition-colors duration-300 relative z-2">
                    {step.title}
                  </h4>
                  <p className="text-[0.78rem] text-white/30 leading-[1.7] relative z-2">
                    {step.desc}
                  </p>
                </div>

                {/* Connector line between cards */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
