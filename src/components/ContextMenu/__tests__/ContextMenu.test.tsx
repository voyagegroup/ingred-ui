import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, act } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import ContextMenu from "../ContextMenu";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

const contents = [
  {
    text: "Save",
    onClick: () => {},
    divideTop: true,
  },
  {
    text: "Save and execute",
    onClick: () => {},
  },
  {
    text: "Save as draft",
    onClick: () => {},
    divideTop: true,
  },
  {
    text: "Cancel",
    onClick: () => {},
  },
];

describe("ContextMenu component testing", () => {
  afterEach(cleanup);

  test("ContextMenu", async () => {
    const { asFragment, getByTestId } = renderWithThemeProvider(
      <ContextMenu contents={contents} />,
    );
    await act(async () => {
      fireEvent.click(getByTestId("icon-wrapper"));
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
