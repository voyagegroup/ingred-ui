import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Tooltip from "../Tooltip";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("Tooltip component testing", () => {
  afterEach(cleanup);

  test("Tooltip", () => {
    const { asFragment } = renderWithThemeProvider(
      <Tooltip content="tooltip text" open={true}>
        <div>text</div>
      </Tooltip>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
