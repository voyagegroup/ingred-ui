import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import CalenderInput from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("CalenderInput component testing", () => {
  afterEach(cleanup);

  test("CalenderInput", () => {
    const { asFragment } = renderWithThemeProvider(<CalenderInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
