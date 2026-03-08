"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface DevisSuccessProps {
  reference: string;
}

export default function DevisSuccess({ reference }: DevisSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-accent stroke-2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-[1.6rem] sm:text-[2rem] font-light tracking-[-0.01em] mb-3">
        Demande <span className="font-serif italic text-accent">envoyée</span>
      </h2>

      <p className="text-[0.95rem] text-text-body mb-2">
        Votre demande de devis a bien été enregistrée.
      </p>

      <div className="inline-block bg-accent/10 text-accent font-mono text-[0.9rem] font-semibold px-5 py-2.5 rounded-lg mb-6">
        {reference}
      </div>

      <p className="text-[0.85rem] text-text-body max-w-[400px] mx-auto leading-[1.7] mb-8">
        Notre équipe va analyser votre projet et vous recontactera sous <strong>48 heures</strong>.
        Un email de confirmation vous a été envoyé.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-medium text-[0.85rem] hover:shadow-lg hover:shadow-accent/20 transition-all"
      >
        Retour à l&apos;accueil
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </motion.div>
  );
}
