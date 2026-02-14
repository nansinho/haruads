"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Check = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
);

const plans = [
  {
    name: "Essentiel",
    price: "80",
    desc: "Presence web professionnelle pour demarrer.",
    featured: false,
    features: ["Site vitrine responsive", "Jusqu'a 5 pages", "Formulaire de contact", "SEO de base", "Hebergement inclus"],
  },
  {
    name: "Avance",
    price: "299",
    desc: "Application web complete et performante.",
    featured: true,
    features: ["Application web sur mesure", "Dashboard admin", "Base de donnees Supabase", "Authentification", "Support 6 mois"],
  },
  {
    name: "Premium",
    price: "349",
    desc: "Projets ambitieux, fonctionnalites avancees.",
    featured: false,
    features: ["E-commerce complet", "Paiement en ligne", "Multi-langue", "API personnalisees", "Maintenance 12 mois"],
  },
];

export default function Pricing() {
  return (
    <div className="bg-light relative overflow-hidden" id="pricing">
      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-text-muted font-semibold mb-4">
              Tarifs
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-text-primary">
              Des formules <span className="text-gradient">adaptees.</span>
            </h2>
            <p className="text-[0.88rem] text-text-secondary mt-4 leading-[1.7]">
              Chaque projet est unique. Nos tarifs s&apos;adaptent a vos besoins et a votre budget.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <motion.div
                className={`rounded-2xl p-7 lg:p-8 flex flex-col h-full relative overflow-hidden ${
                  plan.featured
                    ? "bg-dark text-white border-2 border-accent"
                    : "bg-white text-text-primary border border-border-light"
                }`}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {plan.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accent text-dark text-[0.65rem] font-bold uppercase tracking-wider">
                    Populaire
                  </div>
                )}

                <div className={`text-[0.85rem] font-semibold mb-4 ${plan.featured ? "text-white/60" : "text-text-muted"}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-[2.8rem] font-extrabold leading-none ${plan.featured ? "text-accent" : ""}`}>
                    {plan.price}&#8364;
                  </span>
                  <span className={`text-[0.8rem] ${plan.featured ? "text-white/40" : "text-text-muted"}`}>/mois</span>
                </div>
                <p className={`text-[0.8rem] leading-[1.6] mb-6 ${plan.featured ? "text-white/45" : "text-text-muted"}`}>
                  {plan.desc}
                </p>

                <ul className="list-none flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 py-2 text-[0.82rem] ${plan.featured ? "text-white/70" : "text-text-secondary"}`}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3.5 rounded-full font-semibold text-[0.85rem] cursor-pointer transition-all duration-300 border ${
                    plan.featured
                      ? "bg-accent border-accent text-dark hover:shadow-[0_0_30px_rgba(200,255,0,0.2)]"
                      : "bg-transparent border-border-light text-text-primary hover:bg-dark hover:text-white hover:border-dark"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choisir ce plan
                </motion.button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
