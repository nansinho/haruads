"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projets", href: "/projets" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "A Propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-cyan origin-left z-[200]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-5 py-4 lg:px-12 transition-all duration-500 ${
          scrolled
            ? "py-3 lg:py-3 bg-dark/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        {scrolled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        )}

        <a href="/" className="flex items-center gap-2.5 group relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logos/logo-hds.svg" alt="Agence HDS" className="h-8 w-auto" />
        </a>

        <ul className="hidden lg:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[0.82rem] font-medium text-white/40 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="/contact"
          className="hidden lg:flex items-center gap-2 bg-accent text-dark px-5 py-2.5 rounded-full font-medium text-[0.8rem] cursor-pointer relative overflow-hidden"
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.1)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Contactez-nous</span>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-dark fill-none stroke-2 relative z-10">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>

        {/* Mobile menu button */}
        <button
          className="lg:hidden bg-transparent border-none cursor-pointer w-8 h-8 relative flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -5 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 5 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-2xl border-b border-white/[0.04] p-6 lg:hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <ul className="list-none flex flex-col gap-1 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      className="block py-3 text-[0.95rem] font-medium text-white/60 hover:text-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="/contact"
                className="block mt-4 bg-accent text-dark px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center relative z-10"
                onClick={() => setMenuOpen(false)}
              >
                Contactez-nous
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
