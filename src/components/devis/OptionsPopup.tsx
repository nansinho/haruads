"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Code, Layers, Palette, Zap, Search, Headphones, Plus,
} from "lucide-react";

interface OfferOption {
  id: string;
  category: string;
  icon: string | null;
  name: string;
  description: string | null;
  is_included: boolean;
  sort_order: number;
}

interface OptionsPopupProps {
  isOpen: boolean;
  offerName: string;
  offerOptions: OfferOption[];
  selectedOptionIds: string[];
  customOptions: string[];
  onToggleOption: (optionId: string) => void;
  onAddCustomOption: (option: string) => void;
  onRemoveCustomOption: (index: number) => void;
  onClose: () => void;
  onValidate: () => void;
}

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  technologies: Code,
  fonctionnalites: Layers,
  design: Palette,
  performance: Zap,
  seo: Search,
  support: Headphones,
};

const categoryLabels: Record<string, string> = {
  technologies: "Technologies",
  fonctionnalites: "Fonctionnalités",
  design: "Design",
  performance: "Performance",
  seo: "SEO",
  support: "Support & Maintenance",
};

export default function OptionsPopup({
  isOpen,
  offerName,
  offerOptions,
  selectedOptionIds,
  customOptions,
  onToggleOption,
  onAddCustomOption,
  onRemoveCustomOption,
  onClose,
  onValidate,
}: OptionsPopupProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newCustom, setNewCustom] = useState("");

  // Group options by category
  const groupedOptions = useMemo(() => {
    const groups: Record<string, OfferOption[]> = {};
    for (const opt of offerOptions) {
      if (!groups[opt.category]) groups[opt.category] = [];
      groups[opt.category].push(opt);
    }
    // Sort each group by sort_order
    for (const key of Object.keys(groups)) {
      groups[key].sort((a, b) => a.sort_order - b.sort_order);
    }
    return groups;
  }, [offerOptions]);

  const categoryKeys = useMemo(() => {
    const order = ["technologies", "fonctionnalites", "design", "performance", "seo", "support"];
    return order.filter((k) => groupedOptions[k]?.length > 0);
  }, [groupedOptions]);

  // Default to first category
  const currentCategory = activeCategory || categoryKeys[0] || "technologies";
  const currentOptions = groupedOptions[currentCategory] || [];

  const selectedCount = selectedOptionIds.length + customOptions.length;

  const handleAddCustom = () => {
    const trimmed = newCustom.trim();
    if (trimmed && !customOptions.includes(trimmed)) {
      onAddCustomOption(trimmed);
      setNewCustom("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-[1.1rem] sm:text-[1.3rem] font-semibold text-text-dark">
                  Personnalisez vos <span className="font-serif italic text-accent">options</span>
                </h2>
                <p className="text-[0.8rem] text-text-body mt-0.5">
                  {offerName} — {selectedCount} option{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-text-body" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            {/* Sidebar categories */}
            <div className="lg:w-[240px] border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/50">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-3 lg:p-4 gap-2">
                {categoryKeys.map((key) => {
                  const IconComp = categoryIconMap[key] || Layers;
                  const isActive = currentCategory === key;
                  const catOptions = groupedOptions[key] || [];
                  const selectedInCat = catOptions.filter((o) => selectedOptionIds.includes(o.id)).length;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveCategory(key)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer min-w-fit ${
                        isActive
                          ? "bg-accent text-white shadow-md shadow-accent/20"
                          : "bg-white text-text-body hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <IconComp className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-accent"}`} />
                      <div className="flex-1">
                        <div className={`text-[0.82rem] font-medium ${isActive ? "text-white" : "text-text-dark"}`}>
                          {categoryLabels[key] || key}
                        </div>
                        <div className={`text-[0.7rem] ${isActive ? "text-white/70" : "text-text-body"}`}>
                          {selectedInCat}/{catOptions.length}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options grid */}
            <div className="flex-1 overflow-y-auto p-5 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Category header */}
                  <div className="mb-6">
                    <h3 className="text-[1rem] font-semibold text-text-dark flex items-center gap-2">
                      {(() => {
                        const IconComp = categoryIconMap[currentCategory] || Layers;
                        return <IconComp className="w-5 h-5 text-accent" />;
                      })()}
                      {categoryLabels[currentCategory] || currentCategory}
                    </h3>
                    <p className="text-[0.8rem] text-text-body mt-1">
                      Cochez les options que vous souhaitez inclure dans votre projet.
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentOptions.map((option) => {
                      const isChecked = selectedOptionIds.includes(option.id);
                      return (
                        <motion.label
                          key={option.id}
                          className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                            isChecked
                              ? "border-accent/30 bg-accent/5 shadow-sm"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
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
                            onChange={() => onToggleOption(option.id)}
                            className="sr-only"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-[0.85rem] font-medium ${isChecked ? "text-text-dark" : "text-text-body"}`}>
                                {option.name}
                              </span>
                              {option.is_included && (
                                <span className="text-[0.65rem] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                  inclus
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <p className="text-[0.75rem] text-text-body/70 mt-0.5 leading-[1.5]">
                                {option.description}
                              </p>
                            )}
                          </div>
                        </motion.label>
                      );
                    })}
                  </div>

                  {/* Custom options section (show only in last category) */}
                  {currentCategory === categoryKeys[categoryKeys.length - 1] && (
                    <div className="mt-10 pt-8 border-t border-gray-200">
                      <h3 className="text-[0.95rem] font-semibold text-text-dark flex items-center gap-2 mb-4">
                        <Plus className="w-5 h-5 text-accent" />
                        Besoins spécifiques
                      </h3>
                      <p className="text-[0.8rem] text-text-body mb-4">
                        Vous avez un besoin particulier ? Ajoutez-le ici.
                      </p>

                      {customOptions.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {customOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-xl border border-accent/30 bg-accent/5"
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
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCustom}
                          onChange={(e) => setNewCustom(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCustom(); } }}
                          placeholder="Ex: Intégration CRM, Chat en direct..."
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors"
                        />
                        <motion.button
                          type="button"
                          onClick={handleAddCustom}
                          disabled={!newCustom.trim()}
                          className={`px-5 py-3 rounded-xl font-medium text-[0.82rem] transition-all ${
                            newCustom.trim()
                              ? "bg-accent text-white cursor-pointer"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          whileTap={newCustom.trim() ? { scale: 0.95 } : {}}
                        >
                          Ajouter
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-white sticky bottom-0 z-10">
            <div className="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between">
              <div className="text-[0.82rem] text-text-body">
                <span className="font-semibold text-accent">{selectedCount}</span> option{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
              </div>
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full font-medium text-[0.85rem] border border-gray-300 text-text-body hover:border-gray-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Retour
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onValidate}
                  className="px-8 py-3 rounded-full font-medium text-[0.85rem] bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Valider mes options
                  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-2 stroke-current fill-none stroke-2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
