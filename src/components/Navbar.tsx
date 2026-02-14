"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "#home", active: true },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
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
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-5 py-3 lg:px-12 transition-all duration-500 ${
        scrolled
          ? "lg:py-3 bg-[rgba(1,8,23,0.95)] backdrop-blur-[20px] border-b border-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "lg:py-4 bg-[rgba(1,8,23,0.85)] backdrop-blur-[16px] border-b border-border-dark"
      }`}
    >
      <a href="#" className="flex items-center gap-2 font-bold text-[1.05rem] text-white group">
        <motion.div
          className="w-8 h-8 rounded-full bg-accent text-dark flex items-center justify-center font-extrabold text-[0.85rem]"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          H
        </motion.div>
        <span className="group-hover:text-accent transition-colors duration-300">Agence HDS</span>
      </a>

      {/* Desktop nav */}
      <ul className="hidden lg:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`relative text-[0.88rem] font-medium transition-colors duration-300 ${
                link.active ? "text-accent" : "text-white/70 hover:text-accent"
              }`}
            >
              {link.label}
              {link.active && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <motion.button
        className="hidden lg:block bg-accent text-dark px-[22px] py-[10px] rounded-md font-semibold text-[0.85rem] border-none cursor-pointer relative overflow-hidden"
        whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative z-10">Contactez-nous</span>
      </motion.button>

      {/* Hamburger */}
      <button
        className="lg:hidden bg-transparent border-none cursor-pointer w-8 h-8 relative flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <motion.span
          className="absolute w-[22px] h-[2px] bg-white rounded-full"
          animate={{
            rotate: menuOpen ? 45 : 0,
            y: menuOpen ? 0 : -6,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute w-[22px] h-[2px] bg-white rounded-full"
          animate={{
            opacity: menuOpen ? 0 : 1,
            x: menuOpen ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute w-[22px] h-[2px] bg-white rounded-full"
          animate={{
            rotate: menuOpen ? -45 : 0,
            y: menuOpen ? 0 : 6,
          }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 right-0 flex flex-col gap-1 list-none bg-[rgba(1,8,23,0.98)] backdrop-blur-[20px] p-5 px-8 border-b border-accent/10 lg:hidden overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <a
                  href={link.href}
                  className={`block py-3 text-[0.95rem] font-medium transition-colors ${
                    link.active ? "text-accent" : "text-white/70 hover:text-accent"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
            >
              <button className="bg-accent text-dark px-[22px] py-[10px] rounded-md font-semibold text-[0.85rem] border-none w-full mt-2 cursor-pointer">
                Contactez-nous
              </button>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
