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
      }
    }
  },
  plugins: []
};
