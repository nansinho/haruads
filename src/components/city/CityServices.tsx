"use client";

import Link from "next/link";
import { ArrowRight, Code, Layers, Brain, Palette, ShoppingCart, Search } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { servicesData } from "@/data/services";
import type { CityPageData } from "@/data/cities/_types";

const serviceIcons: Record<string, React.ReactNode> = {
  "developpement-web": <Code size={24} />,
  "solutions-saas": <Layers size={24} />,
  "intelligence-artificielle": <Brain size={24} />,
  "design-uiux": <Palette size={24} />,
  "e-commerce": <ShoppingCart size={24} />,
  "branding-seo": <Search size={24} />,
};

export default function CityServices({ city }: { city: CityPageData }) {
  return (
    <section className="bg-light text-text-dark">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Nos services
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Ce que nous proposons à </span>
              <span className="font-serif italic">{city.name}.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {city.serviceHighlights.map((highlight, i) => {
            const service = servicesData[highlight.serviceSlug];
            if (!service) return null;

            return (
              <ScrollReveal key={highlight.serviceSlug} delay={i * 80}>
                <Link
                  href={`/services/${highlight.serviceSlug}`}
                  className="block p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 group hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                    {serviceIcons[highlight.serviceSlug]}
                  </div>
                  <span className="text-[0.7rem] font-mono text-accent/60 uppercase tracking-wider">
                    {service.num}
                  </span>
                  <h3 className="text-[1.05rem] font-semibold text-text-dark mt-1 mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[0.8rem] text-text-body leading-[1.7]">
                    {highlight.localizedSubtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[0.78rem] text-accent font-medium mt-4 group-hover:gap-2.5 transition-all">
                    En savoir plus
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
