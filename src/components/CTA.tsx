"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <div className="bg-dark relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[700px] mx-auto">
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              Pret a creer quelque chose d&apos;<span className="text-gradient">exceptionnel</span> ?
            </h2>
            <p className="text-[0.9rem] text-white/40 mt-5 leading-[1.7]">
              Discutons de votre projet. Premier rendez-vous gratuit et sans engagement.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-accent text-dark font-bold text-[0.9rem] cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(200,255,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
            >
              Parlons de votre projet
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
