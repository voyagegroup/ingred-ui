module.exports = {
  root: true,
  extends: ["@takurinton/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["*"],
      rules: {
        // 高さや幅で数字を扱ってる部分があり、そこで falsy 判定している箇所もあるので無効にする
        "@typescript-eslint/prefer-nullish-coalescing": "off",
      },
    },
  ],
};
