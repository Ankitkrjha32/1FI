/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1e3a8a',
        'slate-dark': '#1e293b',
        'slate-medium': '#334155',
        'slate-light': '#64748b',
        'custom-black': '#0f172a',
      },
    },
  },
  plugins: [],
}
