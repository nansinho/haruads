"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  return (
    <div className="bg-dark text-white relative overflow-hidden noise-overlay min-h-screen flex flex-col" id="home">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-team.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark" />
      </div>
      <div className="absolute inset-0 grid-bg" />

      {/* Main content */}
      <section className="pt-[140px] pb-8 px-5 lg:pt-[180px] lg:pb-12 lg:px-12 max-w-[1400px] mx-auto relative z-2 flex-1 flex flex-col w-full">
        <div className="flex-1 flex flex-col justify-center">
          {/* Tag */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">Agence Web Creative &mdash; Aix-en-Provence</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[2.8rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[5.8rem] font-extrabold leading-[0.95] tracking-[-0.03em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              Nous creons
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              des experiences
            </motion.span>
            <motion.span
              className="block text-gradient"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              digitales.
            </motion.span>
          </motion.h1>

          {/* Subtext + CTAs */}
          <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end max-w-[900px]">
            <motion.p
              className="text-[0.9rem] lg:text-[1rem] text-white/45 leading-[1.7] max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
            >
              Design UI/UX, developpement web et solutions e-commerce sur mesure pour propulser votre business.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              <motion.a
                href="#projects"
                className="px-7 py-3.5 rounded-full bg-accent text-dark font-bold text-[0.85rem] cursor-pointer inline-flex items-center gap-2"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(200,255,0,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                Voir nos projets
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </motion.a>
              <motion.a
                href="#services"
                className="px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-[0.85rem] border border-white/15 cursor-pointer hover:border-accent hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Nos services
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <ScrollReveal>
          <div className="mt-auto pt-10 lg:pt-16">
            <div className="flex flex-wrap gap-10 lg:gap-16 border-t border-border-dark pt-6">
              {[
                { num: "50+", label: "Projets livres" },
                { num: "30+", label: "Clients actifs" },
                { num: "3+", label: "Ans d'experience" },
                { num: "100%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1, ease }}
                >
                  <div className="text-[1.5rem] lg:text-[2rem] font-extrabold text-white">{stat.num}</div>
                  <div className="text-[0.7rem] text-white/30 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
