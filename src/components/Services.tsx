"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    num: "01",
    title: "D\u00e9veloppement Web",
    desc: "Sites vitrines, applications web et landing pages performantes avec React, Next.js et les technologies modernes.",
  },
  {
    num: "02",
    title: "Solutions SaaS",
    desc: "Plateformes SaaS multi-tenant, dashboards admin et outils m\u00e9tier sur mesure. Architecture scalable et s\u00e9curis\u00e9e.",
  },
  {
    num: "03",
    title: "Intelligence Artificielle",
    desc: "Chatbots IA, automatisation des processus et int\u00e9gration d\u2019API IA (OpenAI, Claude) pour booster votre productivit\u00e9.",
  },
  {
    num: "04",
    title: "Design UI/UX",
    desc: "Interfaces intuitives et exp\u00e9riences utilisateur m\u00e9morables. Maquettes Figma, prototypes interactifs, design systems.",
  },
  {
    num: "05",
    title: "E-Commerce",
    desc: "Boutiques en ligne sur mesure avec WooCommerce, Stripe et des solutions de paiement s\u00e9curis\u00e9es et performantes.",
  },
  {
    num: "06",
    title: "Branding & SEO",
    desc: "Identit\u00e9 visuelle forte et r\u00e9f\u00e9rencement naturel pour une visibilit\u00e9 maximale sur Google et les r\u00e9seaux sociaux.",
  },
];

export default function Services() {
  return (
    <section className="bg-light text-text-dark relative overflow-hidden" id="services">
      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Services
            </span>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Ce que nous </span>
              <span className="font-serif italic">faisons le mieux.</span>
            </h2>
            <p className="text-[0.88rem] text-text-body mt-4 leading-[1.7]">
              Des solutions digitales compl&egrave;tes pour transformer votre pr&eacute;sence en ligne.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 100} animation="scaleUp">
              <div className="bg-white rounded-2xl p-7 lg:p-8 border border-gray-100 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full">
                <div className="flex items-start gap-5">
                  <span className="text-[2.8rem] font-serif text-accent leading-none shrink-0">
                    {service.num}
                  </span>
                  <div>
                    <h3 className="text-[1.1rem] font-semibold text-text-dark mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[0.82rem] text-text-body leading-[1.7]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-14">
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-text-dark/15 text-text-dark font-medium text-[0.85rem] hover:border-accent hover:text-accent transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
