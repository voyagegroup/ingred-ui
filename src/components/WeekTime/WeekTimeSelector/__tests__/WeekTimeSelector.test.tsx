import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../../utils/renderWithThemeProvider";
import WeekTimeSelector from "..";

describe("WeekTimeSelector component testing", () => {
  afterEach(cleanup);

  test("WeekTimeSelector", () => {
    const { asFragment } = renderWithThemeProvider(
      <WeekTimeSelector
        weekTime="ffffffffffffffffffffffffffffffffffffffffff"
        onChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
