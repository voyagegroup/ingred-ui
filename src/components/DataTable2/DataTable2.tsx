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

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
// 左上コントロール群
type ToolbarProps = {
  /**
   * 「◯件選択中」をクリックしたときに表示される ContextMenu2 の中身を指定できます。
   * `<ContextMenu2>` 内に格納できるコンポーネントのみで構成してください。
   */
  rowControls?: ReactNode;
  /**
   * 右上に任意のボタンを設置できます。
   */
  extraButtons?: ReactNode;
};
const Toolbar = ({ rowControls, extraButtons }: ToolbarProps) => {
  const {
    isSmallLayout,
    columns,
    rowIds,
    checkedRows,
    availableRowIds,
    setCheckedRows,
  } = useContext(DataTable2Context);

  // 実際に選択対象となる行IDを決定（availableRowIdsが指定されていればそれを使用）
  const targetRowIds = useMemo(
    () => availableRowIds || rowIds,
    [availableRowIds, rowIds],
  );

  const isAllChecked = useMemo(
    () => targetRowIds.length > 0 && checkedRows.length === targetRowIds.length,
    [checkedRows, targetRowIds],
  );
  const isIndeterminate = useMemo(
    () =>
      checkedRows.length !== 0 && checkedRows.length !== targetRowIds.length,
    [checkedRows, targetRowIds],
  );

  const [isControlOpen, setIsControlOpen] = useState(false);

  const hasFilterItems = useMemo(
    () => columns.some((column) => column.filtered !== undefined),
    [columns],
  );

  const onCheck = useCallback(() => {
    !isAllChecked ? setCheckedRows(targetRowIds) : setCheckedRows([]);
  }, [isAllChecked, targetRowIds, setCheckedRows]);

  return (
    <styled.Toolbar isSmallLayout={isSmallLayout}>
      {rowControls && (
        <>
          <Checkbox
            checked={isAllChecked || isIndeterminate}
            indeterminate={isIndeterminate}
            onChange={onCheck}
          />
          <DataTable2RowControls>{rowControls}</DataTable2RowControls>
          <styled.ToolbarSeparator />
        </>
      )}

      {/* ページネーション */}
      <DataTable2Pagination />

      {hasFilterItems && (
        <>
          <styled.ToolbarSeparator />
          <DataTable2FilterControls />
        </>
      )}

      <styled.ToolbarExtras>
        {!isSmallLayout && extraButtons /* DataTable2ActionButton が入る */}
        <ContextMenu2Container>
          <ContextMenu2
            open={isControlOpen}
            width={316}
            trigger={
              <styled.DataTable2ExtrasMenuTrigger>
                <Icon name="more_vert" />
              </styled.DataTable2ExtrasMenuTrigger>
            }
            onOpenChange={setIsControlOpen}
          >
            {isSmallLayout && extraButtons /* DataTable2ActionButton が入る */}

            {/* 並び替え */}
            {columns.some((column) => column.sortable) && (
              <DataTable2MenuOrderControl
                onClose={() => setIsControlOpen(false)}
              />
            )}

            {/* 件数 */}
            <DataTable2MenuCountControl />

            {/* 密度 */}
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
  /**
   * 現在有効（表示可能）な行のIDリスト
   * フィルタリング等で表示されない行は選択状態から自動的に除外されます
   * 指定しない場合は従来通りの動作となります
   */
  availableRowIds?: string[];
} & ToolbarProps;

export const DataTable2 = ({
  bordered,
  rowControls,
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
  availableRowIds,
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
      // availableRowIdsが指定されている場合、有効な行のみにフィルタリング
      const filteredCheckedRows = availableRowIds
        ? checkedRows.filter((id) => availableRowIds.includes(id))
        : checkedRows;

      setCheckedRows(filteredCheckedRows);
      onCheckedRowsChange?.(filteredCheckedRows);
    },
    [setCheckedRows, onCheckedRowsChange, availableRowIds],
  );

  // ページ移動した場合全選択を解除
  const previousPage = useRef(currentPage);
  useEffect(() => {
    if (previousPage.current !== currentPage) handleCheckedRows([]);
    previousPage.current = currentPage;
  }, [currentPage, handleCheckedRows]);

  // availableRowIdsが変更された場合、選択状態をフィルタリング
  useEffect(() => {
    if (availableRowIds && checkedRows.length > 0) {
      const filteredCheckedRows = checkedRows.filter((id) =>
        availableRowIds.includes(id),
      );
      if (filteredCheckedRows.length !== checkedRows.length) {
        setCheckedRows(filteredCheckedRows);
        onCheckedRowsChange?.(filteredCheckedRows);
      }
    }
  }, [availableRowIds, checkedRows, onCheckedRowsChange]);

  return (
    <styled.DataTable2 ref={elRef} bordered={bordered}>
      <DataTable2Context.Provider
        value={{
          isSmallLayout,
          rowIds,
          hasRowControls: !!rowControls,
          checkedRows,
          availableRowIds,
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
        <Toolbar rowControls={rowControls} extraButtons={extraButtons} />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
