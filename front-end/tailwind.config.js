import { colors, nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfBold: ["var(--sf-bold)"],
      },
      borderWidth: {
        0.5: "0.1px",
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      colors: {
        // Main Background Colors
        bgMain: "#0D0F0E", //  پس‌زمینه‌ی اصلی
        bgLight: "#F5F5F5", // پس‌زمینه روشن

        // Primary Shades
        greenOrg: "#11FF62", // سبز اصلی
        greenLight: "#2AFF7D", // سبز روشن
        greenDark: "#0FBF4C", // سبز تیره‌تر

        yellowOrg: "#FFE711", // زرد اصلی
        yellowLight: "#FFF36B", // زرد روشن
        yellowDark: "#E6CB0F", // زرد تیره‌تر

        redOrg: "#FF4F4F", // قرمز اصلی
        redLight: "#FF7676", // قرمز روشن
        redDark: "#D94444", // قرمز تیره‌تر

        // Neutral and Secondary Shades
        grayLight: "#E6E8E9", // خاکستری روشن
        grayDark: "#2E3031", // خاکستری تیره
        blueOrg: "#217AFF", // آبی اصلی
        blueLight: "#5A9BFF", // آبی روشن
        blueDark: "#1B61CC", // آبی تیره
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};
