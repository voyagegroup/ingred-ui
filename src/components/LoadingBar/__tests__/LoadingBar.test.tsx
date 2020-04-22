import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import LoadingBar from "../LoadingBar";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("LoadingBar component testing", () => {
  afterEach(cleanup);

  test("LoadingBar", () => {
    const { asFragment } = renderWithThemeProvider(<LoadingBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
