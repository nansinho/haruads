"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const plans = [
  {
    name: "Essentiel",
    price: "80",
    desc: "Présence web professionnelle pour démarrer.",
    featured: false,
    features: [
      "Site vitrine responsive",
      "Jusqu\u2019à 5 pages",
      "Formulaire de contact",
      "SEO de base",
      "Hébergement inclus",
      "Design sur mesure",
      "Livraison sous 3 semaines",
    ],
    cta: "Choisir Essentiel",
  },
  {
    name: "Avancé",
    price: "299",
    desc: "Application web complète et performante.",
    featured: true,
    features: [
      "Application web sur mesure",
      "Dashboard admin",
      "Base de données Supabase",
      "Authentification",
      "Support 6 mois",
      "API personnalisées",
      "Formation incluse",
    ],
    cta: "Choisir Avancé",
  },
  {
    name: "Premium",
    price: "349",
    desc: "Projets ambitieux, fonctionnalités avancées.",
    featured: false,
    features: [
      "E-commerce complet",
      "Paiement en ligne",
      "Multi-langue",
      "API personnalisées",
      "Maintenance 12 mois",
      "Reporting analytics",
      "Support prioritaire",
    ],
    cta: "Choisir Premium",
  },
];

const faqs = [
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Aucun. Le prix affiché est le prix mensuel TTC. Pas de surprise, pas d\u2019engagement caché.",
  },
  {
    q: "Puis-je changer de formule ?",
    a: "Oui, vous pouvez upgrader ou downgrader votre formule à tout moment. Le changement prend effet au cycle de facturation suivant.",
  },
  {
    q: "Que comprend le support ?",
    a: "Le support inclut les corrections de bugs, les mises à jour de sécurité et une assistance par email. Le plan Premium inclut un support prioritaire avec temps de réponse garanti.",
  },
  {
    q: "Proposez-vous des devis personnalisés ?",
    a: "Absolument. Si aucune formule ne correspond exactement à vos besoins, nous créons un devis 100% personnalisé. Contactez-nous pour en discuter.",
  },
];

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                Tarifs
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Des formules </span>
                <span className="font-serif italic text-accent">transparentes.</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[500px] leading-[1.8] font-light">
                Chaque projet est unique. Nos tarifs s&apos;adaptent à vos besoins
                et à votre budget, sans surprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 100}>
                  <div
                    className={`rounded-2xl p-7 lg:p-8 flex flex-col h-full ${
                      plan.featured
                        ? "bg-accent text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {plan.featured && (
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[0.7rem] font-semibold text-white mb-4 self-start">
                        Populaire
                      </span>
                    )}
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

                    <motion.a
                      href="/contact"
                      className={`w-full py-3.5 rounded-full font-medium text-[0.85rem] cursor-pointer transition-all duration-300 border text-center block ${
                        plan.featured
                          ? "bg-white border-white text-accent hover:bg-white/90"
                          : "bg-accent border-accent text-white hover:shadow-lg hover:shadow-accent/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                    </motion.a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  FAQ
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Questions sur les </span>
                  <span className="font-serif italic">tarifs.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div>
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="border-b border-gray-200 py-5">
                    <h3 className="text-[0.95rem] font-medium text-text-dark mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-[0.82rem] text-text-body leading-[1.7]">
                      {faq.a}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Besoin d&apos;un devis </span>
                  <span className="font-serif italic">personnalisé ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Chaque projet est unique. Contactez-nous pour un devis adapté à vos besoins.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Demander un devis
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:contact@agencehds.fr"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-medium text-[0.9rem] border border-white/40 cursor-pointer hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    contact@agencehds.fr
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
