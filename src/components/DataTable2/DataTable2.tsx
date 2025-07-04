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
import { ContextMenu2Container, ContextMenu2 } from "../ContextMenu2";
import Button from "../Button";
import { useTheme } from "../../themes/useTheme";
import ButtonGroup from "../ButtonGroup";
import DropdownButton from "../DropdownButton";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
// 左上コントロール群
// BulkAction型定義
export type BulkAction =
  | {
      type: "single";
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
      displayIn?: "dropdown" | "toolbar";
      enabledWhen?: "checked" | "custom";
      disabled?: (checkedRows: string[]) => boolean;
      style?: React.CSSProperties; // テキスト色などのカスタムスタイル
    }
  | {
      type: "group";
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
        enabledWhen?: "checked" | "custom";
        disabled?: (checkedRows: string[]) => boolean;
        style?: React.CSSProperties;
      }[];
      displayIn?: "dropdown" | "toolbar";
    }
  | {
      type: "divider";
      displayIn?: "dropdown" | "toolbar";
    };

type ToolbarProps = {
  extraButtons?: ReactNode;
};

const Toolbar = ({
  extraButtons,
  bulkActions,
  customBulkActionArea,
}: ToolbarProps & {
  bulkActions?: BulkAction[];
  customBulkActionArea?: (context: {
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

  const hasFilterItems = useMemo(
    () => columns.some((column) => column.filtered !== undefined),
    [columns],
  );

  const onCheck = useCallback(() => {
    !isAllChecked ? setCheckedRows(rowIds) : setCheckedRows([]);
  }, [isAllChecked, rowIds, setCheckedRows]);

  // 一括操作エリアの描画ロジック
  let bulkArea: React.ReactNode = null;
  if (customBulkActionArea) {
    // カスタムエリアが指定されている場合はそれを使用
    bulkArea = customBulkActionArea({ isSmallLayout, checkedRows });
  } else if (bulkActions && bulkActions.length > 0) {
    if (isSmallLayout) {
      // モバイル時: displayIn設定に基づいて表示場所を分ける
      const dropdownActions = bulkActions.filter(
        (action) => (action.displayIn ?? "dropdown") === "dropdown",
      );
      const toolbarActions = bulkActions.filter(
        (action) => (action.displayIn ?? "dropdown") === "toolbar",
      );

      bulkArea = (
        <div>
          {dropdownActions.length > 0 && (
            <DropdownButton
              size="small"
              color="basicLight"
              contents={dropdownActions.flatMap((action) => {
                if (action.type === "single") {
                  return [
                    {
                      text: action.label,
                      onClick: () => action.onClick(checkedRows),
                      disabled:
                        (action.enabledWhen ?? "checked") === "checked"
                          ? checkedRows.length === 0
                          : action.disabled?.(checkedRows) ?? false,
                      icon: action.icon,
                    },
                  ];
                } else if (action.type === "group") {
                  return action.items.map((item) => ({
                    text: item.label,
                    onClick: () => item.onClick(checkedRows),
                    disabled:
                      (item.enabledWhen ?? "checked") === "checked"
                        ? checkedRows.length === 0
                        : item.disabled?.(checkedRows) ?? false,
                    icon: item.icon,
                  }));
                } else {
                  // divider type
                  return [];
                }
              })}
              disabled={checkedRows.length === 0}
            >
              {checkedRows.length}件の操作
            </DropdownButton>
          )}
          {toolbarActions.map((action, index) => {
            if (action.type === "single") {
              return (
                <Button
                  key={index}
                  icon={action.icon}
                  color={action.color ?? "basicLight"}
                  size="small"
                  inline
                  style={action.style}
                  disabled={
                    (action.enabledWhen ?? "checked") === "checked"
                      ? checkedRows.length === 0
                      : action.disabled?.(checkedRows) ?? false
                  }
                  onClick={() => action.onClick(checkedRows)}
                >
                  {action.label}
                </Button>
              );
            } else if (action.type === "group") {
              return (
                <ButtonGroup key={index} size="small">
                  {action.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      icon={item.icon}
                      color={item.color ?? "basicLight"}
                      style={item.style}
                      disabled={
                        (item.enabledWhen ?? "checked") === "checked"
                          ? checkedRows.length === 0
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
              // divider type
              return <styled.DashedDivider key={index} />;
            }
          })}
        </div>
      );
    } else {
      // デスクトップ時: 全てのボタンをツールバーに横並びで表示
      bulkArea = (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {bulkActions.map((action, index) => {
            if (action.type === "single") {
              return (
                <Button
                  key={index}
                  icon={action.icon}
                  color={action.color ?? "basicLight"}
                  size="small"
                  inline
                  style={action.style}
                  disabled={
                    (action.enabledWhen ?? "checked") === "checked"
                      ? checkedRows.length === 0
                      : action.disabled?.(checkedRows) ?? false
                  }
                  onClick={() => action.onClick(checkedRows)}
                >
                  {action.label}
                </Button>
              );
            } else if (action.type === "group") {
              return (
                <ButtonGroup key={index} size="small">
                  {action.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      icon={item.icon}
                      color={item.color ?? "basicLight"}
                      style={item.style}
                      disabled={
                        (item.enabledWhen ?? "checked") === "checked"
                          ? checkedRows.length === 0
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
              // divider type
              return <styled.DashedDivider key={index} />;
            }
          })}
        </div>
      );
    }
  }

  return (
    <styled.Toolbar isSmallLayout={isSmallLayout}>
      {/* 左側カスタム領域 */}
      <styled.ToolbarBulkArea
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
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
        {bulkArea}
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
   * 一括操作ボタン群の定義。デスクトップ時は横並びボタン、モバイル時はdisplayInで表示場所を制御。
   */
  bulkActions?: BulkAction[];
  /**
   * 一括操作エリアを完全カスタマイズしたい場合のrender-props。isSmallLayout, checkedRows等を受け取れる。
   */
  customBulkActionArea?: (context: {
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
  bulkActions,
  customBulkActionArea,
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
          hasRowControls: !!bulkActions || !!extraButtons,
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
          bulkActions={bulkActions}
          customBulkActionArea={customBulkActionArea}
        />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
