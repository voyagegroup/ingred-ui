import * as React from "react";
import { ThemeContext } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { Theme } from "./createTheme";

export function useTheme(): Theme {
  const theme = React.useContext(ThemeContext) as Theme;
  return theme ?? defaultTheme;
}
