"use client";

import { createContext, useContext } from "react";
import { DEFAULT_PRESET_ID } from "./theme";

export interface ThemePresetContext {
  presetId: string;
  toggleTheme: () => void;
}

export const ThemeCtx = createContext<ThemePresetContext>({
  presetId: DEFAULT_PRESET_ID,
  toggleTheme: () => {},
});

export function useThemePreset() {
  return useContext(ThemeCtx);
}
