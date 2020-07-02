import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Divider from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Divider component testing", () => {
  afterEach(cleanup);

  test("Divider fullWidth", () => {
    const { asFragment } = renderWithThemeProvider(
      <Divider variant="fullWidth" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Divider middle", () => {
    const { asFragment } = renderWithThemeProvider(
      <Divider variant="middle" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
