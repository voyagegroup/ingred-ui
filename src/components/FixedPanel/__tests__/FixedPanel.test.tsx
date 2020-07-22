import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import FixedPanel from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("FixedPanel component testing", () => {
  afterEach(cleanup);

  test("FixedPanel", () => {
    const { asFragment } = renderWithThemeProvider(
      <FixedPanel isOpen={true} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
