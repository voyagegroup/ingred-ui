import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import NewDateRangePicker from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DateRangePicker component testing", () => {
  afterEach(cleanup);

  test("NewDateRangePicker", () => {
    const { asFragment } = renderWithThemeProvider(
      <NewDateRangePicker
        startDate={null}
        endDate={null}
        onDatesChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
