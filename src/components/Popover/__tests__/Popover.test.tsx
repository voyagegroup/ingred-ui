import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import Popover from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

// MEMO: ResizeObserver is not supported in jsdom
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Popover component testing", () => {
  afterEach(cleanup);

  test("Popover", () => {
    const { asFragment } = renderWithThemeProvider(
      <Popover baseElement={null}>
        <div>hoge</div>
      </Popover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
