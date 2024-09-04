/* eslint-disable prettier/prettier */
import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // This will scan the app directory
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        green: "#1ABE4E",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
