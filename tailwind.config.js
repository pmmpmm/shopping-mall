/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    color: {
      logo: "#000000"
    },
    extend: {
      height: {
        ["header-height"]: "var(--header-height)",
        ["header-height-sm"]: "var(--header-height-sm)"
      },
      padding: {
        ["container-top"]: "var(--header-height)",
        ["container-top-sm"]: "var(--header-height-sm)",
        ["container-bottom"]: "var(--container-bottom)",
        ["container-rl"]: "var(--container-right-left)"
      },
      colors: {
        ["base-950"]: "var(--base-color-950)",
        ["base-900"]: "var(--base-color-900)",
        ["base-800"]: "var(--base-color-800)",
        ["base-700"]: "var(--base-color-700)",
        ["base-600"]: "var(--base-color-600)",
        ["base-500"]: "var(--base-color-500)",
        ["base-400"]: "var(--base-color-400)",
        ["base-300"]: "var(--base-color-300)",
        ["base-200"]: "var(--base-color-200)",
        ["base-100"]: "var(--base-color-100)",
        ["base-50"]: "var(--base-color-50)",
        ["main-950"]: "var(--main-color-950)",
        ["main-900"]: "var(--main-color-900)",
        ["main-800"]: "var(--main-color-800)",
        ["main-700"]: "var(--main-color-700)"
      },
      boxShadow: {
        ["form-focus"]: "0.25rem 0.25rem 0.75rem rgba(0, 0, 0, 0.2)",
        ["block"]: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      },
      keyframes: {
        wave: {
          "0%": { top: "0", opacity: "1" },
          "50%": { top: "20px", opacity: "0.2" },
          "100%": { top: "0", opacity: "1" }
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem"
      }
    }
  },
  plugins: []
};
