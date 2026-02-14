"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <div className="bg-light text-text-primary relative overflow-hidden" id="about">
      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[3px] text-text-muted font-semibold mb-4 flex items-center gap-2.5">
                <span className="w-8 h-px bg-accent" />
                A Propos
              </div>
              <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Une agence a taille humaine,{" "}
                <span className="text-gradient">des ambitions digitales.</span>
              </h2>
            </div>
            <div className="lg:pt-4">
              <p className="text-[0.9rem] text-text-secondary leading-[1.8]">
                Basee a Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises dans leur transformation digitale. De la conception au deploiement, nous creons des experiences web qui convertissent et qui durent.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <ScrollReveal className="col-span-2 row-span-2">
            <motion.div className="rounded-2xl overflow-hidden h-full min-h-[300px] lg:min-h-[400px] relative group" whileHover={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/why-choose.jpg" alt="Equipe Agence HDS" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[0.72rem] text-white/60 uppercase tracking-wider">Notre equipe</div>
                <div className="text-white font-bold text-[1.1rem] mt-1">Creativite & Expertise</div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <motion.div className="rounded-2xl bg-dark text-white p-6 flex flex-col justify-between h-full min-h-[180px]" whileHover={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none">50<span className="text-accent">+</span></div>
              <div className="text-[0.75rem] text-white/40 mt-2">Projets realises avec succes</div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <motion.div className="rounded-2xl bg-accent text-dark p-6 flex flex-col justify-between h-full min-h-[180px]" whileHover={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none">100%</div>
              <div className="text-[0.75rem] text-dark/60 mt-2">Taux de satisfaction client</div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <motion.div className="rounded-2xl overflow-hidden h-full min-h-[180px] relative" whileHover={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/founder-with-mother.jpg" alt="Fondateur" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <motion.div className="rounded-2xl bg-dark-2 text-white p-6 flex flex-col justify-between h-full min-h-[180px] border border-border-dark" whileHover={{ scale: 0.97 }} transition={{ duration: 0.3 }}>
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none">3<span className="text-accent">+</span></div>
              <div className="text-[0.75rem] text-white/40 mt-2">Annees d&apos;expertise digitale</div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
