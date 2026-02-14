"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Qu'est-ce que l'Agence HDS ?",
    a: "Agence web basee a Aix-en-Provence, specialisee en creation de sites, applications web et solutions e-commerce sur mesure.",
  },
  {
    q: "Quels services proposez-vous ?",
    a: "Developpement web, design UI/UX, branding, e-commerce, SEO et maintenance. Chaque service est adapte a vos besoins specifiques.",
  },
  {
    q: "Combien de temps pour un projet ?",
    a: "Site vitrine : 2-4 semaines. Application web : 6-12 semaines. E-commerce : 8-16 semaines. Chaque projet est planifie avec un calendrier clair.",
  },
  {
    q: "Que se passe-t-il si le resultat ne convient pas ?",
    a: "Des revisions sont incluses a chaque etape. Nous validons ensemble chaque phase pour garantir votre satisfaction avant de passer a la suivante.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-dark text-white relative overflow-hidden">
      {/* Glow orb */}
      <motion.div
        className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[800px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              FAQ
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Questions{" "}
              <span className="text-gradient">frequentes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-white/[0.06]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-5 flex items-center justify-between bg-transparent border-none text-white text-[0.95rem] font-semibold text-left font-sans hover:text-accent transition-colors cursor-pointer group"
              >
                {faq.q}
                <motion.span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-[0.9rem] font-light shrink-0 ml-4 transition-all duration-300 ${
                    openIndex === i
                      ? "bg-accent border-accent text-dark shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                      : "border-white/10 text-white/30 group-hover:border-accent/30 group-hover:text-accent"
                  }`}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[0.82rem] text-white/35 leading-[1.7] pb-5">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-12">
            <p className="text-[0.85rem] text-white/25">
              Vous avez d&apos;autres questions ?{" "}
              <a href="#contact" className="text-accent hover:underline font-semibold">
                Contactez-nous
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
