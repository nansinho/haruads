"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Finance Mobile App",
    desc: "Dashboard interactif et analyses temps reel.",
    tags: ["Next.js", "Supabase"],
    image: "/images/projects/project-dashboard.jpg",
  },
  {
    title: "E-learning Dashboard",
    desc: "Formation avec suivi des progres.",
    tags: ["React", "Node.js"],
    image: "/images/projects/neuralia-project.webp",
  },
  {
    title: "Landing Page",
    desc: "Page de vente optimisee pour la conversion.",
    tags: ["HTML/CSS", "GSAP"],
    image: "/images/projects/project-landing.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Projects() {
  return (
    <div className="bg-dark text-white relative overflow-hidden" id="projects">
      <div className="absolute -left-[200px] bottom-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-11 items-end">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              Nos Projets
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight">
              Decouvrez Nos
              <br />
              <span className="text-gradient-animated font-mono font-normal">
                Realisations
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="lg:text-right" animation="fadeRight">
            <p className="text-[0.82rem] text-white/50 leading-[1.75] max-w-[440px] lg:ml-auto">
              Solutions digitales sur mesure pour des clients ambitieux.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-accent font-semibold text-[0.85rem] mt-[18px] lg:justify-end"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Voir tous les projets
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="bg-dark-2 rounded-[14px] overflow-hidden border border-border-dark group cursor-pointer relative"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4 },
                }}
              >
                <div className="h-[185px] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                  {/* View button on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[0.75rem] font-semibold">
                      Voir le projet &#8594;
                    </div>
                  </motion.div>
                </div>
                <div className="p-[18px]">
                  <h4 className="text-[0.92rem] font-bold mb-1.5 text-white group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-[0.74rem] text-white/45 leading-[1.5]">
                    {project.desc}
                  </p>
                  <div className="flex gap-1.5 mt-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[0.67rem] font-medium group-hover:bg-accent/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal animation="fadeUp" delay={300}>
          <div className="text-center mt-10">
            <motion.button
              className="px-7 py-3 rounded-lg bg-accent text-dark font-bold text-[0.85rem] border-none cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(14,165,233,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Voir tous nos projets &#8594;
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
