import ScrollReveal from "./ScrollReveal";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-[#f5a623]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const testimonials = [
  {
    text: "L'agence a parfaitement compris nos besoins. Le résultat dépasse nos attentes.",
    initials: "LA",
    name: "Laurent A.",
    role: "Directeur, StartupTech",
  },
  {
    text: "Expertise technique remarquable. Nos conversions ont augmenté de 40%.",
    initials: "MC",
    name: "Marie C.",
    role: "Fondatrice, BelleMode",
  },
  {
    text: "Livraison dans les temps, communication excellente. Recommandé !",
    initials: "PD",
    name: "Pierre D.",
    role: "CEO, FormaPro",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 mb-12 items-start">
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
              Témoignages
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              What People{" "}
              <span className="text-accent font-mono font-normal">Says</span>
              <br />
              About us
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px]">
              Satisfaction client au cœur de chaque projet.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <div className="bg-white rounded-[14px] p-[26px] border border-border-light">
                {/* Stars */}
                <div className="flex gap-[3px] mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="text-[0.82rem] text-text-secondary leading-[1.7] mb-[18px] italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-dark to-accent flex items-center justify-center font-bold text-[0.78rem] text-dark">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[0.85rem] font-semibold text-text-primary">
                      {t.name}
                    </div>
                    <div className="text-[0.72rem] text-text-muted">
                      {t.role}
                    </div>
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
