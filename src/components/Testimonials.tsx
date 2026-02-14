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
      {/* Glow orbs */}
      <motion.div
        className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[-8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 0.9, 1], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="max-w-[900px] mx-auto">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-8 flex items-center gap-2.5">
              <span className="w-8 h-px bg-accent" />
              Temoignages
            </div>

            {/* Large quote icon */}
            <div className="mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-accent/15">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Large quote carousel */}
            <div className="min-h-[200px] relative">
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
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-dark font-bold text-[0.9rem]">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[0.9rem] font-semibold">
                        {testimonials[current].name}
                      </div>
                      <div className="text-[0.78rem] text-white/35">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav dots */}
            <div className="flex gap-2 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    i === current
                      ? "w-8 bg-accent shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                      : "w-4 bg-white/10 hover:bg-white/20"
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
