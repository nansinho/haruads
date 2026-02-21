"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.role) {
          setUserRole(data.user.role);
        }
      })
      .catch(() => {});
  }, []);

  const buttonLabel =
    userRole === "admin"
      ? "Administration"
      : userRole
        ? "Espace Client"
        : "Connexion";

  const buttonHref =
    userRole === "admin"
      ? "/admin"
      : userRole
        ? "/espace-client"
        : "/auth/login";

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
      {/* Scroll progress bar — hidden on mobile to avoid layout recalculations */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-cyan origin-left z-[200] hidden md:block"
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

        <Link href="/" className="flex items-center gap-2.5 group relative" title="Agence HDS - Accueil">
          <Image src="/images/logos/logo-hds-2026-blanc.svg" alt="Agence HDS - Agence web créative à Aix-en-Provence" width={120} height={32} className="h-8 w-auto" priority />
        </Link>

        <ul className="hidden lg:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[0.82rem] font-medium text-white/40 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href={buttonHref}
            className="flex items-center gap-2 border border-white/[0.12] text-white/60 hover:text-white hover:border-white/[0.25] px-5 py-2.5 rounded-full font-medium text-[0.8rem] cursor-pointer transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {userRole === "admin" ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
            <span>{buttonLabel}</span>
          </motion.a>
          <motion.a
            href="/contact"
            className="flex items-center gap-2 bg-accent text-dark px-5 py-2.5 rounded-full font-medium text-[0.8rem] cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Contactez-nous</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-dark fill-none stroke-2 relative z-10">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </div>

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
                    <Link
                      href={link.href}
                      className="block py-3 text-[0.95rem] font-medium text-white/60 hover:text-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 mt-4 relative z-10">
                <Link
                  href={buttonHref}
                  className="block border border-white/[0.12] text-white/60 px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {buttonLabel}
                </Link>
                <Link
                  href="/contact"
                  className="block bg-accent text-dark px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Contactez-nous
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
