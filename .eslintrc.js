module.exports = {
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "jest"],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:storybook/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-case-declarations": "off",
    "no-console": "warn",
    "no-nested-ternary": "error",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "(handle|on|set)",
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    "react/no-multi-comp": ["error", { ignoreStateless: true }],
    "react/no-access-state-in-setstate": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-this-in-sfc": "error",
    "react/no-unused-state": "error",
    "react/self-closing-comp": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    "react-hooks/rules-of-hooks": "error",

    /**
     * Disable some `plugin:react/recommended` settings.
     */
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/jsx-boolean-value": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/sort-comp": [
      "warn",
      {
        order: [
          "static-methods",
          "instance-variables",
          "getters",
          "setters",
          "lifecycle",
          "render",
          "/^render.+$/",
          "instance-methods",
          "everything-else",
          "/^handle.+$/",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/naming-convention": [
          "error",
          { selector: "class", format: ["PascalCase"] },
          { selector: "interface", format: ["PascalCase"] },
          { selector: "enum", format: ["PascalCase"] },
          { selector: "enumMember", format: ["UPPER_CASE"] },
          { selector: "method", format: ["PascalCase", "camelCase"] },
          {
            selector: "variable",
            format: ["PascalCase", "camelCase", "UPPER_CASE"],
          },
        ],
        "jsx-a11y/no-autofocus": "off", // We want to use `autoFocus` in a fluct optimized component <MultipleFilter />.
        "jsx-a11y/control-has-associated-label": [
          "error",
          {
            depth: 10,
          },
        ],
      },
    },
    {
      files: ["*.stories.tsx", "*.test.ts", "*.test.tsx"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "./",
              },
              {
                name: ".",
              },
            ],
          },
        ],
        "react/jsx-handler-names": "off",
        "no-empty": "off",
        "no-console": "off",
        "react/jsx-key": "off",
        "react/jsx-no-useless-fragment": "off",
        "react/no-array-index-key": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/no-multi-comp": "off",
        // I realize it's silly of me, but I'll turn it off here for the sake of specs for once.
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "import/no-dynamic-require": "off",
        "global-require": "off",
        camelcase: "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
