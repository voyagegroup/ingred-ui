import * as React from "react";
import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "../themes";

export function renderWithThemeProvider(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
