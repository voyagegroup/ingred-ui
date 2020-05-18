import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ActionButton from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ActionButton component testing", () => {
  afterEach(cleanup);

  test("ActionButton", () => {
    const { asFragment } = renderWithThemeProvider(
      <ActionButton icon="pencil" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
