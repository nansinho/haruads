import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <div className="bg-dark px-5 py-[88px] lg:px-12">
      <ScrollReveal>
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-6">
          <h2 className="text-[2rem] lg:text-[2.6rem] font-extrabold leading-[1.12] font-mono text-white max-w-[480px]">
            Let&apos;s Make Something Together
          </h2>
          <button className="bg-accent text-dark px-8 py-3.5 rounded-lg font-bold text-[0.9rem] border-none hover:bg-accent-hover hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer">
            Let&apos;s Talk →
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
