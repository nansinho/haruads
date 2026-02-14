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
    <section className="relative overflow-hidden bg-dark-2">
      <div className="absolute inset-0 bg-mesh-2" />

      <div className="max-w-[900px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-accent rounded-full" />
              <span className="text-[0.7rem] uppercase tracking-[4px] text-accent font-display font-semibold">
                FAQ
              </span>
            </div>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
              Questions{" "}
              <span className="text-gradient-warm">frequentes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-white/[0.06] last:border-b-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-6 flex items-center justify-between bg-transparent border-none text-cream text-[1rem] font-display font-bold text-left hover:text-accent transition-colors duration-300 cursor-pointer group"
              >
                {faq.q}
                <motion.div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-all duration-400 ${
                    openIndex === i
                      ? "bg-accent border-accent shadow-[0_0_20px_rgba(255,85,0,0.25)]"
                      : "border-white/10 group-hover:border-accent/30"
                  }`}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={`text-[1.1rem] font-light leading-none ${
                    openIndex === i ? "text-dark" : "text-white/30 group-hover:text-accent"
                  }`}>
                    +
                  </span>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[0.88rem] text-white/35 leading-[1.8] pb-6 pl-0 lg:pl-0 max-w-[600px]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-14">
            <p className="text-[0.88rem] text-white/25">
              Vous avez d&apos;autres questions ?{" "}
              <a href="#contact" className="text-accent hover:underline font-display font-semibold transition-colors">
                Contactez-nous
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-line" />
    </section>
  );
}
