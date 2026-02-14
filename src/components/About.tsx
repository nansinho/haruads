"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const stats = [
  { num: "50+", label: "Projets realises", accent: true },
  { num: "30+", label: "Clients actifs", accent: false },
  { num: "3+", label: "Ans d'expertise", accent: false },
  { num: "100%", label: "Satisfaction", accent: true },
];

export default function About() {
  return (
    <section className="relative overflow-hidden bg-dark-2" id="about">
      <div className="absolute inset-0 bg-mesh-2" />

      <div className="max-w-[1300px] mx-auto px-6 py-[140px] lg:px-16 relative z-10">
        {/* Header - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 mb-20">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-accent rounded-full" />
                <span className="text-[0.7rem] uppercase tracking-[4px] text-accent font-display font-semibold">
                  A Propos
                </span>
              </div>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-cream">
                Une agence a taille humaine,{" "}
                <span className="text-gradient-mixed">des ambitions digitales.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col justify-end">
              <p className="text-[1rem] text-white/35 leading-[1.9] max-w-[500px]">
                Basee a Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises
                dans leur transformation digitale depuis plus de 3 ans. Nous croyons que
                chaque projet merite une approche unique et une execution impeccable.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Large image */}
          <ScrollReveal className="col-span-2 row-span-2">
            <GlowCard className="h-full">
              <div className="relative h-full min-h-[320px] lg:min-h-[440px] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/why-choose.jpg"
                  alt="Equipe Agence HDS"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[0.65rem] text-accent/60 uppercase tracking-[3px] font-display font-semibold">
                    Notre equipe
                  </div>
                  <div className="text-cream font-display font-bold text-[1.2rem] mt-1.5">
                    Creativite & Expertise
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* Stats */}
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={(i + 1) * 100}>
              <GlowCard className="h-full" glowColor={stat.accent ? "rgba(255,85,0,0.08)" : "rgba(139,92,246,0.06)"}>
                <div className="p-6 lg:p-7 flex flex-col justify-between h-full min-h-[180px]">
                  <div className="font-display font-extrabold text-[2.5rem] lg:text-[3rem] leading-none tracking-[-0.03em]">
                    {stat.num.includes("+") ? (
                      <>
                        {stat.num.replace("+", "")}
                        <span className="text-accent">+</span>
                      </>
                    ) : stat.num.includes("%") ? (
                      <>
                        {stat.num.replace("%", "")}
                        <span className="text-violet">%</span>
                      </>
                    ) : (
                      stat.num
                    )}
                  </div>
                  <div className="text-[0.72rem] text-white/25 font-medium uppercase tracking-wider mt-auto">
                    {stat.label}
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}

          {/* Founder quote */}
          <ScrollReveal delay={300} className="col-span-2">
            <GlowCard className="h-full" glowColor="rgba(139,92,246,0.06)">
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] h-full overflow-hidden rounded-2xl">
                <div className="relative h-full min-h-[200px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/founder-with-mother.jpg"
                    alt="Fondateur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-7 lg:p-10 flex flex-col justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-accent/10 mb-4">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[0.95rem] text-white/40 leading-[1.9] italic">
                    Notre mission est de rendre le digital accessible a
                    toutes les entreprises, avec des solutions qui font vraiment
                    la difference.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-violet rounded-full" />
                    <div>
                      <div className="text-[0.85rem] font-display font-bold text-cream">
                        Fondateur, Agence HDS
                      </div>
                      <div className="text-[0.7rem] text-white/20 mt-0.5">
                        Aix-en-Provence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </div>

      <div className="section-line" />
    </section>
  );
}
