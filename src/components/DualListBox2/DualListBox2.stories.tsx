import React, { useState, useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import { DualListBox2 } from "./DualListBox2";
import { DualListBox2Item } from "./DualListBox2Item";
import { DualListBox2Accordion } from "./DualListBox2Accordion";
import { DualListBox2Section } from "./DualListBox2Section";

export type Item = {
  id: string;
  label: string;
  groupName?: string;
};

type UseDualListBox2Props = {
  items: Item[];
  onChange?: (selected: Item[]) => void;
};

type UseDualListBox2Return = {
  includedItems: Item[];
  excludedItems: Item[];
  handleIncludedChange: (ids: string[]) => void;
  handleExcludedChange: (ids: string[]) => void;
  isItemIncluded: (id: string) => boolean;
  isItemExcluded: (id: string) => boolean;
};

const useDualListBox2 = ({
  items,
  onChange,
}: UseDualListBox2Props): UseDualListBox2Return => {
  const [includedIds, setIncludedIds] = useState<Set<string>>(new Set());
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());

  const includedItems = useMemo(
    () => items.filter((item) => includedIds.has(item.id)),
    [items, includedIds],
  );

  const excludedItems = useMemo(
    () => items.filter((item) => excludedIds.has(item.id)),
    [items, excludedIds],
  );

  const handleIncludedChange = useCallback(
    (newIncludedIds: string[]) => {
      setIncludedIds(new Set(newIncludedIds));
      const newIncludedItems = items.filter((item) =>
        newIncludedIds.includes(item.id),
      );
      onChange?.(newIncludedItems);
    },
    [items, onChange],
  );

  const handleExcludedChange = useCallback((newExcludedIds: string[]) => {
    setExcludedIds(new Set(newExcludedIds));
  }, []);

  const isItemIncluded = useCallback(
    (id: string) => includedIds.has(id),
    [includedIds],
  );

  const isItemExcluded = useCallback(
    (id: string) => excludedIds.has(id),
    [excludedIds],
  );

  return {
    includedItems,
    excludedItems,
    handleIncludedChange,
    handleExcludedChange,
    isItemIncluded,
    isItemExcluded,
  };
};

const meta = {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DualListBox2は、アイテムの選択と除外を管理するためのコンポーネントです。",
      },
    },
  },
} satisfies Meta<typeof DualListBox2>;

export default meta;
type Story = StoryObj<typeof DualListBox2>;

// 500件のアイテムを生成
const ALL_ITEMS = Array.from({ length: 500 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

const PAGE_SIZE_OPTIONS = [100, 200, 300] as const;

const generateItems = (count: number, groupPrefix: string = ""): Item[] => {
  return ALL_ITEMS.slice(0, count).map((item) => ({
    ...item,
    id: `${groupPrefix ? `${groupPrefix}-` : ""}${item.id}`,
    label: `${groupPrefix ? `${groupPrefix} ` : ""}${item.label}`,
  }));
};

/**
 * #### ベーシックなタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合、上限が決まっている場合いずれにも使えます。
 */
export const Default: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState<number>(100);
    const [items, setItems] = useState<Item[]>(() => generateItems(pageSize));
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    const handleLoadMore = useCallback(() => {
      if (items.length >= ALL_ITEMS.length) return;

      setIsLoading(true);
      setTimeout(() => {
        const nextItems = generateItems(
          Math.min(items.length + pageSize, ALL_ITEMS.length),
        );
        setItems(nextItems);
        setIsLoading(false);
      }, 1000);
    }, [items.length, pageSize]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
      setPageSize(newPageSize);
      setItems(generateItems(newPageSize));
    }, []);

    const menuButtons = (
      <>
        <ContextMenu2
          trigger={
            <ContextMenu2TriggerItem append={pageSize}>
              件数を変更
            </ContextMenu2TriggerItem>
          }
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <ContextMenu2CheckItem
              key={size}
              closeOnChange
              checked={pageSize === size}
              onChange={() => handlePageSizeChange(size)}
            >
              {size}件
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </>
    );

    // フィルタリングされたアイテムを計算
    const filteredItems = useMemo(() => {
      if (!filter) return items;

      const filterWords = filter.toLowerCase().trim().split(/\s+/);
      return items.filter((item) => {
        const label = item.label.toLowerCase();
        return filterWords.every((word) => label.includes(word));
      });
    }, [items, filter]);

    return (
      <DualListBox2
        included={includedItems}
        excluded={excludedItems}
        loading={isLoading}
        menuButtons={menuButtons}
        filter={filter}
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
        onLoadMore={handleLoadMore}
        onFilterChange={setFilter}
      >
        {filteredItems.map((item) => (
          <DualListBox2Item
            key={item.id}
            id={item.id}
            isIncluded={includedItems.includes(item)}
            isExcluded={excludedItems.includes(item)}
          >
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2>
    );
  },
};

/**
 * #### アコーディオンタイプ
 *
 * グループ化されたアイテムを表示する場合に使用します。
 */
export const Accordion: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState<number>(100);
    const [filter, setFilter] = useState("");
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [groupItems, setGroupItems] = useState<Record<string, Item[]>>({});
    const [isLoading, setIsLoading] = useState(false);

    const groups = useMemo(() => {
      return ["Group A", "Group B", "Group C"].map((name) => ({
        name,
        items: groupItems[name] || [],
      }));
    }, [groupItems]);

    const allItems = useMemo(() => {
      return groups.flatMap((group) => group.items);
    }, [groups]);

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
    } = useDualListBox2({
      items: allItems,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    const handlePageSizeChange = useCallback(
      (newPageSize: number) => {
        setPageSize(newPageSize);
        // ページサイズが変更されたら、展開されているグループのアイテムを再生成
        expandedGroups.forEach((groupName) => {
          setIsLoading(true);
          setTimeout(() => {
            setGroupItems((prev) => ({
              ...prev,
              [groupName]: generateItems(newPageSize / 3, groupName),
            }));
            setIsLoading(false);
          }, 1000);
        });
      },
      [expandedGroups],
    );

    const handleOpen = useCallback(
      (groupName: string) => {
        if (!expandedGroups.includes(groupName)) {
          setExpandedGroups((prev) => [...prev, groupName]);
          // グループが開かれたときにアイテムを生成
          setIsLoading(true);
          setTimeout(() => {
            setGroupItems((prev) => ({
              ...prev,
              [groupName]: generateItems(pageSize / 3, groupName),
            }));
            setIsLoading(false);
          }, 1000);
        }
      },
      [expandedGroups, pageSize],
    );

    const menuButtons = (
      <>
        <ContextMenu2
          width={136}
          trigger={
            <ContextMenu2TriggerItem append={pageSize}>
              件数を変更
            </ContextMenu2TriggerItem>
          }
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <ContextMenu2CheckItem
              key={size}
              closeOnChange
              checked={pageSize === size}
              onChange={() => handlePageSizeChange(size)}
            >
              {size}件
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </>
    );

    // フィルタリングされたアイテムを計算
    const filteredGroups = useMemo(() => {
      if (!filter) return groups;

      const filterWords = filter.toLowerCase().trim().split(/\s+/);
      return groups.map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const label = item.label.toLowerCase();
          return filterWords.every((word) => label.includes(word));
        }),
      }));
    }, [groups, filter]);

    return (
      <DualListBox2
        included={includedItems}
        excluded={excludedItems}
        loading={isLoading}
        filter={filter}
        menuButtons={menuButtons}
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
        onFilterChange={setFilter}
      >
        {filteredGroups.map((group) => (
          <DualListBox2Accordion
            key={group.name}
            label={group.name}
            disableInclude={group.items.every((item) =>
              includedItems.includes(item),
            )}
            disableExclude={group.items.every((item) =>
              excludedItems.includes(item),
            )}
            onOpen={() => handleOpen(group.name)}
          >
            {group.items.map((item) => (
              <DualListBox2Item
                key={item.id}
                id={item.id}
                isIncluded={includedItems.includes(item)}
                isExcluded={excludedItems.includes(item)}
              >
                {item.label}
              </DualListBox2Item>
            ))}
          </DualListBox2Accordion>
        ))}
      </DualListBox2>
    );
  },
};

/**
 * #### 「追加」「除外」のいずれかしかできない場合
 *
 * 状況に応じて、`disableExclude`（除外無効）、`disableInclude`（追加無効） に `true` を指定して制御してください。
 */
export const Either: Story = {
  render: () => {
    const [items] = useState<Item[]>([
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ]);

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    return (
      <DualListBox2
        included={includedItems}
        excluded={excludedItems}
        disableExclude={true}
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
      >
        <DualListBox2Accordion label="アコーディオン1" disableExclude={true}>
          {items.slice(0, 2).map((item) => (
            <DualListBox2Item
              key={item.id}
              id={item.id}
              isIncluded={includedItems.includes(item)}
              isExcluded={excludedItems.includes(item)}
            >
              {item.label}
            </DualListBox2Item>
          ))}
        </DualListBox2Accordion>
        <DualListBox2Accordion label="アコーディオン2" disableExclude={true}>
          {items.slice(2).map((item) => (
            <DualListBox2Item
              key={item.id}
              id={item.id}
              isIncluded={includedItems.includes(item)}
              isExcluded={excludedItems.includes(item)}
            >
              {item.label}
            </DualListBox2Item>
          ))}
        </DualListBox2Accordion>
      </DualListBox2>
    );
  },
};

/**
 * #### 選択候補がセクションで分かれているタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合に利用します。
 * 検索は各セクションに移動後に使えます。
 */
export const Section: Story = {
  render: () => {
    const [pageSize] = useState<number>(100);
    const [items, setItems] = useState<Item[]>(() =>
      generateItems(pageSize).map((item, i) => ({
        ...item,
        groupName: `Section ${Math.floor(i / 3) + 1}`,
      })),
    );
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection] = useState<string | null>(null);
    const [filter, setFilter] = useState("");

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    const handleLoadMore = useCallback(() => {
      if (!activeSection) return;
      if (
        items.filter((item) => item.groupName === activeSection).length >=
        ALL_ITEMS.length / 4
      )
        return;

      setIsLoading(true);
      setTimeout(() => {
        const currentSectionItems = items.filter(
          (item) => item.groupName === activeSection,
        );
        const nextItems = generateItems(pageSize)
          .slice(
            currentSectionItems.length,
            currentSectionItems.length + pageSize,
          )
          .map((item) => ({
            ...item,
            groupName: activeSection,
          }));
        setItems((prev) => [...prev, ...nextItems]);
        setIsLoading(false);
      }, 1000);
    }, [activeSection, items, pageSize]);

    const sections = [
      { id: "section1", name: "Section 1" },
      { id: "section2", name: "Section 2" },
      { id: "section3", name: "Section 3" },
      { id: "section4", name: "Section 4" },
    ];

    // フィルタリングされたアイテムを計算
    const filteredItems = useMemo(() => {
      if (!filter) return items;

      const filterWords = filter.toLowerCase().trim().split(/\s+/);
      return items.filter((item) => {
        const label = item.label.toLowerCase();
        return filterWords.every((word) => label.includes(word));
      });
    }, [items, filter]);

    return (
      <DualListBox2
        included={includedItems}
        excluded={excludedItems}
        loading={isLoading}
        filter={filter}
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
        onLoadMore={handleLoadMore}
        onFilterChange={setFilter}
      >
        {sections.map((section) => (
          <DualListBox2Section key={section.id} label={section.name}>
            {filteredItems
              .filter((item) => item.groupName === section.name)
              .map((item) => (
                <DualListBox2Item
                  key={item.id}
                  id={item.id}
                  isIncluded={includedItems.includes(item)}
                  isExcluded={excludedItems.includes(item)}
                >
                  {item.label}
                </DualListBox2Item>
              ))}
          </DualListBox2Section>
        ))}
      </DualListBox2>
    );
  },
};
