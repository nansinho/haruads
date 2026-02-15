"use client";

import { useEffect } from "react";
import {
  DEFAULT_THEME,
  buildThemeVariables,
  type ThemeColors,
} from "@/lib/theme";

export function applyTheme(colors: ThemeColors) {
  const vars = buildThemeVariables(colors);
  const html = document.documentElement;
  for (const [prop, value] of Object.entries(vars)) {
    html.style.setProperty(prop, value);
  }
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Apply cached theme immediately to avoid flash
    try {
      const cached = localStorage.getItem("site-theme");
      if (cached) {
        applyTheme(JSON.parse(cached));
      }
    } catch {
      // Ignore localStorage errors
    }

    // Fetch fresh theme from API
    fetch("/api/settings/theme")
      .then((res) => res.json())
      .then((data) => {
        const colors: ThemeColors = data.colors || DEFAULT_THEME;
        applyTheme(colors);
        try {
          localStorage.setItem("site-theme", JSON.stringify(colors));
        } catch {
          // Ignore localStorage errors
        }
      })
      .catch(() => {
        // Silently fall back to CSS defaults from @theme inline
      });
  }, []);

  return <>{children}</>;
}
