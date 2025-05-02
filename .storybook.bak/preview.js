const React = require("react");
const { ThemeProvider, createTheme } = require("../src/themes");

const theme = createTheme();

const preview = {
  decorators: [
    (Story) => {
      return React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(Story, null)
      );
    }
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

module.exports = preview;
