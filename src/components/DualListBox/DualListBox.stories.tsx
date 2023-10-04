import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  Item,
  DualListBoxProps,
  ItemWithInverse,
} from "./DualListBox";

export default {
  title: "Components/Data Display/DualListBox",
  component: DualListBox,
};

export const Example: StoryObj<DualListBoxProps> = {
  render: () => {
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
      },
      {
        id: "4",
        label: "fuga",
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
  render: () => {
    const [unselectedItems, setUnselectedItems] = React.useState([
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
    ]);

    const [selectedItems, setSelectedItems] = React.useState([
      {
        id: "2",
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
        unselectedItems={unselectedItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  },
};

export const WithToggle: StoryObj<DualListBoxProps> = {
  render: () => {
    const [unselectedItems, setUnselectedItems] = React.useState([
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
    ]);

    const [selectedItems, setSelectedItems] = React.useState<ItemWithInverse[]>(
      [
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
      ],
    );

    const handleAdd = (id: string) => {
      const targets: ItemWithInverse[] = [];
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

    const handleToggleInverse = (id: string) => {
      const targets: Item[] = [];
      const newSelectedItems = selectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
          return {
            ...item,
            isInverse: !item.isInverse,
          };
        }
        return item;
      });

      setSelectedItems(newSelectedItems);
    };

    return (
      <DualListBox
        unselectedItems={unselectedItems}
        selectedItems={selectedItems}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onToggleInverse={handleToggleInverse}
      />
    );
  },
};
