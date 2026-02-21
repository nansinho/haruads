"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

const links = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projets", href: "/projets" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  company: [
    { label: "À Propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Mentions Légales", href: "/mentions-legales" },
    { label: "Confidentialité & Cookies", href: "/politique-confidentialite" },
    { label: "Plan du Site", href: "/plan-du-site" },
  ],
  contact: [
    { label: "contact@agencehds.fr", href: "mailto:contact@agencehds.fr" },
    { label: "06 24 63 30 54", href: "tel:+33624633054" },
    { label: "Gardanne (13120), Aix-en-Provence", href: "https://maps.google.com/?q=Gardanne+13120+France" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.04] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Pre-footer SEO content */}
      <div className="max-w-[1200px] mx-auto px-5 pt-14 lg:px-12">
        <div className="border-b border-white/[0.04] pb-10">
          <h2 className="text-[1rem] font-semibold text-white/80 mb-4">
            Agence web &agrave; <span className="font-serif italic text-accent">Aix-en-Provence</span>
          </h2>
          <p className="text-[0.78rem] text-white/40 leading-[1.8] max-w-[700px]">
            L&apos;Agence HDS (Harua Digital Studio) accompagne les entreprises et
            entrepreneurs dans leur transformation digitale depuis Gardanne, au c&oelig;ur
            des Bouches-du-Rh&ocirc;ne. Sp&eacute;cialis&eacute;e en{" "}
            <strong className="text-white/50">cr&eacute;ation de sites internet</strong>,{" "}
            <strong className="text-white/50">applications web sur mesure</strong>,{" "}
            <strong className="text-white/50">e-commerce</strong>,{" "}
            <strong className="text-white/50">design UI/UX</strong> et{" "}
            <strong className="text-white/50">r&eacute;f&eacute;rencement naturel (SEO)</strong>,
            nous concevons des solutions digitales performantes pour des clients &agrave;
            Aix-en-Provence, Marseille, Gardanne et partout en France.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-5 pt-10 pb-8 lg:px-12 relative z-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
          <div>
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-[0.8rem] text-white/60 leading-[1.7] max-w-[260px]">
              Agence web cr&eacute;ative sp&eacute;cialis&eacute;e en d&eacute;veloppement web et solutions digitales sur mesure.
            </p>
            <div className="flex gap-2.5 mt-5">
              {[
                { name: "facebook", href: "https://www.facebook.com/HaruaDesignSolutions" },
                { name: "linkedin", href: "https://www.linkedin.com/in/nans-harua/" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
                >
                  <span className="text-[0.6rem] uppercase text-white/30 group-hover:text-dark font-bold transition-colors">
                    {social.name.charAt(0)}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[0.8rem] font-medium mb-4 text-white/60 uppercase tracking-wider">Navigation</h3>
            <ul className="list-none">
              {links.navigation.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <Link href={link.href} className="text-[0.8rem] text-white/60 hover:text-accent transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.8rem] font-medium mb-4 text-white/60 uppercase tracking-wider">Entreprise</h3>
            <ul className="list-none">
              {links.company.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <Link href={link.href} className="text-[0.8rem] text-white/60 hover:text-accent transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.8rem] font-medium mb-4 text-white/60 uppercase tracking-wider">Contact</h3>
            <ul className="list-none">
              {links.contact.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <a href={link.href} className="text-[0.8rem] text-white/60 hover:text-accent transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between text-[0.7rem] text-white/50 gap-2">
          <span>&copy; {new Date().getFullYear()} Agence HDS. Tous droits r&eacute;serv&eacute;s.</span>
          <span>Con&ccedil;u avec passion &agrave; Aix-en-Provence</span>
        </div>
      </div>
    </footer>
  );
}
