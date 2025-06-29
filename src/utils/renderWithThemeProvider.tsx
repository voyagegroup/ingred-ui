import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../themes/defaultTheme";

// ThemeProviderでラップしたrenderヘルパー
export const renderWithThemeProvider = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
