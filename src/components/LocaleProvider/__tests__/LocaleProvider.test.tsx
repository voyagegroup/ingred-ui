import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import LocaleProvider from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("LocaleProvider component testing", () => {
  afterEach(cleanup);

  test("LocaleProvider", () => {
    const { asFragment } = renderWithThemeProvider(<LocaleProvider />);
    expect(asFragment()).toBeTruthy();
  });
});
