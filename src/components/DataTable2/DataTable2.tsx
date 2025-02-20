import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { Column } from "./types";
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
type RowsControlsProps = {
  rowControls: ReactNode;
  extraButtons: ReactNode;
};
const RowsControls = ({ rowControls, extraButtons }: RowsControlsProps) => {
  const { isSmallLayout, rowIds, checkedRows, setCheckedRows } =
    useContext(DataTable2Context);

  const isAllChecked = useMemo(
    () => checkedRows.length === rowIds.length,
    [checkedRows, rowIds],
  );
  const isIndeterminate = useMemo(
    () => checkedRows.length !== 0 && checkedRows.length !== rowIds.length,
    [checkedRows, rowIds],
  );

  const onCheck = useCallback(() => {
    !isAllChecked ? setCheckedRows(rowIds) : setCheckedRows([]);
  }, [isAllChecked, rowIds, setCheckedRows]);

  return (
    <styled.RowsControls isSmallLayout={isSmallLayout}>
      <Checkbox
        checked={isAllChecked || isIndeterminate}
        indeterminate={isIndeterminate}
        onChange={onCheck}
      />
      <DataTable2RowControls>{rowControls}</DataTable2RowControls>

      <styled.RowsControlsSeparator />

      {/* ページネーション */}
      <DataTable2Pagination />

      <styled.RowsControlsSeparator />
      <DataTable2FilterControls />
      <styled.RowsControlsExtras>
        {!isSmallLayout && extraButtons /* DataTable2ActionButton が入る */}
        <ContextMenu2Container>
          <ContextMenu2
            width={316}
            trigger={
              <styled.DataTable2ExtrasMenuTrigger>
                <Icon name="more_vert" />
              </styled.DataTable2ExtrasMenuTrigger>
            }
          >
            {isSmallLayout && extraButtons /* DataTable2ActionButton が入る */}

            {/* 並び替え */}
            <DataTable2MenuOrderControl />

            {/* 件数 */}
            <DataTable2MenuCountControl />

            {/* 密度 */}
            <DataTable2MenuSpaceControl />
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.RowsControlsExtras>
    </styled.RowsControls>
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
  columns: Column[];
  /**
   * ページネーションのページ変更時のコールバック
   * @param page 変更後のページ
   */
  onPageChange: (page: number) => void;
  /**
   * ページネーションの1ページあたりの表示件数変更時のコールバック
   * @param page 変更後のページ
   */
  onPageSizeChange: (size: number) => void;
  onColumnsChange: (columns: Column[]) => void;
} & {
  children: ReactNode;
  /**
   * 朝のチェック状態が変更されたときに呼び出されるコールバック
   * 読み取り専用で、今のところは外から checkedRows を変更することはできません
   */
  onCheckedRowsChange?: (checkedRows: string[]) => void;
} & RowsControlsProps;

export const DataTable2 = ({
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

  return (
    <styled.DataTable2 ref={elRef}>
      <DataTable2Context.Provider
        value={{
          isSmallLayout,
          rowIds,
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
        <RowsControls rowControls={rowControls} extraButtons={extraButtons} />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
