"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCarousel from "./HeroCarousel";

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
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

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
          opacity: isMobile ? 0.03 : dotOpacity,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 w-full pt-44 pb-12 flex-1 flex items-center relative z-2">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center w-full">
          {/* Left — Text (CSS animations, no JS dependency) */}
          <motion.div style={isMobile ? undefined : { y: textY }}>
            <div
              className="flex items-center gap-3 mb-10"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">
                Agence Web Cr&eacute;ative &mdash; Aix-en-Provence
              </span>
            </div>

            <h1 className="text-fluid-hero leading-[1.05] tracking-[-0.03em]">
              <span
                className="block font-light"
                style={{ animation: "fade-up 0.6s ease both", animationDelay: "0.15s" }}
              >
                Nous cr&eacute;ons
              </span>
              <span
                className="block font-light"
                style={{ animation: "fade-up 0.6s ease both", animationDelay: "0.25s" }}
              >
                des exp&eacute;riences
              </span>
              <span
                className="block font-serif italic text-accent"
                style={{ animation: "fade-up 0.6s ease both", animationDelay: "0.35s" }}
              >
                digitales.
              </span>
            </h1>

            {/* LCP element — NO animation, visible immediately at FCP */}
            <p className="text-[0.95rem] lg:text-[1.05rem] text-white/35 mt-7 max-w-[420px] leading-[1.8] font-light">
              Design UI/UX, d&eacute;veloppement web et solutions e-commerce sur mesure
              pour propulser votre business.
            </p>

            <div
              className="flex flex-wrap gap-4 mt-10"
              style={{ animation: "fade-up 0.5s ease both", animationDelay: "0.4s" }}
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
            </div>
          </motion.div>

          {/* Right — Project Carousel with parallax */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={isMobile ? undefined : { y: imageY }}
          >
            <div className="absolute -top-8 -right-8 w-[80%] h-[80%] bg-accent/10 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-2xl" />
            <div className="relative">
              <HeroCarousel />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="w-full border-t border-white/[0.06] shrink-0">
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
      </div>
    </section>
  );
}
