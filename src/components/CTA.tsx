"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section className="bg-accent text-white relative overflow-hidden" id="contact">
      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[700px] mx-auto">
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
              <span className="font-light">Pr&ecirc;t &agrave; cr&eacute;er quelque chose d&apos;</span>
              <span className="font-serif italic">exceptionnel ?</span>
            </h2>
            <p className="text-[0.9rem] text-white/70 mt-5 leading-[1.7]">
              Discutons de votre projet. Premier rendez-vous gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Parlons de votre projet
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:contact@agencehds.fr"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-medium text-[0.9rem] border border-white/40 cursor-pointer hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                contact@agencehds.fr
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
