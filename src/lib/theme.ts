import { deriveDarkPalette, deriveAccentPalette, hexToRgb } from "./colors";

/* ── Existing admin-level type (dark + accent only) ── */
export interface ThemeColors {
  dark: string;
  accent: string;
}

export const DEFAULT_THEME: ThemeColors = {
  dark: "#0a0a0a",
  accent: "#f97316",
};

/* ── Full preset type covering every CSS variable ── */
export interface FullThemeColors {
  dark: string;
  dark2: string;
  dark3: string;
  accent: string;
  accentHover: string;
  accentDim: string;
  cyan: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  light: string;
  textDark: string;
  textBody: string;
  borderDark: string;
}

export interface ThemePreset {
  id: string;
  label: string;
  colors: FullThemeColors;
}

/* ── Presets ── */

export const THEME_NOIR_ORANGE: ThemePreset = {
  id: "noir-orange",
  label: "Noir & Orange",
  colors: {
    dark: "#0a0a0a",
    dark2: "#111111",
    dark3: "#1a1a1a",
    accent: "#f97316",
    accentHover: "#ea580c",
    accentDim: "rgba(249, 115, 22, 0.06)",
    cyan: "#fb923c",
    textPrimary: "#ffffff",
    textSecondary: "#c8c8d0",
    textMuted: "#94949e",
    light: "#f8f8f8",
    textDark: "#1a1a1a",
    textBody: "#94949e",
    borderDark: "rgba(255, 255, 255, 0.06)",
  },
};

export const THEME_BLEU: ThemePreset = {
  id: "bleu",
  label: "Bleu Navy",
  colors: {
    dark: "#001F4F",
    dark2: "#002a5c",
    dark3: "#003570",
    accent: "#087BCA",
    accentHover: "#0668ab",
    accentDim: "rgba(8, 123, 202, 0.06)",
    cyan: "#3DA5E0",
    textPrimary: "#ffffff",
    textSecondary: "#c8d8eb",
    textMuted: "#8899b4",
    light: "#f0f4f8",
    textDark: "#1a1a1a",
    textBody: "#8899b4",
    borderDark: "rgba(255, 255, 255, 0.08)",
  },
};

export const THEME_PRESETS: ThemePreset[] = [THEME_NOIR_ORANGE, THEME_BLEU];
export const DEFAULT_PRESET_ID = "bleu";

/* ── Helpers ── */

function toRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

/** Build all CSS variable entries from a full preset. */
export function buildFullThemeVariables(
  colors: FullThemeColors
): Record<string, string> {
  return {
    "--color-dark": colors.dark,
    "--color-dark-2": colors.dark2,
    "--color-dark-3": colors.dark3,
    "--color-accent": colors.accent,
    "--color-accent-hover": colors.accentHover,
    "--color-accent-dim": colors.accentDim,
    "--color-cyan": colors.cyan,
    "--color-text-primary": colors.textPrimary,
    "--color-text-secondary": colors.textSecondary,
    "--color-text-muted": colors.textMuted,
    "--color-light": colors.light,
    "--color-text-dark": colors.textDark,
    "--color-text-body": colors.textBody,
    "--color-border-dark": colors.borderDark,
    // RGB triplet for use in rgba() in inline styles
    "--color-accent-rgb": toRgbString(colors.accent),
    "--color-cyan-rgb": toRgbString(colors.cyan),
  };
}

/** Legacy: build variables from the admin-level ThemeColors (dark + accent). */
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

/** Find a preset by id, falling back to noir-orange. */
export function getPresetById(id: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_NOIR_ORANGE;
}
