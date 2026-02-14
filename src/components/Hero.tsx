"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const partners = [
  { logo: "/images/logos/logo-wordpress.svg", name: "WordPress" },
  { logo: "/images/logos/logo-woocommerce.svg", name: "WooCommerce" },
  { logo: "/images/logos/logo-supabase.svg", name: "Supabase" },
  { logo: "/images/logos/logo-google-analytics.svg", name: "Google Analytics" },
  { logo: "/images/logos/logo-hostinger.svg", name: "Hostinger" },
  { logo: "/images/logos/logo-litespeed.svg", name: "LiteSpeed" },
  { logo: "/images/logos/logo-lovable.svg", name: "Lovable" },
];

export default function Hero() {
  return (
    <div className="bg-dark text-white relative overflow-hidden noise-overlay min-h-screen flex flex-col" id="home">
      {/* === Animated glow orbs === */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[10%] right-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(34,211,238,0.03) 40%, transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top gradient edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Main content */}
      <section className="pt-[140px] pb-0 px-5 lg:pt-[180px] lg:pb-0 lg:px-12 max-w-[1400px] mx-auto relative z-2 flex-1 flex flex-col w-full">
        <div className="flex-1 flex flex-col justify-center">
          {/* Tag */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-[glow-pulse_4s_ease-in-out_infinite]" />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">
              Agence Web Creative &mdash; Aix-en-Provence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[2.8rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[5.8rem] font-extrabold leading-[0.95] tracking-[-0.03em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              Nous creons
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              des experiences
            </motion.span>
            <motion.span
              className="block text-gradient"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              digitales.
            </motion.span>
          </motion.h1>

          {/* Subtext + CTAs */}
          <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end max-w-[900px]">
            <motion.p
              className="text-[0.9rem] lg:text-[1rem] text-white/40 leading-[1.7] max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
            >
              Design UI/UX, developpement web et solutions e-commerce sur mesure pour propulser votre business.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              <motion.a
                href="#projects"
                className="px-7 py-3.5 rounded-full bg-accent text-dark font-bold text-[0.85rem] cursor-pointer inline-flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Voir nos projets
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
              <motion.a
                href="#services"
                className="px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-[0.85rem] border border-white/10 cursor-pointer hover:border-accent/50 hover:text-accent hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Nos services
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <ScrollReveal>
          <div className="mt-auto pt-10 lg:pt-16">
            <div className="flex flex-wrap gap-10 lg:gap-16 border-t border-white/[0.06] pt-6">
              {[
                { num: "50+", label: "Projets livres" },
                { num: "30+", label: "Clients actifs" },
                { num: "3+", label: "Ans d'experience" },
                { num: "100%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1, ease }}
                >
                  <div className="text-[1.5rem] lg:text-[2rem] font-extrabold text-white">
                    {stat.num}
                  </div>
                  <div className="text-[0.7rem] text-white/25 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* === Partner logo marquee inside hero === */}
        <motion.div
          className="mt-10 lg:mt-14 pb-8 lg:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
        >
          <div className="text-[0.65rem] uppercase tracking-[3px] text-white/20 mb-4 text-center">
            Technologies & Partenaires
          </div>
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
            >
              {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex items-center px-8 lg:px-14 shrink-0 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-5 lg:h-6 w-auto opacity-20 group-hover:opacity-50 transition-opacity duration-500 [filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_8px_rgba(59,130,246,0.4))]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
