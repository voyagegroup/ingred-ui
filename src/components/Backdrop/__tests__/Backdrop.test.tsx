import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import Backdrop from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Backdrop component testing", () => {
  afterEach(cleanup);

  test("Backdrop", () => {
    const { asFragment } = renderWithThemeProvider(<Backdrop />);
    expect(asFragment()).toMatchSnapshot();
  });
});
