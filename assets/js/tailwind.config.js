// tailwind.config.js
// Konfigurasi tema custom Tailwind untuk portfolio ZaskhiaAI.
// Diletakkan terpisah supaya gampang diubah tanpa menyentuh index.html.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui"],
      },
      colors: {
        teal: {
          DEFAULT: "#125066",
          dark: "#0C3A4B",
          light: "#2F6F86",
        },
        navy: {
          DEFAULT: "#1B1833",
          soft: "#232041",
        },
        gold: {
          DEFAULT: "#FBC724",
          dark: "#E8AE0D",
        },
        blush: {
          DEFAULT: "#FFF3F3",
          deep: "#F7E2E2",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(18,80,102,0.35)",
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // <--- PASTIKAN ADA '.js' DI SINI
    "./index.html",
    "./main.js", // <--- Atau tulis langsung nama file js Anda jika di luar folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
