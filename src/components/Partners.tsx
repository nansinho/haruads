"use client";

import { motion } from "framer-motion";

const partners = [
  { logo: "/images/logos/logo-wordpress.svg", name: "WordPress" },
  { logo: "/images/logos/logo-woocommerce.svg", name: "WooCommerce" },
  { logo: "/images/logos/logo-supabase.svg", name: "Supabase" },
  { logo: "/images/logos/logo-google-analytics.svg", name: "Google Analytics" },
  { logo: "/images/logos/logo-hostinger.svg", name: "Hostinger" },
  { logo: "/images/logos/logo-litespeed.svg", name: "LiteSpeed" },
  { logo: "/images/logos/logo-lovable.svg", name: "Lovable" },
];

const doubled = [...partners, ...partners];

export default function Partners() {
  return (
    <div className="bg-dark border-t border-b border-border-dark overflow-hidden relative">
      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-5 lg:py-[26px]"
      >
        {/* Marquee track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-0">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 px-8 lg:px-12 shrink-0 cursor-default group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={p.name}
                className="h-6 lg:h-7 w-auto opacity-30 group-hover:opacity-60 transition-opacity duration-500 [filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)_invert(1)_sepia(1)_saturate(5)_hue-rotate(165deg)]"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
