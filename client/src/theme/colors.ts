import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb
} from "@material/material-color-utilities";

// The Cyber-Pro Seed: High-precision Cyan
export const themeSeed = "#00E5FF";

export const initializeTheme = () => {
  const theme = themeFromSourceColor(argbFromHex(themeSeed));
  const scheme = theme.schemes.dark;
  const root = document.documentElement;

  const colorMap: Record<string, any> = {
    "--md-sys-color-primary": scheme.primary,
    "--md-sys-color-on-primary": scheme.onPrimary,
    "--md-sys-color-secondary": "#607D8B", // Cool Steel
    "--md-sys-color-tertiary": "#FF3D00", // Emergency Alert Red
    "--md-sys-color-surface": "#0A0E14", // Deep Steel
    "--md-sys-color-on-surface": "#E1E2E5",
    "--md-sys-color-surface-container": "#111821",
    "--md-sys-color-outline": "rgba(0, 229, 255, 0.2)", // Cyan Outline
  };

  Object.entries(colorMap).forEach(([prop, value]) => {
    const hex = typeof value === 'string' ? value : hexFromArgb(value);
    root.style.setProperty(prop, hex);
  });
};
