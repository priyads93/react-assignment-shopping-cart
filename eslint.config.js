import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, tseslint, react, reactRefresh, reactHooks },
    rules: {
      "react/prefer-stateless-function": "error",

      "react/react-in-jsx-scope": "off",
      "reactHooks/rules-of-hooks": "error",
      "reactHooks/exhaustive-deps": "warn",
      "react/no-unused-prop-types": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-no-script-url": "error",
      "react/no-children-prop": "error",
      "react/no-danger": "error",
      "react/no-danger-with-children": "error",
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      "react/jsx-fragments": "error",
      "react/destructuring-assignment": [
        "error",
        "always",
        { destructureInSignature: "always" },
      ],
      "reactRefresh/only-export-components": "warn",
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
      "react/jsx-max-depth": ["error", { max: 5 }],
      "react/function-component-definition": [
        "warn",
        { namedComponents: "arrow-function" },
      ],
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-curly-brace-presence": "warn",
      "react/no-typos": "warn",
      "react/display-name": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": "warn",
      "react/jsx-one-expression-per-line": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          // Specify PascalCase for React components
          format: ["PascalCase", "camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "property",
          format: null,
          leadingUnderscore: "allow",
        },
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
    },
    extends: ["js/recommended"],
  },

  tseslint.configs.recommended,
]);
