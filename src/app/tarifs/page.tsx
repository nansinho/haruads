"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DevisBuilder from "@/components/devis/DevisBuilder";

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                Devis
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Demandez votre </span>
                <span className="font-serif italic text-accent">devis.</span>
              </h1>
              <p className="text-[0.95rem] text-text-muted mt-5 max-w-[500px] leading-[1.8] font-light">
                Décrivez votre projet, choisissez vos options et recevez un devis
                personnalisé sous 48h.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Devis Builder */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1400px] mx-auto px-5 py-[80px] lg:px-12">
            <DevisBuilder />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
