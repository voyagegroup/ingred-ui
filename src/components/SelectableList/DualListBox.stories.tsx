import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  Item,
  DualListBoxProps,
  UnselectedItem,
} from "./DualListBox";

export default {
  title: "Components/Data Display/DualListBox",
  component: DualListBox,
};

export const Example: StoryObj<DualListBoxProps> = {
  render: (args) => {
    const [unselectedItems, setUnselectedItems] = React.useState([
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
        selected: true,
      },
      {
        id: "4",
        label: "fuga",
        selected: true,
      },
    ]);

    const [selectedItems, setSelectedItems] = React.useState([
      {
        id: "3",
        label: "hoge",
      },
      {
        id: "4",
        label: "fuga",
      },
    ]);

    const handleAdd = (id: string) => {
      const targets: Item[] = [];
      const newUnselectedItems = unselectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
          return {
            ...item,
            selected: true,
          };
        }
        return item;
      });

      setSelectedItems([...selectedItems, ...targets]);
      setUnselectedItems(newUnselectedItems);
    };

    const handleRemove = (id: string) => {
      const targets: Item[] = [];
      const newSelectedItems = selectedItems.filter((item) => {
        if (item.id === id) {
          targets.push(item);
          return false;
        }
        return true;
      });

      const newUnselectedItems = unselectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
          return {
            ...item,
            selected: false,
          };
        }
        return item;
      });

      setSelectedItems(newSelectedItems);
      setUnselectedItems(newUnselectedItems);
    };

    return (
      <DualListBox
        {...args}
        unselectedItems={unselectedItems}
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
  render: (args) => {
    const [unselectedItems, setUnselectedItems] = React.useState<
      UnselectedItem[]
    >([
      {
        id: "1",
        label: "hoge",
      },
      {
        id: "2",
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
      {
        id: "3",
        label: "fuga",
        selected: true,
      },
    ]);

    const [selectedItems, setSelectedItems] = React.useState<Item[]>([
      {
        id: "3",
        label: "fuga",
      },
    ]);

    const handleAdd = (id: string) => {
      const targets: Item[] = [];
      const newUnselectedItems = unselectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
          return {
            ...item,
            selected: true,
          };
        }

        if (item.items) {
          const newItems = item.items.map((subItem) => {
            if (subItem.id === id) {
              targets.push(subItem);
              return {
                ...subItem,
                selected: true,
              };
            }
            return subItem;
          });

          return {
            ...item,
            items: newItems,
          };
        }

        return item;
      });

      setSelectedItems([...selectedItems, ...targets]);
      setUnselectedItems(newUnselectedItems);
    };

    const handleRemove = (id: string) => {
      const targets: Item[] = [];
      const newSelectedItems = selectedItems.filter((item) => {
        if (item.id === id) {
          targets.push(item);
          return false;
        }
        return true;
      });

      const newUnselectedItems = unselectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
          return {
            ...item,
            selected: false,
          };
        }

        if (item.items) {
          const newItems = item.items.map((subItem) => {
            if (subItem.id === id) {
              targets.push(subItem);
              return {
                ...subItem,
                selected: false,
              };
            }
            return subItem;
          });

          return {
            ...item,
            items: newItems,
          };
        }

        return item;
      });

      setSelectedItems(newSelectedItems);
      setUnselectedItems(newUnselectedItems);
    };

    return (
      <DualListBox
        {...args}
        unselectedItems={unselectedItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  },
};
