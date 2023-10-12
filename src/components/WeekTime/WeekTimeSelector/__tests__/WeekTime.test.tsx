import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../../utils/renderWithThemeProvider";
import WeekTime from "..";

describe("WeekTime component testing", () => {
  afterEach(cleanup);

  test("WeekTime", () => {
    const { asFragment } = renderWithThemeProvider(
      <WeekTime
        weekTime="ffffffffffffffffffffffffffffffffffffffffff"
        onChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
