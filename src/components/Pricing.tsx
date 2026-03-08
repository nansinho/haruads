"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface Offer {
  id: string;
  name: string;
  description: string;
  features: string[];
  is_popular: boolean;
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data.data || []))
      .catch(() => setOffers([]));
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="bg-white text-text-dark relative overflow-hidden" id="pricing">
      <div className="max-w-[1400px] mx-auto px-5 py-[120px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Nos formules
            </span>
            <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Des solutions </span>
              <span className="font-serif italic">adapt&eacute;es.</span>
            </h2>
            <p className="text-[0.88rem] text-text-body mt-4 leading-[1.7]">
              Chaque projet est unique. Découvrez nos formules et demandez un devis personnalisé.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.id} delay={i * 100} animation="slideRotate">
              <div
                className={`rounded-2xl p-7 lg:p-8 flex flex-col h-full ${
                  offer.is_popular
                    ? "bg-accent text-white"
                    : "bg-light border border-gray-200"
                }`}
              >
                {offer.is_popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[0.7rem] font-semibold text-white mb-4 self-start">
                    Populaire
                  </span>
                )}
                <div className={`text-[1.1rem] font-semibold mb-2 ${offer.is_popular ? "text-white" : "text-text-dark"}`}>
                  {offer.name}
                </div>
                <p className={`text-[0.8rem] leading-[1.6] mb-6 ${offer.is_popular ? "text-text-secondary" : "text-text-body"}`}>
                  {offer.description}
                </p>

                <ul className="list-none flex-1 mb-7">
                  {offer.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 py-2 text-[0.82rem] ${offer.is_popular ? "text-white/80" : "text-text-body"}`}>
                      <Check className={offer.is_popular ? "stroke-white" : "stroke-accent"} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/tarifs"
                    className={`w-full py-3.5 rounded-full font-medium text-[0.85rem] cursor-pointer transition-all duration-300 border text-center block ${
                      offer.is_popular
                        ? "bg-white border-white text-accent hover:bg-white/90"
                        : "bg-accent border-accent text-white hover:shadow-lg hover:shadow-accent/20"
                    }`}
                  >
                    Demander un devis
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-12">
            <p className="text-[0.85rem] text-text-body">
              Besoin d&apos;un accompagnement personnalis&eacute; ?{" "}
              <Link href="/tarifs" className="text-accent hover:underline font-semibold" title="Demandez un devis personnalisé">
                Demandez un devis
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
