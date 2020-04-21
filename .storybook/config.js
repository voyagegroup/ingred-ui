import { configure, addDecorator } from "@storybook/react";
import * as React from "react";
import { ThemeProvider, createTheme } from "../src/themes";

const theme = createTheme();

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(require.context("../src/stories", true, /\.stories\.tsx$/), module);
