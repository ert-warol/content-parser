import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "module" },
    // rules: {
    //   "no-unused-vars": "off",
    // },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
