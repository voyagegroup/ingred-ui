import React, { useState, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
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

const meta = {
  title: "Components/Data Display/DualListBox2",
  component: DualListBox2,
  argTypes: {},
} satisfies Meta<typeof DualListBox2>;

export default meta;

const generateItems = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${start + i}`,
    label: `アイテム ${start + i + 1}`,
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
export const Default: StoryObj<typeof meta> = {
  args: {
    included: [],
    excluded: [],
    disableInclude: false,
    disableExclude: false,
    loading: false,
    children: null,
    pageSize: 50,
    pageSizeOptions: [10, 50, 100, 200],
  },
  render: (args) => {
    const [{ included, excluded, loading, pageSize }, updateArgs] = useArgs<{
      included: Item[];
      excluded: Item[];
      loading: boolean;
      pageSize: number;
    }>();
    const [items, setItems] = useState(() => generateItems(0, pageSize));

    const handleLoadMore = useCallback(() => {
      updateArgs({ loading: true });
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...generateItems(prev.length, pageSize),
        ]);
        updateArgs({ loading: false });
      }, 1000);
    }, [updateArgs, pageSize]);

    return (
      <>
        <DualListBox2
          {...args}
          included={included}
          excluded={excluded}
          loading={loading}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            updateArgs({ pageSize: newPageSize });
            setItems(generateItems(0, newPageSize));
          }}
          onIncludedChange={(ids: string[]) =>
            updateArgs({
              included: items.filter((item) => ids.includes(item.id)),
            })
          }
          onExcludedChange={(ids: string[]) =>
            updateArgs({
              excluded: items.filter((item) => ids.includes(item.id)),
            })
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
      </>
    );
  },
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

    // アコーディオンのグループ定義
    const groups = [
      { id: "group1", name: "アコーディオン1" },
      { id: "group2", name: "アコーディオン2" },
    ];

    const handleAccordionOpen = useCallback((groupName: string) => {
      if (loadedGroups.has(groupName)) return;
      
      setIsLoading(true);
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...generateItems(prev.length, 10).map(item => ({
            ...item,
            groupName,
          })),
        ]);
        setLoadedGroups(prev => new Set([...prev, groupName]));
        setIsLoading(false);
      }, 1000);
    }, [loadedGroups]);

    return (
      <DualListBox2
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
              ...generateItems(prev.length, 10),
            ]);
            setIsLoading(false);
          }, 1000);
        }}
      >
        {groups.map((group) => (
          <DualListBox2Accordion
            key={group.id}
            label={group.name}
            onOpen={() => handleAccordionOpen(group.name)}
            disableInclude={!loadedGroups.has(group.name)}
            disableExclude={!loadedGroups.has(group.name)}
          >
            {items
              .filter(item => item.groupName === group.name)
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
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
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
    ]);

    const [included, setIncluded] = useState<Item[]>([items[0]]);
    const [excluded, setExcluded] = useState<Item[]>([items[3]]);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
      <DualListBox2
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
        onActiveSectionChange={(section) => setCurrentSection(section)}
        onLoadMore={() => {
          if (currentSection === null) return;
          setIsLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...generateItems(prev.length + 1, 10, currentSection),
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
