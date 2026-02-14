"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlowCard from "./GlowCard";

const stats = [
  { num: "50+", label: "Projets realises" },
  { num: "30+", label: "Clients actifs" },
  { num: "3+", label: "Ans d'expertise" },
  { num: "100%", label: "Satisfaction" },
];

export default function About() {
  return (
    <div className="bg-dark-2 text-white relative overflow-hidden" id="about">
      {/* Glow orbs */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4">
              A Propos
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Une agence a taille humaine,{" "}
              <span className="text-gradient">des ambitions digitales.</span>
            </h2>
            <p className="text-[0.88rem] text-white/30 mt-4 leading-[1.7]">
              Basee a Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises
              dans leur transformation digitale depuis plus de 3 ans.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Large image card */}
          <ScrollReveal className="col-span-2 row-span-2">
            <GlowCard className="h-full">
              <div className="relative h-full min-h-[300px] lg:min-h-[420px] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/why-choose.jpg"
                  alt="Equipe Agence HDS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[0.72rem] text-white/40 uppercase tracking-wider">
                    Notre equipe
                  </div>
                  <div className="text-white font-bold text-[1.1rem] mt-1">
                    Creativite & Expertise
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* Stat cards */}
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={(i + 1) * 80}>
              <GlowCard className="h-full">
                <div className="p-6 flex flex-col justify-between h-full min-h-[180px] relative">
                  <div className="text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-none">
                    {stat.num.includes("+") ? (
                      <>
                        {stat.num.replace("+", "")}
                        <span className="text-accent">+</span>
                      </>
                    ) : stat.num.includes("%") ? (
                      <>
                        {stat.num.replace("%", "")}
                        <span className="text-cyan">%</span>
                      </>
                    ) : (
                      stat.num
                    )}
                  </div>
                  <div className="text-[0.75rem] text-white/25 mt-2">
                    {stat.label}
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}

          {/* Founder card */}
          <ScrollReveal delay={200} className="col-span-2">
            <GlowCard className="h-full">
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] h-full overflow-hidden rounded-2xl">
                <div className="relative h-full min-h-[200px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/founder-with-mother.jpg"
                    alt="Fondateur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <p className="text-[0.88rem] text-white/40 leading-[1.8] italic">
                    &ldquo;Notre mission est de rendre le digital accessible a
                    toutes les entreprises, avec des solutions qui font vraiment
                    la difference.&rdquo;
                  </p>
                  <div className="mt-4">
                    <div className="text-[0.85rem] font-semibold text-white">
                      Fondateur, Agence HDS
                    </div>
                    <div className="text-[0.75rem] text-white/25 mt-0.5">
                      Aix-en-Provence
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
