"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import type { CityPageData } from "@/data/cities/_types";

export default function CityStats({ city }: { city: CityPageData }) {
  return (
    <section className="bg-dark text-white">
      <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              En chiffres
            </span>
            <h3 className="text-[1.3rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em] mt-3">
              <span className="font-light">{city.name} </span>
              <span className="font-serif italic text-accent">en bref.</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {city.localStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="text-[2.2rem] lg:text-[2.8rem] font-serif text-accent leading-none block">
                  {stat.value}
                </span>
                <span className="text-[0.78rem] text-white/40 mt-2 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
