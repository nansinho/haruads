"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

const links = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projets", href: "/projets" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  company: [
    { label: "A Propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
    { label: "Carrieres", href: "#" },
    { label: "Mentions Legales", href: "#" },
  ],
  contact: [
    { label: "contact@agencehds.fr", href: "mailto:contact@agencehds.fr" },
    { label: "+33 6 XX XX XX XX", href: "tel:+33600000000" },
    { label: "Aix-en-Provence, France", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.04] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 pt-14 pb-8 lg:px-12 relative z-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
          <div>
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-[0.8rem] text-white/25 leading-[1.7] max-w-[260px]">
              Agence web creative specialisee en developpement web et solutions digitales sur mesure.
            </p>
            <div className="flex gap-2.5 mt-5">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <span className="text-[0.6rem] uppercase text-white/30 group-hover:text-dark font-bold transition-colors">
                    {social.charAt(0)}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-[0.8rem] font-medium mb-4 text-white/40 uppercase tracking-wider">Navigation</h5>
            <ul className="list-none">
              {links.navigation.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <a href={link.href} className="text-[0.8rem] text-white/25 hover:text-accent transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[0.8rem] font-medium mb-4 text-white/40 uppercase tracking-wider">Entreprise</h5>
            <ul className="list-none">
              {links.company.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <a href={link.href} className="text-[0.8rem] text-white/25 hover:text-accent transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[0.8rem] font-medium mb-4 text-white/40 uppercase tracking-wider">Contact</h5>
            <ul className="list-none">
              {links.contact.map((link) => (
                <li key={link.label} className="mb-2.5">
                  <a href={link.href} className="text-[0.8rem] text-white/25 hover:text-accent transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between text-[0.7rem] text-white/20 gap-2">
          <span>&copy; 2024 Agence HDS. Tous droits reserves.</span>
          <span>Concu avec passion a Aix-en-Provence</span>
        </div>
      </div>
    </footer>
  );
}
