import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import MenuList from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { ContentProp } from "../MenuList";

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
    type: "warning",
  },
  {
    text: "Cancel",
    onClick: () => {},
    type: "disabled",
  },
];

describe("MenuList component testing", () => {
  afterEach(cleanup);

  test("MenuList splited", () => {
    const { asFragment } = renderWithThemeProvider(
      <MenuList contents={contents} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
