"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <div className="bg-dark px-5 py-[88px] lg:px-12 relative overflow-hidden noise-overlay">
      <motion.div
        className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[200px] -right-[200px] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 grid-bg opacity-20" />

      <ScrollReveal animation="scaleUp">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8 relative z-2">
          <div>
            <motion.div
              className="inline-block mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="h-[3px] bg-accent rounded-full w-full" />
            </motion.div>
            <h2 className="text-[2rem] lg:text-[2.6rem] font-extrabold leading-[1.12] font-mono text-white max-w-[480px]">
              Creons Quelque Chose d&apos;
              <span className="text-gradient-animated">Exceptionnel</span>
            </h2>
          </div>
          <motion.button
            className="bg-accent text-dark px-8 py-3.5 rounded-lg font-bold text-[0.9rem] border-none whitespace-nowrap cursor-pointer relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(14, 165, 233, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">Parlons de votre projet &#8594;</span>
          </motion.button>
        </div>
      </ScrollReveal>
    </div>
  );
}
