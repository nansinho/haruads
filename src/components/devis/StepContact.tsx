"use client";

import { motion } from "framer-motion";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface StepContactProps {
  contact: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepContact({ contact, onChange, onNext, onBack }: StepContactProps) {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  const isValid = contact.name.trim().length > 0 && isEmailValid;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
          Vos <span className="font-serif italic text-accent">coordonnées</span>
        </h2>
        <p className="text-[0.85rem] text-text-body mt-2">
          Comment pouvons-nous vous recontacter ?
        </p>
      </div>

      <div className="max-w-[500px] mx-auto space-y-4">
        <div>
          <label className="block text-[0.82rem] font-medium text-text-dark mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[0.82rem] font-medium text-text-dark mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jean@exemple.fr"
            className={`w-full px-4 py-3 rounded-xl border text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none transition-colors ${
              contact.email && !isEmailValid
                ? "border-red-300 focus:border-red-400"
                : "border-gray-200 focus:border-accent/50"
            }`}
          />
          {contact.email && !isEmailValid && (
            <p className="text-[0.75rem] text-red-500 mt-1">Veuillez entrer un email valide.</p>
          )}
        </div>

        <div>
          <label className="block text-[0.82rem] font-medium text-text-dark mb-1.5">
            Téléphone <span className="text-text-body font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[0.82rem] font-medium text-text-dark mb-1.5">
            Entreprise <span className="text-text-body font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            value={contact.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Nom de votre entreprise"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors"
          />
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
          disabled={!isValid}
          className={`px-8 py-3.5 rounded-full font-medium text-[0.85rem] transition-all ${
            isValid
              ? "bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={isValid ? { scale: 1.03 } : {}}
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          Voir le récapitulatif
          <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-2 stroke-current fill-none stroke-2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
