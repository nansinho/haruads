"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { CityPageData } from "@/data/cities/_types";

export default function CityCTA({ city }: { city: CityPageData }) {
  return (
    <section className="bg-dark text-white">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto">
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
              <span className="font-light">Prêt à lancer votre projet à </span>
              <span className="font-serif italic text-accent">
                {city.name} ?
              </span>
            </h2>
            <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
              Parlons de votre projet. Premier rendez-vous gratuit et sans
              engagement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Demander un devis
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 font-medium text-[0.9rem] hover:border-white/20 hover:text-white transition-all cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Voir tous les services
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
