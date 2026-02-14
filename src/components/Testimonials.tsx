"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-[#f5a623]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const testimonials = [
  {
    text: "L'agence a parfaitement compris nos besoins. Le resultat depasse nos attentes.",
    initials: "LA",
    name: "Laurent A.",
    role: "Directeur, StartupTech",
  },
  {
    text: "Expertise technique remarquable. Nos conversions ont augmente de 40%.",
    initials: "MC",
    name: "Marie C.",
    role: "Fondatrice, BelleMode",
  },
  {
    text: "Livraison dans les temps, communication excellente. Recommande !",
    initials: "PD",
    name: "Pierre D.",
    role: "CEO, FormaPro",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

export default function Testimonials() {
  return (
    <div className="bg-[#111111] text-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-12 items-start">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              Temoignages
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight">
              Ce Que Disent{" "}
              <span className="text-gradient-animated font-mono font-normal">Nos Clients</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeRight">
            <p className="text-[0.82rem] text-white/50 leading-[1.75] max-w-[440px]">
              Satisfaction client au coeur de chaque projet.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="bg-[#1a1a1a] rounded-[14px] p-[26px] border border-border-dark relative group"
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 60px rgba(255,255,255,0.04)",
                  borderColor: "rgba(14, 165, 233, 0.2)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute top-4 right-4 text-[2.5rem] font-serif text-accent/10 leading-none select-none">
                  &ldquo;
                </div>

                <div className="flex gap-[3px] mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1, type: "spring", stiffness: 500 }}
                    >
                      <StarIcon />
                    </motion.div>
                  ))}
                </div>
                <p className="text-[0.82rem] text-white/60 leading-[1.7] mb-[18px] italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-dark to-accent flex items-center justify-center font-bold text-[0.78rem] text-dark"
                    whileHover={{ scale: 1.1 }}
                  >
                    {t.initials}
                  </motion.div>
                  <div>
                    <div className="text-[0.85rem] font-semibold text-white group-hover:text-accent transition-colors duration-300">
                      {t.name}
                    </div>
                    <div className="text-[0.72rem] text-white/40">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal animation="fadeUp" delay={300}>
          <div className="text-center mt-10">
            <motion.button
              className="px-7 py-3 rounded-lg bg-transparent text-white font-semibold text-[0.85rem] border border-white/20 cursor-pointer hover:border-accent hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoignez nos clients satisfaits &#8594;
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
