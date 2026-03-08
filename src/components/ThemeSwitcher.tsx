"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  THEME_PRESETS,
  DEFAULT_PRESET_ID,
  getPresetById,
  buildFullThemeVariables,
} from "@/lib/theme";

const PRESET_STORAGE_KEY = "theme-preset-id";

function readStoredPresetId(): string {
  try {
    return localStorage.getItem(PRESET_STORAGE_KEY) || DEFAULT_PRESET_ID;
  } catch {
    return DEFAULT_PRESET_ID;
  }
}

export default function ThemeSwitcher() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID);

  // Sync with localStorage after mount
  useEffect(() => {
    setPresetId(readStoredPresetId());
  }, []);

  const current = getPresetById(presetId);
  const nextIdx =
    (THEME_PRESETS.findIndex((p) => p.id === presetId) + 1) %
    THEME_PRESETS.length;
  const next = THEME_PRESETS[nextIdx];

  const handleToggle = useCallback(() => {
    // Read current from localStorage (source of truth) to avoid stale state
    const currentId = readStoredPresetId();
    const curIdx = THEME_PRESETS.findIndex((p) => p.id === currentId);
    const nxtIdx = (curIdx + 1) % THEME_PRESETS.length;
    const nextPreset = THEME_PRESETS[nxtIdx];

    // Apply CSS variables directly on <html>
    const html = document.documentElement;
    const vars = buildFullThemeVariables(nextPreset.colors);
    for (const [prop, value] of Object.entries(vars)) {
      html.style.setProperty(prop, value);
    }

    // Update data-theme attribute for anti-flash CSS
    html.setAttribute("data-theme", nextPreset.id);

    // Smooth transition
    html.classList.add("theme-transitioning");
    setTimeout(() => html.classList.remove("theme-transitioning"), 500);

    // Persist to localStorage
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, nextPreset.id);
    } catch {
      // Ignore
    }

    setPresetId(nextPreset.id);
  }, []);

  return (
    <motion.button
      onClick={handleToggle}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-text-muted hover:text-white hover:border-white/[0.25] cursor-pointer transition-colors duration-300"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Changer vers le thème ${next.label}`}
      title={`Thème actuel : ${current.label}`}
    >
      {/* Palette icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="6.5" cy="12" r="0.5" fill="currentColor" stroke="none" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    </motion.button>
  );
}
