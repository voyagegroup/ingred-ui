module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-notes",
    "@storybook/addon-storysource",
  ],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
};
