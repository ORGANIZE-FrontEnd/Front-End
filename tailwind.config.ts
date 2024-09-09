/* eslint-disable prettier/prettier */
import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/atoms/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/molecules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/organisms/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        green: "#1ABE4E",
      },
    },
  },
  safelist: [
    "px-8",
    "sm:px-16",
    "md:px-24",
    "lg:px-32",
    "xl:px-64",
    "pl-7",
    "pt-8",
  ],
  plugins: [flowbite.plugin()],
};
export default config;
