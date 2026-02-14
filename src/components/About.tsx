"use client";

import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";

const stats = [
  { num: "50+", label: "Projets r\u00e9alis\u00e9s" },
  { num: "30+", label: "Clients actifs" },
  { num: "3+", label: "Ans d\u2019expertise" },
  { num: "100%", label: "Satisfaction" },
];

export default function About() {
  return (
    <section className="bg-white text-text-dark relative overflow-hidden" id="about">
      <div className="max-w-[1200px] mx-auto px-5 py-[120px] lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <ScrollReveal animation="fadeLeft">
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/why-choose.jpg"
                alt="Équipe Agence HDS - Agence web Aix-en-Provence"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Right — Text + Stats */}
          <ScrollReveal delay={150} animation="fadeRight">
            <div>
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                &Agrave; Propos
              </span>
              <h2 className="text-fluid-h2 leading-[1.1] tracking-[-0.02em] mt-4">
                <span className="font-light">Une agence </span>
                <span className="font-serif italic text-accent">&agrave; taille humaine.</span>
              </h2>
              <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8] max-w-[480px]">
                Bas&eacute;e &agrave; Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises
                dans leur transformation digitale depuis plus de 3 ans. Nous combinons
                cr&eacute;ativit&eacute; et expertise technique pour des r&eacute;sultats concrets.
              </p>

              {/* Stats grid with CountUp */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <CountUp
                      value={stat.num}
                      className="text-[2.2rem] lg:text-[2.8rem] font-serif text-accent leading-none"
                    />
                    <span className="block text-[0.8rem] text-text-body mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Founder quote */}
        <ScrollReveal delay={200} animation="scaleUp">
          <div className="mt-20 grid lg:grid-cols-[200px_1fr] gap-0 items-center bg-light rounded-2xl overflow-hidden">
            <div className="h-full min-h-[200px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founder-with-mother.jpg"
                alt="Nans, fondateur de l'Agence HDS"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 lg:p-8">
              <p className="text-[0.9rem] text-text-body leading-[1.8] italic font-serif">
                &ldquo;Notre mission est de rendre le digital accessible &agrave;
                toutes les entreprises, avec des solutions qui font vraiment
                la diff&eacute;rence.&rdquo;
              </p>
              <div className="mt-4">
                <div className="text-[0.85rem] font-semibold text-text-dark">
                  Fondateur, Agence HDS
                </div>
                <div className="text-[0.75rem] text-text-body mt-0.5">
                  Aix-en-Provence
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
