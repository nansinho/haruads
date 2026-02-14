"use client";

import { motion } from "framer-motion";

const quickLinks = [
  { label: "Accueil", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#" },
];

const company = [
  { label: "A Propos", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Carrieres", href: "#" },
  { label: "Mentions Legales", href: "#" },
];

const office = [
  { label: "Aix-en-Provence", href: "#" },
  { label: "contact@agencehds.fr", href: "mailto:contact@agencehds.fr" },
  { label: "+33 6 XX XX XX XX", href: "tel:+33600000000" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const SocialIcon = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.a
    href={href}
    className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
    whileHover={{ scale: 1.15, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

export default function Footer() {
  return (
    <footer className="bg-dark-2 border-t border-border-dark pt-[52px] px-5 lg:px-12 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-7 lg:gap-10 relative z-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
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
          <p className="text-[0.78rem] text-white/45 leading-[1.7] max-w-[280px] my-3">
            Agence web creative, solutions digitales modernes et performantes.
          </p>
          <div className="flex gap-2.5">
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark transition-colors duration-300">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark transition-colors duration-300">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white/50 fill-none group-hover:stroke-dark transition-colors duration-300" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white/50 group-hover:fill-dark transition-colors duration-300">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </SocialIcon>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Liens Rapides
          </h5>
          <ul className="list-none">
            {quickLinks.map((link) => (
              <li key={link.label} className="mb-2.5">
                <motion.a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Entreprise
          </h5>
          <ul className="list-none">
            {company.map((link) => (
              <li key={link.label} className="mb-2.5">
                <motion.a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <h5 className="text-[0.88rem] font-bold mb-[18px] text-white">
            Bureau
          </h5>
          <ul className="list-none">
            {office.map((link) => (
              <li key={link.label} className="mb-2.5">
                <motion.a
                  href={link.href}
                  className="text-[0.8rem] text-white/45 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-[1280px] mx-auto mt-9 py-5 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between text-[0.72rem] text-white/35 gap-2 relative z-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span>&copy; 2024 Agence HDS. Tous droits reserves.</span>
        <span>Concu avec passion en Provence</span>
      </motion.div>
    </footer>
  );
}
