import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Textarea from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Textarea component testing", () => {
  afterEach(cleanup);

  test("Textarea", () => {
    const { asFragment } = renderWithThemeProvider(
      <Textarea readOnly={true} value="hoge" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Textarea disable", () => {
    const { asFragment } = renderWithThemeProvider(
      <Textarea disabled={true} readOnly={true} value="hoge" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Textarea error", () => {
    const { asFragment } = renderWithThemeProvider(
      <Textarea errorText="hoge" readOnly={true} value="hoge" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
