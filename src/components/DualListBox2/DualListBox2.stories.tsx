import React, { useState, useCallback, useEffect } from "react";
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

const meta = {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
  argTypes: {},
} satisfies Meta<typeof DualListBox2>;

export default meta;

const generateItems = (start: number, count: number, groupName?: string) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${start + i}`,
    label: `アイテム ${start + i + 1}`,
    ...(groupName ? { groupName } : {}),
  }));
};

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
    const [loadingMode, setLoadingMode] = useState<LoadingMode>('infinite-loading');

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
    ];

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
                setLoadingMode(loadingMode === 'infinite-loading' ? 'bulk-loading' : 'infinite-loading');
              }}
            >
              {`Loading Mode: ${loadingMode}`}
            </ContextMenu2ButtonItem>
            <ContextMenu2SwitchItem disabled onChange={() => { }}>
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
            onOpen={() => handleAccordionOpen(group.id)}
            loadingMode={loadingMode}
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
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
              <ContextMenu2SwitchItem disabled onChange={() => { }}>
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
                ...generateItems(prev.length + 1, 10, "アコーディオン2"),
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
 * #### 選択候補がセクションで分かれているタイプ
 *
 * 件数の上限が不明で都度サーバへ問い合わせる必要がある場合に利用します。
 * 検索は各セクションに移動後に使えます。
 *
 * 任意のセクション選択中は、その他のセクションは非表示となります。
 */
export const Section: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([
      {
        id: "unique-1",
        groupName: "セクション1",
        label: "リストアイテム1",
      },
      {
        id: "unique-2",
        groupName: "セクション1",
        label: "リストアイテム2",
      },
      {
        id: "unique-3",
        groupName: "セクション2",
        label: "リストアイテム3",
      },
      {
        id: "unique-4",
        groupName: "セクション2",
        label:
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ]);

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
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
        menuButtons={
          <>
            <ContextMenu2ButtonItem
              onClick={() => {
                alert("clicked");
              }}
            >
              好きなボタンを
            </ContextMenu2ButtonItem>
            <ContextMenu2SwitchItem disabled onChange={() => { }}>
              入れて使う
            </ContextMenu2SwitchItem>
          </>
        }
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setItems([
            // 初期アイテムを保持
            ...items.slice(0, 4),
            // 新しいページサイズに基づいて追加アイテムを生成
            ...generateItems(4, newPageSize - 4),
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
              ...generateItems(prev.length, pageSize),
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

    const handleLoadMore = useCallback(() => {
      // すでに500件に達していたら何もしない
      if (items.length >= 500) return;

      setIsLoading(true);
      setTimeout(() => {
        // 残りの件数を計算（上限は500件）
        const remainingItems = 500 - items.length;
        const itemsToLoad = Math.min(remainingItems, pageSize);

        if (itemsToLoad > 0) {
          setItems((prev) => [...prev, ...generateItems(prev.length, itemsToLoad)]);
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
        renderFilteredCount={(filteredCount, totalCount) => (
          <div style={{ fontSize: '13px', lineHeight: '16px', display: 'flex', color: '#13284B' }}>
            {filteredCount !== totalCount
              ? `${filteredCount} / ${totalCount}件`
              : `${totalCount}件`}
          </div>
        )}
      >
        {items.map((item) => (
          <DualListBox2Item
            key={item.id}
            id={item.id}
          >
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
        setItems(generateItems(0, pageSize));
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
        renderFilteredCount={(filteredCount, totalCount) => (
          <div style={{ fontSize: '13px', lineHeight: '16px', display: 'flex', color: '#13284B' }}>
            {filteredCount !== totalCount
              ? `${filteredCount} / ${totalCount}件`
              : `${totalCount}件`}
          </div>
        )}
      >
        {items.map((item) => (
          <DualListBox2Item
            key={item.id}
            id={item.id}
          >
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
    const groups = [
      { id: "group1", name: "プロジェクト" },
      { id: "group2", name: "組織" },
      { id: "group3", name: "ユーザー" },
    ];

    const loadGroupData = useCallback((groupName: string) => {
      if (loadedGroups.includes(groupName) || loadingGroups.includes(groupName)) return;

      setLoadingGroups(prev => [...prev, groupName]);
      setIsLoading(true);

      // グループごとに異なるデータ件数を設定
      const itemCounts = {
        "group1": 150,
        "group2": 100,
        "group3": 200,
      };

      // 各グループの開始インデックスを設定して、IDが重複しないようにする
      const startIndices = {
        "group1": 0,
        "group2": 1000,
        "group3": 2000,
      };

      setTimeout(() => {
        const count = itemCounts[groupName as keyof typeof itemCounts] || 100;
        const startIndex = startIndices[groupName as keyof typeof startIndices] || 0;
        const newItems = generateItems(startIndex, count).map((item) => ({
          ...item,
          groupName,
          label: `${groups.find(g => g.id === groupName)?.name}${parseInt(item.id.split('-')[1]) - startIndex + 1}`,
        }));

        setItems((prev) => [...prev, ...newItems]);
        setLoadedGroups((prev) => [...prev, groupName]);
        setLoadingGroups(prev => prev.filter(g => g !== groupName));

        if (loadingGroups.length <= 1) {
          setIsLoading(false);
        }
      }, 1500);
    }, [loadedGroups, loadingGroups, groups]);

    // コンポーネントマウント時に全グループのデータを読み込み開始
    useEffect(() => {
      groups.forEach(group => loadGroupData(group.id));
    }, [loadGroupData]);

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
 * #### Infinite loading accordion
 * 
 * このモードでは、アコーディオンをクリックしたときにデータの読み込みが開始されます。
 * スクロールに応じて、ページサイズ単位で追加データを読み込みます。
 * 
 * 特徴:
 * - ユーザーが操作したアコーディオンのデータのみを読み込みます
 * - 必要に応じて段階的にデータを読み込むため、初期表示が速くなります
 * - 各アコーディオンのデータ読み込みは独立して行われます
 */
export const InfiniteLoadingAccordion: StoryObj<typeof DualListBox2> = {
  render: function InfiniteLoadingAccordionStory() {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(50);
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
    ];

    const handleAccordionOpen = useCallback(
      (groupId: string) => {
        if (loadedGroups.includes(groupId) || loadingGroup) return;

        setLoadingGroup(groupId);
        setIsLoading(true);

        // グループを読み込む（初期表示件数はpageSize）
        setTimeout(() => {
          const newItems = generateItems(items.length, pageSize).map((item) => ({
            ...item,
            groupName: groupId,
          }));

          setItems((prev) => [...prev, ...newItems]);
          setLoadedGroups((prev) => [...prev, groupId]);
          setIsLoading(false);
          setLoadingGroup(null);
        }, 1000);
      },
      [loadedGroups, pageSize, loadingGroup, items.length],
    );

    const handleLoadMore = useCallback(() => {
      // すでにロード中の場合は何もしない
      if (isLoading || loadingGroup) return;

      // 開いているグループを取得
      const openGroups = loadedGroups;
      if (openGroups.length === 0) return;

      // 最後に開いたグループにデータを追加
      const lastGroup = openGroups[openGroups.length - 1];

      // グループごとのアイテム数をカウント
      const groupItemCount = items.filter(item => item.groupName === lastGroup).length;

      // グループごとの上限は250件
      if (groupItemCount >= 250) return;

      setIsLoading(true);
      setTimeout(() => {
        // 残りの件数を計算（グループごとの上限は250件）
        const remainingItems = 250 - groupItemCount;
        const itemsToLoad = Math.min(remainingItems, pageSize);

        if (itemsToLoad > 0) {
          setItems((prev) => [
            ...prev,
            ...generateItems(prev.length, itemsToLoad).map((item) => ({
              ...item,
              groupName: lastGroup,
            })),
          ]);
        }
        setIsLoading(false);
      }, 1000);
    }, [isLoading, loadedGroups, pageSize, loadingGroup, items]);

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
          // リセット
          setItems([]);
          setLoadedGroups([]);
        }}
        onIncludedChange={(ids) =>
          setIncluded(items.filter((item) => ids.includes(item.id)))
        }
        onExcludedChange={(ids) =>
          setExcluded(items.filter((item) => ids.includes(item.id)))
        }
        onLoadMore={handleLoadMore}
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
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
