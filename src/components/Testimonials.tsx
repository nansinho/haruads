"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    text: "L'agence a parfaitement compris nos besoins. Le resultat depasse nos attentes. Un vrai partenaire digital.",
    name: "Laurent A.",
    role: "Directeur, StartupTech",
  },
  {
    text: "Expertise technique remarquable. Nos conversions ont augmente de 40% depuis le lancement du nouveau site.",
    name: "Marie C.",
    role: "Fondatrice, BelleMode",
  },
  {
    text: "Livraison dans les temps, communication excellente et un suivi apres projet impeccable. Je recommande a 100%.",
    name: "Pierre D.",
    role: "CEO, FormaPro",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="max-w-[900px] mx-auto">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-8 flex items-center gap-2.5">
              <span className="w-8 h-px bg-accent" />
              Temoignages
            </div>

            {/* Large quote */}
            <div className="min-h-[180px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[1.3rem] sm:text-[1.6rem] lg:text-[2rem] font-bold leading-[1.35] tracking-[-0.01em]">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark font-bold text-[0.8rem]">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[0.88rem] font-semibold">{testimonials[current].name}</div>
                      <div className="text-[0.75rem] text-white/40">{testimonials[current].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav dots */}
            <div className="flex gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    i === current ? "w-8 bg-accent" : "w-4 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
