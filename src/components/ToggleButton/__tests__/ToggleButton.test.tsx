import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ToggleButton from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ToggleButton component testing", () => {
  afterEach(cleanup);

  test("ToggleButton", () => {
    const { asFragment } = renderWithThemeProvider(<ToggleButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
