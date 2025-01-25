// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig],
  //caso precise, já está semi pronto
  theme: {
    extend: {
      colors: {
        'admin-inner-container': '#18181B'
      }
    },
  },
};

export default config;
