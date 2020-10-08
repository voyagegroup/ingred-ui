import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Popover from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

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
