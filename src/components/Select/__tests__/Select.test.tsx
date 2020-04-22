import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Select from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Select component testing", () => {
  afterEach(cleanup);

  test("Select", () => {
    const { asFragment } = renderWithThemeProvider(<Select />);
    expect(asFragment()).toMatchSnapshot();
  });
});
