import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  DualListBoxItem,
  DualListBoxProps,
  DualListBoxCandidateItemWithToggle,
  DualListBoxItemSelectedWithToggle,
} from "./DualListBox";

export default {
  title: "Components/Data Display/DualListBox",
  component: DualListBox,
};

export const Example: StoryObj<DualListBoxProps> = {
  render: () => {
    const [candidateItems, setCandidateItems] = React.useState([
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
      const targets: DualListBoxItem[] = [];
      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
    };

    const handleRemove = (id: string) => {
      const targets: DualListBoxItem[] = [];
      const newSelectedItems = selectedItems.filter((item) => {
        if (item.id === id) {
          targets.push(item);
          return false;
        }
        return true;
      });

      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
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
    const [candidateItems, setCandidateItems] = React.useState([
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
      const targets: DualListBoxItem[] = [];
      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
    };

    const handleRemove = (id: string) => {
      const targets: DualListBoxItem[] = [];
      const newSelectedItems = selectedItems.filter((item) => {
        if (item.id === id) {
          targets.push(item);
          return false;
        }
        return true;
      });

      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
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
    const [candidateItems, setCandidateItems] = React.useState([
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
    ]);

    const [selectedItems, setSelectedItems] = React.useState<
      DualListBoxItemSelectedWithToggle[]
    >([
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
    ]);

    const handleAdd = (id: string) => {
      const targets: DualListBoxCandidateItemWithToggle[] = [];
      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
    };

    const handleRemove = (id: string) => {
      const targets: DualListBoxItem[] = [];
      const newSelectedItems = selectedItems.filter((item) => {
        if (item.id === id) {
          targets.push(item);
          return false;
        }
        return true;
      });

      const newUnselectedItems = candidateItems.map((item) => {
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
      setCandidateItems(newUnselectedItems);
    };

    const handleToggleChange = (id: string) => {
      const targets: DualListBoxItem[] = [];
      const newSelectedItems = selectedItems.map((item) => {
        if (item.id === id) {
          targets.push(item);
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
