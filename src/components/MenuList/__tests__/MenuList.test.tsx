import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import MenuList from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { ContentProp } from "../MenuList";

const contents: ContentProp[] = [
  {
    text: "Save",
    handleClick: () => {},
    type: "default",
  },
  {
    text: "Save and execute",
    handleClick: () => {},
    divideTop: true,
    type: "default",
  },
  {
    text: "Save as draft",
    handleClick: () => {},
    type: "warning",
  },
  {
    text: "Cancel",
    handleClick: () => {},
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
