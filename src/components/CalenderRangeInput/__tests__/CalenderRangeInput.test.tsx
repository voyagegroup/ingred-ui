import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import CalenderRangeInput from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("CalenderRangeInput component testing", () => {
  afterEach(cleanup);

  test("CalenderRangeInput", () => {
    const { asFragment } = renderWithThemeProvider(<CalenderRangeInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
