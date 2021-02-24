import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import MenuList from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

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

describe("MenuList component testing", () => {
  afterEach(cleanup);

  test("MenuList splited", () => {
    const { asFragment } = renderWithThemeProvider(
      <MenuList contents={contents} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
