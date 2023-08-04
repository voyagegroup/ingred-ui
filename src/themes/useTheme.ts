import * as React from "react";
import { ThemeContext } from "styled-components";
import { Theme } from "./createTheme";
import { defaultTheme } from "./defaultTheme";

export function useTheme(): Theme {
  return React.useContext(ThemeContext) || defaultTheme;
}
