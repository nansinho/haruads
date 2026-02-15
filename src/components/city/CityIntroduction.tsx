"use client";

import ScrollReveal from "@/components/ScrollReveal";
import type { CityPageData } from "@/data/cities/_types";

export default function CityIntroduction({ city }: { city: CityPageData }) {
  return (
    <section className="bg-white text-text-dark">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="max-w-[800px]">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              À propos
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4">
              <span className="font-light">{city.introduction.title.split(" ").slice(0, -1).join(" ")} </span>
              <span className="font-serif italic">{city.introduction.title.split(" ").slice(-1)[0]}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-[800px] mt-8 space-y-5">
          {city.introduction.paragraphs.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <p className="text-[0.9rem] text-text-body leading-[1.8]">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
