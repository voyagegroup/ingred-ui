import { mergeConfig } from "vite";

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
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {});
  },
  docs: {
    autodocs: true,
  },
};
