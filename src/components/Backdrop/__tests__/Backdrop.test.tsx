import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Backdrop from "../";

describe("Backdrop component testing", () => {
  afterEach(cleanup);

  test("Backdrop", () => {
    const { asFragment } = renderWithThemeProvider(<Backdrop />);
    expect(asFragment()).toMatchSnapshot();
  });
});
