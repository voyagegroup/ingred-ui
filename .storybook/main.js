module.exports = {
  stories: [
    "../src/components/**/*.stories.@(tsx|mdx)",
    "./documents/**/*.stories.@(tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    // TODO: Remove this addon after replace to `.mdx`.
    "@storybook/addon-storysource",
  ],
  reactOptions: {
    fastRefresh: true,
    // TODO: fix warn "Rendered more hooks than during the previous render."
    // knobを完全に排除できたタイミングで再度調査
    // strictMode: true,
  },
};
