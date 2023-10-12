import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, { DualListBoxItem, DualListBoxProps } from "./DualListBox";

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
      ],
      [],
    );

    const [selectedItems, setSelectedItems] = React.useState([
      {
        id: "3",
      },
    ]);

    const handleAdd = (id: string) => {
      setSelectedItems([...selectedItems, { id }]);
    };

    const handleRemove = (id: string) => {
      const newSelectedItems = selectedItems.filter((item) => item.id !== id);
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
          label: "hoge",
        },
        {
          id: "2",
          label: "fuga",
        },
        {
          id: "3",
          label: "piyo",
          items: [
            {
              id: "21",
              label: "piyo1",
            },
            {
              id: "22",
              label: "piyo2",
            },
          ],
        },
      ],
      [],
    );

    const [selectedItems, setSelectedItems] = React.useState([
      {
        id: "2",
      },
    ]);

    const findItemById = (
      items: DualListBoxItem[],
      id: string,
    ): DualListBoxItem | undefined => {
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

    const handleAdd = (id: string) => {
      const targetItem = findItemById(candidateItems, id);
      if (targetItem) {
        setSelectedItems([...selectedItems, targetItem]);
      }
    };

    const handleRemove = (id: string) => {
      setSelectedItems((prev) => prev.filter((item) => item.id !== id));
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

export const WithToggle: StoryObj<DualListBoxProps> = {
  render: () => {
    const candidateItems = React.useMemo(
      () => [
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
      ],
      [],
    );

    const [selectedItems, setSelectedItems] = React.useState([
      {
        id: "3",
        checked: true,
      },
      {
        id: "4",
        checked: true,
      },
    ]);

    const handleAdd = (id: string) => {
      setSelectedItems([...selectedItems, { id, checked: false }]);
    };

    const handleRemove = (id: string) => {
      const newSelectedItems = selectedItems.filter((item) => item.id !== id);
      setSelectedItems(newSelectedItems);
    };

    const handleToggleChange = (id: string) => {
      const newSelectedItems = selectedItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });

      setSelectedItems(newSelectedItems);
    };

    return (
      <DualListBox
        candidateItems={candidateItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onToggleChange={handleToggleChange}
      />
    );
  },
};
