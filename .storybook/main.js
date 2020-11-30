module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
  ],
  reactOptions: {
    fastRefresh: true,
    // TODO: fix warn "Rendered more hooks than during the previous render."
    // knobを完全に排除できたタイミングで再度調査
    // strictMode: true,
  },
};
