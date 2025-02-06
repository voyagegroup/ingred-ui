import * as React from "react";
import {
  Children,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  createContext,
  useContext,
  isValidElement,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import * as styled from "./styled";
import Icon from "../Icon";
import Button from "../Button";
import Checkbox from "../Checkbox";
import {
  ContextMenu2Container,
  ContextMenu2,
  ContextMenu2ButtonItem,
  ContextMenu2HeadingItem,
} from "../ContextMenu2";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

////////////////////////////////////////////////////////////////////////////////
// Contexts
////////////////////////////////////////////////////////////////////////////////

// thead 内の各 th すべての幅のリストを root で知るためのコンテキスト
const DataTable2Context = createContext<{
  rowIds: string[];
  checkedRows: string[];
  columnWidths: (number | null)[];
  setRowIds: (rowIds: string[]) => void;
  setCheckedRows: (rowIds: string[]) => void;
  onColumnWidthChange: (index: number, width: number | null) => void;
}>({
  rowIds: [],
  checkedRows: [],
  columnWidths: [],
  setRowIds: () => {},
  setCheckedRows: () => {},
  onColumnWidthChange: () => {},
});

// thead 内の各 th （横並び）が、自分の index を知るためのコンテキスト
const ColumnContext = createContext<{
  index: number;
}>({
  index: 0,
});

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
const RowsControls = () => {
  const { rowIds, checkedRows, setCheckedRows } = useContext(DataTable2Context);

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
      <ContextMenu2Container>
        <ContextMenu2
          width={200}
          trigger={
            <Button inline type="button" size="small" color="secondary">
              <styled.RowMenuTriggerLabel>
                <em>{checkedRows.length}</em>件選択
                <Icon name="arrow_down" />
              </styled.RowMenuTriggerLabel>
            </Button>
          }
        >
          <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
          <ContextMenu2ButtonItem>有効にする</ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem>アーカイブする</ContextMenu2ButtonItem>
          <ContextMenu2HeadingItem>操作</ContextMenu2HeadingItem>
          <ContextMenu2ButtonItem>複製する</ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem color="danger">
            削除する
          </ContextMenu2ButtonItem>
        </ContextMenu2>
      </ContextMenu2Container>
      <styled.RowsControlsSeparator />
      <styled.RowMenuPagination>
        <button>
          1 - 100 1,000
          <Icon name="arrow_right" size="sm" />
        </button>
      </styled.RowMenuPagination>
    </styled.RowsControls>
  );
};

export type DataTable2Props = {
  children: ReactNode;
};

export const DataTable2 = ({ children }: DataTable2Props) => {
  const [rowIds, setRowIds] = useState<string[]>([]);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<(number | null)[]>([]);
  const onColumnWidthChange = useCallback(
    (index: number, width: number | null) => {
      const newColumnWidths = [...columnWidths];
      newColumnWidths[index] = width;
      setColumnWidths(newColumnWidths);
    },
    [columnWidths, setColumnWidths],
  );

  return (
    <styled.DataTable2>
      <DataTable2Context.Provider
        value={{
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

type DataTable2HeadProps = {
  children: ReactNode;
};

export const DataTable2Head = ({ children }: DataTable2HeadProps) => {
  return (
    <>
      {/* 幅を決めるための <col/> 展開する。<th> 自体には width を指定しない */}
      <colgroup>
        <col style={{ width: 34 }} />
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return null;
          return <col key={i} style={{ width: child.props.width }} />;
        })}
      </colgroup>
      <styled.DataTable2Header>
        <tr>
          <th aria-label="empty cell" />
          {Children.map(children, (child, i) => {
            return (
              <ColumnContext.Provider value={{ index: i }}>
                {child}
              </ColumnContext.Provider>
            );
          })}
        </tr>
      </styled.DataTable2Header>
    </>
  );
};

type DataTable2ColumnProps =
  | {
      className?: string;
      isResizable: true;
      onWidthChange: (width: number) => void;
      minWidth?: number;
      maxWidth?: number;
      width?: number;
      children: ReactNode;
    }
  | {
      className?: string;
      isResizable?: false;
      onWidthChange?: undefined;
      minWidth?: number;
      maxWidth?: undefined;
      width?: number;
      children: ReactNode;
    };

export const DataTable2Column = ({
  className,
  isResizable,
  width,
  minWidth = 32,
  maxWidth = Infinity,
  children,
  onWidthChange,
}: DataTable2ColumnProps) => {
  const { onColumnWidthChange } = useContext(DataTable2Context);
  const columnContext = useContext(ColumnContext);
  const [isDragging, setIsDragging] = useState(false);

  const activePointerId = useRef<number | null>(null);
  const thElement = useRef<HTMLTableCellElement>(null);
  const dragStartX = useRef<number>(0);
  const dragStartWidth = useRef<number>(0);

  const handleDragStart = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      setIsDragging(true);
      if (!thElement.current) return;
      if (activePointerId.current !== null) return;
      activePointerId.current = event.pointerId;
      dragStartWidth.current = width || thElement.current.clientWidth;
      dragStartX.current = event.clientX;
    },
    [width],
  );
  const handleDragging = useCallback(
    (event: PointerEvent) => {
      if (!onWidthChange) return;
      if (activePointerId.current !== event.pointerId) return;

      if (event.cancelable) event.preventDefault();

      const accumulatedMouseMove = event.clientX - dragStartX.current;
      const newWidth = clamp(
        dragStartWidth.current + accumulatedMouseMove,
        minWidth,
        maxWidth,
      );
      onWidthChange(newWidth);

      onColumnWidthChange(columnContext.index, newWidth);
    },
    [
      onWidthChange,
      minWidth,
      maxWidth,
      onColumnWidthChange,
      columnContext.index,
    ],
  );
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    activePointerId.current = null;
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("pointermove", handleDragging);
    document.addEventListener("pointerup", handleDragEnd);

    return () => {
      document.removeEventListener("pointermove", handleDragging);
      document.removeEventListener("pointerup", handleDragEnd);
    };
  }, [isDragging, handleDragging, handleDragEnd]);

  return (
    <styled.DataTable2Column
      ref={thElement}
      className={className}
      style={{
        minWidth:
          isFinite(minWidth) && minWidth <= maxWidth ? minWidth : undefined,
        maxWidth:
          isFinite(maxWidth) && minWidth <= maxWidth ? maxWidth : undefined,
      }}
    >
      {children}
      {isResizable && (
        <styled.DragHandle
          type="button"
          aria-label="resize the column"
          onPointerDown={handleDragStart}
        />
      )}
      {isDragging &&
        createPortal(
          <styled.DragArea
            data-min={width && minWidth >= width}
            data-max={width && maxWidth <= width}
          />,
          document.body,
        )}
    </styled.DataTable2Column>
  );
};

export const DataTable2Body = ({ children }: { children: ReactNode }) => {
  const { rowIds, setRowIds } = useContext(DataTable2Context);
  useEffect(() => {
    const newRowIds: string[] = [];
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (typeof child.props.id !== "string") return;
      newRowIds.push(child.props.id);
    });
    if (newRowIds.filter((id) => !rowIds.includes(id)).length === 0) return;
    setRowIds(newRowIds);
  }, [children, rowIds, setRowIds]);

  return <tbody>{children}</tbody>;
};

type DataTable2RowProps = {
  id: string;
  children: ReactNode;
};

export const DataTable2Row = ({ id, children }: DataTable2RowProps) => {
  const { checkedRows, setCheckedRows } = useContext(DataTable2Context);
  const isChecked = useMemo(() => checkedRows.includes(id), [id, checkedRows]);
  const handleCheck = useCallback(() => {
    const newCheckedRows = checkedRows.includes(id)
      ? checkedRows.filter((rowId) => rowId !== id)
      : [...checkedRows, id];
    setCheckedRows(newCheckedRows);
  }, [id, checkedRows, setCheckedRows]);
  return (
    <tr>
      <td>
        <Checkbox checked={isChecked} onChange={handleCheck} />
        <input type="checkbox" aria-label="この行を選択" />
      </td>
      {children}
    </tr>
  );
};
