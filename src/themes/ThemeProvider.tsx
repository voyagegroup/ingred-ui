import * as React from "react";
import { ThemeContext } from "styled-components";
import { Theme } from "./createTheme";

type Props = {
  theme: Theme;
};
const ThemeProvider: React.FunctionComponent<Props> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export { ThemeProvider };
