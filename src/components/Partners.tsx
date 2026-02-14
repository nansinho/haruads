"use client";

import { motion } from "framer-motion";

const partners = [
  "Spotify",
  "Microsoft",
  "Google",
  "YouTube",
  "Samsung",
  "Netflix",
  "Apple",
  "Amazon",
];

export default function Partners() {
  return (
    <div className="bg-dark border-t border-b border-border-dark overflow-hidden relative py-6 lg:py-8">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Framer Motion marquee */}
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 text-[1.1rem] lg:text-[1.25rem] font-bold text-white/15 tracking-widest uppercase px-10 lg:px-14 shrink-0 hover:text-accent/40 transition-colors duration-500 cursor-default select-none"
            >
              <span className="w-2 h-2 rounded-full bg-accent/20 shrink-0" />
              {name}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
