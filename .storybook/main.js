module.exports = {
  stories: [
    "../src/components/**/*.stories.@(tsx|mdx)",
    "./documents/**/*.stories.@(tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    // TODO: Remove following addons after replace to `.mdx`.
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
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
    fastRefresh: true,
    // TODO: fix warn "Rendered more hooks than during the previous render."
    // knobを完全に排除できたタイミングで再度調査
    // strictMode: true,
  },
};
