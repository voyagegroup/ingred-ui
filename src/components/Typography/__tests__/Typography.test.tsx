import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Typography from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Typography component testing", () => {
  afterEach(cleanup);

  test("Typography", () => {
    const { asFragment } = renderWithThemeProvider(
      <Typography>text</Typography>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
