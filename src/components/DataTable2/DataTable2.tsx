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
    }
  | {
      type: "divider";
      displayIn?: "toolbar" | "dropdown";
    };

type ToolbarProps = {
  extraButtons?: ReactNode;
};

const Toolbar = ({
  extraButtons,
  tableActions,
  customTableActionArea,
}: ToolbarProps & {
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
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
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
  const renderBulkActionButton = useCallback(
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
        return <styled.DashedDivider key={index} />;
      }
    },
    [checkedRows],
  );

  // テーブルアクションエリアの描画ロジック
  let tableActionArea: React.ReactNode = null;
  if (customTableActionArea) {
    // カスタムエリアが指定されている場合はそれを使用
    tableActionArea = customTableActionArea({ isSmallLayout, checkedRows });
  } else if (tableActions && tableActions.length > 0) {
    // enabledWhenによる分離
    const checkedActions = tableActions.filter((action) => {
      if (action.type === "divider") return false;
      return (
        (action as any).enabledWhen === "checked" ||
        (action as any).enabledWhen === undefined
      );
    }) as (TableAction & { type: "singleButton" | "groupButton" })[];
    const uncheckedActions = tableActions.filter((action) => {
      if (action.type === "divider") return false;
      return (action as any).enabledWhen === "unchecked";
    }) as (TableAction & { type: "singleButton" | "groupButton" })[];

    if (isSmallLayout) {
      // モバイル時: checkedActionsは「n件を操作」ドロップダウン、uncheckedActionsは右側3点リーダーボタン
      tableActionArea = (
        <styled.BulkActionContainer>
          {checkedActions.length > 0 && (
            <ContextMenu2Container>
              <ContextMenu2
                open={isBulkMenuOpen}
                trigger={
                  <styled.BulkActionDropdownButton
                    type="button"
                    disabled={checkedRows.length === 0}
                  >
                    <span style={{ marginRight: "4px" }}>
                      {checkedRows.length}
                    </span>
                    件を操作
                    <Icon name="arrow_down" size="sm-md" color="currentColor" />
                  </styled.BulkActionDropdownButton>
                }
                width={200}
                onOpenChange={setIsBulkMenuOpen}
              >
                {checkedActions.map((action, index) => {
                  if (action.type === "singleButton") {
                    return (
                      <ContextMenu2ButtonItem
                        key={index}
                        prepend={action.icon}
                        disabled={
                          action.enabledWhen === "checked" ||
                          action.enabledWhen === undefined
                            ? checkedRows.length === 0
                            : action.disabled?.(checkedRows) ?? false
                        }
                        onClick={() => {
                          action.onClick(checkedRows);
                          setIsBulkMenuOpen(false);
                        }}
                      >
                        {action.label}
                      </ContextMenu2ButtonItem>
                    );
                  } else if (action.type === "groupButton") {
                    return action.items.map((item, itemIndex) => (
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
                          setIsBulkMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </ContextMenu2ButtonItem>
                    ));
                  } else {
                    // divider type
                    return <ContextMenu2SeparatorItem key={index} />;
                  }
                })}
              </ContextMenu2>
            </ContextMenu2Container>
          )}
          {uncheckedActions.length > 0 && (
            <ContextMenu2Container>
              <ContextMenu2
                open={isUncheckedActionsMenuOpen}
                trigger={
                  <styled.BulkActionDropdownButton
                    type="button"
                    disabled={checkedRows.length > 0}
                  >
                    <Icon name="more_vert" size="sm-md" color="currentColor" />
                  </styled.BulkActionDropdownButton>
                }
                width={200}
                onOpenChange={setIsUncheckedActionsMenuOpen}
              >
                {uncheckedActions.map((action, index) => {
                  if (action.type === "singleButton") {
                    return (
                      <ContextMenu2ButtonItem
                        key={index}
                        prepend={action.icon}
                        disabled={checkedRows.length > 0}
                        onClick={() => {
                          action.onClick(checkedRows);
                          setIsUncheckedActionsMenuOpen(false);
                        }}
                      >
                        {action.label}
                      </ContextMenu2ButtonItem>
                    );
                  } else if (action.type === "groupButton") {
                    return action.items.map((item, itemIndex) => (
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
                  }
                  return null;
                })}
              </ContextMenu2>
            </ContextMenu2Container>
          )}
        </styled.BulkActionContainer>
      );
    } else {
      // デスクトップ時: enabledWhenによる分離と破線区切り
      const checkedToolbarActions = checkedActions.filter(
        (action) => (action.displayIn ?? "toolbar") === "toolbar",
      );
      const checkedDropdownActions = checkedActions.filter(
        (action) => (action.displayIn ?? "toolbar") === "dropdown",
      );
      const uncheckedToolbarActions = uncheckedActions.filter(
        (action) => (action.displayIn ?? "toolbar") === "toolbar",
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
            elements.push(renderBulkActionButton(action, originalIndex, true));
          } else if (displayIn === "dropdown") {
            // dropdownボタンがまだ追加されていない場合のみ追加
            const hasDropdownButton = elements.some(
              (el) => React.isValidElement(el) && el.key === "checked-dropdown",
            );

            if (!hasDropdownButton) {
              elements.push(
                <ContextMenu2Container key="checked-dropdown">
                  <ContextMenu2
                    open={isBulkMenuOpen}
                    trigger={
                      <styled.BulkActionDropdownButton
                        type="button"
                        disabled={checkedRows.length === 0}
                      >
                        <Icon
                          name="more_vert"
                          size="sm-md"
                          color="currentColor"
                        />
                      </styled.BulkActionDropdownButton>
                    }
                    width={200}
                    onOpenChange={setIsBulkMenuOpen}
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
                              setIsBulkMenuOpen(false);
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
                              setIsBulkMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </ContextMenu2ButtonItem>
                        ));
                      } else {
                        // divider type
                        return <ContextMenu2SeparatorItem key={index} />;
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
            elements.push(renderBulkActionButton(action, originalIndex, true));
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
                      <styled.BulkActionDropdownButton
                        type="button"
                        disabled={checkedRows.length > 0}
                      >
                        <Icon
                          name="more_vert"
                          size="sm-md"
                          color="currentColor"
                        />
                      </styled.BulkActionDropdownButton>
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
                      }
                      return null;
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
        <styled.BulkActionContainer>
          {/* 左側: checked時enabledなアクション（配列順序通り） */}
          {renderCheckedActionsInOrder()}

          {/* 破線区切り */}
          {checkedActions.length > 0 && uncheckedActions.length > 0 && (
            <styled.DashedDivider />
          )}

          {/* 右側: unchecked時enabledなアクション（配列順序通り） */}
          {renderUncheckedActionsInOrder()}
        </styled.BulkActionContainer>
      );
    }
  }

  return (
    <styled.Toolbar isSmallLayout={isSmallLayout}>
      {/* 左側カスタム領域 */}
      <styled.ToolbarBulkArea>
        <Checkbox
          checked={isAllChecked || isIndeterminate}
          indeterminate={isIndeterminate}
          onChange={onCheck}
        />
        {!isSmallLayout && (
          <styled.BulkSelectedText>
            <span
              style={{ color: theme.palette.primary.main, fontWeight: 700 }}
            >
              {checkedRows.length}
            </span>
            件を
          </styled.BulkSelectedText>
        )}
        {tableActionArea}
      </styled.ToolbarBulkArea>

      {/* 右寄せ：フィルタ・ページング・extraButtons */}
      <styled.ToolbarExtras>
        {hasFilterItems && <DataTable2FilterControls />}
        <DataTable2Pagination />
        {!isSmallLayout && extraButtons}
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
            {isSmallLayout && extraButtons}
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
} & ToolbarProps;

export const DataTable2 = ({
  bordered,
  extraButtons,
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
          hasRowControls: !!tableActions || !!extraButtons,
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
          extraButtons={extraButtons}
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
