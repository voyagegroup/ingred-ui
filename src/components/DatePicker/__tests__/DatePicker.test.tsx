import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import DatePicker from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DatePicker component testing", () => {
  afterEach(cleanup);

  test("DatePicker", () => {
    const { asFragment } = renderWithThemeProvider(
      <DatePicker date={null} onDateChange={jest.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
