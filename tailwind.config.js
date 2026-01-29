/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dbe4fe",
          200: "#bfcffe",
          300: "#93b0fc",
          400: "#6088f8",
          500: "#3b63f3",
          600: "#2543e8",
          700: "#1d32d5",
          800: "#1e2aad",
          900: "#1e2988",
          950: "#171c53",
        },
      },
      fontSize: {
        "entry-source": ["20px", { lineHeight: "30px" }],
        "entry-body": ["16px", { lineHeight: "26px" }],
        "entry-attribution": ["14px", { lineHeight: "20px" }],
      },
      spacing: {
        "entry-padding": "20px",
        "section-gap": "24px",
      },
    },
  },
  plugins: [],
};
