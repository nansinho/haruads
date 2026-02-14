"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "What is Agence HDS ?",
    a: "Agence web specialisee en creation de sites, applications et e-commerce sur mesure.",
  },
  {
    q: "What benefits can be provided by Agence HDS ?",
    a: "Developpement web, design UI/UX, branding, SEO et maintenance personnalises.",
  },
  {
    q: "How long does it take to complete a project ?",
    a: "Site vitrine 2-4 semaines, application 6-12 semaines, e-commerce 8-16 semaines.",
  },
  {
    q: "What to do if you are not satisfied with the work ?",
    a: "Revisions incluses. Validations a chaque etape pour garantir votre satisfaction.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white border-t border-border-light relative">
      <div className="max-w-[780px] mx-auto px-5 py-[88px] lg:px-12">
        <ScrollReveal className="text-center" animation="blur">
          <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
            Frequently Asked{" "}
            <span className="text-gradient-animated font-mono font-normal">
              Questions
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-11">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-border-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-5 flex items-center justify-between bg-transparent border-none text-text-primary text-[0.95rem] font-semibold text-left font-sans hover:text-accent transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[0.7rem] text-text-muted font-mono opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                    0{i + 1}
                  </span>
                  {faq.q}
                </span>
                <motion.span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-[1.1rem] font-light shrink-0 transition-colors duration-300 ${
                    openIndex === i
                      ? "bg-accent border-accent text-white"
                      : "border-border-light text-text-muted"
                  }`}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="text-[0.82rem] text-text-muted leading-[1.7] pb-5 pl-8"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
