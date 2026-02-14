"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const words = ["digitales.", "memorables.", "uniques.", "performantes."];

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
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-dark text-white relative overflow-hidden min-h-screen flex flex-col noise-overlay"
      id="home"
    >
      {/* === Background glow orbs === */}
      <motion.div
        className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 40%, transparent 70%)",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.06) 0%, rgba(34,211,238,0.01) 40%, transparent 70%)",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top gradient edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* === Main content - CENTERED === */}
      <section className="flex-1 flex flex-col items-center justify-center px-5 lg:px-12 pt-[120px] relative z-2">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-[glow-pulse_4s_ease-in-out_infinite]" />
          <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">
            Agence Web Creative &mdash; Aix-en-Provence
          </span>
        </motion.div>

        {/* CENTERED Headline with typewriter */}
        <motion.h1
          className="text-center text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] font-extrabold leading-[0.95] tracking-[-0.04em] max-w-[1000px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            Nous creons des
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            experiences
          </motion.span>
          <motion.span
            className="block relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <span
              className="relative inline-block overflow-hidden align-bottom"
              style={{ height: "1.15em" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="text-gradient inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-center text-[0.9rem] lg:text-[1.05rem] text-white/35 mt-6 max-w-[520px] leading-[1.8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        >
          Design UI/UX, developpement web et solutions e-commerce sur mesure
          pour propulser votre business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
        >
          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-full bg-accent text-dark font-bold text-[0.9rem] cursor-pointer inline-flex items-center gap-2 relative overflow-hidden"
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 0 60px rgba(59,130,246,0.35), 0 0 120px rgba(59,130,246,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Demarrer un projet
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-dark fill-none stroke-2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
          <motion.a
            href="#projects"
            className="px-8 py-4 rounded-full bg-transparent text-white font-semibold text-[0.9rem] border border-white/10 cursor-pointer hover:border-accent/40 hover:text-accent hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir nos projets
          </motion.a>
        </motion.div>

        {/* === Product Preview - Browser Mockup === */}
        <motion.div
          className="mt-16 lg:mt-20 w-full max-w-[1000px] mx-auto relative"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease }}
        >
          {/* Glow behind the preview */}
          <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-3xl pointer-events-none" />

          <div className="relative rounded-xl border border-white/[0.08] bg-dark-2 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-dark-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-white/[0.04] rounded-lg px-4 py-1.5 text-[0.7rem] text-white/25 text-center font-mono">
                  agencehds.fr
                </div>
              </div>
            </div>
            {/* Screenshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/projects/project-dashboard.jpg"
              alt="Dashboard HDS"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* === Partners marquee === */}
      <motion.div
        className="mt-16 lg:mt-20 pb-10 lg:pb-14 relative z-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease }}
      >
        <div className="text-[0.65rem] uppercase tracking-[3px] text-white/15 mb-5 text-center">
          Technologies & Partenaires
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
          >
            {[...partners, ...partners, ...partners, ...partners].map(
              (p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex items-center px-8 lg:px-14 shrink-0 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-5 lg:h-6 w-auto opacity-20 group-hover:opacity-40 transition-opacity duration-500 [filter:brightness(0)_invert(1)]"
                  />
                </div>
              )
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
