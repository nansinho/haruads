"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepProgress from "./StepProgress";
import StepFormule from "./StepFormule";
import StepOptions from "./StepOptions";
import StepProjet from "./StepProjet";
import StepContact from "./StepContact";
import StepRecap from "./StepRecap";
import DevisSuccess from "./DevisSuccess";

interface Offer {
  id: string;
  name: string;
  description: string;
  features: string[];
  is_popular: boolean;
}

interface Attachment {
  url: string;
  name: string;
}

interface FormData {
  selectedOfferId: string | null;
  selectedOfferName: string;
  offerFeatures: string[];
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
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successReference, setSuccessReference] = useState("");

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data.data || []))
      .catch(() => setOffers([]))
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

  const handleSelectOffer = useCallback((id: string, name: string, features: string[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedOfferId: id,
      selectedOfferName: name,
      offerFeatures: features,
      selectedOptions: features,
    }));
  }, []);

  const handleToggleOption = useCallback((option: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(option)
        ? prev.selectedOptions.filter((o) => o !== option)
        : [...prev.selectedOptions, option],
    }));
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

  return (
    <div>
      <StepProgress currentStep={currentStep} />

      {submitError && (
        <div className="max-w-[600px] mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[0.85rem] text-red-600">
          {submitError}
        </div>
      )}

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
              selectedOfferId={formData.selectedOfferId}
              onSelect={handleSelectOffer}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <StepOptions
              offerFeatures={formData.offerFeatures}
              selectedOptions={formData.selectedOptions}
              customOptions={formData.customOptions}
              onToggleOption={handleToggleOption}
              onAddCustomOption={handleAddCustomOption}
              onRemoveCustomOption={handleRemoveCustomOption}
              onNext={nextStep}
              onBack={prevStep}
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
              onBack={prevStep}
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
              onGoToStep={goToStep}
              onSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
