"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";
import TypingQuote from "./TypingQuote";

const stats = [
  { num: "50+", label: "Projets r\u00e9alis\u00e9s" },
  { num: "30+", label: "Clients actifs" },
  { num: "12+", label: "Ans d\u2019expertise" },
  { num: "100%", label: "Satisfaction" },
];

export default function About() {
  const [quoteDone, setQuoteDone] = useState(false);

  return (
    <section className="bg-white text-text-dark relative overflow-hidden" id="about">
      <div className="max-w-[1400px] mx-auto px-5 py-[120px] lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <ScrollReveal animation="fadeLeft">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/nans-profile.png"
                alt="Nans Harua - Fondateur Agence HDS"
                width={536}
                height={670}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 530px"
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
                <span className="font-serif italic">&agrave; taille humaine.</span>
              </h2>
              <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8] max-w-[480px]">
                Bas&eacute;e &agrave; Aix-en-Provence, l&apos;Agence HDS accompagne les entreprises
                dans leur transformation digitale depuis plus de 12 ans. Nous combinons
                cr&eacute;ativit&eacute;, expertise technique et une approche centr&eacute;e sur les r&eacute;sultats
                pour propulser votre business.
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

              {/* CTA */}
              <motion.a
                href="/a-propos"
                className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full bg-accent text-white font-medium text-[0.85rem] cursor-pointer"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px color-mix(in srgb, var(--color-accent) 25%, transparent)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                En savoir plus
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        {/* Founder quote */}
        <div className="mt-20 py-16 lg:py-20 text-center max-w-[900px] mx-auto">
          <TypingQuote
            segments={[
              { text: "\u201CNotre mission est de rendre le " },
              { text: "digital", highlight: true, italic: true },
              { text: " accessible \u00e0 toutes les " },
              { text: "entreprises", highlight: true, italic: true },
              { text: ", avec des " },
              { text: "solutions", highlight: true },
              { text: " qui font vraiment la " },
              { text: "diff\u00e9rence", italic: true, highlight: true },
              { text: ".\u201D" },
            ]}
            className="font-serif text-fluid-h2 leading-[1.3] tracking-[-0.01em] text-text-dark"
            highlightClassName="text-accent"
            charDelay={0.03}
            onComplete={() => setQuoteDone(true)}
          />
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={quoteDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-[0.85rem] font-semibold text-text-dark">
              Fondateur, Agence HDS
            </div>
            <div className="text-[0.75rem] text-text-body mt-0.5">
              Aix-en-Provence
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
