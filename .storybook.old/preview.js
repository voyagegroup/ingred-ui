const React = require("react");
const { ThemeProvider, createTheme } = require("../src/themes");

const theme = createTheme();

const preview = {
  decorators: [
    (Story) => React.createElement(
      ThemeProvider,
      { theme },
      React.createElement(Story, null)
    )
  ],
  parameters: {
    controls: { expanded: true }
  }
};

module.exports = preview;
