import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <div className="bg-white" id="about">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="rounded-[18px] h-[300px] lg:h-[400px] bg-gradient-to-br from-[#e8f0f8] to-[#d0e0f0] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(37,99,235,0.12),transparent_60%)]" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
              À Propos
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              Why You Should
              <br />
              Choose{" "}
              <span className="text-accent font-mono font-normal">
                Agence HDS
              </span>
            </h2>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] mt-4">
              Nous sommes une agence digitale spécialisée en développement web,
              design UI/UX et solutions e-commerce sur mesure. Notre approche
              combine créativité et expertise technique.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-accent font-semibold text-[0.85rem] hover:gap-3 transition-all mt-[18px]"
            >
              En savoir plus →
            </a>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
