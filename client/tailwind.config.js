/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--md-sys-color-primary)",
        "on-primary": "var(--md-sys-color-on-primary)",
        secondary: "var(--md-sys-color-secondary)",
        tertiary: "var(--md-sys-color-tertiary)",
        surface: "var(--md-sys-color-surface)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "surface-container": "var(--md-sys-color-surface-container)",
        outline: "var(--md-sys-color-outline)",
      },
      backgroundImage: {
        'cyber-hero': "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')",
      }
    },
  },
  plugins: [],
}
