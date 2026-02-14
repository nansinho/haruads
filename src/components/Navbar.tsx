"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-5 py-4 lg:px-12 transition-all duration-500 ${
        scrolled
          ? "py-3 lg:py-3 bg-dark/95 backdrop-blur-[20px] border-b border-border-dark"
          : "bg-transparent"
      }`}
    >
      <a href="#" className="flex items-center gap-2.5 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logos/logo-hds.svg" alt="Agence HDS" className="h-8 w-auto" />
      </a>

      <ul className="hidden lg:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-[0.82rem] font-medium text-white/50 hover:text-accent transition-colors duration-300">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <motion.a
        href="#"
        className="hidden lg:flex items-center gap-2 bg-accent text-dark px-5 py-2.5 rounded-full font-semibold text-[0.8rem] cursor-pointer"
        whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(200,255,0,0.2)" }}
        whileTap={{ scale: 0.97 }}
      >
        Contactez-nous
      </motion.a>

      <button
        className="lg:hidden bg-transparent border-none cursor-pointer w-8 h-8 relative flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <motion.span className="absolute w-5 h-[1.5px] bg-white rounded-full" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -5 }} transition={{ duration: 0.3 }} />
        <motion.span className="absolute w-5 h-[1.5px] bg-white rounded-full" animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
        <motion.span className="absolute w-5 h-[1.5px] bg-white rounded-full" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 5 }} transition={{ duration: 0.3 }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-dark/98 backdrop-blur-[20px] border-b border-border-dark p-6 lg:hidden"
          >
            <ul className="list-none flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li key={link.label} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.3 }}>
                  <a href={link.href} className="block py-3 text-[0.95rem] font-medium text-white/60 hover:text-accent transition-colors" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#" className="block mt-4 bg-accent text-dark px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center">
              Contactez-nous
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
