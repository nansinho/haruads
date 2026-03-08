"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Testimonials() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.trustindex.io/loader.js?e4905f627cbf403ea99639046d0";
    script.async = true;
    script.defer = true;
    widgetRef.current?.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="bg-dark text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[120px] lg:px-12 relative z-2">
        <ScrollReveal animation="blur">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                T&eacute;moignages
              </span>
              <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Ce que disent </span>
                <span className="font-serif italic">nos clients.</span>
              </h2>
            </div>

            {/* Widget Trustindex - vrais avis Google */}
            <div ref={widgetRef} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
