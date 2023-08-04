import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import Snackbar from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Snackbar component testing", () => {
  afterEach(cleanup);

  test("Snackbar", () => {
    const { asFragment } = renderWithThemeProvider(<Snackbar isOpen={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
