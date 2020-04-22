import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Flex from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Flex component testing", () => {
  afterEach(cleanup);

  test("Flex", () => {
    const { asFragment } = renderWithThemeProvider(<Flex />);
    expect(asFragment()).toMatchSnapshot();
  });
});
