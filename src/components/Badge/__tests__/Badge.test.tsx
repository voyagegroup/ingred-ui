import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Badge from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Badge component testing", () => {
  afterEach(cleanup);

  test("Badge", () => {
    const { asFragment } = renderWithThemeProvider(
      <Badge type="primary">text</Badge>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
