"use client";

import { motion } from "framer-motion";

const links = {
  navigation: [
    { label: "Accueil", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projects" },
    { label: "Tarifs", href: "#pricing" },
  ],
  company: [
    { label: "A Propos", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Carrieres", href: "#" },
    { label: "Mentions Legales", href: "#" },
  ],
  contact: [
    { label: "contact@agencehds.fr", href: "mailto:contact@agencehds.fr" },
    { label: "+33 6 XX XX XX XX", href: "tel:+33600000000" },
    { label: "Aix-en-Provence, France", href: "#" },
  ],
};

const socials = [
  { name: "Facebook", icon: "Fb" },
  { name: "Twitter", icon: "Tw" },
  { name: "Instagram", icon: "Ig" },
  { name: "LinkedIn", icon: "Li" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-2 text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-6 pt-16 pb-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-14 mb-14">
          {/* Brand column */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logos/logo-hds.svg" alt="Agence HDS" className="h-8 w-auto mb-5" />
            <p className="text-[0.82rem] text-white/25 leading-[1.8] max-w-[280px]">
              Studio web creatif specialise en developpement web et solutions digitales sur mesure.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={social.name}
                >
                  <span className="text-[0.55rem] uppercase text-white/25 group-hover:text-dark font-display font-bold transition-colors">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-[0.75rem] font-display font-bold mb-5 text-white/35 uppercase tracking-[3px]">
              Navigation
            </h5>
            <ul className="list-none space-y-3">
              {links.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.82rem] text-white/20 hover:text-accent transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[0.75rem] font-display font-bold mb-5 text-white/35 uppercase tracking-[3px]">
              Entreprise
            </h5>
            <ul className="list-none space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.82rem] text-white/20 hover:text-accent transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[0.75rem] font-display font-bold mb-5 text-white/35 uppercase tracking-[3px]">
              Contact
            </h5>
            <ul className="list-none space-y-3">
              {links.contact.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.82rem] text-white/20 hover:text-accent transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between text-[0.7rem] text-white/15 gap-3">
          <span>&copy; 2024 Agence HDS. Tous droits reserves.</span>
          <span className="flex items-center gap-1.5">
            Concu avec
            <motion.span
              className="text-accent"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &hearts;
            </motion.span>
            a Aix-en-Provence
          </span>
        </div>
      </div>
    </footer>
  );
}
