import * as React from "react";
import { ThemeContext } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { Theme } from "./createTheme";

export function useTheme(): Theme {
  return React.useContext(ThemeContext) || defaultTheme;
}
