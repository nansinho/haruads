"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  DEFAULT_THEME,
  buildThemeVariables,
  buildFullThemeVariables,
  getPresetById,
  DEFAULT_PRESET_ID,
  THEME_PRESETS,
  type ThemeColors,
} from "@/lib/theme";
import { ThemeCtx } from "@/lib/theme-context";

const PRESET_STORAGE_KEY = "theme-preset-id";
const ADMIN_THEME_KEY = "site-theme";

function applyVars(vars: Record<string, string>) {
  const html = document.documentElement;
  for (const [prop, value] of Object.entries(vars)) {
    html.style.setProperty(prop, value);
  }
}

/** Legacy export used by admin settings page. */
export function applyTheme(colors: ThemeColors) {
  applyVars(buildThemeVariables(colors));
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID);

  /* ── On mount: read stored preset, apply it ── */
  useEffect(() => {
    let storedId = DEFAULT_PRESET_ID;
    try {
      storedId = localStorage.getItem(PRESET_STORAGE_KEY) || DEFAULT_PRESET_ID;
    } catch {
      // Ignore localStorage errors
    }

    setPresetId(storedId);

    // Apply the preset immediately
    const preset = getPresetById(storedId);
    applyVars(buildFullThemeVariables(preset.colors));

    // For noir-orange, also fetch admin-level customisation
    if (storedId === "noir-orange") {
      try {
        const cached = localStorage.getItem(ADMIN_THEME_KEY);
        if (cached) {
          applyVars(buildThemeVariables(JSON.parse(cached)));
        }
      } catch {
        // Ignore
      }

      fetch("/api/settings/theme")
        .then((res) => res.json())
        .then((data) => {
          const colors: ThemeColors = data.colors || DEFAULT_THEME;
          applyVars(buildThemeVariables(colors));
          try {
            localStorage.setItem(ADMIN_THEME_KEY, JSON.stringify(colors));
          } catch {
            // Ignore
          }
        })
        .catch(() => {});
    }
  }, []);

  /* ── Toggle between presets ── */
  const toggleTheme = useCallback(() => {
    setPresetId((current) => {
      const currentIdx = THEME_PRESETS.findIndex((p) => p.id === current);
      const nextIdx = (currentIdx + 1) % THEME_PRESETS.length;
      const next = THEME_PRESETS[nextIdx];

      // Smooth transition class
      document.documentElement.classList.add("theme-transitioning");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 500);

      applyVars(buildFullThemeVariables(next.colors));

      try {
        localStorage.setItem(PRESET_STORAGE_KEY, next.id);
      } catch {
        // Ignore
      }

      return next.id;
    });
  }, []);

  const ctx = useMemo(
    () => ({ presetId, toggleTheme }),
    [presetId, toggleTheme]
  );

  return <ThemeCtx.Provider value={ctx}>{children}</ThemeCtx.Provider>;
}
