import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Badge from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Badge component testing", () => {
  afterEach(cleanup);

  test("Badge normal", () => {
    const { asFragment } = renderWithThemeProvider(
      <Badge color="primary">text</Badge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Badge pill", () => {
    const { asFragment } = renderWithThemeProvider(
      <Badge color="primary" type="pill">
        text
      </Badge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
