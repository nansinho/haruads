"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import type { CityPageData } from "@/data/cities/_types";

export default function CityHero({ city }: { city: CityPageData }) {
  return (
    <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Agence Web", href: "/agence-web" },
              { label: city.name },
            ]}
          />

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent/60 font-mono">
              {city.department} ({city.departmentCode})
            </span>
            <span className="w-1 h-1 rounded-full bg-accent/40" />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-white/30 font-mono">
              {city.distanceFromAgency === 0
                ? "Notre ville"
                : `À ${city.distanceFromAgency} km`}
            </span>
          </div>

          <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
            <span className="font-serif italic">{city.hero.title}</span>
          </h1>

          <p className="text-[1.1rem] text-accent/80 font-light mt-3">
            {city.hero.subtitle}
          </p>

          <p className="text-[0.95rem] text-white/40 max-w-[600px] leading-[1.8] font-light mt-4">
            {city.hero.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-dark font-medium text-[0.88rem] cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Demander un devis
              <ArrowRight size={16} />
            </motion.a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white/60 font-medium text-[0.88rem] hover:border-white/20 hover:text-white transition-all"
            >
              <MessageSquare size={16} />
              Questions fréquentes
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
