import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Divider from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Divider component testing", () => {
  afterEach(cleanup);

  test("Divider", () => {
    const { asFragment } = renderWithThemeProvider(<Divider />);
    expect(asFragment()).toMatchSnapshot();
  });
});
