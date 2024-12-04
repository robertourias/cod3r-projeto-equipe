// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif',],
      },
    },
  },
};

export default config;
