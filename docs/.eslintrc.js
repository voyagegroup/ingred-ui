module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  ignorePatterns: ['node_modules/**/*', '.docusaurus/**/*'],
  plugins: [],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  root: true,
  rules: {
    'no-irregular-whitespace': 0
  }
};
