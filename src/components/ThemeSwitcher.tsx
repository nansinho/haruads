"use client";

import { useState, useEffect } from "react";
import { THEME_PRESETS, DEFAULT_PRESET_ID, getPresetById } from "@/lib/theme";

const STORAGE_KEY = "theme-preset-id";

export default function ThemeSwitcher() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID);

  useEffect(() => {
    try {
      setPresetId(localStorage.getItem(STORAGE_KEY) || DEFAULT_PRESET_ID);
    } catch {
      // ignore
    }
  }, []);

  const current = getPresetById(presetId);
  const nextIdx =
    (THEME_PRESETS.findIndex((p) => p.id === presetId) + 1) %
    THEME_PRESETS.length;
  const next = THEME_PRESETS[nextIdx];

  function handleClick() {
    const html = document.documentElement;

    // 1. Remove ALL inline --color-* styles (clears ThemeProvider inline overrides)
    const propsToRemove: string[] = [];
    for (let i = 0; i < html.style.length; i++) {
      const prop = html.style[i];
      if (prop.startsWith("--color-")) {
        propsToRemove.push(prop);
      }
    }
    for (const prop of propsToRemove) {
      html.style.removeProperty(prop);
    }

    // 2. Toggle data-theme — CSS rules in globals.css handle the color changes
    // Default (no attribute) = bleu, data-theme="noir-orange" = noir & orange
    const isNoirOrange = html.getAttribute("data-theme") === "noir-orange";
    const newId = isNoirOrange ? "bleu" : "noir-orange";

    if (newId === "noir-orange") {
      html.setAttribute("data-theme", "noir-orange");
    } else {
      html.removeAttribute("data-theme");
    }

    // 3. Smooth transition
    html.classList.add("theme-transitioning");
    setTimeout(() => html.classList.remove("theme-transitioning"), 500);

    // 4. Persist
    try {
      localStorage.setItem(STORAGE_KEY, newId);
    } catch {
      // ignore
    }

    setPresetId(newId);
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-text-muted hover:text-white hover:border-white/[0.25] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent"
      aria-label={`Changer vers le thème ${next.label}`}
      title={`Thème actuel : ${current.label}`}
    >
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
    </button>
  );
}
