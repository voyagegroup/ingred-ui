import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Label from "../";

describe("Label component testing", () => {
  afterEach(cleanup);

  test("Label", () => {
    const { asFragment } = renderWithThemeProvider(<Label />);
    expect(asFragment()).toMatchSnapshot();
  });
});
