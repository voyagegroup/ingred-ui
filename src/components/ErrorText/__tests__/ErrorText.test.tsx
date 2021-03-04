import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ErrorText from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ErrorText component testing", () => {
  afterEach(cleanup);

  test("ErrorText", () => {
    const { asFragment } = renderWithThemeProvider(
      <ErrorText>Error</ErrorText>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
