import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Checkbox from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Checkbox component testing", () => {
  afterEach(cleanup);

  test("Checkbox", () => {
    const { asFragment } = renderWithThemeProvider(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });
});
