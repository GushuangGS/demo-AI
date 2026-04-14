/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./App.vue"
  ],
  theme: {
    extend: {
      "colors": {
        "on-surface": "#191c1e",
        "secondary": "#4d5b94",
        "on-primary-container": "#cad3ff",
        "error": "#ba1a1a",
        "outline": "#747686",
        "surface": "#f7f9fb",
        "secondary-fixed-dim": "#b7c4ff",
        "on-tertiary-fixed": "#390c00",
        "primary-fixed": "#dce1ff",
        "on-secondary-fixed": "#03164d",
        "secondary-fixed": "#dce1ff",
        "outline-variant": "#c4c5d7",
        "background": "#f7f9fb",
        "on-error-container": "#93000a",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#001551",
        "on-background": "#191c1e",
        "inverse-on-surface": "#eff1f3",
        "tertiary-container": "#a73400",
        "error-container": "#ffdad6",
        "surface-dim": "#d8dadc",
        "on-secondary-fixed-variant": "#35437b",
        "surface-container-low": "#f2f4f6",
        "on-tertiary-fixed-variant": "#832700",
        "secondary-container": "#b0befe",
        "primary-fixed-dim": "#b7c4ff",
        "tertiary-fixed": "#ffdbcf",
        "surface-container-highest": "#e0e3e5",
        "on-surface-variant": "#434655",
        "primary-container": "#1d4ed8",
        "inverse-surface": "#2d3133",
        "on-tertiary": "#ffffff",
        "tertiary": "#7f2500",
        "primary": "#0037b0",
        "surface-container-high": "#e6e8ea",
        "surface-container": "#eceef0",
        "surface-variant": "#e0e3e5",
        "surface-tint": "#2151da",
        "on-primary": "#ffffff",
        "inverse-primary": "#b7c4ff",
        "on-error": "#ffffff",
        "surface-bright": "#f7f9fb",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed-variant": "#0039b5",
        "on-secondary-container": "#3d4c83",
        "on-tertiary-container": "#ffc9b7",
        "tertiary-fixed-dim": "#ffb59c"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "xxl": "1.5rem",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
        "label": ["Plus Jakarta Sans", "sans-serif"]
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

