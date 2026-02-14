"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-mesh-3" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        <ScrollReveal>
          <div className="max-w-[900px] mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-violet rounded-full" />
              <span className="text-[0.7rem] uppercase tracking-[4px] text-violet font-display font-semibold">
                Temoignages
              </span>
            </div>

            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.05] tracking-[-0.03em] text-cream mb-14">
              Ce que disent{" "}
              <span className="text-gradient-violet">nos clients.</span>
            </h2>

            {/* Quote icon */}
            <div className="mb-8">
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-accent/10">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote carousel */}
            <div className="min-h-[220px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-display font-bold text-[1.4rem] sm:text-[1.8rem] lg:text-[2.2rem] leading-[1.3] tracking-[-0.02em] text-cream/90">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-violet flex items-center justify-center text-dark font-display font-bold text-[0.9rem]">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[0.9rem] font-display font-bold text-cream">
                        {testimonials[current].name}
                      </div>
                      <div className="text-[0.78rem] text-white/30">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav dots */}
            <div className="flex gap-2.5 mt-14">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[3px] rounded-full transition-all duration-500 border-none cursor-pointer ${
                    i === current
                      ? "w-10 bg-gradient-to-r from-accent to-violet shadow-[0_0_12px_rgba(255,85,0,0.3)]"
                      : "w-5 bg-white/10 hover:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section-line" />
    </section>
  );
}
