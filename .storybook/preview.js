import * as React from "react";
import { ThemeProvider, createTheme } from "../src/themes";

const theme = createTheme();

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  options: {
    storySort: {
      order: ["Information", "Components"],
    },
  },
};
