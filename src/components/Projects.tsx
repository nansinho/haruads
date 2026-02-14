"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Finance Mobile App",
    desc: "Dashboard interactif et analyses temps reel.",
    tags: ["Next.js", "Supabase"],
    gradient: "from-[#011025] to-[#010918]",
    accent: "from-accent/0 to-accent/10",
  },
  {
    title: "E-learning Dashboard",
    desc: "Formation avec suivi des progres.",
    tags: ["React", "Node.js"],
    gradient: "from-[#010c1a] to-[#010818]",
    accent: "from-blue-500/0 to-blue-500/10",
  },
  {
    title: "Landing Page",
    desc: "Page de vente optimisee pour la conversion.",
    tags: ["HTML/CSS", "GSAP"],
    gradient: "from-[#0a0830] to-[#080620]",
    accent: "from-indigo-500/0 to-indigo-500/10",
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
    <div className="bg-white border-t border-border-light relative overflow-hidden" id="projects">
      {/* Background accent */}
      <div className="absolute -left-[200px] bottom-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-11 items-end">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              Nos Projets
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              Discover Our
              <br />
              <span className="text-gradient-animated font-mono font-normal">
                Selected Projects
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="lg:text-right" animation="fadeRight">
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] lg:ml-auto">
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

        {/* Grid */}
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
                className="bg-white rounded-[14px] overflow-hidden border border-border-light group cursor-pointer relative"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  transition: { duration: 0.4 },
                }}
              >
                <div className={`h-[185px] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 grid-bg opacity-30" />

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/10 rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/10 rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                  <h4 className="text-[0.92rem] font-bold mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-[0.74rem] text-text-muted leading-[1.5]">
                    {project.desc}
                  </p>
                  <div className="flex gap-1.5 mt-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-accent-dim text-accent-hover text-[0.67rem] font-medium group-hover:bg-accent/15 transition-colors duration-300"
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
      </div>
    </div>
  );
}
