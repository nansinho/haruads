"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { num: "01", title: "Brief & Strategie", desc: "Analyse de vos besoins, objectifs et cibles pour definir une strategie sur mesure." },
  { num: "02", title: "Conception", desc: "Maquettes, prototypes interactifs et validation du design avant developpement." },
  { num: "03", title: "Developpement", desc: "Code propre avec les meilleures technologies pour performance et scalabilite." },
  { num: "04", title: "Livraison & Suivi", desc: "Deploiement, formation et suivi pour une mise en production sans accroc." },
];

export default function HowWeWork() {
  return (
    <div className="bg-light relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-text-muted font-semibold mb-4">
              Notre Processus
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-text-primary">
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
                <div className="p-6 lg:p-7 rounded-2xl border border-border-light bg-white hover:border-accent/30 transition-colors duration-500">
                  <div className="text-[2.5rem] font-extrabold text-accent/15 font-mono leading-none mb-4 group-hover:text-accent/30 transition-colors duration-500">
                    {step.num}
                  </div>
                  <h4 className="text-[1rem] font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-[0.78rem] text-text-muted leading-[1.7]">
                    {step.desc}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-border-light" />
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
