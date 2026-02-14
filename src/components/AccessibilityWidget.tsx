"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface A11ySettings {
  fontSize: number; // 0 = normal, 1 = large, 2 = x-large
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  readingGuide: boolean;
  colorFilter: string; // "" | "grayscale" | "protanopia" | "deuteranopia" | "tritanopia"
}

const defaultSettings: A11ySettings = {
  fontSize: 0,
  highContrast: false,
  dyslexiaFont: false,
  reducedMotion: false,
  readingGuide: false,
  colorFilter: "",
};

const fontSizeLabels = ["Normal", "Grand", "Très grand"];
const colorFilterLabels: { value: string; label: string }[] = [
  { value: "", label: "Aucun" },
  { value: "grayscale", label: "Niveaux de gris" },
  { value: "protanopia", label: "Protanopie" },
  { value: "deuteranopia", label: "Deutéranopie" },
  { value: "tritanopia", label: "Tritanopie" },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const [mouseY, setMouseY] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("a11y-settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply settings to <html> element
  useEffect(() => {
    const html = document.documentElement;

    // Font size
    const sizes = ["16px", "18px", "20px"];
    html.style.fontSize = sizes[settings.fontSize] || "16px";

    // High contrast
    html.classList.toggle("a11y-high-contrast", settings.highContrast);

    // Dyslexia font
    html.classList.toggle("a11y-dyslexia", settings.dyslexiaFont);

    // Reduced motion
    html.classList.toggle("a11y-reduced-motion", settings.reducedMotion);

    // Color filter
    html.dataset.colorFilter = settings.colorFilter;

    // Save to localStorage
    try {
      localStorage.setItem("a11y-settings", JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Reading guide (follows mouse)
  useEffect(() => {
    if (!settings.readingGuide) return;
    const handler = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [settings.readingGuide]);

  const update = useCallback(
    (key: keyof A11ySettings, value: A11ySettings[keyof A11ySettings]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <>
      {/* Reading guide overlay */}
      {settings.readingGuide && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          aria-hidden="true"
        >
          <div
            className="absolute left-0 right-0 h-[3px] bg-accent/40"
            style={{ top: mouseY - 1 }}
          />
          <div
            className="absolute left-0 right-0 bg-black/20"
            style={{ top: 0, height: Math.max(0, mouseY - 30) }}
          />
          <div
            className="absolute left-0 right-0 bg-black/20 bottom-0"
            style={{ top: mouseY + 30 }}
          />
        </div>
      )}

      {/* Floating button — bottom left */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full bg-accent text-dark flex items-center justify-center shadow-lg shadow-accent/20 cursor-pointer border-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Options d'accessibilité"
        title="Accessibilité"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-dark">
          <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2 7h4l1 9h-2l-.5-5h-1L11 18H9l1-9zm-5.5-.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S3 6.17 3 7s.67 1.5 1.5 1.5zm0 1c-1.38 0-2.5 1.12-2.5 2.5v3h2v-3c0-.28.22-.5.5-.5h1.09l.41-2H4.5zm15 -1c.83 0 1.5-.67 1.5-1.5S20.33 5.5 19.5 5.5 18 6.17 18 7s.67 1.5 1.5 1.5zm2.5 3.5c0-1.38-1.12-2.5-2.5-2.5h-1.59l.41 2h1.18c.28 0 .5.22.5.5v3h2v-3z" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 left-6 z-[9999] w-[320px] max-h-[70vh] overflow-y-auto bg-dark border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[0.95rem] font-semibold text-white">
                Accessibilit&eacute;
              </h3>
              <button
                onClick={reset}
                className="text-[0.7rem] text-accent hover:underline bg-transparent border-none cursor-pointer font-medium"
              >
                R&eacute;initialiser
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-5">
              <label className="text-[0.75rem] text-white/50 uppercase tracking-wider font-medium block mb-2">
                Taille du texte
              </label>
              <div className="flex gap-2">
                {fontSizeLabels.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => update("fontSize", i)}
                    className={`flex-1 py-2 rounded-lg text-[0.75rem] font-medium cursor-pointer border transition-all ${
                      settings.fontSize === i
                        ? "bg-accent text-dark border-accent"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle options */}
            <div className="space-y-3 mb-5">
              <ToggleOption
                label="Contraste &eacute;lev&eacute;"
                active={settings.highContrast}
                onToggle={() => update("highContrast", !settings.highContrast)}
              />
              <ToggleOption
                label="Police dyslexie"
                active={settings.dyslexiaFont}
                onToggle={() => update("dyslexiaFont", !settings.dyslexiaFont)}
              />
              <ToggleOption
                label="R&eacute;duire les animations"
                active={settings.reducedMotion}
                onToggle={() =>
                  update("reducedMotion", !settings.reducedMotion)
                }
              />
              <ToggleOption
                label="Guide de lecture"
                active={settings.readingGuide}
                onToggle={() =>
                  update("readingGuide", !settings.readingGuide)
                }
              />
            </div>

            {/* Color filter */}
            <div>
              <label className="text-[0.75rem] text-white/50 uppercase tracking-wider font-medium block mb-2">
                Filtre daltonien
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorFilterLabels.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("colorFilter", opt.value)}
                    className={`py-2 px-3 rounded-lg text-[0.7rem] font-medium cursor-pointer border transition-all ${
                      settings.colorFilter === opt.value
                        ? "bg-accent text-dark border-accent"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ToggleOption({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer transition-all hover:border-white/20"
    >
      <span
        className="text-[0.8rem] text-white/70 font-medium"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <div
        className={`w-9 h-5 rounded-full relative transition-colors ${
          active ? "bg-accent" : "bg-white/15"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            active ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}
