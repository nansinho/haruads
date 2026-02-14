"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Tarifs", href: "#pricing" },
  { label: "A Propos", href: "#about" },
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
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-[#FF8A50] to-violet origin-left z-[200]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-6 py-5 lg:px-16 transition-all duration-500 ${
          scrolled
            ? "py-3 lg:py-3 bg-dark/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logos/logo-hds.svg" alt="Agence HDS" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-10 list-none">
          {navLinks.map((link, i) => (
            <li key={link.label}>
              <motion.a
                href={link.href}
                className="text-[0.8rem] font-medium text-white/35 hover:text-cream transition-colors duration-300 relative group font-display tracking-wide uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="hidden lg:flex items-center gap-2 btn-primary px-6 py-2.5 text-[0.8rem] font-display tracking-wide cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Contactez-nous
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* Mobile menu button */}
        <button
          className="lg:hidden bg-transparent border-none cursor-pointer w-9 h-9 relative flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="absolute w-5 h-[1.5px] bg-cream rounded-full"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-cream rounded-full"
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-cream rounded-full"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-2xl border-b border-white/[0.04] p-8 lg:hidden"
            >
              <ul className="list-none flex flex-col gap-1 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      className="block py-3.5 text-[1.1rem] font-display font-semibold text-white/50 hover:text-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                className="block mt-6 btn-primary px-6 py-3.5 font-display font-bold text-[0.9rem] text-center cursor-pointer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Contactez-nous
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
