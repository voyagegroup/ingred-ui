import React, {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useContext,
  isValidElement,
  Fragment,
  type ReactNode,
  type ChangeEvent,
  useEffect,
  useRef,
} from "react";
import Button from "../Button";
import Icon from "../Icon";
import Spinner from "../Spinner";
import * as styled from "./styled";
import { colors } from "../../styles";
import { ContextMenu2, ContextMenu2Container } from "../ContextMenu2";
import { type Item } from "./types";
import { DualListBox2Context, traverseChildren, extractAllItems } from "./lib";
import { DualListBox2Item } from "./DualListBox2Item";
import { DualListBox2Section } from "./DualListBox2Section";
import { DualListBox2MenuCountControl } from "./DualListBox2MenuCountControl";

type DualListBox2Props = {
  /**
   * 選択済みの「追加」項目
   **/
  included: Item[];
  /**
   * 選択済みの「除外」項目
   **/
  excluded: Item[];
  /**
   * 追加ボタンを非活性にし、「排他のみモード」にするかどうか
   **/
  disableInclude?: boolean;
  /**
   * 除外ボタンを非活性にし、「排他のみモード」にするかどうか
   **/
  disableExclude?: boolean;
  /**
   * メニューに表示するボタン要素
   **/
  menuButtons?: ReactNode;
  /**
   * ローディング中かどうかのフラグ
   **/
  loading?: boolean;
  /**
   * 項目リスト（DualListBox2Item, DualListBox2Accordion, DualListBox2Section のいずれかのみ）
   **/
  children: ReactNode;
  /**
   * 「追加」状態の変更イベントハンドラ
   **/
  onIncludedChange: (includedIds: string[]) => void;
  /**
   * 「除外」状態の変更イベントハンドラ
   **/
  onExcludedChange: (excludedIds: string[]) => void;
  /**
   * セクション切り替え時のハンドラ
   **/
  onActiveSectionChange?: (activeSection: string | null) => void;
  /**
   * 「さらに読み込む」ボタンが押されたときのハンドラ
   **/
  onLoadMore?: () => void;
  /**
   * 1ページあたりの表示件数
   **/
  pageSize?: number;
  /**
   * 1ページあたりの表示件数の選択肢
   **/
  pageSizeOptions?: number[];
  /**
   * 1ページあたりの表示件数が変更されたときのハンドラ
   **/
  onPageSizeChange?: (pageSize: number) => void;
};

const toGrouped = (items: Item[]) => {
  return items.reduce(
    (
      acc: {
        groupName?: string;
        items: Pick<Item, "id" | "label">[];
      }[],
      item,
    ) => {
      const group = acc.find((group) => group.groupName === item.groupName);
      if (group) {
        group.items.push({ id: item.id, label: item.label });
      } else {
        acc.push({
          groupName: item.groupName,
          items: [{ id: item.id, label: item.label }],
        });
      }
      return acc;
    },
    [],
  );
};

const DualListBox2SelectedItem = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { includedIds, excludedIds, onIncludedChange, onExcludedChange } =
    useContext(DualListBox2Context);
  const isIncluded = useMemo(() => includedIds.includes(id), [includedIds, id]);
  const isExcluded = useMemo(() => excludedIds.includes(id), [excludedIds, id]);
  const cancel = () => {
    if (isIncluded) {
      onIncludedChange(includedIds.filter((i) => i !== id));
    }
    if (isExcluded) {
      onExcludedChange(excludedIds.filter((i) => i !== id));
    }
  };
  const handleCancelButtonClick = cancel;

  return (
    <styled.DualListBox2SelectedItem>
      {children}
      <button
        type="button"
        aria-label="解除"
        onClick={handleCancelButtonClick}
      />
    </styled.DualListBox2SelectedItem>
  );
};

const DualListBox2SelectedLabel = ({ label }: { label: string }) => {
  return (
    <styled.DualListBox2SelectedLabel>{label}</styled.DualListBox2SelectedLabel>
  );
};

export const DualListBox2 = forwardRef<HTMLDivElement, DualListBox2Props>(
  (
    {
      included,
      excluded,
      disableInclude,
      disableExclude,
      menuButtons,
      children,
      loading,
      onIncludedChange,
      onExcludedChange,
      onLoadMore,
      pageSize = 50,
      pageSizeOptions = [10, 50, 100, 200],
      onPageSizeChange,
    },
    ref,
  ) => {
    // モバイルサイズでは、タブで左右パネルの表示を切り替える
    const [tabIndex, setTabIndex] = useState<0 | 1>(0);
    const [filter, setFilter] = useState("");
    // セクションの排他表示監理用。セクションが選択されている場合はそのセクションのみ表示する。
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    // children にセクションが含まれているかどうか
    const hasSection = useMemo(() => {
      let hasSection = false;
      traverseChildren(children, (child) => {
        if (
          isValidElement(child) &&
          typeof child.type !== "string" &&
          "displayName" in child.type &&
          child.type.displayName === DualListBox2Section.displayName
        )
          hasSection = true;
      });
      return hasSection;
    }, [children]);

    // フィルター文字列をスペース区切りで単語の配列に分割
    const filterWords = useMemo(() => {
      const trimmed = filter.trim();
      return trimmed ? trimmed.split(/\s+/) : [];
    }, [filter]);

    const includedIds = useMemo(
      () => included.map((item) => item.id),
      [included],
    );

    const excludedIds = useMemo(
      () => excluded.map((item) => item.id),
      [excluded],
    );

    // DualListBox2 に配置された、全 DualListBox2Item を抽象化したオブジェクトの配列
    const allItems = useMemo(() => extractAllItems(children), [children]);

    // DualListBox2 に配置された、全 DualListBox2Item の id の配列
    const allIds = useMemo(() => allItems.map((item) => item.id), [allItems]);

    // 検索フィルタ適用後の全 id
    const allIdsFiltered = useMemo(() => {
      if (filterWords.length === 0) return allIds;

      return allIds.filter((id) => {
        const item = allItems.find((item) => item.id === id);
        if (!item) return false;
        return filterWords.every((word) => item.label.includes(word));
      });
    }, [allIds, allItems, filterWords]);

    const allIdsInActiveSection = useMemo(() => {
      if (!hasSection) return [];
      if (activeSection === null) return [];
      const ids: string[] = [];
      traverseChildren(children, (child) => {
        if (
          !isValidElement(child) ||
          typeof child.type === "string" ||
          !("displayName" in child.type) ||
          child.type.displayName !== DualListBox2Section.displayName
        ) {
          return;
        }
        // ここまでの結果、child はセクション
        if (child.props.label !== activeSection) return;

        traverseChildren(child.props.children, (grandChild) => {
          if (
            isValidElement(grandChild) &&
            typeof grandChild.type !== "string" &&
            "displayName" in grandChild.type &&
            grandChild.type.displayName === DualListBox2Item.displayName
          ) {
            ids.push(grandChild.props.id);
          }
        });
      });
      return ids;
    }, [activeSection, children, hasSection]);

    // 検索フィルタ適用後の、選択中のセクションのみに含まれる全 id
    const allIdsInActiveSectionFiltered = useMemo(() => {
      if (filterWords.length === 0) return allIdsInActiveSection;

      return allIdsInActiveSection.filter((id) => {
        const item = allItems.find((item) => item.id === id);
        if (!item) return false;
        return filterWords.every((word) => item.label.includes(word));
      });
    }, [allIdsInActiveSection, allItems, filterWords]);

    // 「すべて追加」ボタンを非活性にするかどうか
    // セクション型の DualListBox の場合、セクション選択中のみ「すべて〜」ボタンは有効。
    // それ以外は、追加選択できる項目があれば有効（すべて選択済みの場合、無効）
    const disableIncludeAllButton = useMemo(() => {
      if (hasSection) {
        if (activeSection === null) return true;
        const isAllInActiveSectionIncludedFiltered =
          allIdsInActiveSectionFiltered.every((id) => includedIds.includes(id));
        if (isAllInActiveSectionIncludedFiltered) return true;
        return false;
      }
      const isAllIncludedFiltered = allIdsFiltered.every((id) =>
        includedIds.includes(id),
      );
      if (isAllIncludedFiltered) return true;

      return false;
    }, [
      hasSection,
      activeSection,
      allIdsFiltered,
      allIdsInActiveSectionFiltered,
      includedIds,
    ]);

    // 「すべて除外」ボタンを非活性にするかどうか
    // 「すべて追加」ボタン非活性化の判定の逆。
    const disableExcludeAllButton = useMemo(() => {
      if (hasSection) {
        if (activeSection === null) return true;
        const isAllInActiveSectionExcludedFiltered =
          allIdsInActiveSectionFiltered.every((id) => excludedIds.includes(id));
        if (isAllInActiveSectionExcludedFiltered) return true;
        return false;
      }
      const isAllExcludedFiltered = allIdsFiltered.every((id) =>
        excludedIds.includes(id),
      );
      if (isAllExcludedFiltered) return true;

      return false;
    }, [
      hasSection,
      activeSection,
      allIdsFiltered,
      allIdsInActiveSectionFiltered,
      excludedIds,
    ]);

    // 検索フィルターのテキスト入力変更に state に反映
    const handleFilterChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target?.value);
      },
      [setFilter],
    );

    // 選択をクリアする
    const handleClearButtonClick = useCallback(() => {
      included.length && onIncludedChange([]);
      excluded.length && onExcludedChange([]);
    }, [included, excluded, onIncludedChange, onExcludedChange]);

    // 「すべて追加」ボタンが押されたときの処理
    // 検索フィルタで絞り込まれた項目のみが選択の対象になる
    // さらに、セクションの場合は、選択しているセクション内の項目のみが対象になる
    const handleIncludeAllButtonClick = useCallback(() => {
      if (hasSection) {
        // セクションの場合は特別
        if (activeSection === null) return;
        onIncludedChange(
          Array.from(
            new Set([...includedIds, ...allIdsInActiveSectionFiltered]),
          ),
        );
        onExcludedChange(
          excludedIds.filter(
            (id) => !allIdsInActiveSectionFiltered.includes(id),
          ),
        );
        return;
      }
      onIncludedChange(
        Array.from(new Set([...includedIds, ...allIdsFiltered])),
      );
      onExcludedChange(
        excludedIds.filter((id) => !allIdsFiltered.includes(id)),
      );
    }, [
      allIdsFiltered,
      onIncludedChange,
      onExcludedChange,
      hasSection,
      activeSection,
      includedIds,
      excludedIds,
      allIdsInActiveSectionFiltered,
    ]);

    // 「すべて除外」ボタンが押されたときの処理
    // 検索フィルタで絞り込まれた項目のみが選択の対象になる
    // さらに、セクションの場合は、選択しているセクション内の項目のみが対象になる
    const handleExcludeAllButtonClick = useCallback(() => {
      if (hasSection) {
        // セクションの場合は特別
        if (activeSection === null) return;
        onExcludedChange(
          Array.from(
            new Set([...excludedIds, ...allIdsInActiveSectionFiltered]),
          ),
        );
        onIncludedChange(
          includedIds.filter(
            (id) => !allIdsInActiveSectionFiltered.includes(id),
          ),
        );
        return;
      }
      onExcludedChange(
        Array.from(new Set([...excludedIds, ...allIdsFiltered])),
      );
      onIncludedChange(
        includedIds.filter((id) => !allIdsFiltered.includes(id)),
      );
    }, [
      allIdsFiltered,
      onIncludedChange,
      onExcludedChange,
      hasSection,
      activeSection,
      includedIds,
      excludedIds,
      allIdsInActiveSectionFiltered,
    ]);

    const handleIntersection = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !loading && onLoadMore) {
          setIsLoadingMore(true);
          onLoadMore();
        }
      },
      [isLoadingMore, loading, onLoadMore],
    );

    useEffect(() => {
      // テスト環境ではIntersectionObserverが利用できないため、処理をスキップ
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      });

      const currentLoadMoreRef = loadMoreRef.current;

      if (currentLoadMoreRef) {
        observer.observe(currentLoadMoreRef);
      }

      return () => {
        if (currentLoadMoreRef) {
          observer.unobserve(currentLoadMoreRef);
        }
      };
    }, [handleIntersection]);

    return (
      <styled.DualListBox2 ref={ref}>
        <styled.TabList>
          <li>
            <button
              type="button"
              aria-expanded={tabIndex === 0}
              onClick={() => setTabIndex(0)}
            >
              リストアイテム
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={tabIndex === 1}
              onClick={() => setTabIndex(1)}
            >
              選択済みアイテム
              <styled.CountBadge>
                {includedIds.length + excludedIds.length}
              </styled.CountBadge>
            </button>
          </li>
        </styled.TabList>
        <styled.Inner>
          <DualListBox2Context.Provider
            value={{
              filterWords,
              includedIds,
              excludedIds,
              activeSection,
              onIncludedChange,
              onExcludedChange,
              setActiveSection,
            }}
          >
            <styled.LeftPanel isShow={tabIndex === 0}>
              <styled.LeftPanelHeader>
                <styled.HeaderSearch>
                  <Icon name="search" size="sm" color={colors.basic[600]} />
                  <input
                    placeholder="検索"
                    disabled={hasSection && activeSection === null}
                    aria-label="検索"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </styled.HeaderSearch>
                <ContextMenu2Container>
                  <ContextMenu2
                    trigger={
                      <styled.HeaderMenuButton type="button">
                        <Icon name="more_vert" color={colors.basic[900]} />
                      </styled.HeaderMenuButton>
                    }
                  >
                    {onPageSizeChange && (
                      <DualListBox2MenuCountControl
                        pageSize={pageSize}
                        pageSizeOptions={pageSizeOptions}
                        onPageSizeChange={onPageSizeChange}
                      />
                    )}
                    {menuButtons}
                  </ContextMenu2>
                </ContextMenu2Container>
                <styled.HeaderCount>
                  {loading ? (
                    <Spinner width="16px" />
                  ) : (
                    <>
                      {(() => {
                        if (hasSection && activeSection === null) {
                          return "-";
                        }
                        if (hasSection) {
                          return allIdsInActiveSection.length.toLocaleString(
                            "en-US",
                          );
                        }
                        return allIds.length.toLocaleString("en-US");
                      })()}
                      件
                    </>
                  )}
                </styled.HeaderCount>
                <styled.HeaderButtons>
                  {!disableInclude && (
                    <li>
                      <button
                        type="button"
                        disabled={disableIncludeAllButton}
                        onClick={handleIncludeAllButtonClick}
                      >
                        <Icon
                          name="check_thin"
                          color={
                            disableIncludeAllButton
                              ? colors.basic[400]
                              : colors.blue[500]
                          }
                        />
                        全て追加
                      </button>
                    </li>
                  )}
                  {!disableExclude && (
                    <li>
                      <button
                        type="button"
                        disabled={disableExcludeAllButton}
                        onClick={handleExcludeAllButtonClick}
                      >
                        <Icon
                          name="forbid"
                          color={
                            disableExcludeAllButton
                              ? colors.basic[400]
                              : colors.red[500]
                          }
                        />
                        全て除外
                      </button>
                    </li>
                  )}
                </styled.HeaderButtons>
              </styled.LeftPanelHeader>
              <styled.LeftPanelBody>
                {children}
                <div ref={loadMoreRef} style={{ height: "20px" }}>
                  {loading && (
                    <styled.LoadingIndicator>
                      読み込み中...
                    </styled.LoadingIndicator>
                  )}
                </div>
              </styled.LeftPanelBody>
            </styled.LeftPanel>
            <styled.RightPanel isShow={tabIndex === 1}>
              <styled.RightPanelHeader>
                <styled.SelectedCounts>
                  {included.length !== 0 && (
                    <styled.SelectedCountIncluded>
                      <Icon name="check_thin" color={colors.blue[500]} />
                      {included.length}
                    </styled.SelectedCountIncluded>
                  )}
                  {excluded.length !== 0 && (
                    <styled.SelectedCountExcluded>
                      <Icon name="forbid" color={colors.red[500]} />
                      {excluded.length}
                    </styled.SelectedCountExcluded>
                  )}
                </styled.SelectedCounts>
                <styled.SelectedClearButton>
                  <Button
                    type="button"
                    color="basicLight"
                    size="small"
                    disabled={!included.length && !excluded.length}
                    onClick={handleClearButtonClick}
                  >
                    選択をクリア
                  </Button>
                </styled.SelectedClearButton>
              </styled.RightPanelHeader>
              <styled.RightPanelBody>
                {!!included.length && (
                  <styled.SelectedPanelHeading>
                    <Icon name="check_thin" color={colors.blue[500]} />
                    追加
                  </styled.SelectedPanelHeading>
                )}
                {toGrouped(included).map((group) => (
                  <Fragment key={group.groupName || "_"}>
                    {group.groupName && (
                      <DualListBox2SelectedLabel label={group.groupName} />
                    )}
                    {group.items.map((item) => (
                      <DualListBox2SelectedItem key={item.id} id={item.id}>
                        {item.label}
                      </DualListBox2SelectedItem>
                    ))}
                  </Fragment>
                ))}
                {!!excluded.length && (
                  <styled.SelectedPanelHeading>
                    <Icon name="forbid" color={colors.red[500]} />
                    除外
                  </styled.SelectedPanelHeading>
                )}
                {toGrouped(excluded).map((group) => (
                  <Fragment key={group.groupName || "_"}>
                    {group.groupName && (
                      <DualListBox2SelectedLabel label={group.groupName} />
                    )}
                    {group.items.map((item) => (
                      <DualListBox2SelectedItem key={item.id} id={item.id}>
                        {item.label}
                      </DualListBox2SelectedItem>
                    ))}
                  </Fragment>
                ))}
              </styled.RightPanelBody>
            </styled.RightPanel>
          </DualListBox2Context.Provider>
        </styled.Inner>
      </styled.DualListBox2>
    );
  },
);

DualListBox2.displayName = "DualListBox2";
