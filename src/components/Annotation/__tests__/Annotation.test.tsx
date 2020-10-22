import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Annotation from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Annotation component testing", () => {
  afterEach(cleanup);

  test("ActionButton", () => {
    const { asFragment } = renderWithThemeProvider(
      <Annotation>Annnotation</Annotation>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
