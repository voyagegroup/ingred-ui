module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'prettier' // prettierのextendsは他のextendsより後に記述する
  ],
  ignorePatterns: ['node_modules/**/*', '.docusaurus/**/*'],
  plugins: [],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  root: true, // 上位ディレクトリにある他のeslintrcを参照しないようにする
  rules: {
    'no-unused-vars': 0,
    'no-irregular-whitespace': 0
  }
};
