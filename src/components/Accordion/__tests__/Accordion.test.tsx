import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Accordion from "../";

describe("Accordion component testing", () => {
  afterEach(cleanup);

  test("Accordion", () => {
    const { asFragment } = renderWithThemeProvider(
      <Accordion title="Accordion Title">Accordion Content</Accordion>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
