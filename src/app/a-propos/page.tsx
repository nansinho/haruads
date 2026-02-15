"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { num: "50+", label: "Projets réalisés" },
  { num: "30+", label: "Clients actifs" },
  { num: "3+", label: "Ans d\u2019expertise" },
  { num: "100%", label: "Satisfaction" },
];

const values = [
  {
    num: "01",
    title: "Transparence",
    desc: "Communication ouverte à chaque étape. Vous savez toujours où en est votre projet.",
  },
  {
    num: "02",
    title: "Qualité",
    desc: "Code propre, design soigné, performance optimale. Pas de compromis sur la qualité.",
  },
  {
    num: "03",
    title: "Innovation",
    desc: "Technologies modernes et bonnes pratiques pour des solutions pérennes et évolutives.",
  },
  {
    num: "04",
    title: "Proximité",
    desc: "Une équipe à taille humaine, réactive et à l\u2019écoute de vos besoins.",
  },
];

const team = [
  {
    name: "Fondateur & Lead Dev",
    role: "Développement web, architecture technique et stratégie digitale.",
    initial: "H",
  },
  {
    name: "Designer UI/UX",
    role: "Interfaces utilisateur, design system et identité visuelle.",
    initial: "D",
  },
  {
    name: "Développeur Full-Stack",
    role: "Front-end React, back-end Node.js et intégrations API.",
    initial: "F",
  },
];

export default function AProposPage() {
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
                À Propos
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Une agence </span>
                <span className="font-serif italic text-accent">à taille humaine.</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[520px] leading-[1.8] font-light">
                Basée à Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises
                dans leur transformation digitale avec passion et expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nans-profile-2.jpg"
                    alt="Nans Harua - Fondateur Agence HDS"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    Notre Histoire
                  </span>
                  <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4">
                    <span className="font-light">Du code à la </span>
                    <span className="font-serif italic">créativité.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    Fondée à Aix-en-Provence, l&apos;Agence HDS est née d&apos;une conviction :
                    le digital doit être accessible à toutes les entreprises, quelle que soit
                    leur taille. Nous combinons expertise technique et sensibilité créative
                    pour transformer vos idées en expériences digitales mémorables.
                  </p>
                  <p className="text-[0.9rem] text-text-body mt-4 leading-[1.8]">
                    Notre approche est simple : écouter, comprendre, et livrer des solutions
                    qui dépassent les attentes. Chaque projet est traité avec le même niveau
                    d&apos;exigence et d&apos;attention.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-[2.5rem] lg:text-[3.5rem] font-serif text-white leading-none block">
                      {stat.num}
                    </span>
                    <span className="text-[0.82rem] text-white/70 mt-2 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Nos Valeurs
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Ce qui nous </span>
                  <span className="font-serif italic">anime.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((value, i) => (
                <ScrollReveal key={value.num} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-7 lg:p-8 border border-gray-100 h-full">
                    <div className="flex items-start gap-5">
                      <span className="text-[2.8rem] font-serif text-accent leading-none shrink-0">
                        {value.num}
                      </span>
                      <div>
                        <h3 className="text-[1.1rem] font-semibold text-text-dark mb-2">
                          {value.title}
                        </h3>
                        <p className="text-[0.82rem] text-text-body leading-[1.7]">
                          {value.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  L&apos;Équipe
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Les personnes </span>
                  <span className="font-serif italic">derrière HDS.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 100}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center text-dark text-[1.5rem] font-serif">
                      {member.initial}
                    </div>
                    <h3 className="text-[1rem] font-semibold text-text-dark mt-5">
                      {member.name}
                    </h3>
                    <p className="text-[0.82rem] text-text-body leading-[1.7] mt-2 max-w-[280px] mx-auto">
                      {member.role}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder quote */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="max-w-[700px] mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center text-dark text-[1.3rem] font-serif mb-8">
                  H
                </div>
                <p className="text-fluid-h3 font-serif italic text-white/80 leading-[1.5]">
                  &ldquo;Notre mission est de rendre le digital accessible à
                  toutes les entreprises, avec des solutions qui font vraiment
                  la différence.&rdquo;
                </p>
                <div className="mt-6">
                  <div className="text-[0.9rem] font-medium text-white">
                    Fondateur, Agence HDS
                  </div>
                  <div className="text-[0.78rem] text-white/35 mt-1">
                    Aix-en-Provence
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Envie de </span>
                  <span className="font-serif italic">collaborer ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Discutons de votre projet autour d&apos;un café (virtuel ou réel).
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nous contacter
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
