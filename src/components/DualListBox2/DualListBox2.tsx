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
} from "react";
import Button from "../Button";
import Icon from "../Icon";
import Spinner from "../Spinner";
import * as styled from "./styled";
import { colors } from "../../styles";
import { ContextMenu2, ContextMenu2Container } from "../ContextMenu2";
import { type Item } from "./types";
import { DualListBox2Context, traverseChildren, getAllIds } from "./lib";
import { DualListBox2Item } from "./DualListBox2Item";
import { DualListBox2Section } from "./DualListBox2Section";

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
      onActiveSectionChange,
      onLoadMore,
    },
    ref,
  ) => {
    // モバイルサイズでは、タブで左右パネルの表示を切り替える
    const [tabIndex, setTabIndex] = useState<0 | 1>(0);
    const [filter, setFilter] = useState("");
    // セクションの排他表示監理用。セクションが選択されている場合はそのセクションのみ表示する。
    const [activeSection, setActiveSection] = useState<string | null>(null);
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
    // 選択中のセクションに含まれる全ての id
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
    const allIds = useMemo(() => getAllIds(children), [children]);
    const isAllIncluded = useMemo(
      () => includedIds.length === allIds.length,
      [includedIds, allIds],
    );
    const isAllExcluded = useMemo(
      () => excludedIds.length === allIds.length,
      [excludedIds, allIds],
    );
    const handleFilterChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target?.value);
      },
      [setFilter],
    );
    const handleClearButtonClick = useCallback(() => {
      included.length && onIncludedChange([]);
      excluded.length && onExcludedChange([]);
    }, [included, excluded, onIncludedChange, onExcludedChange]);

    const handleIncludeAllButtonClick = useCallback(() => {
      if (hasSection) {
        // セクションの場合は特別
        if (activeSection === null) return;
        onIncludedChange(
          Array.from(new Set([...includedIds, ...allIdsInActiveSection])),
        );
        onExcludedChange(
          excludedIds.filter((id) => !allIdsInActiveSection.includes(id)),
        );
        return;
      }
      onIncludedChange(allIds);
      onExcludedChange([]);
    }, [
      allIds,
      onIncludedChange,
      onExcludedChange,
      hasSection,
      activeSection,
      includedIds,
      excludedIds,
      allIdsInActiveSection,
    ]);

    const handleExcludeAllButtonClick = useCallback(() => {
      if (hasSection) {
        // セクションの場合は特別
        if (activeSection === null) return;
        onExcludedChange(
          Array.from(new Set([...excludedIds, ...allIdsInActiveSection])),
        );
        onIncludedChange(
          includedIds.filter((id) => !allIdsInActiveSection.includes(id)),
        );
        return;
      }
      onExcludedChange(allIds);
      onIncludedChange([]);
    }, [
      allIds,
      onIncludedChange,
      onExcludedChange,
      hasSection,
      activeSection,
      includedIds,
      excludedIds,
      allIdsInActiveSection,
    ]);

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
              setActiveSection: (activeSection) => {
                setActiveSection(activeSection);
                onActiveSectionChange?.(activeSection);
              },
            }}
          >
            <styled.LeftPanel isShow={tabIndex === 0}>
              <styled.LeftPanelHeader>
                <styled.HeaderSearch>
                  <Icon name="search" size="sm" color={colors.basic[600]} />
                  {/*
                  セクション型の DualListBox の場合、
                  セクション選択中のみ「すべて〜」ボタンは有効。
                  それ以外は常に有効
                */}
                  <input
                    placeholder="検索"
                    disabled={hasSection && activeSection === null}
                    aria-label="検索"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </styled.HeaderSearch>
                {menuButtons && (
                  <ContextMenu2Container>
                    <ContextMenu2
                      trigger={
                        <styled.HeaderMenuButton type="button">
                          <Icon name="more_vert" color={colors.basic[900]} />
                        </styled.HeaderMenuButton>
                      }
                    >
                      {menuButtons}
                    </ContextMenu2>
                  </ContextMenu2Container>
                )}
                <styled.HeaderCount>
                  {loading ? (
                    <Spinner width="16px" />
                  ) : (
                    // セクション型の DualListBox の場合、
                    // セクション選択中のみ件数を表示。
                    // それ以外は常に表示
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
                      {/*
                      セクション型の DualListBox の場合、
                      セクション選択中のみ「すべて〜」ボタンは有効。
                      それ以外は常に有効
                    */}
                      <button
                        type="button"
                        disabled={
                          isAllIncluded ||
                          (hasSection && activeSection === null)
                        }
                        onClick={handleIncludeAllButtonClick}
                      >
                        <Icon name="check_thin" color={colors.blue[500]} />
                        全て追加
                      </button>
                    </li>
                  )}
                  {!disableExclude && (
                    <li>
                      {/*
                      セクション型の DualListBox の場合、
                      セクション選択中のみ「すべて〜」ボタンは有効。
                      それ以外は常に有効
                    */}
                      <button
                        type="button"
                        disabled={
                          isAllExcluded ||
                          (hasSection && activeSection === null)
                        }
                        onClick={handleExcludeAllButtonClick}
                      >
                        <Icon name="forbid" color={colors.red[500]} />
                        全て除外
                      </button>
                    </li>
                  )}
                </styled.HeaderButtons>
                {/*
                セクション型の DualListBox の場合、
                セクション選択中のみ「さらにに読み込む」ボタンは有効。
                それ以外は常に有効
              */}
                {(!hasSection || (hasSection && activeSection !== null)) && (
                  <styled.HeaderLoadButton
                    type="button"
                    disabled={loading}
                    onClick={onLoadMore}
                  >
                    さらに読み込む
                  </styled.HeaderLoadButton>
                )}
              </styled.LeftPanelHeader>
              <styled.LeftPanelBody>{children}</styled.LeftPanelBody>
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
                    color="secondary"
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
                {/* included はフラットな配列。アコーディオンやセクションの group ごとに分けて配置する */}
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
                {/* excluded はフラットな配列。アコーディオンやセクションの group ごとに分けて配置する */}
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
