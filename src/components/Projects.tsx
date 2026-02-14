import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Finance Mobile App",
    desc: "Dashboard interactif et analyses temps réel.",
    tags: ["Next.js", "Supabase"],
    gradient: "from-[#011025] to-[#010918]",
  },
  {
    title: "E-learning Dashboard",
    desc: "Formation avec suivi des progrès.",
    tags: ["React", "Node.js"],
    gradient: "from-[#010c1a] to-[#010818]",
  },
  {
    title: "Landing Page",
    desc: "Page de vente optimisée pour la conversion.",
    tags: ["HTML/CSS", "GSAP"],
    gradient: "from-[#0a0830] to-[#080620]",
  },
];

export default function Projects() {
  return (
    <div className="bg-white border-t border-border-light" id="projects">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-11 items-end">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
              Nos Projets
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              Discover Our
              <br />
              <span className="text-accent font-mono font-normal">
                Selected Projects
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="lg:text-right">
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] lg:ml-auto">
              Solutions digitales sur mesure pour des clients ambitieux.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-accent font-semibold text-[0.85rem] hover:gap-3 transition-all mt-[18px] lg:justify-end"
            >
              Voir tous les projets →
            </a>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 80}>
              <div className="bg-white rounded-[14px] overflow-hidden border border-border-light hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-350">
                <div
                  className={`h-[185px] bg-gradient-to-br ${project.gradient}`}
                />
                <div className="p-[18px]">
                  <h4 className="text-[0.92rem] font-bold mb-1.5">
                    {project.title}
                  </h4>
                  <p className="text-[0.74rem] text-text-muted leading-[1.5]">
                    {project.desc}
                  </p>
                  <div className="flex gap-1.5 mt-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-accent-dim text-accent-hover text-[0.67rem] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
