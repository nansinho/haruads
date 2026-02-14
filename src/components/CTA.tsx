"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <div className="bg-dark-2 relative overflow-hidden noise-overlay" id="contact">
      {/* Large central glow orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[140px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[700px] mx-auto">
            <div className="w-12 h-px bg-gradient-to-r from-accent to-cyan mx-auto mb-8" />
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              Pret a creer quelque chose d&apos;
              <span className="text-gradient">exceptionnel</span> ?
            </h2>
            <p className="text-[0.9rem] text-white/30 mt-5 leading-[1.7]">
              Discutons de votre projet. Premier rendez-vous gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-bold text-[0.9rem] cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 50px rgba(249,115,22,0.3), 0 0 100px rgba(249,115,22,0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Parlons de votre projet
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:contact@agencehds.fr"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-semibold text-[0.9rem] border border-white/10 cursor-pointer hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                contact@agencehds.fr
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
