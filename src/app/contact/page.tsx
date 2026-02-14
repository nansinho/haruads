"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const contactInfo = [
  {
    label: "Email",
    value: "contact@agencehds.fr",
    href: "mailto:contact@agencehds.fr",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13L2 4" />
      </svg>
    ),
  },
  {
    label: "Téléphone",
    value: "+33 6 XX XX XX XX",
    href: "tel:+33600000000",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "Localisation",
    value: "Aix-en-Provence, France",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                Contact
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Parlons de votre </span>
                <span className="font-serif italic text-accent">projet.</span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[500px] leading-[1.8] font-light">
                Premier rendez-vous gratuit et sans engagement.
                Réponse sous 24h garantie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact form + info */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20">
              {/* Form */}
              <ScrollReveal>
                <div>
                  <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em] mb-8">
                    <span className="font-light">Envoyez-nous un </span>
                    <span className="font-serif italic">message.</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.78rem] font-medium text-text-dark mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-light border border-gray-200 text-[0.88rem] text-text-dark placeholder:text-text-body/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[0.78rem] font-medium text-text-dark mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-light border border-gray-200 text-[0.88rem] text-text-dark placeholder:text-text-body/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.78rem] font-medium text-text-dark mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-light border border-gray-200 text-[0.88rem] text-text-dark placeholder:text-text-body/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder="Objet de votre demande"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[0.78rem] font-medium text-text-dark mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-light border border-gray-200 text-[0.88rem] text-text-dark placeholder:text-text-body/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                        placeholder="Décrivez votre projet, vos besoins, votre budget..."
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-[0.9rem] cursor-pointer border-none"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Envoyer le message
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.button>
                  </form>
                </div>
              </ScrollReveal>

              {/* Info */}
              <ScrollReveal delay={200}>
                <div>
                  <h3 className="text-[1.2rem] lg:text-[1.4rem] leading-[1.1] tracking-[-0.02em] mb-8">
                    <span className="font-light">Ou contactez-nous </span>
                    <span className="font-serif italic">directement.</span>
                  </h3>

                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-start gap-4 p-5 rounded-xl bg-light border border-gray-100 hover:border-accent/20 hover:shadow-sm transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-[0.78rem] text-text-body uppercase tracking-wider mb-1">
                            {info.label}
                          </div>
                          <div className="text-[0.9rem] font-medium text-text-dark group-hover:text-accent transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-10 p-6 rounded-xl bg-accent/5 border border-accent/10">
                    <h4 className="text-[0.9rem] font-semibold text-text-dark mb-2">
                      Horaires
                    </h4>
                    <p className="text-[0.82rem] text-text-body leading-[1.7]">
                      Lundi - Vendredi : 9h00 - 18h00<br />
                      Réponse sous 24h garantie.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
