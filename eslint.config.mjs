import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["server.js"], // assuming server.js is CommonJS
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: ["public/**/*.js"], // assuming script.js is in 'public' and is using ESM
    languageOptions: {
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
];
