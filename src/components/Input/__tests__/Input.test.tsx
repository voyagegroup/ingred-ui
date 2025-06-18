import * as React from "react";
import "@testing-library/jest-dom";
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

  test("Input sizes", () => {
    const { asFragment: smallFragment } = renderWithThemeProvider(
      <Input size="small" />,
    );
    expect(smallFragment()).toMatchSnapshot();

    const { asFragment: mediumFragment } = renderWithThemeProvider(
      <Input size="medium" />,
    );
    expect(mediumFragment()).toMatchSnapshot();

    const { asFragment: largeFragment } = renderWithThemeProvider(
      <Input size="large" />,
    );
    expect(largeFragment()).toMatchSnapshot();
  });

  test("Input variants", () => {
    const { asFragment: lightFragment } = renderWithThemeProvider(
      <Input variant="light" />,
    );
    expect(lightFragment()).toMatchSnapshot();

    const { asFragment: darkFragment } = renderWithThemeProvider(
      <Input variant="dark" />,
    );
    expect(darkFragment()).toMatchSnapshot();
  });

  test("Input fullWidth", () => {
    const { asFragment } = renderWithThemeProvider(<Input fullWidth />);
    expect(asFragment()).toMatchSnapshot();
  });
});
