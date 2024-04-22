import * as React from "react";
import { StoryObj } from "@storybook/react";
import DualListBox, {
  DualListBoxCandidateItem,
  DualListBoxItem,
  DualListBoxProps,
} from "./DualListBox";
import { ActionButton, Flex, Icon, Spacer, Typography } from "..";
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
 * DualListBoxItem に配置した Button による選択・選択解除を行う
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
      ],
      [],
    );

    const [allowedIds, setAllowedIds] = React.useState<string[]>([items[2].id]);

    const [disallowedIds, setDisallowedIds] = React.useState<string[]>([]);

    const handleAllow = (id: string) => {
      setAllowedIds((prevState) => {
        if (prevState.includes(id)) {
          return prevState;
        }
        return [...prevState, id];
      });
    };

    const handleDisallow = (id: string) => {
      setDisallowedIds((prevState) => {
        if (prevState.includes(id)) {
          return prevState;
        }
        return [...prevState, id];
      });
    };

    const handleRemove = (item: DualListBoxItem) => {
      setAllowedIds((prevState) =>
        prevState.filter((selectedId) => selectedId !== item.id),
      );
      setDisallowedIds((prevState) =>
        prevState.filter((selectedId) => selectedId !== item.id),
      );
    };

    console.log(
      items.some(
        (item) =>
          !allowedIds.includes(item.id) &&
          !disallowedIds.includes(item.id) &&
          item.items &&
          item.items.every(
            (nestedItem) =>
              !allowedIds.includes(nestedItem.id) &&
              !disallowedIds.includes(nestedItem.id),
          ),
      ),
    );

    const candidateItems = React.useMemo(
      () =>
        items
          .filter(
            (item) =>
              (!item.items &&
                !allowedIds.includes(item.id) &&
                !disallowedIds.includes(item.id)) ||
              item.items?.some(
                (nestedItem) =>
                  !allowedIds.includes(nestedItem.id) &&
                  !disallowedIds.includes(nestedItem.id),
              ),
          )
          .map((item) => {
            if (item.items) {
              return {
                id: item.id,
                content: item.content,
                items: item.items
                  .filter(
                    (nestedItem) =>
                      !allowedIds.includes(nestedItem.id) &&
                      !disallowedIds.includes(nestedItem.id),
                  )
                  .map((nestedItem) => ({
                    id: nestedItem.id,
                    content: (
                      <Flex alignItems="center" display="flex" flex={1} gap={1}>
                        <Typography>{nestedItem.content}</Typography>
                        <Flex
                          alignItems="center"
                          display="flex"
                          flex={1}
                          justifyContent="flex-end"
                          gap={1}
                        >
                          <ActionButton
                            color="primary"
                            onClick={() => handleAllow(nestedItem.id)}
                          >
                            <Icon color="active" name="check_thin" />
                          </ActionButton>
                          <ActionButton
                            color="warning"
                            onClick={() => handleDisallow(nestedItem.id)}
                          >
                            <Icon
                              color={theme.palette.danger.main}
                              name="forbid"
                            />
                          </ActionButton>
                        </Flex>
                      </Flex>
                    ),
                  })),
              };
            } else {
              return {
                id: item.id,
                content: (
                  <Flex alignItems="center" display="flex" flex={1} gap={1}>
                    <Typography>{item.content}</Typography>
                    <Flex
                      alignItems="center"
                      display="flex"
                      flex={1}
                      justifyContent="flex-end"
                      gap={1}
                    >
                      <ActionButton
                        color="primary"
                        onClick={() => handleAllow(item.id)}
                      >
                        <Icon color="active" name="check_thin" />
                      </ActionButton>
                      <ActionButton
                        color="warning"
                        onClick={() => handleDisallow(item.id)}
                      >
                        <Icon color={theme.palette.danger.main} name="forbid" />
                      </ActionButton>
                    </Flex>
                  </Flex>
                ),
              };
            }
          }),
      [allowedIds, disallowedIds, items, theme.palette.danger.main],
    );

    const selectedItems = React.useMemo(
      () =>
        items
          .reduce(
            (prev: DualListBoxItem[], item) =>
              item.items ? [...prev, ...item.items] : [...prev, item],
            [],
          )
          .filter(
            (item) =>
              allowedIds.includes(item.id) || disallowedIds.includes(item.id),
          )
          .map((item) => ({
            id: item.id,
            content: (
              <Flex alignItems="center" display="flex" flex={1} gap={1}>
                <Typography>{item.content}</Typography>
                <Flex
                  alignItems="center"
                  display="flex"
                  flex={1}
                  justifyContent="flex-end"
                  gap={1}
                >
                  <Spacer pr={2}>
                    {allowedIds.includes(item.id) && (
                      <Icon color="active" name="check_thin" />
                    )}
                    {disallowedIds.includes(item.id) && (
                      <Icon color={theme.palette.danger.main} name="forbid" />
                    )}
                  </Spacer>
                </Flex>
              </Flex>
            ),
          })),
      [allowedIds, disallowedIds, items, theme.palette.danger.main],
    );

    return (
      <DualListBox
        candidateItems={candidateItems}
        disableCheckbox={true}
        selectedItems={selectedItems}
        onRemove={handleRemove}
      />
    );
  },
};
