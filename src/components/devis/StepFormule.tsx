"use client";

import { motion } from "framer-motion";

interface Offer {
  id: string;
  name: string;
  description: string;
  features: string[];
  is_popular: boolean;
}

interface StepFormuleProps {
  offers: Offer[];
  selectedOfferId: string | null;
  onSelect: (id: string, name: string, features: string[]) => void;
  onNext: () => void;
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none stroke-2 shrink-0 ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function StepFormule({ offers, selectedOfferId, onSelect, onNext }: StepFormuleProps) {
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
              onClick={() => onSelect(offer.id, offer.name, offer.features)}
              className={`rounded-2xl p-7 text-left flex flex-col h-full cursor-pointer transition-all duration-200 border-2 ${
                isSelected
                  ? "border-accent bg-accent text-white shadow-lg shadow-accent/20"
                  : "border-gray-200 bg-white hover:border-accent/40 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-2 mb-3">
                {offer.is_popular && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[0.68rem] font-semibold ${
                      isSelected ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                    }`}
                  >
                    Populaire
                  </span>
                )}
              </div>

              <h3 className={`text-[1.1rem] font-semibold mb-2 ${isSelected ? "text-white" : "text-text-dark"}`}>
                {offer.name}
              </h3>
              <p className={`text-[0.8rem] leading-[1.6] mb-5 ${isSelected ? "text-white/80" : "text-text-body"}`}>
                {offer.description}
              </p>

              <ul className="list-none flex-1 mb-4">
                {offer.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2.5 py-1.5 text-[0.8rem] ${
                      isSelected ? "text-white/80" : "text-text-body"
                    }`}
                  >
                    <Check className={isSelected ? "stroke-white" : "stroke-accent"} />
                    {f}
                  </li>
                ))}
              </ul>

              <div
                className={`w-full py-3 rounded-full text-center text-[0.82rem] font-medium border transition-colors ${
                  isSelected
                    ? "bg-white text-accent border-white"
                    : "bg-transparent text-accent border-accent"
                }`}
              >
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
