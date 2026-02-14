"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Brief & Strat\u00e9gie",
    desc: "Analyse de vos besoins, objectifs et cibles pour d\u00e9finir une strat\u00e9gie sur mesure.",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Maquettes, prototypes interactifs et validation du design avant d\u00e9veloppement.",
  },
  {
    num: "03",
    title: "D\u00e9veloppement",
    desc: "Code propre avec les meilleures technologies pour performance et scalabilit\u00e9.",
  },
  {
    num: "04",
    title: "Livraison & Suivi",
    desc: "D\u00e9ploiement, formation et suivi pour une mise en production sans accroc.",
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-accent text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em]">
              <span className="font-light">Notre </span>
              <span className="font-serif italic">processus.</span>
            </h2>
            <p className="text-[0.88rem] text-white/70 mt-4 leading-[1.7]">
              Du brief &agrave; la mise en ligne, un processus clair et transparent.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <div className="text-center">
                <span className="text-[3.5rem] font-serif text-white/20 leading-none block">
                  {step.num}
                </span>
                <h4 className="text-[1rem] font-semibold text-white mt-4">
                  {step.title}
                </h4>
                <p className="text-[0.8rem] text-white/60 leading-[1.7] mt-2">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
