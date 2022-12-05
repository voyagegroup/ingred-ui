import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import FullSizeConfirmModal from "../FullSizeConfirmModal";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("FullSizeConfirmModal component testing", () => {
  afterEach(cleanup);

  test("FullSizeConfirmModal", () => {
    const { asFragment } = renderWithThemeProvider(
      <FullSizeConfirmModal title="Title" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
