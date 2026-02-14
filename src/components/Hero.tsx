"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  return (
    <section
      className="bg-dark text-white relative overflow-hidden min-h-screen flex flex-col justify-center"
      id="home"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 w-full py-32 lg:py-0 relative z-2">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[0.72rem] uppercase tracking-[3px] text-white/40 font-medium">
                Agence Web Cr&eacute;ative &mdash; Aix-en-Provence
              </span>
            </motion.div>

            <motion.h1
              className="text-[2.5rem] sm:text-[3.2rem] lg:text-[4rem] xl:text-[4.8rem] leading-[1.05] tracking-[-0.03em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block font-light"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
              >
                Nous cr&eacute;ons
              </motion.span>
              <motion.span
                className="block font-light"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
              >
                des exp&eacute;riences
              </motion.span>
              <motion.span
                className="block font-serif italic text-accent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                digitales.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-[0.95rem] lg:text-[1.05rem] text-white/35 mt-7 max-w-[420px] leading-[1.8] font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              Design UI/UX, d&eacute;veloppement web et solutions e-commerce sur mesure
              pour propulser votre business.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
            >
              <motion.a
                href="/contact"
                className="px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 0 50px rgba(249,115,22,0.3), 0 0 100px rgba(249,115,22,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                D&eacute;marrer un projet
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
              <motion.a
                href="/projets"
                className="px-8 py-4 rounded-full bg-transparent text-white font-medium text-[0.9rem] border border-white/15 cursor-pointer hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Voir nos projets
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease }}
          >
            <div className="absolute -top-8 -right-8 w-[80%] h-[80%] bg-accent/10 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/project-dashboard.jpg"
                alt="Projet Agence HDS"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo marquee */}
      <motion.div
        className="w-full border-t border-white/[0.06] mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="py-8 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-dark to-transparent z-10" />
          <div
            className="flex items-center whitespace-nowrap"
            style={{ animation: "marquee 35s linear infinite", width: "max-content" }}
          >
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex items-center gap-20 px-10">
                {/* React */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-9 w-9" viewBox="0 0 512 512" fill="none">
                    <circle cx="256" cy="256" r="36" fill="white" />
                    <ellipse cx="256" cy="256" rx="200" ry="75" stroke="white" strokeWidth="14" />
                    <ellipse cx="256" cy="256" rx="200" ry="75" stroke="white" strokeWidth="14" transform="rotate(60 256 256)" />
                    <ellipse cx="256" cy="256" rx="200" ry="75" stroke="white" strokeWidth="14" transform="rotate(120 256 256)" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">React</span>
                </div>

                {/* Next.js */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-8 w-8" viewBox="0 0 180 180" fill="none">
                    <mask id="nmask" style={{ maskType: "alpha" }}>
                      <circle cx="90" cy="90" r="90" fill="white" />
                    </mask>
                    <g mask="url(#nmask)">
                      <circle cx="90" cy="90" r="90" fill="white" />
                      <path d="M149.5 157L70 47H55v86h12V63.8L143.4 164.1c2.1-2.2 4.1-4.5 6.1-7.1z" fill="black" />
                      <rect x="115" y="47" width="12" height="86" fill="black" />
                    </g>
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Next.js</span>
                </div>

                {/* Vercel */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-7 w-7" viewBox="0 0 76 65" fill="white">
                    <path d="M37.5 0L75 65H0L37.5 0z" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Vercel</span>
                </div>

                {/* Figma */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-8 w-8" viewBox="0 0 38 57" fill="white">
                    <path d="M19 28.5a9.5 9.5 0 119 9.5 9.5 9.5 0 01-9.5-9.5z" fillOpacity="0.85" />
                    <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 01-19 0z" fillOpacity="0.65" />
                    <path d="M19 0v19h9.5a9.5 9.5 0 000-19H19z" fillOpacity="0.85" />
                    <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fillOpacity="0.65" />
                    <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fillOpacity="0.75" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Figma</span>
                </div>

                {/* Supabase */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-8 w-8" viewBox="0 0 109 113" fill="white">
                    <path d="M63.7 110.3c-2.5 3.2-7.8 1.5-7.8-2.6V71.1h45.3c8.2 0 12.7 9.5 7.6 15.9L63.7 110.3z" fillOpacity="0.6" />
                    <path d="M45.3 2.7c2.5-3.2 7.8-1.5 7.8 2.6v36.6H7.8c-8.2 0-12.7-9.5-7.6-15.9L45.3 2.7z" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Supabase</span>
                </div>

                {/* Stripe */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-8 w-8" viewBox="0 0 60 60" fill="white">
                    <path d="M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm7.2 25.8c0-2.4 1.2-3.4 3-3.4 1.5 0 2.7.8 2.7 3.4h-5.7zm-17.6 8.6c2.4 0 4-1 5.4-2.4l3.2 3.6c-2.2 2.4-5 3.8-8.8 3.8-6.6 0-11-4.8-11-11s4.6-11 10.4-11c6.4 0 9.8 4.8 9.8 11.2H15c.4 3.2 2.6 5.8 4.6 5.8zm25-5.2c0 6-3 10.4-8.4 10.4-2 0-3.4-.8-4.4-2v8.4h-5.6V18.2h5.2l.2 2c1.2-1.4 3-2.4 5-2.4 5.2 0 8 4.6 8 11.4z" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Stripe</span>
                </div>

                {/* Tailwind CSS */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-6 w-auto" viewBox="0 0 54 33" fill="white">
                    <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">Tailwind</span>
                </div>

                {/* TypeScript */}
                <div className="flex items-center gap-2.5 opacity-20 hover:opacity-40 transition-opacity duration-500">
                  <svg className="h-7 w-7" viewBox="0 0 128 128" fill="white">
                    <path d="M2 63.9V2h124v124H2V63.9zm67.8-3.5v10.2h-15.1V115H41.1V70.6H26v-10c0-5.5.1-10.2.2-10.3.2-.1 9.8-.2 21.4-.2l21 .1.2 10.2z" fillOpacity="0.9" />
                    <path d="M89.4 60.4c3 .7 5.3 1.9 7.3 3.7 1 1 2.6 2.8 2.7 3 0 .1-4.8 3.4-7.8 5.3l-.3.2c-.5-.8-1.2-1.6-2-2.3-1.6-1.5-3.3-2.1-5.8-2-3.6.2-5.9 1.8-5.8 4.7 0 1 .2 1.5.5 2.2.7 1.5 2.2 2.5 7 4.6 8.9 3.8 12.7 6.3 15 9.8 2.6 3.9 3.2 10.2 1.4 14.8-2 5-6.8 8.4-13.6 9.6-2.1.4-7 .3-9.2-.1-4.8-.9-9.4-3.4-12.3-6.7-1.1-1.3-3.3-4.7-3.1-4.8.1-.1 1-.7 2-1.3 1-.6 3.7-2.2 6-3.5l3.8-2.3 .8 1.2c1.1 1.7 3.6 4 5.2 4.8 4.5 2.3 10.7 1.4 12.1-1.6.4-.8.4-1.3.2-2.6-.3-1.4-.8-2-3.4-3.5-8.8-5-12.6-7.5-15.4-10.6-1.9-2.1-3.4-5-4-7.4-.5-2-.6-7-.2-9 1.7-7.8 7.8-13.2 16.2-14.5 2.2-.3 7.4 .1 9.6.6z" fillOpacity="0.9" />
                  </svg>
                  <span className="text-[0.9rem] font-medium text-white tracking-wide">TypeScript</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
