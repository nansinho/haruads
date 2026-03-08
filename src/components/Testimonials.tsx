"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_avatar: string | null;
  content: string;
  rating: number;
  source: string;
  sort_order: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, paused]);

  const handleSelect = useCallback((index: number) => {
    setCurrent(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }, []);

  if (testimonials.length === 0) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://agencehds.fr/#organization",
    name: "Agence HDS",
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5" },
      author: { "@type": "Person", name: t.author_name },
      reviewBody: t.content,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
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

              {/* Quote carousel */}
              <div
                className="min-h-[220px] relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Stars + Source */}
                    <div className="flex items-center gap-3 mb-6">
                      <StarRating rating={testimonials[current].rating} />
                      <span className="text-xs text-text-muted uppercase tracking-wider">
                        {testimonials[current].source}
                      </span>
                    </div>

                    <p className="text-fluid-h3 italic leading-[1.4] text-white/80">
                      &ldquo;{testimonials[current].content}&rdquo;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      {testimonials[current].author_avatar ? (
                        <img
                          src={testimonials[current].author_avatar!}
                          alt={testimonials[current].author_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-dark font-semibold text-[0.9rem]">
                          {testimonials[current].author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-[0.9rem] font-medium">
                          {testimonials[current].author_name}
                        </div>
                        {testimonials[current].author_role && (
                          <div className="text-[0.78rem] text-text-muted">
                            {testimonials[current].author_role}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav dots */}
              <div className="flex gap-2 mt-12">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                      i === current
                        ? "w-8 bg-accent"
                        : "w-4 bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Témoignage ${i + 1} : ${testimonials[i].author_name}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
