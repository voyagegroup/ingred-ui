import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, act, fireEvent } from "@testing-library/react";
import DropdownButton from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
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
    divideTop: true,
    type: "default",
  },
  {
    text: "Save and execute",
    onClick: () => {},
    type: "default",
  },
  {
    text: "Save as draft",
    onClick: () => {},
    divideTop: true,
    type: "default",
  },
  {
    text: "Cancel",
    onClick: () => {},
    type: "default",
  },
];

describe("DropdownButton component testing", () => {
  afterEach(cleanup);

  describe("not splited", () => {
    test("enable", async () => {
      const { asFragment, getByTestId } = renderWithThemeProvider(
        <DropdownButton contents={contents}>Save</DropdownButton>,
      );
      await act(async () => {
        fireEvent.click(getByTestId("menu-toggle"));
      });
      expect(asFragment()).toMatchSnapshot();
    });

    test("disable", () => {
      const { asFragment } = renderWithThemeProvider(
        <DropdownButton disabled={true} contents={contents}>
          Save
        </DropdownButton>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("splited", () => {
    test("enable", async () => {
      const { asFragment, getByTestId } = renderWithThemeProvider(
        <DropdownButton split={true} contents={contents}>
          Save
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
          Save
        </DropdownButton>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
