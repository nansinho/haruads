"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

function CountUp({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
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
    <div ref={ref} className="text-center">
      <div className="text-[2rem] lg:text-[2.5rem] font-extrabold text-white">
        {count}<span className="text-gradient-animated">{suffix}</span>
      </div>
      <div className="text-[0.75rem] text-white/40 mt-1">{label}</div>
    </div>
  );
}

const aboutStats = [
  { value: 50, suffix: "+", label: "Projets realises" },
  { value: 30, suffix: "+", label: "Clients satisfaits" },
  { value: 3, suffix: "+", label: "Ans d'expertise" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <div className="bg-dark text-white relative overflow-hidden" id="about" ref={sectionRef}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="max-w-[1280px] mx-auto px-5 py-[88px] lg:px-12 relative z-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-16 items-center">
          <ScrollReveal animation="fadeLeft">
            <motion.div className="rounded-[18px] h-[300px] lg:h-[400px] bg-gradient-to-br from-[#0a1628] to-[#060e1e] relative overflow-hidden border border-border-dark" style={{ y: imageY, scale: imageScale }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(14,165,233,0.12),transparent_60%)]" />
              <motion.div className="absolute top-8 right-8 w-16 h-16 rounded-xl border-2 border-accent/15" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute bottom-12 left-12 w-10 h-10 rounded-full bg-accent/8" animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <span className="text-[4rem] font-black text-accent/8 font-mono">HDS</span>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={200}>
            <div className="text-[0.67rem] uppercase tracking-[2.5px] text-accent font-semibold mb-2.5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              A Propos
            </div>
            <h2 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold leading-[1.12] tracking-tight">
              Pourquoi Choisir<br />
              <span className="text-gradient-animated font-mono font-normal">Agence HDS</span>
            </h2>
            <p className="text-[0.82rem] text-white/55 leading-[1.75] max-w-[440px] mt-4">
              Nous sommes une agence digitale specialisee en developpement web, design UI/UX et solutions e-commerce sur mesure. Notre approche combine creativite et expertise technique.
            </p>
            <motion.button className="mt-6 px-7 py-3 rounded-lg bg-accent text-dark font-bold text-[0.85rem] border-none cursor-pointer" whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(14,165,233,0.4)" }} whileTap={{ scale: 0.97 }}>
              Decouvrir notre equipe &#8594;
            </motion.button>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fadeUp" delay={300}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border-dark">
            {aboutStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <CountUp value={stat.value} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
