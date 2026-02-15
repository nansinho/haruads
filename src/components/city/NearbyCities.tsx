"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { CityPageData } from "@/data/cities/_types";

export default function NearbyCities({ city }: { city: CityPageData }) {
  return (
    <section className="bg-light text-text-dark">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              À proximité
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Nous intervenons </span>
              <span className="font-serif italic">aussi.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {city.nearbyCities.map((nearbyCity, i) => (
            <ScrollReveal key={nearbyCity.slug} delay={i * 60}>
              <Link
                href={`/agence-web/${nearbyCity.slug}`}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[0.95rem] font-semibold text-text-dark group-hover:text-accent transition-colors truncate">
                    {nearbyCity.name}
                  </h3>
                  <p className="text-[0.75rem] text-text-body">
                    À {nearbyCity.distance} km de notre agence
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
