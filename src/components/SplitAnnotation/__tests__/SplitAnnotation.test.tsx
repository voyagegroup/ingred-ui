import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import SplitAnnotation from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("SplitAnnotation component testing", () => {
  afterEach(cleanup);

  test("ActionButton", () => {
    const { asFragment } = renderWithThemeProvider(
      <SplitAnnotation>Annnotation</SplitAnnotation>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
