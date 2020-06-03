import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Tooltip from "../Tooltip";

describe("Tooltip component testing", () => {
  afterEach(cleanup);

  test("Tooltip", () => {
    const { asFragment } = renderWithThemeProvider(
      <Tooltip content="tooltip text">
        <div>text</div>
      </Tooltip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
