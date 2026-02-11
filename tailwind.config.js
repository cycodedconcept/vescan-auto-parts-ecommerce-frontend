/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141718", // Using the dark heading color as primary for now, or maybe Blue? The button in screenshot is dary navy.
        // Let's add specific text colors
        heading: "#141718",
        body: "#7C797A",
        "footer-bg": "#001326",
        "footer-text": "#E8ECEF",
        // Keeping these for potential use or until clarified
        accent: "#F59E0B",
        blue: "#2563EB",
      },
      fontFamily: {
        heading: ["Coolvetica", "sans-serif"],
        sans: ["Open Sauce One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
