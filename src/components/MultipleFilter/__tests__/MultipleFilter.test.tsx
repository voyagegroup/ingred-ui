import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import MultipleFilter from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("MultipleFilter component testing", () => {
  afterEach(cleanup);

  test("MultipleFilter", () => {
    const { asFragment } = renderWithThemeProvider(<MultipleFilter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
