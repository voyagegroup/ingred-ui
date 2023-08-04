import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import LoadingBar from "../LoadingBar";

describe("LoadingBar component testing", () => {
  afterEach(cleanup);

  test("LoadingBar", () => {
    const { asFragment } = renderWithThemeProvider(<LoadingBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
