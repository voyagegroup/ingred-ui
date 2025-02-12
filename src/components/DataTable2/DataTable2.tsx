import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import * as styled from "./styled";
import { DataTable2Context } from "./context";
import { DataTable2FilterControls } from "./DataTable2FilterControls";
import { DataTable2MenuOrderControl } from "./DataTable2MenuOrderControl";
import {
  DataTable2MenuCountControl,
  type DataTable2MenuCountControlProps,
} from "./DataTable2MenuCountControl";
import { DataTable2MenuSpaceControl } from "./DataTable2MenuSpaceControl";
import {
  DataTable2Pagination,
  type DataTable2PaginationProps,
} from "./DataTable2Pagination";
import { DataTable2RowControls } from "./DataTable2RowControls";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import { ContextMenu2Container, ContextMenu2 } from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
// 左上コントロール群
type RowsControlsProps = DataTable2PaginationProps &
  DataTable2MenuCountControlProps & {
    extraButtons: ReactNode;
  };
const RowsControls = ({
  currentPage,
  pageSize,
  pageSizeOptions,
  numOfItems,
  onPageChange,
  onPageSizeChange,
  extraButtons,
}: RowsControlsProps) => {
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

  // ページ移動した場合、全選択を解除
  const previousPage = useRef(currentPage);
  useEffect(() => {
    if (previousPage.current !== currentPage) setCheckedRows([]);
    previousPage.current = currentPage;
  }, [currentPage, setCheckedRows]);

  return (
    <styled.RowsControls>
      <Checkbox
        checked={isAllChecked || isIndeterminate}
        indeterminate={isIndeterminate}
        onChange={onCheck}
      />
      <DataTable2RowControls />

      <styled.RowsControlsSeparator />

      {/* ページネーション */}
      <DataTable2Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        numOfItems={numOfItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

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
            <DataTable2MenuCountControl
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={onPageSizeChange}
            />

            {/* 密度 */}
            <DataTable2MenuSpaceControl />
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.RowsControlsExtras>
    </styled.RowsControls>
  );
};

type DataTable2Props = {
  children: ReactNode;
} & RowsControlsProps &
  DataTable2MenuCountControlProps;

export const DataTable2 = ({
  extraButtons,
  currentPage,
  pageSize,
  pageSizeOptions,
  numOfItems,
  onPageChange,
  onPageSizeChange,
  children,
}: DataTable2Props) => {
  const [isSmallLayout, setIsSmallLayout] = useState(false);
  const [rowIds, setRowIds] = useState<string[]>([]);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<(number | null)[]>([]);
  const elRef = useRef<HTMLDivElement>(null);
  const onColumnWidthChange = useCallback(
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
      elRef.current && setIsSmallLayout(elRef.current?.clientWidth < 480);
    };

    const resizeObserver = new ResizeObserver(onSizeChange);

    onSizeChange();
    resizeObserver.observe(elRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <styled.DataTable2 ref={elRef}>
      <DataTable2Context.Provider
        value={{
          isSmallLayout,
          rowIds,
          checkedRows,
          columnWidths,
          setRowIds,
          setCheckedRows,
          onColumnWidthChange,
        }}
      >
        <RowsControls
          currentPage={currentPage}
          extraButtons={extraButtons}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          numOfItems={numOfItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
