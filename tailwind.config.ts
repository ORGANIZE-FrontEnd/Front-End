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
        green500: "#129E3F",
        grey: "#787878",
        offWhite: "#FEFDF9",
      },
    },
  },

  plugins: [flowbite.plugin()],
};
export default config;
