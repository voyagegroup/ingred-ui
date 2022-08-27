import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import DateTimePicker from "../";

describe("DateTimePicker component testing", () => {
  afterEach(cleanup);

  test("DateTimePicker", () => {
    const { asFragment } = renderWithThemeProvider(<DateTimePicker />);
    expect(asFragment()).toMatchSnapshot();
  });
});
