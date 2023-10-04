import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import DualListBox from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DualListBox component testing", () => {
  afterEach(cleanup);

  test("DualListBox", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox unselectedItems={[]} selectedItems={[]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox unselectedItems", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        unselectedItems={[
          {
            id: "1",
            label: "foo",
          },
          {
            id: "2",
            label: "bar",
          },
          {
            id: "3",
            label: "hoge",
          },
          {
            id: "4",
            label: "fuga",
          },
        ]}
        selectedItems={[]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox selectedItems", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        unselectedItems={[]}
        selectedItems={[
          {
            id: "1",
            label: "foo",
          },
          {
            id: "2",
            label: "bar",
          },
          {
            id: "3",
            label: "hoge",
          },
          {
            id: "4",
            label: "fuga",
          },
        ]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox unselectedItems and selectedItems", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        unselectedItems={[
          {
            id: "1",
            label: "foo",
          },
          {
            id: "2",
            label: "bar",
          },
          {
            id: "3",
            label: "hoge",
          },
          {
            id: "4",
            label: "fuga",
          },
        ]}
        selectedItems={[
          {
            id: "1",
            label: "foo",
          },
          {
            id: "2",
            label: "bar",
          },
          {
            id: "3",
            label: "hoge",
          },
          {
            id: "4",
            label: "fuga",
          },
        ]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox unselectedItems and selectedItems with inverse", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        unselectedItems={[
          {
            id: "1",
            label: "foo",
            isInverse: false,
          },
          {
            id: "2",
            label: "bar",
            isInverse: false,
          },
          {
            id: "3",
            label: "hoge",
            isInverse: false,
          },
          {
            id: "4",
            label: "fuga",
            isInverse: false,
          },
        ]}
        selectedItems={[
          {
            id: "1",
            label: "foo",
            isInverse: true,
          },
          {
            id: "2",
            label: "bar",
            isInverse: true,
          },
          {
            id: "3",
            label: "hoge",
            isInverse: true,
          },
          {
            id: "4",
            label: "fuga",
            isInverse: true,
          },
        ]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        onToggleInverse={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
