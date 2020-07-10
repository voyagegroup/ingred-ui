import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import DateRangePicker from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DateRangePicker component testing", () => {
  afterEach(cleanup);

  test("DateRangePicker", () => {
    const { asFragment } = renderWithThemeProvider(
      <DateRangePicker
        startDate={null}
        endDate={null}
        onDatesChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
