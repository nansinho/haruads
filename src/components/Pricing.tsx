"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const Check = ({ color = "accent" }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${color === "accent" ? "stroke-accent" : "stroke-violet"}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const plans = [
  {
    name: "Essentiel",
    price: "80",
    desc: "Presence web professionnelle pour demarrer.",
    featured: false,
    color: "violet" as const,
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
    color: "accent" as const,
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
    color: "violet" as const,
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
    <section className="relative overflow-hidden bg-dark-2" id="pricing">
      <div className="absolute inset-0 bg-mesh-1" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-8 h-[2px] bg-violet rounded-full" />
              <span className="text-[0.7rem] uppercase tracking-[4px] text-violet font-display font-semibold">
                Tarifs
              </span>
              <div className="w-8 h-[2px] bg-violet rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
              Des formules{" "}
              <span className="text-gradient-mixed">adaptees.</span>
            </h2>
            <p className="text-[0.95rem] text-white/30 mt-5 leading-[1.8]">
              Chaque projet est unique. Nos tarifs s&apos;adaptent a vos besoins et a votre budget.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 120}>
              <GlowCard
                className={`h-full ${plan.featured ? "ring-1 ring-accent/30 lg:scale-[1.03]" : ""}`}
                glowColor={plan.color === "accent" ? "rgba(255,85,0,0.08)" : "rgba(139,92,246,0.06)"}
              >
                <div className="p-8 lg:p-10 flex flex-col h-full relative">
                  {plan.featured && (
                    <>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute top-4 right-5 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-[0.65rem] font-display font-bold uppercase tracking-wider">
                        Populaire
                      </div>
                    </>
                  )}

                  <div className="text-[0.85rem] font-display font-semibold mb-5 text-white/40">
                    {plan.name}
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className={`font-display font-extrabold text-[3rem] leading-none tracking-[-0.03em] ${
                      plan.featured ? "text-gradient-warm" : "text-cream"
                    }`}>
                      {plan.price}&#8364;
                    </span>
                    <span className="text-[0.8rem] text-white/25">/mois</span>
                  </div>

                  <p className="text-[0.82rem] leading-[1.7] mb-8 text-white/30">
                    {plan.desc}
                  </p>

                  <ul className="list-none flex-1 mb-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[0.82rem] text-white/45">
                        <Check color={plan.color} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-4 rounded-full font-display font-bold text-[0.85rem] cursor-pointer transition-all duration-300 ${
                      plan.featured
                        ? "btn-primary"
                        : "btn-outline"
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
          <div className="text-center mt-14">
            <p className="text-[0.85rem] text-white/25">
              Besoin d&apos;un devis personnalise ?{" "}
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
