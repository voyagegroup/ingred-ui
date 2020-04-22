import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Button from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Button component testing", () => {
  afterEach(cleanup);

  test("Button", () => {
    const { asFragment } = renderWithThemeProvider(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });
});
