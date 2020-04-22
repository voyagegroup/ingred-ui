import * as React from "react";
import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "../themes";

export function renderWithThemeProvider(ui: JSX.Element) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
