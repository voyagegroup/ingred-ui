import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import FileUploader from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("FileUploader component testing", () => {
  afterEach(cleanup);

  test("FileUploader", () => {
    const { asFragment } = renderWithThemeProvider(
      <FileUploader onSelectFiles={jest.fn} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
