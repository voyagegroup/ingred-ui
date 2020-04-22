import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ConfirmModal from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("ConfirmModal component testing", () => {
  afterEach(cleanup);

  test("ConfirmModal", () => {
    const { asFragment } = renderWithThemeProvider(
      <ConfirmModal title="タイトル" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
