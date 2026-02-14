"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const services = [
  "Branding",
  "Development",
  "UI/UX Design",
  "Graphic Design",
  "SEO",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function Services() {
  return (
    <div className="bg-gray-bg relative overflow-hidden" id="services">
      {/* Background decoration */}
      <div className="absolute -right-[200px] top-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-start">
          {/* Left */}
          <ScrollReveal animation="fadeLeft">
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              Nos Services
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              What{" "}
              <span className="text-gradient-animated font-mono font-normal">
                Services
              </span>
              <br />
              We&apos;re Offering
            </h2>

            <motion.div
              className="mt-7"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((service, i) => (
                <motion.div
                  key={service}
                  variants={itemVariants}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="group py-[18px] border-b border-border-light first:border-t first:border-border-light flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[0.7rem] text-text-muted font-mono opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                      0{i + 1}
                    </span>
                    <h3 className="font-mono text-[1.3rem] font-normal text-text-primary group-hover:text-accent transition-colors duration-300">
                      {service}
                    </h3>
                  </div>
                  <motion.div
                    className="w-9 h-9 rounded-full border border-border-light bg-transparent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: -45 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-2 group-hover:stroke-white transition-colors duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal animation="fadeRight" delay={200}>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] mb-5">
              Nos services ameliorent votre visibilite en ligne et accelerent
              votre croissance digitale.
            </p>
            <motion.div
              className="w-full h-[260px] rounded-2xl bg-gradient-to-br from-[#011025] to-[#010918] flex items-center justify-center overflow-hidden relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated grid background */}
              <div className="absolute inset-0 grid-bg opacity-50" />

              {/* Floating code element */}
              <motion.span
                className="text-[4.5rem] font-black text-accent/8 font-mono relative z-2 select-none"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(14,165,233,0)",
                    "0 0 40px rgba(14,165,233,0.15)",
                    "0 0 20px rgba(14,165,233,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {"</>"}
              </motion.span>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/15 rounded-tl-md" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/15 rounded-br-md" />
            </motion.div>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] mt-4">
              Le web design evolue constamment. Nos solutions creent des
              experiences digitales memorables.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
