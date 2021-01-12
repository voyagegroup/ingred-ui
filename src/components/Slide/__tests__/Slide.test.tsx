import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Slide from "../";

describe("Slide component testing", () => {
  afterEach(cleanup);

  test("Slide", () => {
    const { asFragment } = renderWithThemeProvider(<Slide />);
    expect(asFragment()).toMatchSnapshot();
  });
});
