import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
  type Item,
  DualListBox2,
  DualListBox2Item,
  DualListBox2Accordion,
  DualListBox2Section,
} from "./DualListBox2";
import {
  ContextMenu2ButtonItem,
  ContextMenu2SwitchItem,
} from "../ContextMenu2";

export default {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
};

const generateItems = (start: number, length: number, groupName?: string) => {
  return Array.from({ length }, (_, i) => ({
    id: `unique-${start + i}`,
    label: `リストアイテム${start + i}`,
    groupName,
  }));
};

type groupedItems = { groupName?: string; items: Item[] };
const toGroupedItems = (items: Item[]) => {
  const groupedItems: groupedItems[] = items.reduce(
    (acc: groupedItems[], item) => {
      const group = acc.find((group) => group.groupName === item.groupName);
      if (group) {
        group.items.push(item);
      } else {
        acc.push({ groupName: item.groupName, items: [item] });
      }
      return acc;
    },
    [],
  );
  return groupedItems;
};

export const Default: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([
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
    ]);

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
    return (
      <>
        <div>included: {JSON.stringify(included.map((item) => item.id))}</div>
        <div>excluded: {JSON.stringify(excluded.map((item) => item.id))}</div>

        <DualListBox2
          included={included}
          excluded={excluded}
          menuButtons={
            <>
              <ContextMenu2ButtonItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                好きなボタンを
              </ContextMenu2ButtonItem>
              <ContextMenu2SwitchItem disabled onChange={() => {}}>
                入れて使う
              </ContextMenu2SwitchItem>
            </>
          }
          onIncludedChange={(ids: string[]) =>
            setIncluded(items.filter((item) => ids.includes(item.id)))
          }
          onExcludedChange={(ids: string[]) =>
            setExcluded(items.filter((item) => ids.includes(item.id)))
          }
          onLoadMore={() => {
            setItems((prev) => [
              ...prev,
              ...generateItems(prev.length + 1, 10),
            ]);
          }}
        >
          {items.map((item) => (
            <DualListBox2Item key={item.id} id={item.id}>
              {item.label}
            </DualListBox2Item>
          ))}
        </DualListBox2>
      </>
    );
  },
};

export const Accordion: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([
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
    ]);

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
    return (
      <DualListBox2
        included={included}
        excluded={excluded}
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
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={() => {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length + 1, 10, "アコーディオン2"),
          ]);
        }}
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
      </DualListBox2>
    );
  },
};

export const Section: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([
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
    ]);

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
    return (
      <DualListBox2
        included={included}
        excluded={excluded}
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
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={() => {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length + 1, 10, "セクション1"),
          ]);
        }}
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
      </DualListBox2>
    );
  },
};
