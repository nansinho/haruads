"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const logos = [
  { src: "/images/logos/logo-wordpress.svg", alt: "WordPress" },
  { src: "/images/logos/logo-woocommerce.svg", alt: "WooCommerce" },
  { src: "/images/logos/logo-supabase.svg", alt: "Supabase" },
  { src: "/images/logos/logo-google-analytics.svg", alt: "Google Analytics" },
  { src: "/images/logos/logo-hostinger.svg", alt: "Hostinger" },
  { src: "/images/logos/logo-litespeed.svg", alt: "LiteSpeed" },
  { src: "/images/logos/logo-lovable.svg", alt: "Lovable" },
  { src: "/images/logos/logo-official.svg", alt: "Official" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.5], [0.03, 0]);

  return (
    <section
      ref={sectionRef}
      className="bg-dark text-white relative overflow-hidden min-h-screen flex flex-col"
      id="home"
    >
      {/* Subtle dot grid with parallax fade */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: dotOpacity,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 w-full pt-44 pb-12 flex-1 flex items-center relative z-2">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center w-full">
          {/* Left — Text with parallax */}
          <motion.div style={{ y: textY }}>
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">
                Agence Web Cr&eacute;ative &mdash; Aix-en-Provence
              </span>
            </motion.div>

            <motion.h1
              className="text-fluid-hero leading-[1.05] tracking-[-0.03em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block font-light"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
              >
                Nous cr&eacute;ons
              </motion.span>
              <motion.span
                className="block font-light"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
              >
                des exp&eacute;riences
              </motion.span>
              <motion.span
                className="block font-serif italic text-accent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                digitales.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-[0.95rem] lg:text-[1.05rem] text-white/35 mt-7 max-w-[420px] leading-[1.8] font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              Design UI/UX, d&eacute;veloppement web et solutions e-commerce sur mesure
              pour propulser votre business.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
            >
              <motion.a
                href="/contact"
                className="px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 0 50px rgba(249,115,22,0.3), 0 0 100px rgba(249,115,22,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                D&eacute;marrer un projet
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
              <motion.a
                href="/projets"
                className="px-8 py-4 rounded-full bg-transparent text-white font-medium text-[0.9rem] border border-white/15 cursor-pointer hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Voir nos projets
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Visual with parallax (opposite direction) */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease }}
            style={{ y: imageY }}
          >
            <div className="absolute -top-8 -right-8 w-[80%] h-[80%] bg-accent/10 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/project-dashboard.jpg"
                alt="Projet Agence HDS"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo marquee */}
      <motion.div
        className="w-full border-t border-white/[0.06] shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="py-8 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
          <div
            className="flex items-center"
            style={{ animation: "marquee 40s linear infinite", width: "max-content" }}
          >
            {[0, 1, 2, 3].map((setIndex) => (
              <div key={setIndex} className="flex items-center gap-14 px-7 shrink-0">
                {logos.map((logo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${setIndex}-${logo.alt}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 w-auto shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-500"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
