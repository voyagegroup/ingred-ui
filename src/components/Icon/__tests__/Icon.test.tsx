import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Icon from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Icon component testing", () => {
  afterEach(cleanup);

  test("Icon", () => {
    const { asFragment } = renderWithThemeProvider(<Icon name="dashboard" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
