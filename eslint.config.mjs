import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import ESLintConfigPrettier from "eslint-config-prettier";
import ESLintPlugin from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  ESLintConfigPrettier,
  {
    plugins: {
      ESLintPlugin,
    },
    rules: {
      camelcase: "off",
      "no-console": "off",
      "no-underscore-dangle": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",
      "no-nested-ternary": "off",
      "import/prefer-default-export": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
