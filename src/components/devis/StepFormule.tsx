"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, ShoppingCart, Code, Cloud, Brain, Palette, PenTool,
  ArrowLeft, Sparkles, Crown, Briefcase,
} from "lucide-react";

interface OfferCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

interface OfferOption {
  id: string;
  category: string;
  icon: string | null;
  name: string;
  description: string | null;
  is_included: boolean;
  sort_order: number;
}

interface Offer {
  id: string;
  name: string;
  description: string;
  features: string[];
  is_popular: boolean;
  category_id: string | null;
  tier: string;
  offer_options?: OfferOption[];
}

interface StepFormuleProps {
  offers: Offer[];
  categories: OfferCategory[];
  selectedOfferId: string | null;
  onSelect: (id: string, name: string, features: string[], options: OfferOption[]) => void;
  onNext: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, ShoppingCart, Code, Cloud, Brain, Palette, PenTool,
};

const tierConfig = {
  essentiel: {
    icon: Sparkles,
    label: "Essentiel",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "L'essentiel pour démarrer",
  },
  business: {
    icon: Briefcase,
    label: "Business",
    color: "text-accent",
    bgColor: "bg-accent/5",
    borderColor: "border-accent/30",
    description: "Le choix le plus populaire",
  },
  premium: {
    icon: Crown,
    label: "Premium",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "La solution complète sur mesure",
  },
};

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function StepFormule({ offers, categories, selectedOfferId, onSelect, onNext }: StepFormuleProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const categoryOffers = offers.filter((o) => o.category_id === selectedCategoryId);

  // Fallback: if no categories exist, show offers directly (backward compat)
  if (categories.length === 0) {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
            Choisissez votre <span className="font-serif italic text-accent">formule</span>
          </h2>
          <p className="text-[0.85rem] text-text-body mt-2">
            Sélectionnez la formule qui correspond le mieux à votre projet.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer) => {
            const isSelected = selectedOfferId === offer.id;
            return (
              <motion.button
                key={offer.id}
                type="button"
                onClick={() => onSelect(offer.id, offer.name, offer.features, offer.offer_options || [])}
                className={`rounded-2xl p-7 text-left flex flex-col h-full cursor-pointer transition-all duration-200 border-2 ${
                  isSelected
                    ? "border-accent bg-accent text-white shadow-lg shadow-accent/20"
                    : "border-gray-200 bg-white hover:border-accent/40 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className={`text-[1.1rem] font-semibold mb-2 ${isSelected ? "text-white" : "text-text-dark"}`}>
                  {offer.name}
                </h3>
                <p className={`text-[0.8rem] leading-[1.6] mb-5 ${isSelected ? "text-white/80" : "text-text-body"}`}>
                  {offer.description}
                </p>
                <div className={`w-full py-3 rounded-full text-center text-[0.82rem] font-medium border transition-colors ${
                  isSelected ? "bg-white text-accent border-white" : "bg-transparent text-accent border-accent"
                }`}>
                  {isSelected ? "Sélectionnée" : "Choisir cette formule"}
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <motion.button
            type="button"
            onClick={onNext}
            disabled={!selectedOfferId}
            className={`px-8 py-3.5 rounded-full font-medium text-[0.85rem] transition-all ${
              selectedOfferId
                ? "bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={selectedOfferId ? { scale: 1.03 } : {}}
            whileTap={selectedOfferId ? { scale: 0.97 } : {}}
          >
            Continuer
            <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-2 stroke-current fill-none stroke-2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {!selectedCategoryId ? (
          /* ---- ÉTAPE 1: Choix du type de service ---- */
          <motion.div
            key="categories"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
                Quel type de <span className="font-serif italic text-accent">projet</span> ?
              </h2>
              <p className="text-[0.85rem] text-text-body mt-2">
                Sélectionnez le type de service qui correspond à votre besoin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              {categories.map((cat) => {
                const IconComp = iconMap[cat.icon || ""] || Globe;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className="rounded-2xl p-6 text-left flex flex-col gap-4 cursor-pointer transition-all duration-200 border-2 border-gray-200 bg-white hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComp className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-[1rem] font-semibold text-text-dark mb-1">{cat.name}</h3>
                      <p className="text-[0.8rem] text-text-body leading-[1.6]">{cat.description}</p>
                    </div>
                    <div className="mt-auto pt-2">
                      <span className="text-[0.78rem] text-accent font-medium group-hover:underline">
                        Voir les formules →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ---- ÉTAPE 2: Choix du niveau (Essentiel / Business / Premium) ---- */
          <motion.div
            key="tiers"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-center mb-10">
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className="inline-flex items-center gap-1.5 text-[0.82rem] text-text-body hover:text-accent transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Changer de service
              </button>
              <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
                {selectedCategory?.name} — Choisissez votre <span className="font-serif italic text-accent">niveau</span>
              </h2>
              <p className="text-[0.85rem] text-text-body mt-2">
                Sélectionnez le niveau d&apos;accompagnement qui vous convient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
              {(["essentiel", "business", "premium"] as const).map((tier) => {
                const offer = categoryOffers.find((o) => o.tier === tier);
                if (!offer) return null;

                const config = tierConfig[tier];
                const TierIcon = config.icon;
                const isSelected = selectedOfferId === offer.id;

                return (
                  <motion.button
                    key={offer.id}
                    type="button"
                    onClick={() => onSelect(offer.id, offer.name, offer.features, offer.offer_options || [])}
                    className={`rounded-2xl p-7 text-left flex flex-col h-full cursor-pointer transition-all duration-200 border-2 relative ${
                      isSelected
                        ? "border-accent bg-accent text-white shadow-lg shadow-accent/20"
                        : `${config.borderColor} bg-white hover:shadow-lg hover:shadow-accent/5`
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {offer.is_popular && (
                      <span
                        className={`absolute -top-3 right-5 px-3 py-1 rounded-full text-[0.68rem] font-semibold ${
                          isSelected ? "bg-white/20 text-white" : "bg-accent text-white"
                        }`}
                      >
                        Populaire
                      </span>
                    )}

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      isSelected ? "bg-white/20" : config.bgColor
                    }`}>
                      <TierIcon className={`w-5 h-5 ${isSelected ? "text-white" : config.color}`} />
                    </div>

                    <div className="mb-1">
                      <span className={`text-[0.72rem] uppercase tracking-[2px] font-semibold ${
                        isSelected ? "text-white/70" : config.color
                      }`}>
                        {config.label}
                      </span>
                    </div>

                    <h3 className={`text-[1.05rem] font-semibold mb-1.5 ${isSelected ? "text-white" : "text-text-dark"}`}>
                      {offer.name}
                    </h3>

                    <p className={`text-[0.78rem] leading-[1.6] mb-5 ${isSelected ? "text-white/80" : "text-text-body"}`}>
                      {offer.description}
                    </p>

                    <ul className="list-none flex-1 mb-5">
                      {offer.features.slice(0, 5).map((f) => (
                        <li
                          key={f}
                          className={`flex items-center gap-2 py-1 text-[0.78rem] ${
                            isSelected ? "text-white/80" : "text-text-body"
                          }`}
                        >
                          <Check className={isSelected ? "stroke-white" : "stroke-accent"} />
                          {f}
                        </li>
                      ))}
                      {offer.features.length > 5 && (
                        <li className={`py-1 text-[0.75rem] italic ${isSelected ? "text-white/60" : "text-text-body/60"}`}>
                          + {offer.features.length - 5} autres fonctionnalités...
                        </li>
                      )}
                    </ul>

                    <div className={`text-[0.8rem] font-medium ${isSelected ? "text-white/70" : "text-text-body"}`}>
                      Sur devis
                    </div>

                    <div
                      className={`w-full py-3 mt-3 rounded-full text-center text-[0.82rem] font-medium border transition-colors ${
                        isSelected
                          ? "bg-white text-accent border-white"
                          : "bg-transparent text-accent border-accent"
                      }`}
                    >
                      {isSelected ? "Sélectionnée ✓" : "Choisir cette formule"}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                type="button"
                onClick={onNext}
                disabled={!selectedOfferId}
                className={`px-8 py-3.5 rounded-full font-medium text-[0.85rem] transition-all ${
                  selectedOfferId
                    ? "bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={selectedOfferId ? { scale: 1.03 } : {}}
                whileTap={selectedOfferId ? { scale: 0.97 } : {}}
              >
                Personnaliser mes options
                <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-2 stroke-current fill-none stroke-2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
