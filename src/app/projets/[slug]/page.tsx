"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const projectsData: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    client: string;
    description: string;
    challenge: string;
    solution: string;
    results: { label: string; value: string }[];
    tags: string[];
    image: string;
    gallery: string[];
  }
> = {
  "aiako-ecommerce": {
    title: "AIAKO E-Commerce",
    category: "E-Commerce",
    year: "2024",
    client: "AIAKO",
    description:
      "Migration complète d\u2019une boutique WooCommerce vers une stack moderne Next.js + Supabase. Refonte de l\u2019expérience d\u2019achat avec intégration du paiement Monetico.",
    challenge:
      "Le site existant souffrait de lenteurs importantes, d\u2019une interface datée et d\u2019un taux d\u2019abandon de panier élevé. Le client souhaitait une expérience fluide et moderne sans perdre son catalogue de 500+ produits.",
    solution:
      "Nous avons migré l\u2019intégralité du catalogue vers Supabase, reconstruit le front-end en Next.js avec SSG pour des temps de chargement ultra-rapides, et intégré Monetico pour les paiements sécurisés.",
    results: [
      { label: "Temps de chargement", value: "-70%" },
      { label: "Conversions", value: "+45%" },
      { label: "Panier moyen", value: "+22%" },
      { label: "Score Lighthouse", value: "98/100" },
    ],
    tags: ["Next.js", "Supabase", "Monetico", "Tailwind CSS"],
    image: "/images/projects/project-dashboard.jpg",
    gallery: ["/images/projects/project-dashboard.jpg", "/images/projects/project-landing.jpg"],
  },
  "dashboard-cco": {
    title: "Dashboard C&CO",
    category: "Application Web",
    year: "2024",
    client: "C&CO Formation",
    description:
      "Plateforme SaaS de formation en ligne multi-tenant avec dashboard admin, suivi de progression des apprenants et gestion des contenus pédagogiques.",
    challenge:
      "C&CO avait besoin d\u2019une plateforme centralisant la gestion de plusieurs organismes de formation, avec des espaces cloisonnés par organisme et un suivi détaillé de la progression.",
    solution:
      "Architecture multi-tenant avec isolation des données par organisme, dashboard temps réel pour les formateurs, et système de gamification pour motiver les apprenants.",
    results: [
      { label: "Utilisateurs actifs", value: "2 500+" },
      { label: "Organismes", value: "12" },
      { label: "Satisfaction", value: "96%" },
      { label: "Temps de dev", value: "10 sem." },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    image: "/images/projects/neuralia-project.webp",
    gallery: ["/images/projects/neuralia-project.webp"],
  },
  "landing-fintech": {
    title: "Landing Fintech",
    category: "Design UI/UX",
    year: "2023",
    client: "FinPay",
    description:
      "Refonte complète de l\u2019identité visuelle et du site vitrine d\u2019une startup fintech. Création d\u2019un design system complet et d\u2019animations immersives.",
    challenge:
      "La startup avait une identité visuelle incohérente et un site qui ne convertissait pas. Il fallait crédibiliser la marque et améliorer le taux de conversion des leads.",
    solution:
      "Nouvelle identité visuelle épurée, design system Figma de 200+ composants, site vitrine avec animations GSAP et optimisation du tunnel de conversion.",
    results: [
      { label: "Taux de conversion", value: "+65%" },
      { label: "Temps sur site", value: "+40%" },
      { label: "Leads qualifiés", value: "x3" },
      { label: "Composants design", value: "200+" },
    ],
    tags: ["Figma", "GSAP", "Next.js", "Framer Motion"],
    image: "/images/projects/project-landing.jpg",
    gallery: ["/images/projects/project-landing.jpg"],
  },
  "systeme-reservation": {
    title: "Système de Réservation",
    category: "Application Web",
    year: "2024",
    client: "BookEasy",
    description:
      "Application de réservation en ligne avec calendrier interactif, paiement intégré via Stripe et notifications en temps réel par email et SMS.",
    challenge:
      "Le client gérait ses réservations manuellement par téléphone et email, ce qui entraînait des doubles réservations et une perte de temps considérable.",
    solution:
      "Calendrier interactif avec disponibilités en temps réel, intégration Stripe pour le paiement à la réservation, et système de notifications automatiques (confirmation, rappel, annulation).",
    results: [
      { label: "Réservations en ligne", value: "85%" },
      { label: "No-shows", value: "-60%" },
      { label: "Temps admin", value: "-4h/jour" },
      { label: "Satisfaction client", value: "98%" },
    ],
    tags: ["Next.js", "Stripe", "Supabase", "Twilio"],
    image: "/images/projects/reservation-system.webp",
    gallery: ["/images/projects/reservation-system.webp"],
  },
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug];

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2rem] font-serif italic text-accent">Projet introuvable</h1>
            <p className="text-white/40 mt-4">
              <a href="/projets" className="text-accent hover:underline">
                Retour aux projets
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-12">
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
              <a
                href="/projets"
                className="inline-flex items-center gap-2 text-[0.78rem] text-white/40 hover:text-accent transition-colors mb-8"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Tous les projets
              </a>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[0.72rem] font-medium">
                  {project.category}
                </span>
                <span className="text-[0.72rem] text-white/30">{project.year}</span>
                <span className="text-[0.72rem] text-white/30">•</span>
                <span className="text-[0.72rem] text-white/30">{project.client}</span>
              </div>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
                <span className="font-serif italic">{project.title}</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[600px] leading-[1.8] font-light">
                {project.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured image */}
        <section className="bg-dark text-white pb-20">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <ScrollReveal>
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    Le Défi
                  </span>
                  <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.15] tracking-[-0.02em] mt-4">
                    <span className="font-light">Comprendre le </span>
                    <span className="font-serif italic">problème.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    {project.challenge}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    La Solution
                  </span>
                  <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.15] tracking-[-0.02em] mt-4">
                    <span className="font-light">Notre </span>
                    <span className="font-serif italic">réponse.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    {project.solution}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-[1.6rem] lg:text-[2rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Les </span>
                  <span className="font-serif italic">résultats.</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {project.results.map((r) => (
                  <div key={r.label} className="text-center">
                    <span className="text-[2.5rem] lg:text-[3rem] font-serif text-white leading-none block">
                      {r.value}
                    </span>
                    <span className="text-[0.8rem] text-white/60 mt-2 block">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h3 className="text-[1.3rem] lg:text-[1.6rem] leading-[1.1] tracking-[-0.02em]">
                  <span className="font-light">Stack </span>
                  <span className="font-serif italic">technique.</span>
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[0.82rem] font-medium text-text-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Un projet </span>
                  <span className="font-serif italic text-accent">similaire ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
                  Discutons de la meilleure approche pour votre projet.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Parlons de votre projet
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
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
