import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-storysource",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: path.resolve(__dirname, "../vite.config.ts"),
      },
    },
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  staticDirs: ["../assets"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: false,
  },
};
export default config;
