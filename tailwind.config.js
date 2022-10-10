/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#97f4d5",

          secondary: "#e0923a",

          accent: "#7bd5d8",

          neutral: "#242131",

          "base-100": "#EAEEF0",

          info: "#21ACE8",

          success: "#149064",

          warning: "#EFBC4E",

          error: "#EA3E52",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
