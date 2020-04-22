import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Spinner from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Spinner component testing", () => {
  afterEach(cleanup);

  test("Spinner", () => {
    const { asFragment } = renderWithThemeProvider(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
