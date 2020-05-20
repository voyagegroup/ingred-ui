import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import MenuList from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

const contents = [
  {
    text: "保存する",
    onClick: () => {},
    divideTop: true,
  },
  {
    text: "保存して実行する",
    onClick: () => {},
  },
  {
    text: "下書きとして保存する",
    onClick: () => {},
    divideTop: true,
  },
  {
    text: "やっぱり何もしない",
    onClick: () => {},
  },
];

describe("MenuList component testing", () => {
  afterEach(cleanup);

  test("MenuList splited", () => {
    const { asFragment } = renderWithThemeProvider(
      <MenuList contents={contents} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
