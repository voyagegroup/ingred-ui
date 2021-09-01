import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import LocaleProvider from "../";

describe("LocaleProvider component testing", () => {
  afterEach(cleanup);

  test("LocaleProvider", () => {
    const { asFragment } = renderWithThemeProvider(<LocaleProvider />);
    expect(asFragment()).toBeTruthy();
  });
});
