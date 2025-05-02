// @ts-check
const { mergeConfig } = require('vite');
const react = require('@vitejs/plugin-react');

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../assets"],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react()],
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      }
    });
  },
};

module.exports = config;
