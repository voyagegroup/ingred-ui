import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  DualListBoxCandidateItem,
  DualListBoxItem,
  DualListBoxProps,
} from "./DualListBox";
import { ActionButton, Flex, Icon, Typography } from "..";
import { useTheme } from "../../themes";

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
        {
          id: "4",
          content: "huga",
          items: [
            {
              id: "23",
              content: "huga1",
            },
            {
              id: "24",
              content: "huga2",
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

/**
 * 規定の Checkbox による選択・選択解除ではなく
 * DualListBoxItem に Button を配置して選択・選択解除を行う
 */
export const WithoutCheckbox: StoryObj<DualListBoxProps> = {
  render: () => {
    const theme = useTheme();

    const items = React.useMemo(
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

    const [selectedIds, setSelectedIds] = React.useState<string[]>([
      items[2].id,
    ]);

    const handleAdd = (id: string) => {
      setSelectedIds((prevState) => {
        if (prevState.includes(id)) {
          return prevState;
        }
        return [...prevState, id];
      });
    };

    const handleRemove = (id: string) => {
      setSelectedIds((prevState) =>
        prevState.filter((selectedId) => selectedId !== id),
      );
    };

    const candidateItems = React.useMemo(
      () =>
        items
          .filter((item) => !selectedIds.includes(item.id))
          .map((item) => ({
            id: item.id,
            content: (
              <Flex alignItems="center" display="flex" gap={1}>
                <Typography>{item.content}</Typography>
                <ActionButton
                  color="primary"
                  onClick={() => handleAdd(item.id)}
                >
                  <Icon color="active" name="check_thin" />
                </ActionButton>
              </Flex>
            ),
          })),
      [items, selectedIds],
    );

    const selectedItems = React.useMemo(
      () =>
        items
          .filter((item) => selectedIds.includes(item.id))
          .map((item) => ({
            id: item.id,
            content: (
              <Flex alignItems="center" display="flex" gap={1}>
                <Typography>{item.content}</Typography>
                <ActionButton
                  color="warning"
                  onClick={() => handleRemove(item.id)}
                >
                  <Icon color={theme.palette.danger.main} name="delete_bin" />
                </ActionButton>
              </Flex>
            ),
          })),
      [items, selectedIds, theme.palette.danger.main],
    );

    return (
      <DualListBox
        candidateItems={candidateItems}
        selectedItems={selectedItems}
      />
    );
  },
};
