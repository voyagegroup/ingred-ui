import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ConfirmModal from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("ConfirmModal component testing", () => {
  afterEach(cleanup);

  test("ConfirmModal", () => {
    const { asFragment } = renderWithThemeProvider(
      <ConfirmModal title="Title" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
