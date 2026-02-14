"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const CheckIcon = () => (
  <span className="w-[18px] h-[18px] rounded-full bg-accent-dim flex items-center justify-center shrink-0">
    <svg
      viewBox="0 0 24 24"
      className="w-2.5 h-2.5 stroke-accent fill-none"
      strokeWidth={3}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const plans = [
  {
    name: "Essentiel",
    price: "80€",
    desc: "Ideal pour une presence web professionnelle.",
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
    price: "299€",
    desc: "Solution web complete et performante.",
    featured: true,
    features: [
      "Application web sur mesure",
      "Dashboard admin",
      "Base de donnees Supabase",
      "Authentification utilisateurs",
      "Support 6 mois",
    ],
  },
  {
    name: "Premium",
    price: "349€",
    desc: "Projets ambitieux avec fonctionnalites avancees.",
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Pricing() {
  return (
    <div className="bg-gray-bg relative overflow-hidden" id="pricing">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <ScrollReveal className="text-center mb-12" animation="blur">
          <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5">
            Nos Tarifs
          </div>
          <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
            Choisissez Votre{" "}
            <span className="text-gradient-animated font-mono font-normal">Formule</span>
          </h2>
          <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[560px] mx-auto mt-3">
            Formules adaptees a tous les budgets, personnalisables selon vos
            besoins.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className={`bg-white rounded-[18px] p-[26px] pt-[34px] border flex flex-col relative overflow-hidden ${
                  plan.featured
                    ? "border-accent shadow-[0_0_0_1px_var(--color-accent)]"
                    : "border-border-light"
                }`}
                whileHover={{
                  y: -6,
                  boxShadow: plan.featured
                    ? "0 20px 60px rgba(14, 165, 233, 0.15), 0 0 0 1px rgba(14, 165, 233, 0.5)"
                    : "0 20px 60px rgba(0, 0, 0, 0.08)",
                  transition: { duration: 0.3 },
                }}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-6">
                    <motion.div
                      className="bg-accent text-dark text-[0.65rem] font-bold px-3 py-1 rounded-b-md uppercase tracking-wider"
                      initial={{ y: -30 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    >
                      Populaire
                    </motion.div>
                  </div>
                )}

                {plan.featured && (
                  <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
                )}

                <div className="text-[0.85rem] font-semibold text-text-secondary mb-3">
                  {plan.name}
                </div>
                <div className="text-[2.5rem] font-extrabold text-text-primary">
                  <span className={plan.featured ? "text-gradient-animated" : ""}>
                    {plan.price}
                  </span>{" "}
                  <small className="text-[0.85rem] font-normal text-text-muted">
                    /mois
                  </small>
                </div>
                <p className="text-[0.78rem] text-text-muted leading-[1.6] mt-2.5 mb-[22px]">
                  {plan.desc}
                </p>
                <ul className="list-none mb-[26px] flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 py-1.5 text-[0.82rem] text-text-primary"
                    >
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold text-[0.88rem] cursor-pointer border ${
                    plan.featured
                      ? "bg-accent border-accent text-white"
                      : "bg-transparent border-border-light text-text-primary hover:bg-accent hover:border-accent hover:text-white"
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choisir ce plan
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal animation="fadeUp" delay={300}>
          <div className="text-center mt-10">
            <p className="text-[0.85rem] text-text-secondary">
              Besoin d&apos;un devis personnalise ?{" "}
              <motion.a
                href="#"
                className="text-accent font-semibold hover:underline"
                whileHover={{ scale: 1.02 }}
              >
                Contactez-nous &#8594;
              </motion.a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
