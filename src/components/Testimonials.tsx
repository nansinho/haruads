"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    text: "L\u2019Agence HDS a parfaitement compris notre besoin de migrer notre boutique WooCommerce vers une solution moderne. Le nouveau site est rapide, fluide et nos ventes en ligne ont augment\u00e9 significativement.",
    name: "Karim B.",
    role: "G\u00e9rant, AIAKO",
  },
  {
    text: "Expertise technique remarquable et vraie \u00e9coute. Le dashboard de formation qu\u2019ils ont d\u00e9velopp\u00e9 nous a permis de g\u00e9rer nos sessions et apprenants bien plus efficacement. Un partenaire de confiance.",
    name: "Caroline M.",
    role: "Directrice, C&CO Formation",
  },
  {
    text: "Du design \u00e0 la mise en production, tout a \u00e9t\u00e9 livr\u00e9 dans les temps avec une qualit\u00e9 irr\u00e9prochable. La communication est transparente \u00e0 chaque \u00e9tape. Je recommande sans h\u00e9siter.",
    name: "Laurent A.",
    role: "Directeur technique, StartupTech",
  },
  {
    text: "Notre syst\u00e8me de r\u00e9servation en ligne fonctionne parfaitement depuis le lancement. L\u2019int\u00e9gration Stripe est fluide et nos clients adorent la simplicit\u00e9 du parcours de booking.",
    name: "Sophie R.",
    role: "Fondatrice, BookEasy",
  },
  {
    text: "L\u2019Agence HDS a su transformer notre vision en un site qui refl\u00e8te vraiment notre identit\u00e9. R\u00e9activit\u00e9, professionnalisme et un suivi apr\u00e8s-projet impeccable.",
    name: "Pierre D.",
    role: "CEO, FormaPro",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-dark text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal animation="blur">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                T&eacute;moignages
              </span>
              <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Ce que disent </span>
                <span className="font-serif italic text-accent">nos clients.</span>
              </h2>
            </div>

            {/* Quote carousel */}
            <div className="min-h-[220px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-fluid-h3 font-serif italic leading-[1.4] text-white/80">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-dark font-semibold text-[0.9rem]">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[0.9rem] font-medium">
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
                      ? "w-8 bg-accent"
                      : "w-4 bg-white/10 hover:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
