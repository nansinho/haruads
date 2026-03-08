"use client";

import { motion } from "framer-motion";

const steps = [
  { num: 1, label: "Formule" },
  { num: 2, label: "Options" },
  { num: 3, label: "Projet" },
  { num: 4, label: "Contact" },
  { num: 5, label: "Récap" },
];

interface StepProgressProps {
  currentStep: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
      {steps.map((step, i) => {
        const isCompleted = currentStep > step.num;
        const isCurrent = currentStep === step.num;

        return (
          <div key={step.num} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[0.75rem] font-semibold transition-colors ${
                  isCompleted
                    ? "bg-accent text-white"
                    : isCurrent
                      ? "bg-accent text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
                animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.num
                )}
              </motion.div>
              <span
                className={`text-[0.65rem] sm:text-[0.7rem] font-medium ${
                  isCurrent ? "text-accent" : isCompleted ? "text-accent/70" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-6 sm:w-10 lg:w-14 h-[2px] mb-5 transition-colors ${
                  currentStep > step.num ? "bg-accent" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
