/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        first: "spin 10s linear infinite",
        second: "ping 12s linear infinite",
        third: "pulse 15s ease-in-out infinite",
        fourth: "bounce 20s linear infinite",
        fifth: "spin 25s reverse linear infinite",
      },
    },
  },
  plugins: [],
}
