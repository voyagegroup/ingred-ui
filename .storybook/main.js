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
    {
      // MEMO: included in addon-essentials
      name: "@storybook/addon-docs",
      options: {
        csfPluginOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "@storybook/addon-mdx-gfm",
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
