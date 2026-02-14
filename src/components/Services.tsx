import ScrollReveal from "./ScrollReveal";

const services = [
  "Branding",
  "Development",
  "UI/UX Design .",
  "Graphic Design",
  "SEO",
];

export default function Services() {
  return (
    <div className="bg-gray-bg" id="services">
      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-start">
          {/* Left */}
          <ScrollReveal>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-text-muted font-semibold mb-2.5">
              Nos Services
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
              What{" "}
              <span className="text-accent font-mono font-normal">
                Services
              </span>
              <br />
              We&apos;re Offering
            </h2>

            <div className="mt-7">
              {services.map((service) => (
                <div
                  key={service}
                  className="group py-[18px] border-b border-border-light first:border-t first:border-border-light flex items-center justify-between cursor-pointer transition-all"
                >
                  <h3 className="font-mono text-[1.3rem] font-normal text-text-primary group-hover:text-accent transition-colors">
                    {service}
                  </h3>
                  <div className="w-9 h-9 rounded-full border border-border-light bg-transparent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 stroke-text-muted fill-none stroke-2 group-hover:stroke-white transition-colors"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] max-w-[440px] mb-5">
              Nos services améliorent votre visibilité en ligne et accélèrent
              votre croissance digitale.
            </p>
            <div className="w-full h-[260px] rounded-2xl bg-gradient-to-br from-[#011025] to-[#010918] flex items-center justify-center overflow-hidden">
              <span className="text-[4.5rem] font-black text-[rgba(37,99,235,0.08)] font-mono">
                {"</>"}
              </span>
            </div>
            <p className="text-[0.82rem] text-text-secondary leading-[1.75] mt-4">
              Le web design évolue constamment. Nos solutions créent des
              expériences digitales mémorables.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
