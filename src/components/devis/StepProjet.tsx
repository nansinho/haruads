"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Attachment {
  url: string;
  name: string;
}

interface StepProjetProps {
  description: string;
  attachments: Attachment[];
  onDescriptionChange: (value: string) => void;
  onAddAttachment: (attachment: Attachment) => void;
  onRemoveAttachment: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepProjet({
  description,
  attachments,
  onDescriptionChange,
  onAddAttachment,
  onRemoveAttachment,
  onNext,
  onBack,
}: StepProjetProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const isValid = description.trim().length >= 50;
  const maxFiles = 5;

  const uploadFile = useCallback(
    async (file: File) => {
      if (attachments.length >= maxFiles) {
        setUploadError(`Maximum ${maxFiles} fichiers autorisés.`);
        return;
      }

      setUploadError("");
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/devis/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error || "Erreur lors de l'upload");
          return;
        }

        onAddAttachment({ url: data.url, name: data.filename });
      } catch {
        setUploadError("Erreur lors de l'upload du fichier.");
      } finally {
        setUploading(false);
      }
    },
    [attachments.length, onAddAttachment]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-light tracking-[-0.01em]">
          Décrivez votre <span className="font-serif italic text-accent">projet</span>
        </h2>
        <p className="text-[0.85rem] text-text-body mt-2">
          Plus vous détaillez votre projet, mieux nous pourrons vous accompagner.
        </p>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Description */}
        <div className="mb-6">
          <label className="block text-[0.82rem] font-medium text-text-dark mb-2">
            Description du projet <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Décrivez votre projet, vos objectifs, votre cible, les fonctionnalités souhaitées..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.85rem] text-text-dark placeholder-gray-400 focus:outline-none focus:border-accent/50 transition-colors resize-y"
          />
          <div className="flex justify-between mt-1.5">
            <p className={`text-[0.75rem] ${description.trim().length >= 50 ? "text-accent" : "text-gray-400"}`}>
              {description.trim().length >= 50 ? "Description suffisante" : `Minimum 50 caractères (${description.trim().length}/50)`}
            </p>
          </div>
        </div>

        {/* File upload */}
        <div className="mb-6">
          <label className="block text-[0.82rem] font-medium text-text-dark mb-2">
            Pièces jointes <span className="text-text-body font-normal">(optionnel)</span>
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragOver
                ? "border-accent bg-accent/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-3 stroke-gray-400 fill-none stroke-[1.5]">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-[0.82rem] text-text-body mb-1">
              Glissez vos fichiers ici ou
            </p>
            <label className="inline-block text-[0.82rem] text-accent font-medium cursor-pointer hover:underline">
              parcourir
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/*,.pdf"
                multiple
                className="sr-only"
                disabled={uploading || attachments.length >= maxFiles}
              />
            </label>
            <p className="text-[0.72rem] text-gray-400 mt-2">
              JPG, PNG, WebP, PDF — 10 Mo max — {maxFiles} fichiers max
            </p>
          </div>

          {uploading && (
            <div className="flex items-center gap-2 mt-3 text-[0.82rem] text-accent">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              Upload en cours...
            </div>
          )}

          {uploadError && (
            <p className="text-[0.82rem] text-red-500 mt-2">{uploadError}</p>
          )}

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 stroke-accent fill-none stroke-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="text-[0.82rem] text-text-dark flex-1 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveAttachment(i)}
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
