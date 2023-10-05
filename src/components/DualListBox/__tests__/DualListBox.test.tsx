import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import DualListBox from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DualListBox component testing", () => {
  afterEach(cleanup);

  test("DualListBox", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox candidateItems={[]} selectedItems={[]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox candidateItems", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        candidateItems={[
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
        candidateItems={[]}
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

  test("DualListBox candidateItems and selectedItems", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        candidateItems={[
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

  test("DualListBox candidateItems and selectedItems with inverse", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        candidateItems={[
          {
            id: "1",
            label: "foo",
            checked: false,
          },
          {
            id: "2",
            label: "bar",
            checked: false,
          },
          {
            id: "3",
            label: "hoge",
            checked: false,
          },
          {
            id: "4",
            label: "fuga",
            checked: false,
          },
        ]}
        selectedItems={[
          {
            id: "1",
            label: "foo",
            checked: true,
          },
          {
            id: "2",
            label: "bar",
            checked: true,
          },
          {
            id: "3",
            label: "hoge",
            checked: true,
          },
          {
            id: "4",
            label: "fuga",
            checked: true,
          },
        ]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        onToggleChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
