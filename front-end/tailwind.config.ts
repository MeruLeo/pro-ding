import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background and Foreground
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Dark Blue Palette
        darkNavy: "#0A1128", // بسیار تیره برای پس‌زمینه‌های اصلی
        midnightBlue: "#001F54", // برای نواحی عمیق‌تر
        gunmetalBlue: "#123456", // برای مرزها و کارت‌های ثانویه
        steelBlue: "#1E2A39", // استفاده برای کارت‌ها و باکس‌های متوسط
        coolBlueGray: "#3E4A61", // رنگ جزئیات و تایپوگرافی
        slateBlue: "#4B6584", // برای بخش‌های جزئی و پس‌زمینه‌های ثانویه

        // Main Accent Colors
        primaryBlue: "#005DFF", // برای CTA و لینک‌ها
        accentCyan: "#0BC2C2", // برای المان‌های برجسته و اعلان‌ها
        vibrantIndigo: "#3B0080", // رنگ تزئینی یا تاکید کم
        softLightBlue: "#A7C5EB", // برای نواحی پس‌زمینه اطلاع‌رسانی
      },
    },
  },
  plugins: [],
};

export default config;
