import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, act, fireEvent } from "@testing-library/react";
import DropdownButton from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

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

  describe("not splited", () => {
    test("enable", async () => {
      const { asFragment, getByTestId } = renderWithThemeProvider(
        <DropdownButton contents={contents}>保存する</DropdownButton>,
      );
      await act(async () => {
        fireEvent.click(getByTestId("menu-toggle"));
      });
      expect(asFragment()).toMatchSnapshot();
    });

    test("disable", () => {
      const { asFragment } = renderWithThemeProvider(
        <DropdownButton disabled={true} contents={contents}>
          保存する
        </DropdownButton>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("splited", () => {
    test("enable", async () => {
      const { asFragment, getByTestId } = renderWithThemeProvider(
        <DropdownButton split={true} contents={contents}>
          保存する
        </DropdownButton>,
      );
      await act(async () => {
        fireEvent.click(getByTestId("menu-toggle"));
      });
      expect(asFragment()).toMatchSnapshot();
    });

    test("disable", () => {
      const { asFragment } = renderWithThemeProvider(
        <DropdownButton split={true} disabled={true} contents={contents}>
          保存する
        </DropdownButton>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
