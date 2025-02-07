import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import {
  type Item,
  DualListBox2,
  DualListBox2Item,
  DualListBox2Accordion,
  DualListBox2Section,
  toGroupedItems,
} from "..";
import {
  ContextMenu2ButtonItem,
  ContextMenu2SwitchItem,
} from "../../ContextMenu2";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DualListBox2 component testing", () => {
  afterEach(cleanup);

  test("DualListBox2", () => {
    const items: Item[] = [
      {
        id: "unique-1",
        label: "リストアイテム1",
      },
      {
        id: "unique-2",
        label: "リストアイテム2",
      },
      {
        id: "unique-3",
        label: "リストアイテム3",
      },
      {
        id: "unique-4",
        label:
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ];
    const { asFragment } = renderWithThemeProvider(
      <DualListBox2
        included={[items[0]]}
        excluded={[items[3]]}
        menuButtons={
          <>
            <ContextMenu2ButtonItem
              onClick={() => {
                alert("clicked");
              }}
            >
              好きなボタンを
            </ContextMenu2ButtonItem>
            <ContextMenu2SwitchItem disabled onChange={() => {}}>
              入れて使う
            </ContextMenu2SwitchItem>
          </>
        }
        onIncludedChange={() => {}}
        onExcludedChange={() => {}}
        onLoadMore={() => {}}
      >
        {items.map((item) => (
          <DualListBox2Item key={item.id} id={item.id}>
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox2 Accordion", () => {
    const items: Item[] = [
      {
        id: "unique-1",
        groupName: "アコーディオン1",
        label: "リストアイテム1",
      },
      {
        id: "unique-2",
        groupName: "アコーディオン1",
        label: "リストアイテム2",
      },
      {
        id: "unique-3",
        groupName: "アコーディオン2",
        label: "リストアイテム3",
      },
      {
        id: "unique-4",
        groupName: "アコーディオン2",
        label:
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ];
    const { asFragment } = renderWithThemeProvider(
      <DualListBox2
        included={[items[0]]}
        excluded={[items[3]]}
        onIncludedChange={() => {}}
        onExcludedChange={() => {}}
        onLoadMore={() => {}}
      >
        {toGroupedItems(items).map(
          (group) =>
            group.groupName && (
              <DualListBox2Accordion
                key={group.groupName}
                label={group.groupName}
              >
                {group.items.map((item) => (
                  <DualListBox2Item key={item.id} id={item.id}>
                    {item.label}
                  </DualListBox2Item>
                ))}
              </DualListBox2Accordion>
            ),
        )}
      </DualListBox2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("DualListBox2 Section", () => {
    const items: Item[] = [
      {
        id: "unique-1",
        groupName: "セクション1",
        label: "リストアイテム1",
      },
      {
        id: "unique-2",
        groupName: "セクション1",
        label: "リストアイテム2",
      },
      {
        id: "unique-3",
        groupName: "セクション2",
        label: "リストアイテム3",
      },
      {
        id: "unique-4",
        groupName: "セクション2",
        label:
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ];
    const { asFragment } = renderWithThemeProvider(
      <DualListBox2
        included={[items[0]]}
        excluded={[items[3]]}
        onIncludedChange={() => {}}
        onExcludedChange={() => {}}
        onActiveSectionChange={() => {}}
      >
        {toGroupedItems(items).map(
          (group) =>
            group.groupName && (
              <DualListBox2Section
                key={group.groupName}
                label={group.groupName}
              >
                {group.items.map((item) => (
                  <DualListBox2Item key={item.id} id={item.id}>
                    {item.label}
                  </DualListBox2Item>
                ))}
              </DualListBox2Section>
            ),
        )}
      </DualListBox2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
