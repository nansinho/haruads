"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

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
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-dark"
      id="home"
    >
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh-1" />

      {/* Geometric accent elements */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-[300px] h-[300px] rounded-full border border-accent/[0.06] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[18%] right-[10%] w-[200px] h-[200px] rounded-full border border-violet/[0.04] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating accent dot */}
      <motion.div
        className="absolute top-[25%] left-[12%] w-2 h-2 rounded-full bg-accent/30 pointer-events-none"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 rounded-full bg-violet/30 pointer-events-none"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 pt-[120px] relative z-10">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-[0.7rem] uppercase tracking-[4px] text-white/30 font-body font-medium">
            Studio Web Creatif &mdash; Aix-en-Provence
          </span>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-[1100px]">
          <motion.h1
            className="font-display font-extrabold text-[2.8rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.92] tracking-[-0.04em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="block text-cream"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            >
              Nous creons des
            </motion.span>
            <motion.span
              className="block text-cream"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease }}
            >
              experiences{" "}
              <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.12em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="text-gradient-warm inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-center text-[0.95rem] lg:text-[1.1rem] text-white/30 mt-8 max-w-[540px] leading-[1.8] font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          Design UI/UX, developpement web et solutions e-commerce sur mesure
          pour propulser votre business au niveau superieur.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          <motion.a
            href="#contact"
            className="btn-primary px-9 py-4 text-[0.9rem] font-display font-bold cursor-pointer inline-flex items-center gap-2.5"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Demarrer un projet
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <motion.a
            href="#projects"
            className="btn-outline px-9 py-4 text-[0.9rem] font-display cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir nos projets
          </motion.a>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          className="mt-20 lg:mt-24 w-full max-w-[1060px] mx-auto relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease }}
        >
          {/* Glow */}
          <div className="absolute -inset-8 bg-accent/[0.03] rounded-3xl blur-3xl pointer-events-none" />
          <div className="absolute -inset-4 bg-violet/[0.02] rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative rounded-2xl border border-white/[0.06] bg-dark-2 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
            {/* Browser bar */}
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.04] bg-dark-3/80">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/[0.06] hover:bg-[#ff5f57] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-white/[0.06] hover:bg-[#febc2e] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-white/[0.06] hover:bg-[#28c840] transition-colors" />
              </div>
              <div className="flex-1 mx-12">
                <div className="bg-white/[0.03] rounded-lg px-4 py-1.5 text-[0.7rem] text-white/20 text-center font-mono">
                  agencehds.fr
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/projects/project-dashboard.jpg"
              alt="Dashboard HDS"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Partners marquee */}
      <motion.div
        className="mt-16 lg:mt-20 pb-12 lg:pb-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease }}
      >
        <div className="text-center mb-6">
          <span className="text-[0.65rem] uppercase tracking-[4px] text-white/15 font-body">
            Technologies & Partenaires
          </span>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { duration: 35, repeat: Infinity, ease: "linear" } }}
          >
            {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <div key={`${p.name}-${i}`} className="flex items-center px-10 lg:px-16 shrink-0 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-5 lg:h-6 w-auto opacity-15 group-hover:opacity-35 transition-opacity duration-500 [filter:brightness(0)_invert(1)]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section divider */}
      <div className="section-line" />
    </section>
  );
}
