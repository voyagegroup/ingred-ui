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
import { DataTable2RowControls } from "./DataTable2RowControls";
import * as styled from "./styled";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import { ContextMenu2Container, ContextMenu2 } from "../ContextMenu2";
import Button from "../Button";
import { ContextMenu2ButtonControlsItem } from "../ContextMenu2/ContextMenu2ButtonControlsItem";
import {
  ContextMenu2ButtonItem,
  ContextMenu2HeadingItem,
} from "../ContextMenu2";
import { useTheme } from "../../themes/useTheme";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
// 左上コントロール群
type BulkAction = {
  label: string;
  icon?: ReactNode;
  onClick: (selectedRows: string[]) => void;
  important?: boolean; // trueなら常時表示、falseならメニューに格納
  color?: "danger" | "primary" | "default";
};

type ToolbarProps = {
  rowControls?: ReactNode;
  bulkActions?: BulkAction[];
  extraButtons?: ReactNode;
};

const Toolbar = ({
  rowControls,
  bulkActions = [],
  extraButtons,
}: ToolbarProps) => {
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

  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [isExtrasMenuOpen, setIsExtrasMenuOpen] = useState(false);

  const hasFilterItems = useMemo(
    () => columns.some((column) => column.filtered !== undefined),
    [columns],
  );

  const onCheck = useCallback(() => {
    !isAllChecked ? setCheckedRows(rowIds) : setCheckedRows([]);
  }, [isAllChecked, rowIds, setCheckedRows]);

  // 重要度で分ける
  const importantActions = bulkActions.filter((a) => a.important !== false);
  const menuActions = bulkActions.filter((a) => a.important === false);

  return (
    <styled.Toolbar isSmallLayout={isSmallLayout}>
      {/* 一括操作（左寄せ） */}
      <styled.ToolbarBulkArea>
        <Checkbox
          checked={isAllChecked || isIndeterminate}
          indeterminate={isIndeterminate}
          onChange={onCheck}
        />
        {isSmallLayout ? (
          <ContextMenu2Container>
            <ContextMenu2
              open={isBulkMenuOpen}
              onOpenChange={setIsBulkMenuOpen}
              trigger={
                <styled.BulkActionMenuTrigger
                  type="button"
                  disabled={rowIds.length === 0}
                >
                  <Icon name="more_vert" />
                </styled.BulkActionMenuTrigger>
              }
            >
              <ContextMenu2HeadingItem>
                {checkedRows.length}件を
              </ContextMenu2HeadingItem>
              {importantActions.map(
                (action: (typeof importantActions)[number], i: number) => (
                  <ContextMenu2ButtonItem
                    key={action.label + i}
                    onClick={() => action.onClick(checkedRows)}
                    disabled={checkedRows.length === 0}
                    color={action.color === "danger" ? "danger" : undefined}
                    prepend={action.icon}
                  >
                    {action.label}
                  </ContextMenu2ButtonItem>
                ),
              )}
              {menuActions.map(
                (action: (typeof menuActions)[number], i: number) => (
                  <ContextMenu2ButtonItem
                    key={action.label + i}
                    onClick={() => action.onClick(checkedRows)}
                    disabled={checkedRows.length === 0}
                    color={action.color === "danger" ? "danger" : undefined}
                    prepend={action.icon}
                  >
                    {action.label}
                  </ContextMenu2ButtonItem>
                ),
              )}
            </ContextMenu2>
          </ContextMenu2Container>
        ) : (
          <>
            <styled.BulkSelectedText>
              {checkedRows.length}件を
            </styled.BulkSelectedText>
            {importantActions.map(
              (action: (typeof importantActions)[number], i: number) => (
                <Button
                  key={action.label + i}
                  onClick={() => action.onClick(checkedRows)}
                  color={
                    action.color === "default" || !action.color
                      ? "basicLight"
                      : action.color
                  }
                  size="small"
                  disabled={checkedRows.length === 0}
                  icon={action.icon}
                  style={{ marginRight: 4 }}
                >
                  {action.label}
                </Button>
              ),
            )}
            {menuActions.length > 0 && (
              <ContextMenu2Container>
                <ContextMenu2
                  open={isBulkMenuOpen}
                  onOpenChange={setIsBulkMenuOpen}
                  trigger={
                    <styled.BulkActionMenuTrigger
                      type="button"
                      disabled={checkedRows.length === 0}
                    >
                      <Icon name="more_vert" />
                    </styled.BulkActionMenuTrigger>
                  }
                >
                  {menuActions.map(
                    (action: (typeof menuActions)[number], i: number) => (
                      <styled.BulkActionMenuItem
                        key={action.label + i}
                        onClick={() => action.onClick(checkedRows)}
                        color={action.color}
                        disabled={checkedRows.length === 0}
                      >
                        {action.icon}
                        {action.label}
                      </styled.BulkActionMenuItem>
                    ),
                  )}
                </ContextMenu2>
              </ContextMenu2Container>
            )}
          </>
        )}
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
  rowControls?: ReactNode;
} & ToolbarProps;

export const DataTable2 = ({
  bordered,
  rowControls,
  bulkActions,
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
          rowControls={rowControls}
          bulkActions={bulkActions}
          extraButtons={extraButtons}
        />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
