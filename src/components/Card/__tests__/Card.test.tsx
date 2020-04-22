import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Card from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Card component testing", () => {
  afterEach(cleanup);

  test("Card", () => {
    const { asFragment } = renderWithThemeProvider(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});
