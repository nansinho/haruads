"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    image: "https://picsum.photos/id/1/1280/500",
    tag: "Vidéo",
    title: "Création d'un site e-commerce pour AÏAKO",
    desc: "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.",
    cta: "Voir le projet →",
  },
  {
    image: "https://picsum.photos/id/60/1280/500",
    tag: "Article",
    title: "Dashboard de formation C&CO",
    desc: "Plateforme SaaS multi-tenant avec gestion des programmes et des utilisateurs.",
    cta: "Lire l'article →",
  },
  {
    image: "https://picsum.photos/id/180/1280/500",
    tag: "Vidéo",
    title: "Refonte UI/UX pour une application fintech",
    desc: "Design system complet et prototypage interactif avec Figma.",
    cta: "Voir le projet →",
  },
  {
    image: "https://picsum.photos/id/119/1280/500",
    tag: "Article",
    title: "Landing page haute conversion pour startup",
    desc: "Optimisation SEO et animations GSAP pour un taux de conversion record.",
    cta: "Lire l'article →",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

  const goTo = (n: number) => {
    setCurrent(((n % slides.length) + slides.length) % slides.length);
    startAuto();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) { goTo(current + 1); } else { goTo(current - 1); }
    }
  };

  return (
    <div className="bg-dark text-white relative overflow-hidden" id="home">
      <section className="pt-[100px] pb-[50px] px-5 lg:pt-[120px] lg:pb-[60px] lg:px-12 max-w-[1280px] mx-auto relative z-2">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-9 lg:gap-10 items-start mb-9">
          {/* Left */}
          <div className="animate-fade-up">
            <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight">
              We Are{" "}
              <span className="font-mono font-normal text-accent">
                Creative
              </span>
            </h1>
            <div className="flex items-center gap-3 mt-[18px]">
              <div className="w-9 h-px bg-white/30" />
              <span className="text-[0.68rem] text-white/50 uppercase tracking-[1.5px]">
                Fondée en
              </span>
            </div>
            <div className="flex items-baseline gap-3.5 mt-0.5">
              <span className="text-[2rem] lg:text-[2.4rem] font-extrabold">
                2024
              </span>
              <span className="text-[2rem] lg:text-[2.4rem] font-extrabold">
                Digital Agency
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-start pt-0 lg:pt-2 opacity-0 animate-fade-up-delay">
            <p className="text-[0.82rem] text-white/55 leading-[1.7] mb-6">
              Nous sommes une agence web créative qui propose des services de
              haute qualité pour propulser votre entreprise vers le succès
              digital.
            </p>
            <div className="flex flex-wrap gap-5 lg:gap-7">
              <div>
                <div className="text-[1.4rem] font-extrabold text-white">
                  12<span className="text-accent">+</span>
                </div>
                <div className="text-[0.65rem] text-white/45 mt-0.5">
                  Ans
                  <br />
                  d&apos;expérience
                </div>
              </div>
              <div>
                <div className="text-[1.4rem] font-extrabold text-white">
                  8.3K<span className="text-accent">+</span>
                </div>
                <div className="text-[0.65rem] text-white/45 mt-0.5">
                  Projets
                  <br />
                  réalisés
                </div>
              </div>
              <div>
                <div className="text-[1.4rem] font-extrabold text-white">
                  4.2K<span className="text-accent">+</span>
                </div>
                <div className="text-[0.65rem] text-white/45 mt-0.5">
                  Clients
                  <br />
                  satisfaits
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] opacity-0 animate-fade-up-delay-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track */}
          <div
            className="flex w-full h-full"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="min-w-full h-full relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover block"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(1,8,23,0.8)] via-[rgba(1,8,23,0.2)] to-[rgba(1,8,23,0.1)]" />
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-7 lg:left-8 lg:right-8 z-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-accent text-dark text-[0.68rem] font-bold uppercase tracking-wider mb-2">
                      {slide.tag}
                    </span>
                    <div className="text-base lg:text-[1.3rem] font-bold text-white leading-[1.3] max-w-[500px]">
                      {slide.title}
                    </div>
                    <div className="text-[0.78rem] text-white/65 mt-1 max-w-[500px]">
                      {slide.desc}
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-lg bg-white/10 backdrop-blur-[8px] border border-white/15 text-white text-[0.82rem] font-semibold whitespace-nowrap shrink-0 hover:bg-accent hover:border-accent hover:text-dark transition-all cursor-pointer">
                    {slide.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-[8px] border border-white/15 flex items-center justify-center z-3 hover:bg-accent hover:border-accent transition-all cursor-pointer group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-white fill-none stroke-2 group-hover:stroke-dark"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-[8px] border border-white/15 flex items-center justify-center z-3 hover:bg-accent hover:border-accent transition-all cursor-pointer group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-white fill-none stroke-2 group-hover:stroke-dark"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full border-none transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 bg-accent"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
