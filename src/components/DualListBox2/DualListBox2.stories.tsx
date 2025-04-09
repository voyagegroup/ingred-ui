import React, { useState, useCallback, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DualListBox2, DualListBox2Item } from "./";
import { useDualListBox2, type Item } from "./hooks/useDualListBox2";
import { DualListBox2Accordion } from "./DualListBox2Accordion";
import { DualListBox2Section } from "./DualListBox2Section";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import { ContextMenu2ButtonItem } from "../ContextMenu2";
import { useContextMenu2Anchor } from "../ContextMenu2";
import Checkbox from "../Checkbox";
import Button from "../Button";
import Select from "../Select";
import Flex from "../Flex";
import Typography from "../Typography";

const meta = {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "DualListBox2は、アイテムの選択と除外を管理するためのコンポーネントです。",
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
  return ALL_ITEMS.slice(0, count).map(item => ({
    ...item,
    id: `${groupPrefix ? `${groupPrefix}-` : ""}${item.id}`,
    label: `${groupPrefix ? `${groupPrefix} ` : ""}${item.label}`,
  }));
};

const createContextMenuItems = (pageSize: number, onPageSizeChange: (size: number) => void) => [
  <ContextMenu2ButtonItem
    key="pageSize"
    text="件数を変更"
    onClick={() => { }}
    subMenuItems={PAGE_SIZE_OPTIONS.map(size => ({
      type: "button" as const,
      text: `${size}件`,
      onClick: () => onPageSizeChange(size),
      selected: pageSize === size,
    }))}
  />,
];

/**
 * #### ベーシックなタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合、上限が決まっている場合いずれにも使えます。
 *
 * ---
 *
 * `included` と `excluded` で選択中の値を指定します。
 * 選択状態変更時は、`onIncludedChange` と `onExcludedChange` で、新しい `included` と `excluded` を受け取れるので、これを使って `included` と `excluded` を更新してください。
 *
 * children には、左パネル用の選択できる項目を渡します。右パネルの内容は状態に応じて自動で表示管理されます。
 *
 * モバイルサイズでは、タブで左右パネルの表示を切り替える
 *
 * included はフラットな配列。アコーディオンやセクションの group ごとに分けて配置する
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
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    const handleLoadMore = useCallback(() => {
      if (items.length >= ALL_ITEMS.length) return;

      setIsLoading(true);
      setTimeout(() => {
        const nextItems = generateItems(Math.min(items.length + pageSize, ALL_ITEMS.length));
        setItems(nextItems);
        setIsLoading(false);
      }, 1000);
    }, [items.length, pageSize]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
      setPageSize(newPageSize);
      setItems(generateItems(newPageSize));
    }, []);

    const handleInclude = useCallback(
      (id: string) => {
        // 除外リストから削除
        const newExcludedIds = excludedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);
        handleExcludedChange(newExcludedIds);

        // 追加リストをトグル
        const newIncludedIds = includedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);

        if (!isItemIncluded(id)) {
          newIncludedIds.push(id);
        }

        handleIncludedChange(newIncludedIds);
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemIncluded]
    );

    const handleExclude = useCallback(
      (id: string) => {
        // 追加リストから削除
        const newIncludedIds = includedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);
        handleIncludedChange(newIncludedIds);

        // 除外リストをトグル
        const newExcludedIds = excludedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);

        if (!isItemExcluded(id)) {
          newExcludedIds.push(id);
        }

        handleExcludedChange(newExcludedIds);
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemExcluded]
    );

    const menuButtons = (
      <>
        <Button
          size="small"
          color="clear"
          onClick={() => setFilter("")}
          style={{ visibility: filter ? "visible" : "hidden" }}
        >
          ×
        </Button>
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
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
        loading={isLoading}
        onLoadMore={handleLoadMore}
        menuButtons={menuButtons}
        filter={filter}
        onFilterChange={setFilter}
      >
        {filteredItems.map((item) => (
          <DualListBox2Item
            key={item.id}
            id={item.id}
            isIncluded={isItemIncluded(item.id)}
            isExcluded={isItemExcluded(item.id)}
            onInclude={handleInclude}
            onExclude={handleExclude}
          >
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2>
    );
  },
};

/**
 * #### 選択候補がアコーディオンで折りたたまれているタイプ
 *
 * 件数の上限が決まっていて、多い場合や区切りたい場合に利用します。
 * セクションごとに一括選択もできます。
 */
export const Accordion: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState<number>(100);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<Set<string>>(new Set());
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
    const [filter, setFilter] = useState("");

    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
      { id: "group3", name: "アコーディオン3" },
    ];

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => {
        console.log("Selected items:", selected);
      },
    });

    // 検索時に未読み込みのグループを読み込む
    const loadAllGroups = useCallback(async () => {
      const unloadedGroups = groups.filter(group => !loadedGroups.has(group.name));
      if (unloadedGroups.length === 0) return;

      setLoading(true);
      for (const group of unloadedGroups) {
        const newItems = generateItems(pageSize, group.name).map(item => ({
          ...item,
          groupName: group.name,
        }));
        setItems(prev => [...prev, ...newItems]);
        setLoadedGroups(prev => new Set([...prev, group.name]));
      }
      setLoading(false);
    }, [groups, loadedGroups, pageSize]);

    // フィルタが変更されたときの処理
    const handleFilterChange = useCallback(async (newFilter: string) => {
      setFilter(newFilter);
      if (newFilter) {
        await loadAllGroups();
      }
    }, [loadAllGroups]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
      setPageSize(newPageSize);
      setItems([]);
      setLoadedGroups(new Set());
    }, []);

    const handleAccordionOpen = useCallback(
      (groupName: string) => {
        if (loadedGroups.has(groupName) || loadingGroup) return;

        setLoadingGroup(groupName);
        setLoading(true);
        setTimeout(() => {
          const newItems = generateItems(pageSize, groupName).map(item => ({
            ...item,
            groupName,
          }));
          setItems((prev) => [...prev, ...newItems]);
          setLoadedGroups((prev) => new Set([...prev, groupName]));
          setLoading(false);
          setLoadingGroup(null);
        }, 1000);
      },
      [loadedGroups, pageSize, loadingGroup],
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

    const handleGroupInclude = useCallback(
      (groupName: string) => {
        const groupItems = items.filter((item) => item.groupName === groupName);
        const groupItemIds = groupItems.map((item) => item.id);
        const currentIncludedIds = includedItems.map((item: Item) => item.id);

        // グループ内のアイテムが全て選択済みの場合は、全て選択解除
        const allIncluded = groupItemIds.every(id => isItemIncluded(id));
        const newIncludedIds = allIncluded
          ? currentIncludedIds.filter(id => !groupItemIds.includes(id))
          : [...new Set([...currentIncludedIds, ...groupItemIds])];

        handleIncludedChange(newIncludedIds);
      },
      [items, includedItems, handleIncludedChange, isItemIncluded]
    );

    const handleGroupExclude = useCallback(
      (groupName: string) => {
        const groupItems = items.filter((item) => item.groupName === groupName);
        const groupItemIds = groupItems.map((item) => item.id);
        const currentExcludedIds = excludedItems.map((item: Item) => item.id);

        // グループ内のアイテムが全て除外済みの場合は、全て除外解除
        const allExcluded = groupItemIds.every(id => isItemExcluded(id));
        const newExcludedIds = allExcluded
          ? currentExcludedIds.filter(id => !groupItemIds.includes(id))
          : [...new Set([...currentExcludedIds, ...groupItemIds])];

        handleExcludedChange(newExcludedIds);
      },
      [items, excludedItems, handleExcludedChange, isItemExcluded]
    );

    const handleItemInclude = useCallback(
      (id: string) => {
        // 除外リストから削除
        const newExcludedIds = excludedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);
        handleExcludedChange(newExcludedIds);

        // 追加リストをトグル
        const newIncludedIds = includedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);

        if (!isItemIncluded(id)) {
          newIncludedIds.push(id);
        }

        handleIncludedChange(newIncludedIds);
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemIncluded]
    );

    const handleItemExclude = useCallback(
      (id: string) => {
        // 追加リストから削除
        const newIncludedIds = includedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);
        handleIncludedChange(newIncludedIds);

        // 除外リストをトグル
        const newExcludedIds = excludedItems
          .map((item) => item.id)
          .filter((itemId) => itemId !== id);

        if (!isItemExcluded(id)) {
          newExcludedIds.push(id);
        }

        handleExcludedChange(newExcludedIds);
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemExcluded]
    );

    const menuButtons = (
      <>
        <Button
          size="small"
          color="clear"
          onClick={() => handleFilterChange("")}
          style={{ visibility: filter ? "visible" : "hidden" }}
        >
          ×
        </Button>
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

    return (
      <DualListBox2
        included={includedItems}
        excluded={excludedItems}
        onIncludedChange={handleIncludedChange}
        onExcludedChange={handleExcludedChange}
        loading={loading}
        menuButtons={menuButtons}
        filter={filter}
        onFilterChange={handleFilterChange}
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
            disableInclude={!loadedGroups.has(group.name)}
            disableExclude={!loadedGroups.has(group.name)}
            onOpen={() => handleAccordionOpen(group.name)}
            onIncludeAll={() => handleGroupInclude(group.name)}
            onExcludeAll={() => handleGroupExclude(group.name)}
          >
            {filteredItems
              .filter((item) => item.groupName === group.name)
              .map((item) => (
                <DualListBox2Item
                  key={item.id}
                  id={item.id}
                  isIncluded={isItemIncluded(item.id)}
                  isExcluded={isItemExcluded(item.id)}
                  onInclude={handleItemInclude}
                  onExclude={handleItemExclude}
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
 * 「追加」「除外」のいずれかしかできない場合の例です。
 * 状況に応じて、`disableExclude`（除外無効）、`disableInclude`（追加無効） に `true` を指定して制御してください。
 */
export const Either: Story = {
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ]);

    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disableInclude, setDisableInclude] = useState(false);
    const [disableExclude, setDisableExclude] = useState(true);

    const isItemIncluded = useCallback(
      (id: string) => included.some((item) => item.id === id),
      [included]
    );

    const isItemExcluded = useCallback(
      (id: string) => excluded.some((item) => item.id === id),
      [excluded]
    );

    const handleInclude = useCallback(
      (id: string) => {
        // 除外リストから削除
        const newExcluded = excluded.filter((item) => item.id !== id);
        setExcluded(newExcluded);

        // 追加リストをトグル
        const isCurrentlyIncluded = isItemIncluded(id);
        const newIncluded = isCurrentlyIncluded
          ? included.filter((item) => item.id !== id)
          : [...included, items.find((item) => item.id === id)!];
        setIncluded(newIncluded);
      },
      [included, excluded, items, isItemIncluded]
    );

    const handleExclude = useCallback(
      (id: string) => {
        // 追加リストから削除
        const newIncluded = included.filter((item) => item.id !== id);
        setIncluded(newIncluded);

        // 除外リストをトグル
        const isCurrentlyExcluded = isItemExcluded(id);
        const newExcluded = isCurrentlyExcluded
          ? excluded.filter((item) => item.id !== id)
          : [...excluded, items.find((item) => item.id === id)!];
        setExcluded(newExcluded);
      },
      [included, excluded, items, isItemExcluded]
    );

    const handleGroupInclude = useCallback(
      (groupName: string) => {
        if (disableInclude) return;

        const groupItems = items.filter((item) => item.groupName === groupName);
        const groupItemIds = groupItems.map((item) => item.id);

        // 除外リストから該当グループのアイテムを削除
        const newExcluded = excluded.filter(
          (item) => !groupItemIds.includes(item.id)
        );
        setExcluded(newExcluded);

        // グループ内のアイテムが全て選択済みの場合は、全て選択解除
        const allIncluded = groupItemIds.every(id => isItemIncluded(id));
        const newIncluded = allIncluded
          ? included.filter((item) => !groupItemIds.includes(item.id))
          : [...included, ...groupItems.filter((item) => !isItemIncluded(item.id))];

        setIncluded(newIncluded);
      },
      [items, included, excluded, isItemIncluded, disableInclude]
    );

    const handleGroupExclude = useCallback(
      (groupName: string) => {
        if (disableExclude) return;

        const groupItems = items.filter((item) => item.groupName === groupName);
        const groupItemIds = groupItems.map((item) => item.id);

        // 追加リストから該当グループのアイテムを削除
        const newIncluded = included.filter(
          (item) => !groupItemIds.includes(item.id)
        );
        setIncluded(newIncluded);

        // グループ内のアイテムが全て除外済みの場合は、全て除外解除
        const allExcluded = groupItemIds.every(id => isItemExcluded(id));
        const newExcluded = allExcluded
          ? excluded.filter((item) => !groupItemIds.includes(item.id))
          : [...excluded, ...groupItems.filter((item) => !isItemExcluded(item.id))];

        setExcluded(newExcluded);
      },
      [items, included, excluded, isItemExcluded, disableExclude]
    );

    return (
      <>
        <DualListBox2
          included={included}
          excluded={excluded}
          onIncludedChange={(ids: string[]) =>
            setIncluded(items.filter((item) => ids.includes(item.id)))
          }
          onExcludedChange={(ids: string[]) =>
            setExcluded(items.filter((item) => ids.includes(item.id)))
          }
          loading={isLoading}
          disableInclude={disableInclude}
          disableExclude={disableExclude}
        >
          <DualListBox2Accordion
            label="アコーディオン1"
            disableInclude={disableInclude}
            disableExclude={disableExclude}
            onIncludeAll={() => handleGroupInclude("アコーディオン1")}
            onExcludeAll={() => handleGroupExclude("アコーディオン1")}
          >
            {items
              .filter((item) => item.groupName === "アコーディオン1")
              .map((item) => (
                <DualListBox2Item
                  key={item.id}
                  id={item.id}
                  isIncluded={isItemIncluded(item.id)}
                  isExcluded={isItemExcluded(item.id)}
                  onInclude={handleInclude}
                  onExclude={handleExclude}
                  disableExclude={disableExclude}
                  disableInclude={disableInclude}
                >
                  {item.label}
                </DualListBox2Item>
              ))}
          </DualListBox2Accordion>
          <DualListBox2Accordion
            label="アコーディオン2"
            disableInclude={disableInclude}
            disableExclude={disableExclude}
            onIncludeAll={() => handleGroupInclude("アコーディオン2")}
            onExcludeAll={() => handleGroupExclude("アコーディオン2")}
          >
            {items
              .filter((item) => item.groupName === "アコーディオン2")
              .map((item) => (
                <DualListBox2Item
                  key={item.id}
                  id={item.id}
                  isIncluded={isItemIncluded(item.id)}
                  isExcluded={isItemExcluded(item.id)}
                  onInclude={handleInclude}
                  onExclude={handleExclude}
                  disableExclude={disableExclude}
                  disableInclude={disableInclude}
                >
                  {item.label}
                </DualListBox2Item>
              ))}
          </DualListBox2Accordion>
        </DualListBox2>
      </>
    );
  },
};

/**
 * #### 選択候補がセクションで分かれているタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合に利用します。
 * 検索は各セクションに移動後に使えます。
 *
 * 任意のセクション選択中は、その他のセクションは非表示となります。
 */
export const Section: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState<number>(100);
    const [items, setItems] = useState<Item[]>(() =>
      generateItems(pageSize).map((item, i) => ({
        ...item,
        groupName: `Section ${Math.floor(i / 3) + 1}`,
      }))
    );
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const {
      includedItems,
      excludedItems,
      handleIncludedChange,
      handleExcludedChange,
      isItemIncluded,
      isItemExcluded,
    } = useDualListBox2({
      items,
      onChange: (selected: Item[]) => console.log("Selected items:", selected),
    });

    const handleLoadMore = useCallback(() => {
      if (!activeSection) return;
      if (items.filter(item => item.groupName === activeSection).length >= ALL_ITEMS.length / 4) return;

      setIsLoading(true);
      setTimeout(() => {
        const currentSectionItems = items.filter(item => item.groupName === activeSection);
        const nextItems = generateItems(pageSize).slice(currentSectionItems.length, currentSectionItems.length + pageSize)
          .map(item => ({
            ...item,
            groupName: activeSection,
          }));
        setItems((prev) => [...prev, ...nextItems]);
        setIsLoading(false);
      }, 1000);
    }, [activeSection, items, pageSize]);

    const handlePageSizeChange = useCallback((option: { value: string; label: string }) => {
      const newPageSize = parseInt(option.value, 10);
      setPageSize(newPageSize);
      setItems(
        generateItems(newPageSize).map((item, i) => ({
          ...item,
          groupName: `Section ${Math.floor(i / 3) + 1}`,
        }))
      );
    }, []);

    const handleInclude = useCallback(
      (id: string) => {
        // 除外リストから削除
        const newExcluded = excludedItems.filter((item) => item.id !== id);
        handleExcludedChange(newExcluded.map((item) => item.id));

        // 追加リストをトグル
        const isCurrentlyIncluded = isItemIncluded(id);
        const newIncluded = isCurrentlyIncluded
          ? includedItems.filter((item) => item.id !== id)
          : [...includedItems, items.find((item) => item.id === id)!];
        handleIncludedChange(newIncluded.map((item) => item.id));
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemIncluded]
    );

    const handleExclude = useCallback(
      (id: string) => {
        // 追加リストから削除
        const newIncluded = includedItems.filter((item) => item.id !== id);
        handleIncludedChange(newIncluded.map((item) => item.id));

        // 除外リストをトグル
        const isCurrentlyExcluded = isItemExcluded(id);
        const newExcluded = isCurrentlyExcluded
          ? excludedItems.filter((item) => item.id !== id)
          : [...excludedItems, items.find((item) => item.id === id)!];
        handleExcludedChange(newExcluded.map((item) => item.id));
      },
      [includedItems, excludedItems, handleIncludedChange, handleExcludedChange, isItemExcluded]
    );

    const sections = [
      { id: "section1", name: "Section 1" },
      { id: "section2", name: "Section 2" },
      { id: "section3", name: "Section 3" },
      { id: "section4", name: "Section 4" },
    ];

    return (
      <>
        <DualListBox2
          included={includedItems}
          excluded={excludedItems}
          onIncludedChange={handleIncludedChange}
          onExcludedChange={handleExcludedChange}
          loading={isLoading}
          onLoadMore={handleLoadMore}
          onActiveSectionChange={setActiveSection}
        >
          {sections.map((section) => (
            <DualListBox2Section
              key={section.id}
              label={section.name}
              active={activeSection === section.name}
            >
              {items
                .filter((item) => item.groupName === section.name)
                .map((item) => (
                  <DualListBox2Item
                    key={item.id}
                    id={item.id}
                    isIncluded={isItemIncluded(item.id)}
                    isExcluded={isItemExcluded(item.id)}
                    onInclude={handleInclude}
                    onExclude={handleExclude}
                  >
                    {item.label}
                  </DualListBox2Item>
                ))}
            </DualListBox2Section>
          ))}
        </DualListBox2>
      </>
    );
  },
};
