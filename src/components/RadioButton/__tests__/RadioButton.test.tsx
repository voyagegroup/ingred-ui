import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import RadioButton from "../RadioButton";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("RadioButton component testing", () => {
  afterEach(cleanup);

  test("RadioButton", () => {
    const { asFragment } = renderWithThemeProvider(
      <RadioButton>RadioButton</RadioButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
