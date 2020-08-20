import { configure, addDecorator } from "@storybook/react";
import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ThemeProvider, createTheme } from "../src/themes";

const theme = createTheme();

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);
addDecorator(withKnobs());

configure(
  require.context("../src/components", true, /\.stories\.tsx$/),
  module
);
