// eslint.config.mjs

import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      ".turbo/**",
    ],
  },
];