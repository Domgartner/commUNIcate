import type { Config } from "tailwindcss";


const config: Config = {
 content: [
   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
   "./components/**/*.{js,ts,jsx,tsx,mdx}",
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
   extend: {
     backgroundImage: {
       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
       "gradient-conic":
         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
     },
     fontFamily: {
       sans: ['Montserrat', 'sans-serif'],
       roboto: ['roboto-serif'],
     },
   },
   colors: {
     transparent: 'transparent',
     current: 'currentColor',
     'olive': '#A6AD8C',
     'green': '#E9EDC9',
     'light-green': '#CCD5AE',
     'cream': '#FEFAE0',
     'beige': '#FAEDCD',
     'sand': '#D4A373',
     'bleh': '#1F1F1F',
     'line' : "#9FB4BC",
     'baby-blue' : '#e5f3ff',
     'blue' : '#68c9f8'
   },
 },
 plugins: [],
};
export default config;
