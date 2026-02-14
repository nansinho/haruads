import ScrollReveal from "./ScrollReveal";

const CheckIcon = () => (
  <span className="w-[18px] h-[18px] rounded-full bg-accent-dim flex items-center justify-center shrink-0">
    <svg
      viewBox="0 0 24 24"
      className="w-2.5 h-2.5 stroke-accent fill-none"
      strokeWidth={3}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const plans = [
  {
    name: "Basic",
    price: "$80",
    desc: "Idéal pour une présence web professionnelle.",
    featured: false,
    features: [
      "Site vitrine responsive",
      "Jusqu'à 5 pages",
      "Formulaire de contact",
      "SEO de base",
      "Hébergement inclus",
    ],
  },
  {
    name: "Advance",
    price: "$299",
    desc: "Solution web complète et performante.",
    featured: true,
    features: [
      "Application web sur mesure",
      "Dashboard admin",
      "Base de données Supabase",
      "Authentification users",
      "Support 6 mois",
    ],
  },
  {
    name: "Premium",
    price: "$349",
    desc: "Projets ambitieux avec fonctionnalités avancées.",
    featured: false,
    features: [
      "E-commerce complet",
      "Paiement en ligne",
      "Multi-langue",
      "API personnalisées",
      "Maintenance 12 mois",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="bg-gray-bg">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
            Nos Tarifs
          </div>
          <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
            Choose Your{" "}
            <span className="text-accent font-mono font-normal">Package</span>
          </h2>
          <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[560px] mx-auto mt-3">
            Formules adaptées à tous les budgets, personnalisables selon vos
            besoins.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 80}>
              <div
                className={`bg-white rounded-[18px] p-[26px] pt-[34px] border flex flex-col hover:-translate-y-1 transition-transform duration-300 ${
                  plan.featured
                    ? "border-accent shadow-[0_0_0_1px_var(--color-accent)]"
                    : "border-border-light"
                }`}
              >
                <div className="text-[0.85rem] font-semibold text-text-secondary mb-3">
                  {plan.name}
                </div>
                <div className="text-[2.5rem] font-extrabold text-text-primary">
                  {plan.price}{" "}
                  <small className="text-[0.85rem] font-normal text-text-muted">
                    /mo
                  </small>
                </div>
                <p className="text-[0.78rem] text-text-muted leading-[1.6] mt-2.5 mb-[22px]">
                  {plan.desc}
                </p>
                <ul className="list-none mb-[26px] flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 py-1.5 text-[0.82rem] text-text-primary"
                    >
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold text-[0.88rem] transition-all cursor-pointer ${
                    plan.featured
                      ? "bg-accent border border-accent text-white hover:bg-accent-hover"
                      : "bg-transparent border border-border-light text-text-primary hover:bg-accent hover:border-accent hover:text-white"
                  }`}
                >
                  Choisir ce plan
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
