import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Meta, StoryObj, ComponentStory } from "@storybook/react";
import {
  type Item,
  type LoadingMode,
  DualListBox2,
  DualListBox2Item,
  DualListBox2Accordion,
  DualListBox2Section,
  toGroupedItems,
} from "./index";
import {
  ContextMenu2ButtonItem,
  ContextMenu2SwitchItem,
} from "../ContextMenu2";
import Checkbox from "../Checkbox";

// グループ定義型
type Group = {
  id: string;
  name: string;
  startIndex: number;
};

/**
 * アイテム生成関数
 */
const generateItems = (
  startIndex: number,
  count: number,
  options?: {
    groupName?: string;
    includeSearchableItems?: boolean;
    searchTermProbability?: number;
    searchTerm?: string;
  },
): Item[] => {
  const {
    groupName,
    includeSearchableItems = false,
    searchTermProbability = 0.4,
    searchTerm = "8",
  } = options || {};

  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    const itemId = `item-${index}`;

    // 検索テスト用にsearchTermを含むアイテムを生成
    let label = "";
    if (includeSearchableItems && Math.random() < searchTermProbability) {
      label = groupName
        ? `${groupName}のアイテム${searchTerm}${i + 1}`
        : `アイテム${searchTerm}${i + 1}`;
    } else {
      label = groupName ? `${groupName}のアイテム${i + 1}` : `アイテム${i + 1}`;
    }

    return {
      id: itemId,
      label,
      ...(groupName && { groupName }),
    };
  });
};

/**
 * データローディングのカスタムフック
 * 複数のストーリーで共通して使用するローディング機能を提供
 */
const useDataLoading = (options: {
  initialPageSize: number;
  maxItemsPerGroup?: number;
  delayTime?: number;
}) => {
  const {
    initialPageSize = 50,
    maxItemsPerGroup = 250,
    delayTime = 1000,
  } = options;

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchText, setSearchText] = useState("");

  // 検索条件に一致するアイテムをフィルタリング
  const filteredItems = useMemo(() => {
    if (!searchText) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [items, searchText]);

  // 指定した開始位置から指定数のアイテムを読み込む
  const loadItems = useCallback(
    (
      startIndex: number,
      count: number,
      options?: {
        groupName?: string;
        replace?: boolean;
        includeSearchableItems?: boolean;
      },
    ) => {
      return new Promise<Item[]>((resolve) => {
        const newItems = generateItems(startIndex, count, {
          groupName: options?.groupName,
          includeSearchableItems: options?.includeSearchableItems ?? true,
        });

        setIsLoading(true);

        setTimeout(() => {
          setItems((prev) =>
            options?.replace ? newItems : [...prev, ...newItems],
          );
          setIsLoading(false);
          resolve(newItems);
        }, delayTime);
      });
    },
    [delayTime],
  );

  // ページサイズ変更処理
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setItems([]);

      // 必要に応じて初期データを再読み込み
      setIsLoading(true);
      setTimeout(() => {
        setItems(
          generateItems(0, newPageSize, { includeSearchableItems: true }),
        );
        setIsLoading(false);
      }, delayTime);
    },
    [delayTime],
  );

  // 検索処理
  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return {
    items,
    setItems,
    filteredItems,
    isLoading,
    setIsLoading,
    pageSize,
    setPageSize,
    searchText,
    setSearchText,
    loadItems,
    handlePageSizeChange,
    handleSearch,
    maxItemsPerGroup,
  };
};

/**
 * アコーディオン用のカスタムフック
 * グループ管理とグループ特有のローディングロジックを提供
 */
const useAccordionGroups = (dataLoading: ReturnType<typeof useDataLoading>) => {
  const {
    items,
    setItems,
    isLoading,
    setIsLoading,
    pageSize,
    loadItems,
    maxItemsPerGroup,
  } = dataLoading;

  const [loadedGroups, setLoadedGroups] = useState<string[]>([]);
  const [loadingGroup, setLoadingGroup] = useState<string | null>(null);

  // アコーディオンのグループ定義
  const groups: Group[] = useMemo(
    () => [
      { id: "group1", name: "アコーディオン1", startIndex: 0 },
      { id: "group2", name: "アコーディオン2", startIndex: 1000 },
    ],
    [],
  );

  // 指定したグループの全データを読み込む
  const loadFullGroupData = useCallback(
    async (groupId: string) => {
      const group = groups.find((g) => g.id === groupId);
      if (!group || loadedGroups.includes(groupId)) return;

      setIsLoading(true);

      // 既存のグループデータを削除
      setItems((prev) => prev.filter((item) => item.groupName !== group.name));

      // 新しいグループデータを読み込む
      await loadItems(group.startIndex, maxItemsPerGroup || 250, {
        groupName: group.name,
        includeSearchableItems: true,
      });

      setLoadedGroups((prev) =>
        prev.includes(groupId) ? prev : [...prev, groupId],
      );

      setIsLoading(false);
    },
    [groups, loadedGroups, loadItems, maxItemsPerGroup, setIsLoading, setItems],
  );

  // 全グループのデータを読み込む
  const loadAllGroupsData = useCallback(async () => {
    setIsLoading(true);

    const unloadedGroups = groups.filter(
      (group) => !loadedGroups.includes(group.id),
    );
    const promises = unloadedGroups.map((group) => loadFullGroupData(group.id));

    await Promise.all(promises);
    setIsLoading(false);
  }, [groups, loadedGroups, loadFullGroupData, setIsLoading]);

  // アコーディオンを開いたときのハンドラ
  const handleAccordionOpen = useCallback(
    (groupId: string) => {
      if (loadedGroups.includes(groupId) || loadingGroup) return;

      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      setLoadingGroup(groupId);
      setIsLoading(true);

      loadItems(group.startIndex, pageSize, {
        groupName: group.name,
        includeSearchableItems: true,
      }).then(() => {
        setLoadedGroups((prev) => [...prev, groupId]);
        setLoadingGroup(null);
      });
    },
    [loadedGroups, loadingGroup, groups, pageSize, loadItems, setIsLoading],
  );

  // 追加データの読み込み
  const handleLoadMore = useCallback(() => {
    if (isLoading || loadingGroup || loadedGroups.length === 0) return;

    // 現在開いているグループを取得
    const currentGroupId = loadedGroups[loadedGroups.length - 1];
    const currentGroup = groups.find((g) => g.id === currentGroupId);
    if (!currentGroup) return;

    // グループ内のアイテム数をカウント
    const groupItemCount = items.filter(
      (item) => item.groupName === currentGroup.name,
    ).length;

    // グループごとの上限チェック
    if (groupItemCount >= (maxItemsPerGroup || 250)) return;

    setIsLoading(true);

    const remainingItems = (maxItemsPerGroup || 250) - groupItemCount;
    const itemsToLoad = Math.min(remainingItems, pageSize);

    if (itemsToLoad > 0) {
      loadItems(currentGroup.startIndex + groupItemCount, itemsToLoad, {
        groupName: currentGroup.name,
        includeSearchableItems: true,
      });
    } else {
      setIsLoading(false);
    }
  }, [
    isLoading,
    loadingGroup,
    loadedGroups,
    groups,
    items,
    pageSize,
    maxItemsPerGroup,
    loadItems,
    setIsLoading,
  ]);

  // 検索時に全グループデータを読み込む
  const handleSearch = useCallback(
    async (text: string) => {
      dataLoading.handleSearch(text);

      // 検索時に未読み込みのグループがあれば全て読み込む
      if (text && groups.some((group) => !loadedGroups.includes(group.id))) {
        await loadAllGroupsData();
      }
    },
    [dataLoading, groups, loadedGroups, loadAllGroupsData],
  );

  return {
    groups,
    loadedGroups,
    setLoadedGroups,
    loadingGroup,
    handleAccordionOpen,
    handleLoadMore,
    handleSearch,
    loadFullGroupData,
    loadAllGroupsData,
  };
};

/**
 * フィルタリングされたアイテム数の表示コンポーネント
 * 一貫したスタイルを提供
 */
const FilteredCountDisplay = ({
  filteredCount,
  totalCount,
}: {
  filteredCount: number;
  totalCount: number;
}) => (
  <div
    style={{
      fontSize: "13px",
      lineHeight: "16px",
      display: "flex",
      color: "#13284B",
    }}
  >
    {`${filteredCount}件`}
  </div>
);

const meta = {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
  argTypes: {},
} satisfies Meta<typeof DualListBox2>;

export default meta;

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
export const Default: ComponentStory<typeof DualListBox2> = (args) => {
  const [included, setIncluded] = useState<Item[]>(args.included || []);
  const [excluded, setExcluded] = useState<Item[]>(args.excluded || []);
  const [loading, setLoading] = useState(args.loading || false);
  const [pageSize, setPageSize] = useState(args.pageSize || 50);
  const [items, setItems] = useState(() => generateItems(0, pageSize));

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...generateItems(prev.length, pageSize)]);
      setLoading(false);
    }, 1000);
  }, [pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setItems(generateItems(0, newPageSize));
  }, []);

  return (
    <DualListBox2
      {...args}
      included={included}
      excluded={excluded}
      loading={loading}
      pageSize={pageSize}
      pageSizeOptions={args.pageSizeOptions}
      onPageSizeChange={handlePageSizeChange}
      onIncludedChange={(ids: string[]) =>
        setIncluded(items.filter((item) => ids.includes(item.id)))
      }
      onExcludedChange={(ids: string[]) =>
        setExcluded(items.filter((item) => ids.includes(item.id)))
      }
      onLoadMore={handleLoadMore}
    >
      {items.map((item) => (
        <DualListBox2Item
          key={item.id}
          id={item.id}
          disableInclude={args.disableInclude}
          disableExclude={args.disableExclude}
        >
          {item.label}
        </DualListBox2Item>
      ))}
    </DualListBox2>
  );
};

/**
 * #### 選択候補がアコーディオンで折りたたまれているタイプ
 *
 * 件数の上限が決まっていて、多い場合や区切りたい場合に利用します。
 * セクションごとに一括選択もできます。
 */
export const Accordion: StoryObj<typeof DualListBox2> = {
  render: function AccordionStory() {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(50);
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
    const [loadingMode, setLoadingMode] =
      useState<LoadingMode>("infinite-loading");

    // アコーディオンのグループ定義
    const groups = useMemo(
      () => [
        { id: "group1", name: "アコーディオン1" },
        { id: "group2", name: "アコーディオン2" },
      ],
      [],
    );

    const handleAccordionOpen = useCallback(
      (groupName: string) => {
        if (loadedGroups.includes(groupName) || loadingGroup) return;

        setLoadingGroup(groupName);
        setIsLoading(true);
        setTimeout(() => {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length, pageSize).map((item) => ({
              ...item,
              groupName,
            })),
          ]);
          setLoadedGroups((prev) => [...prev, groupName]);
          setIsLoading(false);
          setLoadingGroup(null);
        }, 1000);
      },
      [loadedGroups, pageSize, loadingGroup],
    );

    const handleLoadMore = useCallback(() => {
      // すでにロード中の場合は何もしない
      if (isLoading || loadingGroup) return;

      // group2に対する追加データロード
      if (loadedGroups.includes("group2")) {
        setIsLoading(true);
        setTimeout(() => {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length, pageSize).map((item) => ({
              ...item,
              groupName: "グループ2",
            })),
          ]);
          setIsLoading(false);
        }, 1000);
      }
    }, [isLoading, loadedGroups, pageSize, loadingGroup]);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode={loadingMode}
        menuButtons={
          <>
            <ContextMenu2ButtonItem
              onClick={() => {
                setLoadingMode(
                  loadingMode === "infinite-loading"
                    ? "bulk-loading"
                    : "infinite-loading",
                );
              }}
            >
              {`Loading Mode: ${loadingMode}`}
            </ContextMenu2ButtonItem>
            <ContextMenu2SwitchItem disabled onChange={() => {}}>
              入れて使う
            </ContextMenu2SwitchItem>
          </>
        }
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setItems([]);
          setLoadedGroups([]);
        }}
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={handleLoadMore}
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
            disableInclude={!loadedGroups.includes(group.id)}
            disableExclude={!loadedGroups.includes(group.id)}
            loadingMode={loadingMode}
            onOpen={() => handleAccordionOpen(group.id)}
          >
            {items
              .filter((item) => item.groupName === group.id)
              .map((item) => (
                <DualListBox2Item key={item.id} id={item.id}>
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
export const Either: StoryObj<typeof DualListBox2> = {
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

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
    const [isLoading, setIsLoading] = useState(false);
    const [disableInclude, setDisableInclude] = useState(false);
    const [disableExclude, setDisableExclude] = useState(true);

    return (
      <>
        <Checkbox
          checked={disableInclude}
          onChange={() => setDisableInclude(!disableInclude)}
        >
          disableInclude
        </Checkbox>
        <Checkbox
          checked={disableExclude}
          onChange={() => setDisableExclude(!disableExclude)}
        >
          disableExclude
        </Checkbox>

        <DualListBox2
          disableExclude={disableExclude}
          disableInclude={disableInclude}
          loading={isLoading}
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
            setIsLoading(true);
            setTimeout(() => {
              setItems((prev) => [
                ...prev,
                ...generateItems(prev.length + 1, 10, {
                  groupName: "アコーディオン2",
                }),
              ]);
              setIsLoading(false);
            }, 1000);
          }}
        >
          {toGroupedItems(items).map(
            (group) =>
              group.groupName && (
                <DualListBox2Accordion
                  key={group.groupName}
                  disableExclude={disableExclude}
                  disableInclude={disableInclude}
                  label={group.groupName}
                >
                  {group.items.map((item) => (
                    <DualListBox2Item
                      key={item.id}
                      disableExclude={disableExclude}
                      disableInclude={disableInclude}
                      id={item.id}
                    >
                      {item.label}
                    </DualListBox2Item>
                  ))}
                </DualListBox2Accordion>
              ),
          )}
        </DualListBox2>
      </>
    );
  },
};

/**
 * #### Section with Infinite Loading
 *
 * セクション機能を持つDualListBox2のサンプルです。
 * infinite-loadingモードでは、スクロールに応じて段階的にデータを読み込みます。
 */
export const SectionWithInfiniteLoading: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>(() => {
      // セクション1のアイテムを生成（10件）
      const section1Items = generateItems(0, 10).map((item) => ({
        ...item,
        groupName: "セクション1",
        label: `リストアイテム${parseInt(item.id.split("-")[1]) + 1}`,
      }));

      // セクション2のアイテムを生成（10件）
      const section2Items = generateItems(10, 10).map((item) => ({
        ...item,
        groupName: "セクション2",
        label: `リストアイテム${parseInt(item.id.split("-")[1]) + 1}`,
      }));

      return [...section1Items, ...section2Items];
    });

    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(50);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode="infinite-loading"
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setItems([
            ...items.slice(0, 4),
            ...generateItems(4, newPageSize - 4).map((item) => ({
              ...item,
              groupName: item.id.includes("0") ? "セクション1" : "セクション2",
              label: `リストアイテム${parseInt(item.id.split("-")[1]) + 1}`,
            })),
          ]);
        }}
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onActiveSectionChange={(section) => setCurrentSection(section)}
        onLoadMore={() => {
          if (currentSection === null) return;
          setIsLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...generateItems(prev.length, pageSize).map((item) => ({
                ...item,
                groupName: currentSection,
                label: `リストアイテム${parseInt(item.id.split("-")[1]) + 1}`,
              })),
            ]);
            setIsLoading(false);
          }, 1000);
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

/**
 * #### Section with Bulk Loading
 *
 * セクション機能を持つDualListBox2のサンプルです。
 * bulk-loadingモードでは、一度に全てのデータを読み込みます。
 */
export const SectionWithBulkLoading: StoryObj<typeof DualListBox2> = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [items, setItems] = useState<Item[]>(() => {
      // 初期データとして500件を生成
      const allItems = generateItems(0, 500).map((item) => ({
        ...item,
        groupName: item.id.includes("0") ? "セクション1" : "セクション2",
        label: `リストアイテム${parseInt(item.id.split("-")[1]) + 1}`,
      }));
      return allItems;
    });

    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(50);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode="bulk-loading"
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
        }}
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onActiveSectionChange={(section) => setCurrentSection(section)}
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

/**
 * #### Infinite loading
 *
 * このモードでは、スクロールに応じてページサイズ単位で追加データを読み込みます。
 *
 * 特徴:
 * - 初期表示が速く、必要になったときにのみデータを読み込みます
 * - ページサイズ単位で段階的にデータを取得するため、メモリ効率が良いです
 * - 大量のデータを扱う場合に適しています
 */
export const InfiniteLoading: StoryObj<typeof DualListBox2> = {
  render: function InfiniteLoadingStory() {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(50);

    // 初期データ読み込み
    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setItems(generateItems(0, pageSize));
        setIsLoading(false);
      }, 500);
    }, [pageSize]);

    // 検索実行時、全データ読み込み
    const handleSearchWithFullLoad = useCallback(
      async (text: string) => {
        if (text && items.length < 500) {
          setIsLoading(true);
          setTimeout(() => {
            // 全データ（500件）を一度に読み込む
            setItems(generateItems(0, 500, { includeSearchableItems: true }));
            setIsLoading(false);
          }, 1000);
        }
      },
      [items.length],
    );

    const handleLoadMore = useCallback(() => {
      // すでに500件に達していたら何もしない
      if (items.length >= 500) return;

      setIsLoading(true);
      setTimeout(() => {
        // 残りの件数を計算（上限は500件）
        const remainingItems = 500 - items.length;
        const itemsToLoad = Math.min(remainingItems, pageSize);

        if (itemsToLoad > 0) {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length, itemsToLoad),
          ]);
        }
        setIsLoading(false);
      }, 1000);
    }, [pageSize, items.length]);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode="infinite-loading"
        renderFilteredCount={(filteredCount) => (
          <div
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              display: "flex",
              color: "#13284B",
            }}
          >
            {`${filteredCount}件`}
          </div>
        )}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setItems([]);
          setTimeout(() => {
            setItems(generateItems(0, newPageSize));
          }, 500);
        }}
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={handleLoadMore}
        // @ts-expect-error onSearchプロパティはDualListBox2Propsに存在しないが、必要な機能
        onSearch={handleSearchWithFullLoad}
      >
        {items.map((item) => (
          <DualListBox2Item key={item.id} id={item.id}>
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2>
    );
  },
};

/**
 * #### Bulk loading
 *
 * このモードでは、一度にすべてのデータ（上限500件まで）を読み込みます。
 *
 * 特徴:
 * - コンポーネントのマウント時に全データの読み込みが開始されます
 * - データの総量が既知で管理可能な場合に適しています
 * - ユーザーの待ち時間を最小限にし、スクロール操作がスムーズです
 * - 追加の読み込み待ちがないためUXが向上します
 */
export const BulkLoading: StoryObj<typeof DualListBox2> = {
  render: function BulkLoadingStory() {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(50);

    // 初期データ読み込み
    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        // 一度に500件のデータを生成
        setItems(generateItems(0, 500));
        setIsLoading(false);
      }, 500);
    }, [pageSize]);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode="bulk-loading"
        renderFilteredCount={(filteredCount) => (
          <div
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              display: "flex",
              color: "#13284B",
            }}
          >
            {`${filteredCount}件`}
          </div>
        )}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setItems([]);
          setTimeout(() => {
            // ページサイズ変更時も500件のデータを生成
            setItems(generateItems(0, 500));
          }, 500);
        }}
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
      >
        {items.map((item) => (
          <DualListBox2Item key={item.id} id={item.id}>
            {item.label}
          </DualListBox2Item>
        ))}
      </DualListBox2>
    );
  },
};

/**
 * #### Bulk loading accordion
 *
 * Bulk loadingモードでは、アコーディオンを開く前にデータが事前に読み込まれます：
 *
 * 1. コンポーネントのマウント時に各アコーディオンのデータ読み込みが開始されます
 * 2. 読み込み中は各アコーディオンにローディング状態が表示されます
 * 3. データの読み込みが完了すると、アコーディオンをクリックするだけで即座にコンテンツが表示されます
 *
 * このモードは、以下のような場合に適しています：
 * - データの総量が既知で管理可能な場合
 * - ユーザーの待ち時間を最小限にしたい場合
 * - ネットワークの往復を減らしたい場合
 */
export const BulkLoadingAccordion: StoryObj<typeof DualListBox2> = {
  render: function BulkLoadingAccordionStory() {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<string[]>([]);
    const [pageSize] = useState(50);
    const [loadingGroups, setLoadingGroups] = useState<string[]>([]);

    // アコーディオンのグループ定義
    const groups = useMemo(
      () => [
        { id: "group1", name: "プロジェクト" },
        { id: "group2", name: "組織" },
        { id: "group3", name: "ユーザー" },
      ],
      [],
    );

    const loadGroupData = useCallback(
      (groupName: string) => {
        if (
          loadedGroups.includes(groupName) ||
          loadingGroups.includes(groupName)
        )
          return;

        setLoadingGroups((prev) => [...prev, groupName]);
        setIsLoading(true);

        // グループごとに異なるデータ件数を設定
        const itemCounts = {
          group1: 150,
          group2: 100,
          group3: 200,
        };

        // 各グループの開始インデックスを設定して、IDが重複しないようにする
        const startIndices = {
          group1: 0,
          group2: 1000,
          group3: 2000,
        };

        // グループのIDから表示名を取得
        const groupDisplayName =
          groups.find((g) => g.id === groupName)?.name || groupName;

        setTimeout(() => {
          const count = itemCounts[groupName as keyof typeof itemCounts] || 100;
          const startIndex =
            startIndices[groupName as keyof typeof startIndices] || 0;
          const newItems = generateItems(startIndex, count).map((item) => ({
            ...item,
            groupName: groupDisplayName, // 内部IDではなく表示名を設定
            label: `${groupDisplayName}${
              parseInt(item.id.split("-")[1]) - startIndex + 1
            }`,
          }));

          setItems((prev) => [...prev, ...newItems]);
          setLoadedGroups((prev) => [...prev, groupName]);
          setLoadingGroups((prev) => prev.filter((g) => g !== groupName));

          if (loadingGroups.length <= 1) {
            setIsLoading(false);
          }
        }, 1500);
      },
      [loadedGroups, loadingGroups, groups],
    );

    // コンポーネントマウント時に全グループのデータを読み込み開始
    useEffect(() => {
      groups.forEach((group) => loadGroupData(group.id));
    }, [loadGroupData, groups]);

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        loadingMode="bulk-loading"
        onIncludedChange={(ids: string[]) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids: string[]) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
            loadingMode="bulk-loading"
            disableInclude={!loadedGroups.includes(group.id)}
            disableExclude={!loadedGroups.includes(group.id)}
          >
            {items
              .filter((item) => item.groupName === group.name) // グループの表示名で比較
              .map((item) => (
                <DualListBox2Item key={item.id} id={item.id}>
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
 * #### Infinite loading accordion
 *
 * このモードでは、アコーディオンをクリックしたときにデータの読み込みが開始されます。
 * スクロールに応じて、ページサイズ単位で追加データを読み込みます。
 *
 * 特徴:
 * - ユーザーが操作したアコーディオンのデータのみを読み込みます
 * - 必要に応じて段階的にデータを読み込むため、初期表示が速くなります
 * - 各アコーディオンのデータ読み込みは独立して行われます
 * - 検索実行時には自動的に全データが読み込まれるため、全件検索が可能です
 * - 検索はEnterキーで実行されます
 * - データが読み込まれた後はアコーディオンを開かなくても検索結果が表示されます
 */
export const InfiniteLoadingAccordion: StoryObj<typeof DualListBox2> = {
  render: function InfiniteLoadingAccordionStory() {
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const dataLoading = useDataLoading({
      initialPageSize: 50,
      maxItemsPerGroup: 250,
    });

    const accordionGroups = useAccordionGroups(dataLoading);
    const { groups, handleAccordionOpen, handleLoadMore, handleSearch } =
      accordionGroups;

    const { items, filteredItems, isLoading, pageSize, handlePageSizeChange } =
      dataLoading;

    // ページサイズ変更時にグループデータをリセット
    const handlePageSizeChangeWithReset = useCallback(
      (newPageSize: number) => {
        handlePageSizeChange(newPageSize);
        accordionGroups.setLoadedGroups([]);
      },
      [handlePageSizeChange, accordionGroups],
    );

    return (
      <DualListBox2
        loading={isLoading}
        included={included}
        excluded={excluded}
        pageSize={pageSize}
        pageSizeOptions={[10, 50, 100, 200]}
        loadingMode="infinite-loading"
        renderFilteredCount={(filteredCount) => (
          <FilteredCountDisplay
            filteredCount={filteredCount}
            totalCount={filteredItems.length}
          />
        )}
        onPageSizeChange={handlePageSizeChangeWithReset}
        onIncludedChange={(ids) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={handleLoadMore}
        // @ts-expect-error onSearchプロパティはDualListBox2Propsに存在しないが、必要な機能
        onSearch={handleSearch}
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
            loadingMode="infinite-loading"
            onOpen={() => handleAccordionOpen(group.id)}
          >
            {filteredItems
              .filter((item) => item.groupName === group.name)
              .map((item) => (
                <DualListBox2Item key={item.id} id={item.id}>
                  {item.label}
                </DualListBox2Item>
              ))}
          </DualListBox2Accordion>
        ))}
      </DualListBox2>
    );
  },
};
