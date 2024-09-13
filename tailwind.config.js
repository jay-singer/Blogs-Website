/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // This path looks correct for src folder.
  theme: {
    extend: {
    colors:{
    "Primary":"#0d6efd",
    "Success":"#198754",
    "Danger":"#dc3545",
   "Info":"#0dcaf0",
   "Secondary":"#6c757d",
   "Warning": "#ffc107",
   "Dark": "#212529"
    }
    },
  },
  plugins: [],
};

