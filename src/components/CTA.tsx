"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-dark" id="contact">
      {/* Large gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, rgba(255,85,0,0.02) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[15%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-[160px] lg:px-16 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[750px] mx-auto">
            {/* Decorative line */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-violet mx-auto mb-10 rounded-full" />

            <h2 className="font-display font-extrabold text-[2.2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.03em] text-cream">
              Pret a creer quelque chose d&apos;
              <span className="text-gradient-mixed">exceptionnel</span> ?
            </h2>

            <p className="text-[0.95rem] text-white/30 mt-6 leading-[1.8] max-w-[500px] mx-auto">
              Discutons de votre projet. Premier rendez-vous gratuit et sans engagement.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <motion.a
                href="#"
                className="btn-primary inline-flex items-center gap-2.5 px-10 py-4.5 text-[0.95rem] font-display cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Parlons de votre projet
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:contact@agencehds.fr"
                className="btn-outline inline-flex items-center gap-2.5 px-10 py-4.5 text-[0.95rem] font-display cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                contact@agencehds.fr
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-line" />
    </section>
  );
}
