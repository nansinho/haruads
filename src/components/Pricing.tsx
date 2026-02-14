"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const Check = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2 shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const plans = [
  {
    name: "Essentiel",
    price: "80",
    desc: "Presence web professionnelle pour demarrer.",
    featured: false,
    features: [
      "Site vitrine responsive",
      "Jusqu'a 5 pages",
      "Formulaire de contact",
      "SEO de base",
      "Hebergement inclus",
    ],
  },
  {
    name: "Avance",
    price: "299",
    desc: "Application web complete et performante.",
    featured: true,
    features: [
      "Application web sur mesure",
      "Dashboard admin",
      "Base de donnees Supabase",
      "Authentification",
      "Support 6 mois",
    ],
  },
  {
    name: "Premium",
    price: "349",
    desc: "Projets ambitieux, fonctionnalites avancees.",
    featured: false,
    features: [
      "E-commerce complet",
      "Paiement en ligne",
      "Multi-langue",
      "API personnalisees",
      "Maintenance 12 mois",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="bg-dark text-white relative overflow-hidden" id="pricing">
      {/* Glow orb */}
      <motion.div
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              Tarifs
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Des formules{" "}
              <span className="text-gradient">adaptees.</span>
            </h2>
            <p className="text-[0.88rem] text-white/30 mt-4 leading-[1.7]">
              Chaque projet est unique. Nos tarifs s&apos;adaptent a vos besoins et a votre budget.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <GlowCard className={`h-full ${plan.featured ? "ring-1 ring-accent/40" : ""}`}>
                <div className="p-7 lg:p-8 flex flex-col h-full relative">
                  {plan.featured && (
                    <>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[0.65rem] font-bold uppercase tracking-wider">
                        Populaire
                      </div>
                    </>
                  )}

                  <div className="text-[0.85rem] font-semibold mb-4 text-white/50">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-[2.8rem] font-extrabold leading-none ${plan.featured ? "text-gradient" : "text-white"}`}>
                      {plan.price}&#8364;
                    </span>
                    <span className="text-[0.8rem] text-white/30">/mois</span>
                  </div>
                  <p className="text-[0.8rem] leading-[1.6] mb-6 text-white/30">
                    {plan.desc}
                  </p>

                  <ul className="list-none flex-1 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 py-2 text-[0.82rem] text-white/50">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-3.5 rounded-full font-semibold text-[0.85rem] cursor-pointer transition-all duration-300 border ${
                      plan.featured
                        ? "bg-accent border-accent text-dark hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                        : "bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-accent/30 hover:text-accent"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choisir ce plan
                  </motion.button>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-12">
            <p className="text-[0.85rem] text-white/25">
              Besoin d&apos;un devis personnalise ?{" "}
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
