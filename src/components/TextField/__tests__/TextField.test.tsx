import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import TextField from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("TextField component testing", () => {
  afterEach(cleanup);

  test("TextField", () => {
    const { asFragment } = renderWithThemeProvider(<TextField />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("TextField with icon", () => {
    const { asFragment } = renderWithThemeProvider(<TextField icon="search" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("TextField passward", () => {
    const { asFragment } = renderWithThemeProvider(
      <TextField type="password" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
