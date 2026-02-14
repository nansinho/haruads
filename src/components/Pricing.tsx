"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Essentiel",
    price: "80",
    desc: "Pr\u00e9sence web professionnelle pour d\u00e9marrer.",
    featured: false,
    features: [
      "Site vitrine responsive",
      "Jusqu\u2019\u00e0 5 pages",
      "Formulaire de contact",
      "SEO de base",
      "H\u00e9bergement inclus",
    ],
  },
  {
    name: "Avanc\u00e9",
    price: "299",
    desc: "Application web compl\u00e8te et performante.",
    featured: true,
    features: [
      "Application web sur mesure",
      "Dashboard admin",
      "Base de donn\u00e9es Supabase",
      "Authentification",
      "Support 6 mois",
    ],
  },
  {
    name: "Premium",
    price: "349",
    desc: "Projets ambitieux, fonctionnalit\u00e9s avanc\u00e9es.",
    featured: false,
    features: [
      "E-commerce complet",
      "Paiement en ligne",
      "Multi-langue",
      "API personnalis\u00e9es",
      "Maintenance 12 mois",
    ],
  },
];

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  return (
    <section className="bg-white text-text-dark relative overflow-hidden" id="pricing">
      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Tarifs
            </span>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Des formules </span>
              <span className="font-serif italic">adapt&eacute;es.</span>
            </h2>
            <p className="text-[0.88rem] text-text-body mt-4 leading-[1.7]">
              Chaque projet est unique. Nos tarifs s&apos;adaptent &agrave; vos besoins et &agrave; votre budget.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100} animation="slideRotate">
              <div
                className={`rounded-2xl p-7 lg:p-8 flex flex-col h-full ${
                  plan.featured
                    ? "bg-accent text-white"
                    : "bg-light border border-gray-200"
                }`}
              >
                <div className={`text-[0.85rem] font-medium mb-4 ${plan.featured ? "text-white/70" : "text-text-body"}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-[2.8rem] font-serif leading-none ${plan.featured ? "text-white" : "text-text-dark"}`}>
                    {plan.price}&euro;
                  </span>
                  <span className={`text-[0.8rem] ${plan.featured ? "text-white/60" : "text-text-body"}`}>/mois</span>
                </div>
                <p className={`text-[0.8rem] leading-[1.6] mb-6 ${plan.featured ? "text-white/70" : "text-text-body"}`}>
                  {plan.desc}
                </p>

                <ul className="list-none flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 py-2 text-[0.82rem] ${plan.featured ? "text-white/80" : "text-text-body"}`}>
                      <Check className={plan.featured ? "stroke-white" : "stroke-accent"} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3.5 rounded-full font-medium text-[0.85rem] cursor-pointer transition-all duration-300 border ${
                    plan.featured
                      ? "bg-white border-white text-accent hover:bg-white/90"
                      : "bg-accent border-accent text-white hover:shadow-lg hover:shadow-accent/20"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choisir ce plan
                </motion.button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-12">
            <p className="text-[0.85rem] text-text-body">
              Besoin d&apos;un devis personnalis&eacute; ?{" "}
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
