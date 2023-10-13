import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  DualListBoxCandidateItem,
  DualListBoxItem,
  DualListBoxProps,
} from "./DualListBox";

export default {
  title: "Components/Data Display/DualListBox",
  component: DualListBox,
};

export const Example: StoryObj<DualListBoxProps> = {
  render: () => {
    const candidateItems = React.useMemo(
      () => [
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
      ],
      [],
    );

    const [selectedItems, setSelectedItems] = React.useState<DualListBoxItem[]>(
      [
        {
          id: "3",
          content: "hoge",
        },
      ],
    );

    const handleAdd = (item: DualListBoxItem) => {
      setSelectedItems([...selectedItems, item]);
    };

    const handleRemove = (item: DualListBoxItem) => {
      const newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id,
      );
      setSelectedItems(newSelectedItems);
    };

    return (
      <DualListBox
        candidateItems={candidateItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  },
};

/**
 * ingred-ui としてのデータ構造自体は再帰で表現しておいて
 * onAdd/onRemove 等での状態管理であったり submit する
 * ときにフラットにするのは利用者側で頑張ってもらう
 */
export const Nested: StoryObj<DualListBoxProps> = {
  render: () => {
    const candidateItems = React.useMemo(
      () => [
        {
          id: "1",
          content: "hoge",
        },
        {
          id: "2",
          content: "fuga",
        },
        {
          id: "3",
          content: "piyo",
          items: [
            {
              id: "21",
              content: "piyo1",
            },
            {
              id: "22",
              content: "piyo2",
            },
          ],
        },
      ],
      [],
    );

    const [selectedItems, setSelectedItems] = React.useState<DualListBoxItem[]>(
      [
        {
          id: "2",
          content: "fuga",
        },
      ],
    );

    const findItemById = (
      items: DualListBoxCandidateItem[],
      id: string,
    ): DualListBoxCandidateItem | undefined => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.items) {
          const foundItem = findItemById(item.items, id);
          if (foundItem) {
            return foundItem;
          }
        }
      }

      return undefined;
    };

    const handleAdd = (item: DualListBoxItem) => {
      const foundItem = findItemById(candidateItems, item.id);
      if (!foundItem) {
        return;
      }

      const newSelectedItems = [...selectedItems, item];

      if (foundItem.items) {
        newSelectedItems.push(...foundItem.items);
      }

      setSelectedItems(newSelectedItems);
    };

    const handleRemove = (item: DualListBoxItem) => {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id),
      );
    };

    return (
      <DualListBox
        candidateItems={candidateItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  },
};
