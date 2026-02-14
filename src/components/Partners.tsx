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

export default function Partners() {
  return (
    <div className="bg-dark border-t border-b border-border-dark overflow-hidden relative py-5">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
      >
        {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
          <div key={`${p.name}-${i}`} className="flex items-center px-8 lg:px-14 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.logo}
              alt={p.name}
              className="h-5 lg:h-6 w-auto opacity-20 group-hover:opacity-50 transition-opacity duration-500 [filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)_invert(1)_sepia(1)_saturate(5)_hue-rotate(25deg)_brightness(1.5)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
