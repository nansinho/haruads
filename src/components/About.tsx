"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <div className="bg-white relative" id="about" ref={sectionRef}>
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-center">
          <ScrollReveal animation="fadeLeft">
            <motion.div
              className="rounded-[18px] h-[300px] lg:h-[400px] bg-gradient-to-br from-[#e8f0f8] to-[#d0e0f0] relative overflow-hidden"
              style={{ y: imageY, scale: imageScale }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(14,165,233,0.15),transparent_60%)]" />

              {/* Decorative floating elements */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 rounded-xl border-2 border-accent/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-12 left-12 w-10 h-10 rounded-full bg-accent/10"
                animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[4rem] font-black text-accent/10 font-mono">HDS</span>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={200}>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              A Propos
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              Why You Should
              <br />
              Choose{" "}
              <span className="text-gradient-animated font-mono font-normal">
                Agence HDS
              </span>
            </h2>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] mt-4">
              Nous sommes une agence digitale specialisee en developpement web,
              design UI/UX et solutions e-commerce sur mesure. Notre approche
              combine creativite et expertise technique.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-accent font-semibold text-[0.85rem] mt-[18px] group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              En savoir plus
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &#8594;
              </motion.span>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
