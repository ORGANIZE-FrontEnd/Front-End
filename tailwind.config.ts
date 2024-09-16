/* eslint-disable prettier/prettier */
import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        green: "#1ABE4E",
        bgWhite: "#f2f4ef",
        green800: "#117641",
        green300: "#86efac",
      },
    },
  },

  plugins: [flowbite.plugin()],
};
export default config;
