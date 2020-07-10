import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Input from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Input component testing", () => {
  afterEach(cleanup);

  test("Input", () => {
    const { asFragment } = renderWithThemeProvider(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Input disabled", () => {
    const { asFragment } = renderWithThemeProvider(<Input disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Input error", () => {
    const { asFragment } = renderWithThemeProvider(<Input error />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Input multiline", () => {
    const { asFragment } = renderWithThemeProvider(<Input multiline />);
    expect(asFragment()).toMatchSnapshot();
  });
});
