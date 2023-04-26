module.exports = {
  staticDirs: ["../assets"],
  stories: [
    "../src/components/**/*.stories.tsx",
    "./documents/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
  ],
  features: {
    babelModeV7: true,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
