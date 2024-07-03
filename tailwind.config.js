/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "layout-A": "1rem"
      },
      colors: {
        "base-default": "#faf9f8"
      },
      boxShadow: {
        "form-block": "0 15px 40px -15px rgba(0, 0, 0, 0.1)"
      },
      keyframes: {
        wave: {
          "0%": { top: "0", opacity: "1" },
          "50%": { top: "20px", opacity: "0.2" },
          "100%": { top: "0", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
