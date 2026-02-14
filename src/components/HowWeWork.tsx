"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: "01",
    title: "Brief",
    desc: "Analyse de vos besoins et objectifs pour definir le perimetre du projet.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: "02",
    title: "Conception",
    desc: "Maquettes et prototypes pour valider l'architecture et le design.",
    color: "from-blue-400/20 to-blue-400/5",
  },
  {
    icon: "03",
    title: "Developpement",
    desc: "Developpement avec les meilleures technologies pour votre projet.",
    color: "from-cyan-400/20 to-cyan-400/5",
  },
  {
    icon: "04",
    title: "Livraison",
    desc: "Tests, deploiement et formation pour une mise en production reussie.",
    color: "from-sky-400/20 to-sky-400/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function HowWeWork() {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/2 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-[60px] items-end">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              Notre Processus
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              Comment Nous{" "}
              <span className="text-gradient-animated font-mono font-normal">Travaillons</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeRight">
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px]">
              Un processus structure pour transformer vos idees en realite.
              Chaque etape garantit qualite et satisfaction.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="hidden lg:block absolute top-[50px] left-[12.5%] right-[12.5%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="text-center px-3.5 py-6 rounded-2xl relative group cursor-default"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-2">
                  <motion.div
                    className="w-[50px] h-[50px] rounded-[14px] bg-accent/8 mx-auto mb-3.5 flex items-center justify-center text-accent font-mono font-bold text-[0.9rem] border border-accent/10"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h4 className="text-[0.92rem] font-bold mb-2 font-mono text-text-primary group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-[0.74rem] text-text-muted leading-[1.6]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal animation="fadeUp" delay={400}>
          <div className="text-center mt-12">
            <motion.button
              className="px-7 py-3 rounded-lg bg-accent text-dark font-bold text-[0.85rem] border-none cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(14,165,233,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Commencer votre projet &#8594;
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
