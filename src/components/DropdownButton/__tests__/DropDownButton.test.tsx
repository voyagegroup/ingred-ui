import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import DropdownButton from "..";
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

describe("DropdownButton component testing", () => {
  afterEach(cleanup);

  test("DropdownButton not splited", () => {
    const { asFragment } = renderWithThemeProvider(
      <DropdownButton contents={contents}>保存する</DropdownButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DropdownButton splited", () => {
    const { asFragment } = renderWithThemeProvider(
      <DropdownButton split={true} contents={contents}>
        保存する
      </DropdownButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
