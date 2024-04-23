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
            content: "foo",
          },
          {
            id: "2",
            content: "bar",
          },
          {
            id: "3",
            content: "hoge",
          },
          {
            id: "4",
            content: "fuga",
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
            content: "foo",
          },
          {
            id: "2",
            content: "bar",
          },
          {
            id: "3",
            content: "hoge",
          },
          {
            id: "4",
            content: "fuga",
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
            content: "foo",
          },
          {
            id: "2",
            content: "bar",
          },
          {
            id: "3",
            content: "hoge",
          },
          {
            id: "4",
            content: "fuga",
          },
        ]}
        selectedItems={[
          {
            id: "1",
            content: "foo",
          },
          {
            id: "2",
            content: "bar",
          },
          {
            id: "3",
            content: "hoge",
          },
          {
            id: "4",
            content: "fuga",
          },
        ]}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox candidateItems and selectedItems without checkbox", () => {
    const { asFragment } = renderWithThemeProvider(
      <DualListBox
        candidateItems={[
          {
            id: "2",
            content: "bar",
            items: [
              {
                id: "21",
                content: "bar1",
              },
              {
                id: "22",
                content: "bar2",
              },
            ],
          },
          {
            id: "3",
            content: "hoge",
          },
          {
            id: "4",
            content: "fuga",
          },
        ]}
        selectedItems={[
          {
            id: "1",
            content: "foo",
          },
        ]}
        disableCheckbox={true}
        onRemove={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
