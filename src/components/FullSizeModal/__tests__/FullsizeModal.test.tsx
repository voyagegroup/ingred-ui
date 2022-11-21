import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import FullSizeModal from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("FullSizeModal component testing", () => {
  afterEach(cleanup);

  test("FullSizeModal", () => {
    const { asFragment } = renderWithThemeProvider(
      <FullSizeModal title="Title" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
