"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/images/hero-team.jpg",
    tag: "Projet",
    title: "Creation d'un site e-commerce pour AIAKO",
    desc: "Migration WooCommerce vers Next.js + Supabase avec paiement Monetico.",
    cta: "Voir le projet",
  },
  {
    image: "/images/blog-team-collaboration.jpg",
    tag: "Projet",
    title: "Dashboard de formation C&CO",
    desc: "Plateforme SaaS multi-tenant avec gestion des programmes et des utilisateurs.",
    cta: "Voir le projet",
  },
  {
    image: "/images/ai-personalization.jpg",
    tag: "Design",
    title: "Refonte UI/UX pour une application fintech",
    desc: "Design system complet et prototypage interactif avec Figma.",
    cta: "Voir le projet",
  },
  {
    image: "/images/blog-design-trends.jpg",
    tag: "Marketing",
    title: "Landing page haute conversion pour startup",
    desc: "Optimisation SEO et animations pour un taux de conversion record.",
    cta: "Voir le projet",
  },
];

const stats = [
  { value: "50", suffix: "+", label: "Projets\nrealises" },
  { value: "30", suffix: "+", label: "Clients\nsatisfaits" },
  { value: "3", suffix: "+", label: "Ans\nd'expertise" },
];

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[80px] pointer-events-none ${className}`}
      animate={{ y: [0, -30, 10, 0], x: [0, 15, -10, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const isK = value.includes("K");
          const num = parseFloat(value.replace("K", ""));
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * num;
            setCount(isK ? current.toFixed(1) + "K" : Math.floor(current).toString());
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-[1.6rem] font-extrabold text-white">
      {count}<span className="text-gradient-animated">{suffix}</span>
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
  }, []);

  useEffect(() => { startAuto(); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [startAuto]);

  const goTo = (n: number) => { setCurrent(((n % slides.length) + slides.length) % slides.length); startAuto(); };
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => { const dx = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1); };

  return (
    <div className="bg-dark text-white relative overflow-hidden noise-overlay min-h-screen flex flex-col" id="home">
      <FloatingOrb className="w-[500px] h-[500px] bg-accent/5 -top-[200px] -left-[200px]" />
      <FloatingOrb className="w-[400px] h-[400px] bg-accent/8 -bottom-[100px] -right-[150px]" delay={3} />
      <FloatingOrb className="w-[200px] h-[200px] bg-blue-500/5 top-1/2 left-1/3" delay={5} />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <section className="pt-[100px] pb-4 px-5 lg:pt-[120px] lg:pb-4 lg:px-12 max-w-[1280px] mx-auto relative z-2 flex-1 flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start mb-6">
          <div>
            <motion.div initial={{ width: 0 }} animate={{ width: "3rem" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="h-[3px] bg-accent mb-5 rounded-full" />
            <motion.h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.span className="inline-block" initial={{ opacity: 0, y: 40, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                Nous Sommes{" "}
              </motion.span>
              <motion.span className="inline-block font-mono font-normal text-gradient-animated" initial={{ opacity: 0, y: 40, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
                Creatifs
              </motion.span>
            </motion.h1>

            <motion.div className="flex items-center gap-3 mt-[14px]" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <motion.div className="h-px bg-white/30" initial={{ width: 0 }} animate={{ width: "2.25rem" }} transition={{ duration: 0.8, delay: 0.6 }} />
              <span className="text-[0.68rem] text-white/50 uppercase tracking-[1.5px]">Fondee en</span>
            </motion.div>

            <motion.div className="flex items-baseline gap-3.5 mt-0.5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <span className="text-[2rem] lg:text-[2.4rem] font-extrabold">2024</span>
              <span className="text-[2rem] lg:text-[2.4rem] font-extrabold">Agence Digitale</span>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3 mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
              <motion.button className="px-7 py-3 rounded-lg bg-accent text-dark font-bold text-[0.88rem] border-none cursor-pointer" whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(14,165,233,0.4)" }} whileTap={{ scale: 0.97 }}>
                Demarrer un projet &#8594;
              </motion.button>
              <motion.button className="px-7 py-3 rounded-lg bg-transparent text-white font-semibold text-[0.88rem] border border-white/20 cursor-pointer hover:border-accent hover:text-accent transition-colors duration-300" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Voir nos realisations
              </motion.button>
            </motion.div>
          </div>

          <motion.div className="flex flex-col justify-start pt-0 lg:pt-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <p className="text-[0.82rem] text-white/55 leading-[1.7] mb-6">
              Nous sommes une agence web creative qui propose des services de haute qualite pour propulser votre entreprise vers le succes digital.
            </p>
            <div className="flex flex-wrap gap-5 lg:gap-7">
              {stats.map((stat, i) => (
                <motion.div key={stat.value} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <div className="text-[0.65rem] text-white/45 mt-0.5 whitespace-pre-line">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Slider */}
        <motion.div className="relative w-full rounded-2xl overflow-hidden flex-1 min-h-[200px] group" initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex w-full h-full" style={{ transform: `translateX(-${current * 100}%)`, transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {slides.map((slide, i) => (
              <div key={i} className="min-w-full h-full relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover block transition-transform duration-[1.2s]" style={{ transform: i === current ? "scale(1.05)" : "scale(1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.3)] to-[rgba(10,10,10,0.1)]" />
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-7 lg:left-8 lg:right-8 z-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
                  <AnimatePresence mode="wait">
                    {i === current && (
                      <motion.div key={`slide-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                        <span className="inline-block px-3 py-1 rounded bg-accent text-dark text-[0.68rem] font-bold uppercase tracking-wider mb-2">{slide.tag}</span>
                        <div className="text-base lg:text-[1.3rem] font-bold text-white leading-[1.3] max-w-[500px]">{slide.title}</div>
                        <div className="text-[0.78rem] text-white/65 mt-1 max-w-[500px]">{slide.desc}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button className="px-6 py-2.5 rounded-lg bg-white/10 backdrop-blur-[8px] border border-white/15 text-white text-[0.82rem] font-semibold whitespace-nowrap shrink-0 hover:bg-accent hover:border-accent hover:text-dark transition-all duration-300 cursor-pointer">
                    {slides[current].cta} &#8594;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => goTo(current - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-[8px] border border-white/15 flex items-center justify-center z-3 hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300 cursor-pointer group opacity-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2 group-hover:stroke-dark transition-colors"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={() => goTo(current + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-[8px] border border-white/15 flex items-center justify-center z-3 hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300 cursor-pointer group opacity-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2 group-hover:stroke-dark transition-colors"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-3">
            <motion.div className="h-full bg-accent" key={current} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-3">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="relative h-2 rounded-full border-none transition-all duration-500 cursor-pointer overflow-hidden" style={{ width: i === current ? "28px" : "8px", backgroundColor: i === current ? "transparent" : "rgba(255,255,255,0.3)" }}>
                {i === current && <motion.div className="absolute inset-0 rounded-full bg-accent" layoutId="activeDot" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="flex flex-col items-center py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <span className="text-[0.65rem] text-white/30 uppercase tracking-[2px] mb-1">Decouvrir</span>
          <motion.svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white/30 fill-none stroke-2" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </section>
    </div>
  );
}
