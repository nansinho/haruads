"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <div className="bg-dark text-white relative overflow-hidden" id="about">
      {/* Glow orbs */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4 flex items-center gap-2.5">
                <span className="w-8 h-px bg-accent" />
                A Propos
              </div>
              <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Une agence a taille humaine,{" "}
                <span className="text-gradient">des ambitions digitales.</span>
              </h2>
            </div>
            <div className="lg:pt-4">
              <p className="text-[0.9rem] text-white/40 leading-[1.8]">
                Basee a Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises dans leur
                transformation digitale. De la conception au deploiement, nous creons des
                experiences web qui convertissent et qui durent.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Large image card */}
          <ScrollReveal className="col-span-2 row-span-2">
            <motion.div
              className="glass-card rounded-2xl overflow-hidden h-full min-h-[300px] lg:min-h-[400px] relative group"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/why-choose.jpg"
                alt="Equipe Agence HDS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              {/* Blue glow on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[0.72rem] text-white/50 uppercase tracking-wider">
                  Notre equipe
                </div>
                <div className="text-white font-bold text-[1.1rem] mt-1">
                  Creativite & Expertise
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Stat card - Projects */}
          <ScrollReveal delay={100}>
            <motion.div
              className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[180px] relative overflow-hidden group"
              whileHover={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/20 transition-all duration-500" />
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none relative z-2">
                50<span className="text-accent">+</span>
              </div>
              <div className="text-[0.75rem] text-white/30 mt-2 relative z-2">
                Projets realises avec succes
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Accent stat card */}
          <ScrollReveal delay={200}>
            <motion.div
              className="rounded-2xl p-6 flex flex-col justify-between h-full min-h-[180px] relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,211,238,0.1))",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
              whileHover={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none relative z-2">
                100<span className="text-cyan">%</span>
              </div>
              <div className="text-[0.75rem] text-white/40 mt-2 relative z-2">
                Taux de satisfaction client
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Founder image */}
          <ScrollReveal delay={150}>
            <motion.div
              className="glass-card rounded-2xl overflow-hidden h-full min-h-[180px] relative group"
              whileHover={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founder-with-mother.jpg"
                alt="Fondateur"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </ScrollReveal>

          {/* Years stat card */}
          <ScrollReveal delay={250}>
            <motion.div
              className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[180px] relative overflow-hidden group"
              whileHover={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner glow */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan/8 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan/15 transition-all duration-500" />
              <div className="text-[2.5rem] lg:text-[3rem] font-extrabold leading-none relative z-2">
                3<span className="text-accent">+</span>
              </div>
              <div className="text-[0.75rem] text-white/30 mt-2 relative z-2">
                Annees d&apos;expertise digitale
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
