import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
  type ReactElement,
} from "react";
import * as styled from "./styled";
import { DataTable2Context } from "./context";
import { DataTable2FilterControls } from "./DataTable2FilterControls";
import { DataTable2MenuOrderControl } from "./DataTable2MenuOrderControl";
import { DataTable2MenuCountControl } from "./DataTable2MenuCountControl";
import { DataTable2MenuSpaceControl } from "./DataTable2MenuSpaceControl";
import { DataTable2Pagination } from "./DataTable2Pagination";
import { DataTable2RowControls } from "./DataTable2RowControls";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import {
  ContextMenu2Container,
  ContextMenu2,
  ContextMenu2ButtonItem,
} from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2ActionButtonProps = {
  prepend?: ReactElement;
  children: ReactNode;
  onClick?: () => void;
};
const DataTable2ActionButton = ({
  prepend,
  children,
  onClick,
}: DataTable2ActionButtonProps) => {
  const { isSmallLayout } = useContext(DataTable2Context);

  if (isSmallLayout) {
    return (
      <ContextMenu2ButtonItem prepend={prepend} onClick={onClick}>
        {children}
      </ContextMenu2ButtonItem>
    );
  }

  return (
    <styled.DataTable2ActionButton type="button" onClick={onClick}>
      {prepend}
      {children}
    </styled.DataTable2ActionButton>
  );
};

// 左上コントロール群
const RowsControls = () => {
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
    <styled.RowsControls>
      <Checkbox
        checked={isAllChecked || isIndeterminate}
        indeterminate={isIndeterminate}
        onChange={onCheck}
      />
      <DataTable2RowControls />

      <styled.RowsControlsSeparator />

      {/* ページネーション */}
      <DataTable2Pagination />

      <styled.RowsControlsSeparator />
      <DataTable2FilterControls />
      <styled.RowsControlsExtras>
        {!isSmallLayout && (
          <DataTable2ActionButton prepend={<Icon name="download_cloud" />}>
            ダウンロード
          </DataTable2ActionButton>
        )}
        <ContextMenu2Container>
          <ContextMenu2
            width={316}
            trigger={
              <styled.DataTable2ExtrasMenuTrigger>
                <Icon name="more_vert" />
              </styled.DataTable2ExtrasMenuTrigger>
            }
          >
            {isSmallLayout && (
              <DataTable2ActionButton prepend={<Icon name="download_cloud" />}>
                ダウンロード
              </DataTable2ActionButton>
            )}

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
  children: ReactNode;
};

export const DataTable2 = ({ children }: DataTable2Props) => {
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
        <RowsControls />
        <styled.Viewport>
          <table>{children}</table>
        </styled.Viewport>
      </DataTable2Context.Provider>
    </styled.DataTable2>
  );
};
