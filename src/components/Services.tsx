"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    num: "01",
    title: "Developpement Web",
    desc: "Sites vitrines, applications web et plateformes SaaS avec les technologies les plus performantes.",
    image: "/images/maintenance-dashboard.jpg",
    glow: "rgba(59,130,246,0.1)",
  },
  {
    num: "02",
    title: "Design UI/UX",
    desc: "Interfaces intuitives et experiences utilisateur memorables pour maximiser vos conversions.",
    image: "/images/ai-content.jpg",
    glow: "rgba(34,211,238,0.1)",
  },
  {
    num: "03",
    title: "E-Commerce",
    desc: "Boutiques en ligne sur mesure avec WooCommerce, Stripe et des solutions de paiement adaptees.",
    image: "/images/booking-calendar.jpg",
    glow: "rgba(59,130,246,0.1)",
  },
  {
    num: "04",
    title: "Branding & SEO",
    desc: "Identite visuelle forte et referencement naturel pour une visibilite maximale.",
    image: "/images/ai-chatbot.jpg",
    glow: "rgba(34,211,238,0.1)",
  },
];

export default function Services() {
  return (
    <div className="bg-dark text-white relative overflow-hidden" id="services">
      {/* Glow orbs */}
      <motion.div
        className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[-8%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
        animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
        <ScrollReveal>
          <div className="max-w-[600px] mb-14">
            <div className="text-[0.7rem] uppercase tracking-[3px] text-accent font-semibold mb-4 flex items-center gap-2.5">
              <span className="w-8 h-px bg-accent" />
              Services
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Ce que nous <span className="text-gradient">faisons le mieux.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 80}>
              <motion.div
                className="group glass-card rounded-2xl overflow-hidden cursor-pointer relative"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${service.glow}, transparent 70%)`,
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] h-full relative z-2">
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[0.7rem] font-mono text-accent/50">
                        {service.num}
                      </span>
                      <h3 className="text-[1.15rem] lg:text-[1.3rem] font-bold mt-1 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[0.8rem] text-white/35 leading-[1.7] mt-2.5">
                        {service.desc}
                      </p>
                    </div>
                    <div className="mt-5">
                      <span className="text-[0.78rem] text-accent font-semibold inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                        En savoir plus
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-500" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
