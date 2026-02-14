"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "What is Agence HDS ?",
    a: "Agence web spécialisée en création de sites, applications et e-commerce sur mesure.",
  },
  {
    q: "What benefits can be provided by Agence HDS ?",
    a: "Développement web, design UI/UX, branding, SEO et maintenance personnalisés.",
  },
  {
    q: "How long does it take to complete a project ?",
    a: "Site vitrine 2-4 semaines, application 6-12 semaines, e-commerce 8-16 semaines.",
  },
  {
    q: "What to do if you are not satisfied with the work ?",
    a: "Révisions incluses. Validations à chaque étape pour garantir votre satisfaction.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white border-t border-border-light">
      <div className="max-w-[780px] mx-auto px-5 py-[88px] lg:px-12">
        <ScrollReveal className="text-center">
          <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight text-text-primary">
            Frequently Asked{" "}
            <span className="text-accent font-mono font-normal">
              Questions
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-11">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border-light">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-5 flex items-center justify-between bg-transparent border-none text-text-primary text-[0.95rem] font-semibold text-left font-sans hover:text-accent transition-colors cursor-pointer"
              >
                {faq.q}
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-[1.1rem] font-light shrink-0 transition-all duration-300 ${
                    openIndex === i
                      ? "bg-accent border-accent text-white rotate-45"
                      : "border-border-light text-text-muted"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{
                  maxHeight: openIndex === i ? "160px" : "0px",
                }}
              >
                <p className="text-[0.82rem] text-text-muted leading-[1.7] pb-5">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
