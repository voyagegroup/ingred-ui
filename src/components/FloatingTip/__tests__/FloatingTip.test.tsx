import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import FloatingTip from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("FloatingTip component testing", () => {
  afterEach(cleanup);

  test("FloatingTip", () => {
    const { asFragment } = renderWithThemeProvider(
      <FloatingTip baseElement={null} isOpen={true} onClose={() => {}}>
        <div>hoge</div>
      </FloatingTip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
