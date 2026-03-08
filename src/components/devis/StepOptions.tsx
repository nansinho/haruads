"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StepOptionsProps {
  offerFeatures: string[];
  selectedOptions: string[];
  customOptions: string[];
  onToggleOption: (option: string) => void;
  onAddCustomOption: (option: string) => void;
  onRemoveCustomOption: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepOptions({
  offerFeatures,
  selectedOptions,
  customOptions,
  onToggleOption,
  onAddCustomOption,
  onRemoveCustomOption,
  onNext,
  onBack,
}: StepOptionsProps) {
  const [newOption, setNewOption] = useState("");

  const handleAddCustom = () => {
    const trimmed = newOption.trim();
    if (trimmed && !customOptions.includes(trimmed)) {
      onAddCustomOption(trimmed);
      setNewOption("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
          Personnalisez vos <span className="font-serif italic text-accent">options</span>
        </h2>
        <p className="text-[0.85rem] text-text-body mt-2">
          Sélectionnez les fonctionnalités souhaitées ou ajoutez vos propres besoins.
        </p>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Predefined options */}
        <div className="mb-8">
          <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold mb-4">
            Options incluses
          </h3>
          <div className="space-y-2">
            {offerFeatures.map((feature) => {
              const isChecked = selectedOptions.includes(feature);
              return (
                <motion.label
                  key={feature}
                  className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isChecked
                      ? "border-accent/30 bg-accent/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? "bg-accent" : "border-2 border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white stroke-[3]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleOption(feature)}
                    className="sr-only"
                  />
                  <span className={`text-[0.85rem] ${isChecked ? "text-text-dark font-medium" : "text-text-body"}`}>
                    {feature}
                  </span>
                </motion.label>
              );
            })}
          </div>
        </div>

        {/* Custom options */}
        <div className="mb-8">
          <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold mb-4">
            Options personnalisées
          </h3>

          {customOptions.length > 0 && (
            <div className="space-y-2 mb-4">
              {customOptions.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-accent/30 bg-accent/5"
                >
                  <div className="w-5 h-5 rounded bg-accent flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white stroke-[3]">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[0.85rem] text-text-dark font-medium flex-1">{opt}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveCustomOption(i)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Intégration CRM, Chat en direct..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <motion.button
              type="button"
              onClick={handleAddCustom}
              disabled={!newOption.trim()}
              className={`px-5 py-3 rounded-xl font-medium text-[0.82rem] transition-all ${
                newOption.trim()
                  ? "bg-accent text-white cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              whileTap={newOption.trim() ? { scale: 0.95 } : {}}
            >
              Ajouter
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          type="button"
          onClick={onBack}
          className="px-8 py-3.5 rounded-full font-medium text-[0.85rem] border border-gray-300 text-text-body hover:border-gray-400 transition-colors cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Retour
        </motion.button>
        <motion.button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full font-medium text-[0.85rem] bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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
