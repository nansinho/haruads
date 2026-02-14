import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: "📋",
    title: "Briefing",
    desc: "Analyse de vos besoins et objectifs pour définir le périmètre du projet.",
  },
  {
    icon: "💡",
    title: "Idea",
    desc: "Maquettes et prototypes pour valider l'architecture et le design.",
  },
  {
    icon: "⚙️",
    title: "Processing",
    desc: "Développement avec les meilleures technologies pour votre projet.",
  },
  {
    icon: "🚀",
    title: "Finishing",
    desc: "Tests, déploiement et formation pour une mise en production réussie.",
  },
];

export default function HowWeWork() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-[60px] items-end">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
              Notre Processus
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              How do We{" "}
              <span className="text-accent font-mono font-normal">Work?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px]">
              Un processus structuré pour transformer vos idées en réalité.
              Chaque étape garantit qualité et satisfaction.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 80}>
              <div className="text-center px-3.5 py-5">
                <div className="w-[50px] h-[50px] rounded-[14px] bg-accent-dim mx-auto mb-3.5 flex items-center justify-center text-[1.2rem]">
                  {step.icon}
                </div>
                <h4 className="text-[0.92rem] font-bold mb-2 font-mono text-text-primary">
                  {step.title}
                </h4>
                <p className="text-[0.74rem] text-text-muted leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
