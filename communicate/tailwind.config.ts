import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      'sand': '#D4A373'
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
