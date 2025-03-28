import React, { useState, useCallback, useEffect } from "react";
import { Meta, StoryObj, ComponentStory } from "@storybook/react";
import {
  type Item,
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
import * as styled from "./styled";

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
  render: () => {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<Set<string>>(new Set());
    const [pageSize, setPageSize] = useState(50);
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
    const [loadingMode, setLoadingMode] = useState<'infinite' | 'all'>('infinite');

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
    ];

    const handleAccordionOpen = useCallback(
      (groupName: string) => {
        if (loadedGroups.has(groupName) || loadingGroup) return;

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
          setLoadedGroups((prev) => {
            const newSet = new Set(prev);
            newSet.add(groupName);
            return newSet;
          });
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
      if (loadedGroups.has("group2")) {
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
                setLoadingMode(loadingMode === 'infinite' ? 'all' : 'infinite');
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
          setLoadedGroups(new Set());
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
            disableInclude={!loadedGroups.has(group.name)}
            disableExclude={!loadedGroups.has(group.name)}
            onOpen={() => handleAccordionOpen(group.name)}
            loadingMode={loadingMode}
          >
            {items
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
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
 * #### 読み込みモード
 * 
 * DualListBox2 コンポーネントには2つの読み込みモードがあります：
 * 
 * - **infinite**: デフォルトのモードで、スクロールに応じてページサイズ単位で追加データを読み込みます。
 * - **all**: ページサイズを無視して一度にすべてのデータ（上限500件まで）を読み込みます。
 * 
 * 以下のサンプルでそれぞれのモードの違いを確認できます。
 */
export const LoadingModes: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [pageSize, setPageSize] = useState(50);
    const [loadingMode, setLoadingMode] = useState<'infinite' | 'all'>('infinite');

    // 初期データ読み込み
    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setItems(generateItems(0, pageSize));
        setIsLoading(false);
      }, 500);
    }, [pageSize]);

    const handleLoadMore = useCallback(() => {
      console.log('LoadingModes: loadMore called, mode:', loadingMode); // デバッグ用
      if (loadingMode === 'infinite') {
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
      }
    }, [loadingMode, pageSize, items.length]);

    const handleLoadAll = useCallback(() => {
      if (loadingMode === 'all' && !isLoadingAll) {
        setIsLoadingAll(true);
        setTimeout(() => {
          // 一度に全部（最大500件まで）読み込む
          const remainingItems = 500 - items.length;
          if (remainingItems > 0) {
            setItems((prev) => [...prev, ...generateItems(prev.length, remainingItems)]);
          }
          setIsLoadingAll(false);
        }, 2000);
      }
    }, [loadingMode, isLoadingAll, items.length]);

    useEffect(() => {
      if (loadingMode === 'all') {
        handleLoadAll();
      }
    }, [loadingMode, handleLoadAll]);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <Checkbox
            checked={loadingMode === 'infinite'}
            onChange={() => setLoadingMode('infinite')}
          >
            Infinite モード
          </Checkbox>
          <Checkbox
            checked={loadingMode === 'all'}
            onChange={() => setLoadingMode('all')}
          >
            All モード
          </Checkbox>
        </div>

        <DualListBox2
          loading={isLoading}
          isLoadingAll={isLoadingAll}
          included={included}
          excluded={excluded}
          pageSize={pageSize}
          pageSizeOptions={[10, 50, 100, 200]}
          loadingMode={loadingMode}
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
      </>
    );
  },
};

/**
 * #### アコーディオンとLoadingMode
 * 
 * アコーディオンの場合でも、infiniteモードとallモードを使用できます。
 * - infinite: ページサイズ単位で追加データを読み込みます
 * - all: ページサイズを無視して一度に全データ（グループごとに最大250件まで）を読み込みます
 * 
 * 各アコーディオンのデータ読み込みは独立して行われます。
 */
export const AccordionWithLoadingModes: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<Set<string>>(new Set());
    const [pageSize, setPageSize] = useState(50);
    const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
    const [loadingMode, setLoadingMode] = useState<'infinite' | 'all'>('infinite');

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
    ];

    const handleAccordionOpen = useCallback(
      (groupName: string) => {
        if (loadedGroups.has(groupName) || loadingGroup) return;

        setLoadingGroup(groupName);
        setIsLoading(true);

        // グループを読み込む（初期表示件数はpageSize）
        setTimeout(() => {
          const newItems = generateItems(items.length, pageSize).map((item) => ({
            ...item,
            groupName,
          }));

          setItems((prev) => [...prev, ...newItems]);

          setLoadedGroups((prev) => {
            const newSet = new Set(prev);
            newSet.add(groupName);
            return newSet;
          });

          setIsLoading(false);
          setLoadingGroup(null);

          // Allモードの場合、ページサイズを無視して残りのデータを一括で読み込む（合計250件まで）
          if (loadingMode === 'all') {
            setIsLoadingAll(true);
            setTimeout(() => {
              // ページサイズを無視して残りのデータを計算（合計250件まで）
              const remainingItems = 250 - newItems.length;

              if (remainingItems > 0) {
                const moreItems = generateItems(items.length + newItems.length, remainingItems).map((item) => ({
                  ...item,
                  groupName,
                }));
                setItems((prev) => [...prev, ...moreItems]);
              }
              setIsLoadingAll(false);
            }, 1500);
          }
        }, 1000);
      },
      [loadedGroups, pageSize, loadingGroup, items.length, loadingMode],
    );

    const handleLoadMore = useCallback(() => {
      console.log('AccordionWithLoadingModes: loadMore called, mode:', loadingMode); // デバッグ用
      // すでにロード中の場合は何もしない
      if (isLoading || loadingGroup || isLoadingAll) return;

      // 開いているグループを取得
      const openGroups = Array.from(loadedGroups);
      if (openGroups.length === 0) return;

      // 最後に開いたグループにデータを追加
      const lastGroup = openGroups[openGroups.length - 1];

      // グループごとのアイテム数をカウント
      const groupItemCount = items.filter(item => item.groupName === lastGroup).length;

      // グループごとの上限は250件（2グループで合計500件）
      if (groupItemCount >= 250) return;

      if (loadingMode === 'infinite') {
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
      }
    }, [isLoading, loadedGroups, pageSize, loadingGroup, isLoadingAll, loadingMode, items]);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <Checkbox
            checked={loadingMode === 'infinite'}
            onChange={() => setLoadingMode('infinite')}
          >
            Infinite モード
          </Checkbox>
          <Checkbox
            checked={loadingMode === 'all'}
            onChange={() => setLoadingMode('all')}
          >
            All モード
          </Checkbox>
        </div>

        <DualListBox2
          loading={isLoading}
          isLoadingAll={isLoadingAll}
          included={included}
          excluded={excluded}
          pageSize={pageSize}
          pageSizeOptions={[10, 50, 100, 200]}
          loadingMode={loadingMode}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            // リセット
            setItems([]);
            setLoadedGroups(new Set());
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
              onOpen={() => handleAccordionOpen(group.name)}
            >
              {items
                .filter((item) => item.groupName === group.name)
                .map((item) => (
                  <DualListBox2Item key={item.id} id={item.id}>
                    {item.label}
                  </DualListBox2Item>
                ))}
            </DualListBox2Accordion>
          ))}
        </DualListBox2>
      </>
    );
  },
};

/**
 * #### セクションとLoadingMode
 * 
 * セクションの場合でも、infiniteモードとallモードを使用できます。
 * - infinite: ページサイズ単位で追加データを読み込みます
 * - all: ページサイズを無視して一度に全データ（セクションごとに最大250件まで）を読み込みます
 * 
 * 各セクションのデータ読み込みはセクションが選択されたときに行われます。
 */
export const SectionWithLoadingModes: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([
      { id: "section1-1", groupName: "セクション1", label: "リストアイテム1-1" },
      { id: "section1-2", groupName: "セクション1", label: "リストアイテム1-2" },
      { id: "section2-1", groupName: "セクション2", label: "リストアイテム2-1" },
      { id: "section2-2", groupName: "セクション2", label: "リストアイテム2-2" },
    ]);

    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [pageSize, setPageSize] = useState(50);
    const [loadingMode, setLoadingMode] = useState<'infinite' | 'all'>('infinite');
    const [loadedSections, setLoadedSections] = useState<Record<string, number>>({
      "セクション1": 2,
      "セクション2": 2,
    });

    useEffect(() => {
      if (currentSection && loadingMode === 'all' && !isLoadingAll) {
        setIsLoadingAll(true);
        setTimeout(() => {
          const currentCount = loadedSections[currentSection] || 0;

          // セクションごとの上限は250件（ページサイズを無視して一括読み込み）
          if (currentCount < 250) {
            // ページサイズを無視して残りの件数を計算
            const remainingItems = 250 - currentCount;

            if (remainingItems > 0) {
              const newItems = generateItems(currentCount, remainingItems).map(item => ({
                ...item,
                id: `${currentSection}-${currentCount + item.id.split('-')[1]}`,
                groupName: currentSection,
                label: `${currentSection}のアイテム ${parseInt(item.id.split('-')[1]) + currentCount}`
              }));

              setItems(prev => [...prev, ...newItems]);
              setLoadedSections(prev => ({
                ...prev,
                [currentSection]: currentCount + remainingItems
              }));
            }
          }
          setIsLoadingAll(false);
        }, 2000);
      }
    }, [currentSection, loadingMode, isLoadingAll, loadedSections]);

    const handleLoadMore = useCallback(() => {
      console.log('SectionWithLoadingModes: loadMore called, mode:', loadingMode, 'section:', currentSection); // デバッグ用
      if (!currentSection || isLoading || isLoadingAll) return;

      // セクションごとのアイテム数をカウント
      const currentCount = loadedSections[currentSection] || 0;

      // セクションごとの上限は250件（2セクションで合計500件）
      if (currentCount >= 250) return;

      if (loadingMode === 'infinite') {
        setIsLoading(true);
        setTimeout(() => {
          // 残りの件数を計算（セクションごとの上限は250件）
          const remainingItems = 250 - currentCount;
          const itemsToLoad = Math.min(remainingItems, pageSize);

          if (itemsToLoad > 0) {
            const newItems = generateItems(currentCount, itemsToLoad).map(item => ({
              ...item,
              id: `${currentSection}-${currentCount + item.id.split('-')[1]}`,
              groupName: currentSection,
              label: `${currentSection}のアイテム ${parseInt(item.id.split('-')[1]) + currentCount}`
            }));

            setItems(prev => [...prev, ...newItems]);
            setLoadedSections(prev => ({
              ...prev,
              [currentSection]: currentCount + itemsToLoad
            }));
          }
          setIsLoading(false);
        }, 1000);
      }
    }, [currentSection, isLoading, isLoadingAll, loadingMode, pageSize, loadedSections]);

    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <Checkbox
            checked={loadingMode === 'infinite'}
            onChange={() => setLoadingMode('infinite')}
          >
            Infinite モード
          </Checkbox>
          <Checkbox
            checked={loadingMode === 'all'}
            onChange={() => setLoadingMode('all')}
          >
            All モード
          </Checkbox>
        </div>

        <DualListBox2
          loading={isLoading}
          isLoadingAll={isLoadingAll}
          included={included}
          excluded={excluded}
          pageSize={pageSize}
          pageSizeOptions={[10, 50, 100, 200]}
          loadingMode={loadingMode}
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
          onLoadMore={handleLoadMore}
          renderFilteredCount={(filteredCount, totalCount) => (
            <div style={{ fontSize: '13px', lineHeight: '16px', display: 'flex', color: '#13284B' }}>
              {filteredCount !== totalCount
                ? `${filteredCount} / ${totalCount}件`
                : `${totalCount}件`}
            </div>
          )}
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
      </>
    );
  },
};

/**
 * #### 事前読み込みモード（allモード）のサンプル
 * 
 * allモードでは、アコーディオンを開く前にデータが事前に読み込まれます：
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
export const PreloadedAccordion: StoryObj<typeof DualListBox2> = {
  render: () => {
    const [items, setItems] = useState<Item[]>([]);
    const [included, setIncluded] = useState<Item[]>([]);
    const [excluded, setExcluded] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedGroups, setLoadedGroups] = useState<Set<string>>(new Set());
    const [pageSize] = useState(50);
    const [loadingGroups, setLoadingGroups] = useState<Set<string>>(new Set());

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "プロジェクト" },
      { id: "group2", name: "組織" },
      { id: "group3", name: "ユーザー" },
    ];

    const loadGroupData = useCallback((groupName: string) => {
      if (loadedGroups.has(groupName) || loadingGroups.has(groupName)) return;

      setLoadingGroups(prev => new Set([...prev, groupName]));
      setIsLoading(true);

      // グループごとに異なるデータ件数を設定
      const itemCounts = {
        "group1": 150,
        "group2": 100,
        "group3": 200,
      };

      setTimeout(() => {
        const count = itemCounts[groupName as keyof typeof itemCounts] || 100;
        const newItems = generateItems(0, count).map((item) => ({
          ...item,
          groupName,
          label: `${groups.find(g => g.id === groupName)?.name}${parseInt(item.id.split('-')[1]) + 1}`,
        }));

        setItems((prev) => [...prev, ...newItems]);
        setLoadedGroups((prev) => new Set([...prev, groupName]));
        setLoadingGroups(prev => {
          const next = new Set(prev);
          next.delete(groupName);
          return next;
        });

        if (loadingGroups.size <= 1) {
          setIsLoading(false);
        }
      }, 1500);
    }, [loadedGroups, loadingGroups]);

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
        loadingMode="all"
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
            loadingMode="all"
            disableInclude={!loadedGroups.has(group.id)}
            disableExclude={!loadedGroups.has(group.id)}
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
