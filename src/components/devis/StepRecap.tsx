"use client";

import { motion } from "framer-motion";

interface Attachment {
  url: string;
  name: string;
}

interface StepRecapProps {
  selectedOfferName: string;
  selectedOptions: string[];
  customOptions: string[];
  description: string;
  attachments: Attachment[];
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  isSubmitting: boolean;
  onGoToStep: (step: number) => void;
  onSubmit: () => void;
}

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-accent text-[0.75rem] font-medium hover:underline cursor-pointer"
  >
    Modifier
  </button>
);

export default function StepRecap({
  selectedOfferName,
  selectedOptions,
  customOptions,
  description,
  attachments,
  contact,
  isSubmitting,
  onGoToStep,
  onSubmit,
}: StepRecapProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
          <span className="font-serif italic text-accent">Récapitulatif</span> de votre demande
        </h2>
        <p className="text-[0.85rem] text-text-body mt-2">
          Vérifiez les informations avant d&apos;envoyer votre demande de devis.
        </p>
      </div>

      <div className="max-w-[600px] mx-auto space-y-5">
        {/* Formule */}
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold">
              Formule
            </h3>
            <EditButton onClick={() => onGoToStep(1)} />
          </div>
          <p className="text-[0.95rem] font-medium text-text-dark">{selectedOfferName}</p>
        </div>

        {/* Options */}
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold">
              Options
            </h3>
            <EditButton onClick={() => onGoToStep(2)} />
          </div>
          {selectedOptions.length === 0 && customOptions.length === 0 ? (
            <p className="text-[0.85rem] text-gray-400 italic">Aucune option sélectionnée</p>
          ) : (
            <ul className="space-y-1.5">
              {selectedOptions.map((opt) => (
                <li key={opt} className="flex items-center gap-2 text-[0.85rem] text-text-dark">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-accent stroke-2 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {opt}
                </li>
              ))}
              {customOptions.map((opt, i) => (
                <li key={`custom-${i}`} className="flex items-center gap-2 text-[0.85rem] text-text-dark">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-accent stroke-2 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {opt}
                  <span className="text-[0.7rem] text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    personnalisée
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Projet */}
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold">
              Projet
            </h3>
            <EditButton onClick={() => onGoToStep(3)} />
          </div>
          <p className="text-[0.85rem] text-text-body leading-[1.7] whitespace-pre-wrap">
            {description}
          </p>
          {attachments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[0.78rem] text-text-body font-medium mb-2">
                {attachments.length} pièce(s) jointe(s) :
              </p>
              <div className="space-y-1">
                {attachments.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 text-[0.8rem] text-accent">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2 shrink-0">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[0.82rem] uppercase tracking-[2px] text-text-body font-semibold">
              Contact
            </h3>
            <EditButton onClick={() => onGoToStep(4)} />
          </div>
          <div className="space-y-1.5 text-[0.85rem]">
            <p className="text-text-dark"><strong>Nom :</strong> {contact.name}</p>
            <p className="text-text-dark"><strong>Email :</strong> {contact.email}</p>
            {contact.phone && <p className="text-text-dark"><strong>Téléphone :</strong> {contact.phone}</p>}
            {contact.company && <p className="text-text-dark"><strong>Entreprise :</strong> {contact.company}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <motion.button
          type="button"
          onClick={() => onGoToStep(4)}
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-full font-medium text-[0.85rem] border border-gray-300 text-text-body hover:border-gray-400 transition-colors cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Retour
        </motion.button>
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`px-10 py-3.5 rounded-full font-medium text-[0.85rem] transition-all ${
            isSubmitting
              ? "bg-accent/70 text-white cursor-wait"
              : "bg-accent text-white hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
          }`}
          whileHover={!isSubmitting ? { scale: 1.03 } : {}}
          whileTap={!isSubmitting ? { scale: 0.97 } : {}}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Envoi en cours...
            </span>
          ) : (
            <>
              Envoyer ma demande
              <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block ml-2 stroke-current fill-none stroke-2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
