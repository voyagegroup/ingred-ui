import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../../../utils/renderWithThemeProvider";
import { WeekTimeElement } from "../WeekTimeElement";

describe("WeekTime component testing", () => {
  afterEach(cleanup);

  test("WeekTime", () => {
    const { asFragment } = renderWithThemeProvider(
      <WeekTimeElement weekTime="ffffffffffffffffffffffffffffffffffffffffff" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
