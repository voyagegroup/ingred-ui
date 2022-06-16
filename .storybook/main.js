module.exports = {
  staticDirs: ["../assets"],
  stories: [
    "../src/components/**/*.stories.@(tsx|mdx)",
    "./documents/**/*.stories.@(tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
    "@storybook/addon-postcss",
    {
      // MEMO: included in addon-essentials
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  reactOptions: {
    // TODO: fix warn "Rendered more hooks than during the previous render."
    strictMode: true,
  },
};
