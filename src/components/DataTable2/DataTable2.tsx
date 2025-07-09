import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { TableColumn } from "./types";
import { DataTable2Context, type RowSpacing } from "./context";
import { DataTable2FilterControls } from "./DataTable2FilterControls";
import { DataTable2MenuOrderControl } from "./DataTable2MenuOrderControl";
import { DataTable2MenuCountControl } from "./DataTable2MenuCountControl";
import { DataTable2MenuSpaceControl } from "./DataTable2MenuSpaceControl";
import { DataTable2Pagination } from "./DataTable2Pagination";
import * as styled from "./styled";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import {
  ContextMenu2Container,
  ContextMenu2,
  ContextMenu2ButtonItem,
  ContextMenu2SeparatorItem,
  ContextMenu2HeadingItem,
} from "../ContextMenu2";
import Button from "../Button";
import { useTheme } from "../../themes/useTheme";
import ButtonGroup from "../ButtonGroup";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
// 左上コントロール群
// TableAction型定義
export type TableAction =
  | {
      type: "singleButton";
      label: string;
      icon?: React.ReactNode;
      onClick: (selectedRows: string[]) => void;
      color?:
        | "danger"
        | "primary"
        | "primaryPale"
        | "basicLight"
        | "basicDark"
        | "clear";
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
      disabled?: (checkedRows: string[]) => boolean;
      style?: React.CSSProperties; // テキスト色などのカスタムスタイル
      headingLabel?: string; // モバイル時のグループヘッダー（同じheadingLabelのアクションが自動グループ化される）
    }
  | {
      type: "groupButton";
      items: {
        label: string;
        icon?: React.ReactNode;
        onClick: (selectedRows: string[]) => void;
        color?:
          | "danger"
          | "primary"
          | "primaryPale"
          | "basicLight"
          | "basicDark"
          | "clear";
        enabledWhen?: "checked" | "unchecked" | "custom";
        disabled?: (checkedRows: string[]) => boolean;
        style?: React.CSSProperties;
      }[];
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
      headingLabel?: string; // モバイル時のグループヘッダー（同じheadingLabelのアクションが自動グループ化される）
    }
  | {
      type: "divider";
      displayIn?: "toolbar" | "dropdown";
    }
  | {
      type: "separator";
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
    }
  | {
      type: "heading";
      label: string;
      displayIn?: "toolbar" | "dropdown";
      enabledWhen?: "checked" | "unchecked" | "custom";
    };

const Toolbar = ({
  tableActions,
  customTableActionArea,
}: {
  tableActions?: TableAction[];
  customTableActionArea?: (context: {
    isSmallLayout: boolean;
    checkedRows: string[];
  }) => React.ReactNode;
}) => {
  const { isSmallLayout, columns, rowIds, checkedRows, setCheckedRows } =
    useContext(DataTable2Context);
  const theme = useTheme();

  const isAllChecked = useMemo(
    () => checkedRows.length === rowIds.length,
    [checkedRows, rowIds],
  );
  const isIndeterminate = useMemo(
    () => checkedRows.length !== 0 && checkedRows.length !== rowIds.length,
    [checkedRows, rowIds],
  );

  const [isExtrasMenuOpen, setIsExtrasMenuOpen] = useState(false);
  const [isTableActionMenuOpen, setIsTableActionMenuOpen] = useState(false);
  const [isUncheckedActionsMenuOpen, setIsUncheckedActionsMenuOpen] =
    useState(false);

  const hasFilterItems = useMemo(
    () => columns.some((column) => column.filtered !== undefined),
    [columns],
  );

  const onCheck = useCallback(() => {
    !isAllChecked ? setCheckedRows(rowIds) : setCheckedRows([]);
  }, [isAllChecked, rowIds, setCheckedRows]);

  // 共通のボタンレンダリング関数
  const renderTableActionButton = useCallback(
    (action: TableAction, index: number, isDesktop: boolean) => {
      if (action.type === "singleButton") {
        return (
          <Button
            key={index}
            icon={action.icon}
            color={action.color ?? "basicLight"}
            size="small"
            inline={isDesktop}
            style={action.style}
            disabled={
              action.enabledWhen === "checked" ||
              action.enabledWhen === undefined
                ? checkedRows.length === 0
                : action.enabledWhen === "unchecked"
                ? checkedRows.length > 0
                : action.disabled?.(checkedRows) ?? false
            }
            onClick={() => action.onClick(checkedRows)}
          >
            {action.label}
          </Button>
        );
      } else if (action.type === "groupButton") {
        return (
          <ButtonGroup key={index} size="small">
            {action.items.map((item, itemIndex) => (
              <Button
                key={itemIndex}
                icon={item.icon}
                color={item.color ?? "basicLight"}
                style={item.style}
                disabled={
                  item.enabledWhen === "checked" ||
                  item.enabledWhen === undefined
                    ? checkedRows.length === 0
                    : item.enabledWhen === "unchecked"
                    ? checkedRows.length > 0
                    : item.disabled?.(checkedRows) ?? false
                }
                onClick={() => item.onClick(checkedRows)}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        );
      } else {
        // divider, separator, heading type
        if (action.type === "separator") {
          return <styled.DashedDivider key={index} />;
        } else if (action.type === "heading") {
          // toolbar内でheadingは適切に表示できないので、単純なテキストとして表示
          return (
            <span
              key={index}
              style={{ padding: "8px", fontSize: "14px", fontWeight: "bold" }}
            >
              {action.label}
            </span>
          );
        } else {
          // divider type (for backward compatibility)
          return <styled.DashedDivider key={index} />;
        }
      }
    },
    [checkedRows],
  );

  // モバイル時のアクションをグループ化してContextMenu2アイテムに変換するヘルパー関数
  const createMobileGroupedActions = useCallback(
    (actions: TableAction[], isUnchecked = false) => {
      const result: React.ReactNode[] = [];
      const processedGroups = new Set<string>();

      actions.forEach((action, actionIndex) => {
        // headingLabelが指定されている場合のグループ処理
        if (
          (action.type === "singleButton" || action.type === "groupButton") &&
          action.headingLabel &&
          !processedGroups.has(action.headingLabel)
        ) {
          processedGroups.add(action.headingLabel);

          // 同じheadingLabelのアクションを全て取得
          const groupActions = actions.filter(
            (a) =>
              (a.type === "singleButton" || a.type === "groupButton") &&
              a.headingLabel === action.headingLabel,
          );

          // headingLabelをヘッダーとして追加
          result.push(
            <ContextMenu2HeadingItem
              key={`group-${action.headingLabel}-heading`}
            >
              {action.headingLabel}
            </ContextMenu2HeadingItem>,
          );

          // グループ内のアクションを処理
          groupActions.forEach((groupAction, groupIndex) => {
            if (groupAction.type === "singleButton") {
              result.push(
                <ContextMenu2ButtonItem
                  key={`group-${groupAction.headingLabel}-${groupIndex}`}
                  prepend={groupAction.icon}
                  disabled={
                    isUnchecked
                      ? checkedRows.length > 0
                      : groupAction.enabledWhen === "checked" ||
                        groupAction.enabledWhen === undefined
                      ? checkedRows.length === 0
                      : groupAction.enabledWhen === "unchecked"
                      ? checkedRows.length > 0
                      : groupAction.disabled?.(checkedRows) ?? false
                  }
                  onClick={() => {
                    groupAction.onClick(checkedRows);
                    if (isUnchecked) {
                      setIsUncheckedActionsMenuOpen(false);
                    } else {
                      setIsTableActionMenuOpen(false);
                    }
                  }}
                >
                  {groupAction.label}
                </ContextMenu2ButtonItem>,
              );
            } else if (groupAction.type === "groupButton") {
              groupAction.items.forEach((item, itemIndex) => {
                result.push(
                  <ContextMenu2ButtonItem
                    key={`group-${action.headingLabel}-${groupIndex}-${itemIndex}`}
                    prepend={item.icon}
                    disabled={
                      isUnchecked
                        ? checkedRows.length > 0
                        : item.enabledWhen === "checked" ||
                          item.enabledWhen === undefined
                        ? checkedRows.length === 0
                        : item.enabledWhen === "unchecked"
                        ? checkedRows.length > 0
                        : item.disabled?.(checkedRows) ?? false
                    }
                    onClick={() => {
                      item.onClick(checkedRows);
                      if (isUnchecked) {
                        setIsUncheckedActionsMenuOpen(false);
                      } else {
                        setIsTableActionMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </ContextMenu2ButtonItem>,
                );
              });
            }
          });
        }
        // singleButton, groupButton, divider, separator, heading type
        else if (
          (action.type === "singleButton" || action.type === "groupButton") &&
          !action.headingLabel
        ) {
          if (action.type === "singleButton") {
            result.push(
              <ContextMenu2ButtonItem
                key={actionIndex}
                prepend={action.icon}
                disabled={
                  isUnchecked
                    ? checkedRows.length > 0
                    : action.enabledWhen === "checked" ||
                      action.enabledWhen === undefined
                    ? checkedRows.length === 0
                    : action.enabledWhen === "unchecked"
                    ? checkedRows.length > 0
                    : action.disabled?.(checkedRows) ?? false
                }
                onClick={() => {
                  action.onClick(checkedRows);
                  if (isUnchecked) {
                    setIsUncheckedActionsMenuOpen(false);
                  } else {
                    setIsTableActionMenuOpen(false);
                  }
                }}
              >
                {action.label}
              </ContextMenu2ButtonItem>,
            );
          } else if (action.type === "groupButton") {
            action.items.forEach((item, itemIndex) => {
              result.push(
                <ContextMenu2ButtonItem
                  key={`${actionIndex}-${itemIndex}`}
                  prepend={item.icon}
                  disabled={
                    isUnchecked
                      ? checkedRows.length > 0
                      : item.enabledWhen === "checked" ||
                        item.enabledWhen === undefined
                      ? checkedRows.length === 0
                      : item.enabledWhen === "unchecked"
                      ? checkedRows.length > 0
                      : item.disabled?.(checkedRows) ?? false
                  }
                  onClick={() => {
                    item.onClick(checkedRows);
                    if (isUnchecked) {
                      setIsUncheckedActionsMenuOpen(false);
                    } else {
                      setIsTableActionMenuOpen(false);
                    }
                  }}
                >
                  {item.label}
                </ContextMenu2ButtonItem>,
              );
            });
          }
        }
        // separator, heading, dividerタイプの処理
        else if (action.type === "separator") {
          result.push(<ContextMenu2SeparatorItem key={actionIndex} />);
        } else if (action.type === "heading") {
          result.push(
            <ContextMenu2HeadingItem key={actionIndex}>
              {action.label}
            </ContextMenu2HeadingItem>,
          );
        } else if (action.type === "divider") {
          result.push(<ContextMenu2SeparatorItem key={actionIndex} />);
        }
      });

      return result;
    },
    [checkedRows, setIsTableActionMenuOpen, setIsUncheckedActionsMenuOpen],
  );

  // テーブルアクションエリアの描画ロジック
  let tableActionArea: React.ReactNode = null;
  if (customTableActionArea) {
    // カスタムエリアが指定されている場合はそれを使用
    tableActionArea = customTableActionArea({ isSmallLayout, checkedRows });
  } else if (tableActions && tableActions.length > 0) {
    // enabledWhenによる分離
    const checkedActions = tableActions.filter((action) => {
      return (
        (action as any).enabledWhen === "checked" ||
        (action as any).enabledWhen === undefined
      );
    });
    const uncheckedActions = tableActions.filter((action) => {
      return (action as any).enabledWhen === "unchecked";
    });

    if (isSmallLayout) {
      // モバイル時: checkedActionsは「n件を操作」ドロップダウン、uncheckedActionsは右側3点リーダーボタン
      tableActionArea = (
        <styled.TableActionContainer>
          {checkedActions.length > 0 && (
            <ContextMenu2Container>
              <ContextMenu2
                open={isTableActionMenuOpen}
                trigger={
                  // TODO: 将来的にこの「n件を操作」ドロップダウンボタンを専用コンポーネントとして切り出す
                  // - TableActionDropdownTriggerコンポーネントのようなコンポーネント名を検討
                  // - disabled状態での色制御やスタイルの一元管理
                  // - 他の箇所での再利用可能性を考慮
                  <styled.TableActionDropdownButton
                    type="button"
                    disabled={checkedRows.length === 0}
                  >
                    <span
                      style={{
                        color:
                          checkedRows.length === 0
                            ? "inherit"
                            : theme.palette.primary.main,
                        fontWeight: 700,
                      }}
                    >
                      {checkedRows.length}
                    </span>
                    件を操作
                    <Icon name="arrow_down" size="sm-md" color="currentColor" />
                  </styled.TableActionDropdownButton>
                }
                width={200}
                onOpenChange={setIsTableActionMenuOpen}
              >
                {createMobileGroupedActions(checkedActions)}
              </ContextMenu2>
            </ContextMenu2Container>
          )}
          {uncheckedActions.length > 0 && (
            <ContextMenu2Container>
              <ContextMenu2
                open={isUncheckedActionsMenuOpen}
                trigger={
                  <styled.TableActionDropdownButton
                    type="button"
                    disabled={checkedRows.length > 0}
                  >
                    <Icon name="more_vert" size="sm-md" color="currentColor" />
                  </styled.TableActionDropdownButton>
                }
                width={200}
                onOpenChange={setIsUncheckedActionsMenuOpen}
              >
                {createMobileGroupedActions(uncheckedActions, true)}
              </ContextMenu2>
            </ContextMenu2Container>
          )}
        </styled.TableActionContainer>
      );
    } else {
      // デスクトップ時: enabledWhenによる分離と破線区切り
      const checkedDropdownActions = checkedActions.filter(
        (action) => (action.displayIn ?? "toolbar") === "dropdown",
      );
      const uncheckedDropdownActions = uncheckedActions.filter(
        (action) => (action.displayIn ?? "toolbar") === "dropdown",
      );

      // checked時のアクションを配列の順序通りに並べる関数
      const renderCheckedActionsInOrder = () => {
        const elements: React.ReactNode[] = [];

        checkedActions.forEach((action, originalIndex) => {
          const displayIn = action.displayIn ?? "toolbar";

          if (displayIn === "toolbar") {
            // toolbarボタンを直接レンダリング
            elements.push(renderTableActionButton(action, originalIndex, true));
          } else if (displayIn === "dropdown") {
            // dropdownボタンがまだ追加されていない場合のみ追加
            const hasDropdownButton = elements.some(
              (el) => React.isValidElement(el) && el.key === "checked-dropdown",
            );

            if (!hasDropdownButton) {
              elements.push(
                <ContextMenu2Container key="checked-dropdown">
                  <ContextMenu2
                    open={isTableActionMenuOpen}
                    trigger={
                      <styled.TableActionDropdownButton
                        type="button"
                        disabled={checkedRows.length === 0}
                      >
                        <Icon
                          name="more_vert"
                          size="sm-md"
                          color="currentColor"
                        />
                      </styled.TableActionDropdownButton>
                    }
                    width={200}
                    onOpenChange={setIsTableActionMenuOpen}
                  >
                    {checkedDropdownActions.map((dropdownAction, index) => {
                      if (dropdownAction.type === "singleButton") {
                        return (
                          <ContextMenu2ButtonItem
                            key={index}
                            prepend={dropdownAction.icon}
                            disabled={
                              dropdownAction.enabledWhen === "checked" ||
                              dropdownAction.enabledWhen === undefined
                                ? checkedRows.length === 0
                                : dropdownAction.disabled?.(checkedRows) ??
                                  false
                            }
                            onClick={() => {
                              dropdownAction.onClick(checkedRows);
                              setIsTableActionMenuOpen(false);
                            }}
                          >
                            {dropdownAction.label}
                          </ContextMenu2ButtonItem>
                        );
                      } else if (dropdownAction.type === "groupButton") {
                        return dropdownAction.items.map((item, itemIndex) => (
                          <ContextMenu2ButtonItem
                            key={`${index}-${itemIndex}`}
                            prepend={item.icon}
                            disabled={
                              item.enabledWhen === "checked" ||
                              item.enabledWhen === undefined
                                ? checkedRows.length === 0
                                : item.disabled?.(checkedRows) ?? false
                            }
                            onClick={() => {
                              item.onClick(checkedRows);
                              setIsTableActionMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </ContextMenu2ButtonItem>
                        ));
                      } else {
                        // divider, separator, heading type
                        if (dropdownAction.type === "separator") {
                          return <ContextMenu2SeparatorItem key={index} />;
                        } else if (dropdownAction.type === "heading") {
                          return (
                            <ContextMenu2HeadingItem key={index}>
                              {dropdownAction.label}
                            </ContextMenu2HeadingItem>
                          );
                        } else {
                          // divider type (for backward compatibility)
                          return <ContextMenu2SeparatorItem key={index} />;
                        }
                      }
                    })}
                  </ContextMenu2>
                </ContextMenu2Container>,
              );
            }
          }
        });

        return elements;
      };

      // unchecked時のアクションを配列の順序通りに並べる関数
      const renderUncheckedActionsInOrder = () => {
        const elements: React.ReactNode[] = [];

        uncheckedActions.forEach((action, originalIndex) => {
          const displayIn = action.displayIn ?? "toolbar";

          if (displayIn === "toolbar") {
            // toolbarボタンを直接レンダリング
            elements.push(renderTableActionButton(action, originalIndex, true));
          } else if (displayIn === "dropdown") {
            // dropdownボタンがまだ追加されていない場合のみ追加
            const hasDropdownButton = elements.some(
              (el) =>
                React.isValidElement(el) && el.key === "unchecked-dropdown",
            );

            if (!hasDropdownButton) {
              elements.push(
                <ContextMenu2Container key="unchecked-dropdown">
                  <ContextMenu2
                    open={isUncheckedActionsMenuOpen}
                    trigger={
                      <styled.TableActionDropdownButton
                        type="button"
                        disabled={checkedRows.length > 0}
                      >
                        <Icon
                          name="more_vert"
                          size="sm-md"
                          color="currentColor"
                        />
                      </styled.TableActionDropdownButton>
                    }
                    width={200}
                    onOpenChange={setIsUncheckedActionsMenuOpen}
                  >
                    {uncheckedDropdownActions.map((dropdownAction, index) => {
                      if (dropdownAction.type === "singleButton") {
                        return (
                          <ContextMenu2ButtonItem
                            key={index}
                            prepend={dropdownAction.icon}
                            disabled={checkedRows.length > 0}
                            onClick={() => {
                              dropdownAction.onClick(checkedRows);
                              setIsUncheckedActionsMenuOpen(false);
                            }}
                          >
                            {dropdownAction.label}
                          </ContextMenu2ButtonItem>
                        );
                      } else if (dropdownAction.type === "groupButton") {
                        return dropdownAction.items.map((item, itemIndex) => (
                          <ContextMenu2ButtonItem
                            key={`${index}-${itemIndex}`}
                            prepend={item.icon}
                            disabled={checkedRows.length > 0}
                            onClick={() => {
                              item.onClick(checkedRows);
                              setIsUncheckedActionsMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </ContextMenu2ButtonItem>
                        ));
                      } else {
                        // divider, separator, heading type
                        if (dropdownAction.type === "separator") {
                          return <ContextMenu2SeparatorItem key={index} />;
                        } else if (dropdownAction.type === "heading") {
                          return (
                            <ContextMenu2HeadingItem key={index}>
                              {dropdownAction.label}
                            </ContextMenu2HeadingItem>
                          );
                        } else {
                          // divider type (for backward compatibility)
                          return <ContextMenu2SeparatorItem key={index} />;
                        }
                      }
                    })}
                  </ContextMenu2>
                </ContextMenu2Container>,
              );
            }
          }
        });

        return elements;
      };

      tableActionArea = (
        <styled.TableActionContainer>
          {/* 左側: checked時enabledなアクション（配列順序通り） */}
          {renderCheckedActionsInOrder()}

          {/* 破線区切り */}
          {checkedActions.length > 0 && uncheckedActions.length > 0 && (
            <styled.DashedDivider />
          )}

          {/* 右側: unchecked時enabledなアクション（配列順序通り） */}
          {renderUncheckedActionsInOrder()}
        </styled.TableActionContainer>
      );
    }
  }

  return (
    <styled.Toolbar isSmallLayout={isSmallLayout}>
      {/* 左側カスタム領域 */}
      <styled.ToolbarTableActionArea>
        <Checkbox
          checked={isAllChecked || isIndeterminate}
          indeterminate={isIndeterminate}
          onChange={onCheck}
        />
        {!isSmallLayout && (
          <styled.TableSelectedText>
            <span
              style={{ color: theme.palette.primary.main, fontWeight: 700 }}
            >
              {checkedRows.length}
            </span>
            件を
          </styled.TableSelectedText>
        )}
        {tableActionArea}
      </styled.ToolbarTableActionArea>

      {/* 右寄せ：フィルタ・ページング・extraButtons */}
      <styled.ToolbarExtras>
        {hasFilterItems && <DataTable2FilterControls />}
        <DataTable2Pagination />

        <ContextMenu2Container>
          <ContextMenu2
            open={isExtrasMenuOpen}
            width={316}
            trigger={
              <styled.DataTable2ExtrasMenuTrigger>
                <Icon name="setting" color={theme.palette.black} />
              </styled.DataTable2ExtrasMenuTrigger>
            }
            onOpenChange={setIsExtrasMenuOpen}
          >
            {columns.some((column) => column.sortable) && (
              <DataTable2MenuOrderControl
                onClose={() => setIsExtrasMenuOpen(false)}
              />
            )}
            <DataTable2MenuCountControl />
            <DataTable2MenuSpaceControl />
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.ToolbarExtras>
    </styled.Toolbar>
  );
};

type DataTable2Props = {
  // ページネーション関連
  /**
   * ページネーションの現在のページ
   */
  currentPage: number;
  /**
   * ページネーションの1ページあたりの表示件数
   */
  pageSize: number;
  /**
   * ページネーションの1ページあたりの表示件数の選択肢
   */
  pageSizeOptions: number[];
  /**
   * ページネーションの全件数
   */
  totalCount: number;
  columns: TableColumn[];
  /**
   * ページネーションのページ変更時のコールバック
   * @param page 変更後のページ
   */
  onPageChange: (page: number) => void;
  /**
   * ページネーションの1ページあたりの表示件数変更時のコールバック
   * @param param 変更後の1ページあたりの表示件数
   */
  onPageSizeChange: (size: number) => void;
  /**
   * カラムの状態が変更されたときに呼び出されるコールバック<br />
   * 順序変更時、表示/非表示変更時、フィルタ入力クリア時に呼び出されるので
   * それに合わせて、そのまま columns を更新してください。<br />
   * フィルタ入力クリア時は、filtered が false になっているので、自身で各フィルタの入力値を空白にしてください。
   * @param columns 変更後のカラム
   */
  onColumnsChange: (columns: TableColumn[]) => void;
  /**
   * テーブルアクションボタン群の定義。enabledWhenとdisplayInで表示場所を制御：
   * - enabledWhen: "checked" + displayIn: "toolbar" → デスクトップ時は左側の直接ボタン、モバイル時は「n件を操作」ドロップダウン
   * - enabledWhen: "checked" + displayIn: "dropdown" → デスクトップ時は左側の3点リーダーボタン、モバイル時は「n件を操作」ドロップダウン
   * - enabledWhen: "unchecked" + displayIn: "toolbar" → デスクトップ時は右側の直接ボタン、モバイル時は右側の3点リーダーボタン
   * - enabledWhen: "unchecked" + displayIn: "dropdown" → デスクトップ・モバイル共に右側の3点リーダーボタン
   */
  tableActions?: TableAction[];
  /**
   * テーブルアクションエリアを完全カスタマイズしたい場合のrender-props。isSmallLayout, checkedRows等を受け取れる。
   */
  customTableActionArea?: (context: {
    isSmallLayout: boolean;
    checkedRows: string[];
  }) => React.ReactNode;
} & {
  /**
   * 見た目の制御。枠線で囲むか否か。枠線で囲むと角丸も適用される
   */
  bordered?: boolean;
  children: ReactNode;
  /**
   * 行のチェック状態が変更されたときに呼び出されるコールバック
   * 読み取り専用で、今のところは外から `checkedRows` を変更することはできません
   */
  onCheckedRowsChange?: (checkedRows: string[]) => void;
};

export const DataTable2 = ({
  bordered,
  currentPage,
  pageSize,
  pageSizeOptions,
  totalCount,
  columns,
  onPageChange,
  onPageSizeChange,
  onColumnsChange,
  onCheckedRowsChange,
  children,
  tableActions,
  customTableActionArea,
}: DataTable2Props) => {
  const [isSmallLayout, setIsSmallLayout] = useState(false);
  const [rowIds, setRowIds] = useState<string[]>([]);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<(number | null)[]>([]);
  const [rowSpacing, setRowSpacing] = useState<RowSpacing>(0);
  const elRef = useRef<HTMLDivElement>(null);
  const handleColumnWidthChange = useCallback(
    (index: number, width: number | null) => {
      const newColumnWidths = [...columnWidths];
      newColumnWidths[index] = width;
      setColumnWidths(newColumnWidths);
    },
    [columnWidths, setColumnWidths],
  );

  useEffect(() => {
    if (!elRef.current) return;

    const onSizeChange = () => {
      // DataTable2 上部の UI が横位一列にぎりぎり収まる幅として 640
      elRef.current && setIsSmallLayout(elRef.current?.clientWidth < 640);
    };

    const resizeObserver = new ResizeObserver(onSizeChange);

    onSizeChange();
    resizeObserver.observe(elRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleCheckedRows = useCallback(
    (checkedRows: string[]) => {
      setCheckedRows(checkedRows);
      onCheckedRowsChange?.(checkedRows);
    },
    [setCheckedRows, onCheckedRowsChange],
  );

  // ページ移動した場合全選択を解除
  const previousPage = useRef(currentPage);
  useEffect(() => {
    if (previousPage.current !== currentPage) handleCheckedRows([]);
    previousPage.current = currentPage;
  }, [currentPage, handleCheckedRows]);

  // rowIds が変化した場合、表示されていない選択行を解除
  useEffect(() => {
    if (checkedRows.length === 0) return; // 選択行がない場合は何もしない

    const newCheckedRows = checkedRows.filter((id) => rowIds.includes(id));
    if (newCheckedRows.length !== checkedRows.length) {
      handleCheckedRows(newCheckedRows);
    }
  }, [rowIds, checkedRows, handleCheckedRows]);

  return (
    <styled.DataTable2 ref={elRef} bordered={bordered}>
      <DataTable2Context.Provider
        value={{
          isSmallLayout,
          rowIds,
          hasRowControls: !!tableActions,
          checkedRows,
          totalCount,
          currentPage,
          pageSize,
          pageSizeOptions,
          columns,
          columnWidths,
          rowSpacing,
          setRowIds,
          setCheckedRows: handleCheckedRows,
          setCurrentPage: onPageChange,
          setPageSize: onPageSizeChange,
          setColumns: onColumnsChange,
          setColumnWidth: handleColumnWidthChange,
          setRowSpacing,
        }}
      >
        <Toolbar
          tableActions={tableActions}
          customTableActionArea={customTableActionArea}
        />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
