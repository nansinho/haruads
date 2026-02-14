"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Qu\u2019est-ce que l\u2019Agence HDS ?",
    a: "Agence web bas\u00e9e \u00e0 Aix-en-Provence, sp\u00e9cialis\u00e9e en cr\u00e9ation de sites, applications web et solutions e-commerce sur mesure.",
  },
  {
    q: "Quels services proposez-vous ?",
    a: "D\u00e9veloppement web, design UI/UX, branding, e-commerce, SEO et maintenance. Chaque service est adapt\u00e9 \u00e0 vos besoins sp\u00e9cifiques.",
  },
  {
    q: "Combien de temps pour un projet ?",
    a: "Site vitrine : 2-4 semaines. Application web : 6-12 semaines. E-commerce : 8-16 semaines. Chaque projet est planifi\u00e9 avec un calendrier clair.",
  },
  {
    q: "Que se passe-t-il si le r\u00e9sultat ne convient pas ?",
    a: "Des r\u00e9visions sont incluses \u00e0 chaque \u00e9tape. Nous validons ensemble chaque phase pour garantir votre satisfaction avant de passer \u00e0 la suivante.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white text-text-dark relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-5 py-[120px] lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              FAQ
            </span>
            <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Questions </span>
              <span className="font-serif italic">fr&eacute;quentes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-gray-200"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-5 flex items-center justify-between bg-transparent border-none text-text-dark text-[0.95rem] font-medium text-left font-sans hover:text-accent transition-colors cursor-pointer group"
              >
                {faq.q}
                <motion.span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-[0.9rem] font-light shrink-0 ml-4 transition-all duration-300 ${
                    openIndex === i
                      ? "bg-accent border-accent text-white"
                      : "border-gray-300 text-text-body group-hover:border-accent group-hover:text-accent"
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
                    <p className="text-[0.82rem] text-text-body leading-[1.7] pb-5">
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
            <p className="text-[0.85rem] text-text-body">
              Vous avez d&apos;autres questions ?{" "}
              <a href="/contact" className="text-accent hover:underline font-semibold">
                Contactez-nous
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
