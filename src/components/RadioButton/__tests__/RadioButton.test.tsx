import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import RadioButton from "../RadioButton";

describe("RadioButton component testing", () => {
  afterEach(cleanup);

  test("RadioButton", () => {
    const { asFragment } = renderWithThemeProvider(
      <RadioButton>RadioButton</RadioButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
