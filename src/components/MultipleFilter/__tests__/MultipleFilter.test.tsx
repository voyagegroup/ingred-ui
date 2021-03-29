import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import MultipleFilter from "../";

describe("MultipleFilter component testing", () => {
  afterEach(cleanup);

  test("MultipleFilter", () => {
    const { asFragment } = renderWithThemeProvider(<MultipleFilter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
