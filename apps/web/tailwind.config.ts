// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig],
  //caso precise, já está semi pronto
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--general-text-color)",
          innerText: "var(--inner-text-color)",
          linkText: "var(--link-text-color)",
        },
      },
      backgroundColor: {
        skin: {
          base: "var(--general-bg-color)",
          inputBackground: "var(--input-bg-color)",
          formBackground: "var(--form-security-bg-color)",
          buttonBackgroundBlue: "var(--button-security-bg-color-blue)",
          buttonBackgroundGreen: "var(--button-security-bg-color-green)",
          buttonBackgroundRed: "var(--button-security-bg-color-red)",
          buttonBackgroundGray: "var(--button-security-bg-color-gray)",
        },
      },
      borderColor: {
        skin: {
          base: "var(--general-ring-color)",
        },
      },
      ringColor: {
        skin: {
          base: "var(--general-ring-color)",
        },
      },
    },
  },
};

export default config;
