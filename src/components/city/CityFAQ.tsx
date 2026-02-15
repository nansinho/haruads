"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import type { CityPageData } from "@/data/cities/_types";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[0.95rem] font-medium text-text-dark pr-8 group-hover:text-accent transition-colors">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-[0.85rem] text-text-body leading-[1.8] pb-5">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function CityFAQ({ city }: { city: CityPageData }) {
  return (
    <section id="faq" className="bg-white text-text-dark">
      <div className="max-w-[800px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              FAQ
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Questions </span>
              <span className="font-serif italic">fréquentes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="bg-light rounded-2xl p-6 lg:p-8 border border-gray-100">
            {city.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
