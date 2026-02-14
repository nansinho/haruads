"use client";

import { motion } from "framer-motion";

const partners = [
  { icon: "\u2B24", name: "Spotify" },
  { icon: "\u25FC", name: "Microsoft" },
  { icon: "\u25B2", name: "Google" },
  { icon: "\u25B6", name: "YouTube" },
  { icon: "\u2B24", name: "Samsung" },
];

const doubled = [...partners, ...partners];

export default function Partners() {
  return (
    <div className="bg-dark border-t border-b border-border-dark overflow-hidden relative">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-5 lg:py-[26px]"
      >
        {/* Marquee track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-0">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-2 text-[0.95rem] font-semibold text-white/20 tracking-wider px-8 lg:px-12 hover:text-accent/50 transition-colors duration-500 shrink-0 cursor-default"
            >
              <span className="text-[1.2rem]">{p.icon}</span>
              {p.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
