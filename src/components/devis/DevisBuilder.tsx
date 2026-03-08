"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepProgress from "./StepProgress";
import StepFormule from "./StepFormule";
import OptionsPopup from "./OptionsPopup";
import StepProjet from "./StepProjet";
import StepContact from "./StepContact";
import StepRecap from "./StepRecap";
import DevisSuccess from "./DevisSuccess";

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

interface Attachment {
  url: string;
  name: string;
}

interface FormData {
  selectedOfferId: string | null;
  selectedOfferName: string;
  offerFeatures: string[];
  offerOptions: OfferOption[];
  selectedOptionIds: string[];
  selectedOptions: string[];
  customOptions: string[];
  description: string;
  attachments: Attachment[];
  name: string;
  email: string;
  phone: string;
  company: string;
}

const initialFormData: FormData = {
  selectedOfferId: null,
  selectedOfferName: "",
  offerFeatures: [],
  offerOptions: [],
  selectedOptionIds: [],
  selectedOptions: [],
  customOptions: [],
  description: "",
  attachments: [],
  name: "",
  email: "",
  phone: "",
  company: "",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function DevisBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<OfferCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successReference, setSuccessReference] = useState("");
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data.data || []);
        setCategories(data.categories || []);
      })
      .catch(() => {
        setOffers([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    [currentStep]
  );

  const nextStep = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSelectOffer = useCallback((id: string, name: string, features: string[], options: OfferOption[]) => {
    // Pre-select included options
    const includedIds = options.filter((o) => o.is_included).map((o) => o.id);
    const includedNames = options.filter((o) => o.is_included).map((o) => o.name);

    setFormData((prev) => ({
      ...prev,
      selectedOfferId: id,
      selectedOfferName: name,
      offerFeatures: features,
      offerOptions: options,
      selectedOptionIds: includedIds,
      selectedOptions: includedNames,
    }));
  }, []);

  // When user clicks "Personnaliser mes options" after selecting formula
  const handleFormuleNext = useCallback(() => {
    if (formData.offerOptions.length > 0) {
      setShowOptionsPopup(true);
    } else {
      // No detailed options from DB, skip to project step
      setDirection(1);
      setCurrentStep(3);
    }
  }, [formData.offerOptions]);

  const handleToggleOption = useCallback((optionId: string) => {
    setFormData((prev) => {
      const option = prev.offerOptions.find((o) => o.id === optionId);
      if (!option) return prev;

      const isSelected = prev.selectedOptionIds.includes(optionId);
      const newIds = isSelected
        ? prev.selectedOptionIds.filter((id) => id !== optionId)
        : [...prev.selectedOptionIds, optionId];

      // Rebuild selectedOptions (names) from IDs
      const newNames = prev.offerOptions
        .filter((o) => newIds.includes(o.id))
        .map((o) => o.name);

      return {
        ...prev,
        selectedOptionIds: newIds,
        selectedOptions: newNames,
      };
    });
  }, []);

  const handleAddCustomOption = useCallback((option: string) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: [...prev.customOptions, option],
    }));
  }, []);

  const handleRemoveCustomOption = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.filter((_, i) => i !== index),
    }));
  }, []);

  const handleOptionsValidate = useCallback(() => {
    setShowOptionsPopup(false);
    // Go directly to step 3 (Projet)
    setDirection(1);
    setCurrentStep(3);
  }, []);

  const handleOptionsClose = useCallback(() => {
    setShowOptionsPopup(false);
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  }, []);

  const handleAddAttachment = useCallback((attachment: Attachment) => {
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, attachment],
    }));
  }, []);

  const handleRemoveAttachment = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }, []);

  const handleContactChange = useCallback((field: "name" | "email" | "phone" | "company", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedOffer: formData.selectedOfferName,
          selectedOptions: formData.selectedOptions,
          customOptions: formData.customOptions,
          description: formData.description,
          attachments: formData.attachments.map((a) => a.url),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Une erreur est survenue.");
        return;
      }

      setSuccessReference(data.reference);
    } catch {
      setSubmitError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successReference) {
    return <DevisSuccess reference={successReference} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Progress display: show step 2 when popup is open
  const displayStep = showOptionsPopup ? 2 : currentStep <= 1 ? 1 : currentStep;

  return (
    <div>
      <StepProgress currentStep={displayStep} />

      {submitError && (
        <div className="max-w-[600px] mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[0.85rem] text-red-600">
          {submitError}
        </div>
      )}

      {/* Full-page Options Popup */}
      <OptionsPopup
        isOpen={showOptionsPopup}
        offerName={formData.selectedOfferName}
        offerOptions={formData.offerOptions}
        selectedOptionIds={formData.selectedOptionIds}
        customOptions={formData.customOptions}
        onToggleOption={handleToggleOption}
        onAddCustomOption={handleAddCustomOption}
        onRemoveCustomOption={handleRemoveCustomOption}
        onClose={handleOptionsClose}
        onValidate={handleOptionsValidate}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {currentStep === 1 && (
            <StepFormule
              offers={offers}
              categories={categories}
              selectedOfferId={formData.selectedOfferId}
              onSelect={handleSelectOffer}
              onNext={handleFormuleNext}
            />
          )}

          {currentStep === 3 && (
            <StepProjet
              description={formData.description}
              attachments={formData.attachments}
              onDescriptionChange={handleDescriptionChange}
              onAddAttachment={handleAddAttachment}
              onRemoveAttachment={handleRemoveAttachment}
              onNext={nextStep}
              onBack={() => {
                // Go back: show options popup
                setShowOptionsPopup(true);
              }}
            />
          )}

          {currentStep === 4 && (
            <StepContact
              contact={{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
              }}
              onChange={handleContactChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 5 && (
            <StepRecap
              selectedOfferName={formData.selectedOfferName}
              selectedOptions={formData.selectedOptions}
              customOptions={formData.customOptions}
              description={formData.description}
              attachments={formData.attachments}
              contact={{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
              }}
              isSubmitting={isSubmitting}
              onGoToStep={(step) => {
                if (step === 2) {
                  // Open options popup instead
                  setShowOptionsPopup(true);
                } else {
                  goToStep(step);
                }
              }}
              onSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
