import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, act } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import ContextMenu from "../ContextMenu";
import { ContentProp } from "../../MenuList/MenuList";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

const contents: ContentProp[] = [
  {
    text: "Save",
    onClick: () => {},
    type: "default",
  },
  {
    text: "Save and execute",
    onClick: () => {},
    divideTop: true,
    type: "default",
  },
  {
    text: "Save as draft",
    onClick: () => {},
    type: "default",
  },
  {
    text: "Delete",
    onClick: () => {},
    divideTop: true,
    type: "default",
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
