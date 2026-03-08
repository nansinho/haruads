"use client";

import { useEffect } from "react";
import {
  DEFAULT_THEME,
  buildThemeVariables,
  buildFullThemeVariables,
  getPresetById,
  DEFAULT_PRESET_ID,
  type ThemeColors,
} from "@/lib/theme";

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
  /* ── On mount: read stored preset, apply it ── */
  useEffect(() => {
    let storedId = DEFAULT_PRESET_ID;
    try {
      storedId = localStorage.getItem(PRESET_STORAGE_KEY) || DEFAULT_PRESET_ID;
    } catch {
      // Ignore localStorage errors
    }

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

  return <>{children}</>;
}
