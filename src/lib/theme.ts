import { deriveDarkPalette, deriveAccentPalette } from "./colors";

export interface ThemeColors {
  dark: string;
  accent: string;
}

export const DEFAULT_THEME: ThemeColors = {
  dark: "#0a0a0a",
  accent: "#f97316",
};

export function buildThemeVariables(
  colors: ThemeColors
): Record<string, string> {
  const darkPalette = deriveDarkPalette(colors.dark);
  const accentPalette = deriveAccentPalette(colors.accent);

  return {
    "--color-dark": darkPalette.dark,
    "--color-dark-2": darkPalette.dark2,
    "--color-dark-3": darkPalette.dark3,
    "--color-accent": accentPalette.accent,
    "--color-accent-hover": accentPalette.accentHover,
    "--color-accent-dim": accentPalette.accentDim,
    "--color-cyan": accentPalette.cyan,
  };
}
