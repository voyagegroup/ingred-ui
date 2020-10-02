import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Modal from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("Modal component testing", () => {
  afterEach(cleanup);

  test("Modal without background", () => {
    const { asFragment } = renderWithThemeProvider(
      <Modal>
        <div>hoge</div>
      </Modal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Modal with background", () => {
    const { asFragment } = renderWithThemeProvider(
      <Modal hasBackground={true}>
        <div>hoge</div>
      </Modal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
