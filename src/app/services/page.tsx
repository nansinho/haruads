"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    slug: "developpement-web",
    num: "01",
    title: "Développement Web",
    desc: "Sites vitrines, applications web et landing pages performantes avec React, Next.js et les technologies modernes.",
    details: [
      "Sites vitrines responsive",
      "Applications web sur mesure",
      "Landing pages optimisées",
      "API REST & GraphQL",
      "Intégration CMS headless",
    ],
  },
  {
    slug: "solutions-saas",
    num: "02",
    title: "Solutions SaaS",
    desc: "Plateformes SaaS multi-tenant, dashboards admin et outils métier sur mesure. Architecture scalable et sécurisée.",
    details: [
      "Architecture multi-tenant",
      "Dashboards admin sur mesure",
      "Gestion d\u2019abonnements & facturation",
      "Base de données Supabase / PostgreSQL",
      "Authentification & rôles utilisateurs",
    ],
  },
  {
    slug: "intelligence-artificielle",
    num: "03",
    title: "Intelligence Artificielle",
    desc: "Chatbots IA, automatisation des processus et intégration d\u2019API IA pour booster votre productivité.",
    details: [
      "Chatbots IA conversationnels",
      "Intégration OpenAI, Claude, Mistral",
      "Automatisation de processus métier",
      "Analyse de données intelligente",
      "Génération de contenu IA",
    ],
  },
  {
    slug: "design-uiux",
    num: "04",
    title: "Design UI/UX",
    desc: "Interfaces intuitives et expériences utilisateur mémorables. Maquettes Figma, prototypes interactifs, design systems.",
    details: [
      "Audit UX et recherche utilisateur",
      "Wireframes et prototypes",
      "Design system complet",
      "Maquettes haute fidélité Figma",
      "Tests utilisateurs",
    ],
  },
  {
    slug: "e-commerce",
    num: "05",
    title: "E-Commerce",
    desc: "Boutiques en ligne sur mesure avec WooCommerce, Stripe et des solutions de paiement sécurisées et performantes.",
    details: [
      "Boutiques en ligne sur mesure",
      "Intégration Stripe & Monetico",
      "Gestion de catalogues produits",
      "Paniers et tunnels de conversion",
      "Tableaux de bord analytiques",
    ],
  },
  {
    slug: "branding-seo",
    num: "06",
    title: "Branding & SEO",
    desc: "Identité visuelle forte et référencement naturel pour une visibilité maximale sur Google et les réseaux sociaux.",
    details: [
      "Création d\u2019identité visuelle",
      "Charte graphique complète",
      "Audit SEO technique",
      "Stratégie de contenu",
      "Optimisation on-page & off-page",
    ],
  },
];

export default function ServicesPage() {
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
                Nos Services
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Des solutions </span>
                <span className="font-serif italic text-accent">sur mesure.</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[500px] leading-[1.8] font-light">
                De la conception au déploiement, nous vous accompagnons à chaque étape
                pour créer des expériences digitales performantes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services list */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="space-y-6">
              {services.map((service, i) => (
                <ScrollReveal key={service.slug} delay={i * 80}>
                  <a
                    href={`/services/${service.slug}`}
                    className="block bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group"
                  >
                    <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-6 lg:gap-10 items-start">
                      <span className="text-[3rem] font-serif text-accent leading-none shrink-0">
                        {service.num}
                      </span>
                      <div>
                        <h2 className="text-[1.3rem] lg:text-[1.5rem] font-semibold text-text-dark mb-3 group-hover:text-accent transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-[0.88rem] text-text-body leading-[1.7]">
                          {service.desc}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {service.details.map((d) => (
                          <li key={d} className="flex items-center gap-2 text-[0.82rem] text-text-body">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </a>
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
                <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Un projet en </span>
                  <span className="font-serif italic">tête ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Discutons de vos besoins. Premier rendez-vous gratuit et sans engagement.
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
