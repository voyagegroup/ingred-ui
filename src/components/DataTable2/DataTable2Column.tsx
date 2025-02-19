import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { SortDirection } from "./types";
import * as styled from "./styled";
import { DataTable2Context, ColumnContext } from "./context";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
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
  const { setColumnWidth: onColumnWidthChange } = useContext(DataTable2Context);
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
      data-dragging={isDragging}
      style={{
        minWidth:
          isFinite(minWidth) && minWidth <= maxWidth ? minWidth : undefined,
        maxWidth:
          isFinite(maxWidth) && minWidth <= maxWidth ? maxWidth : undefined,
      }}
    >
      <styled.DataTable2ColumnInner>
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
      </styled.DataTable2ColumnInner>
    </styled.DataTable2Column>
  );
};

////////////////////////////////////////////////////////////////////////////////
type DataTable2ColumnLabelProps = {
  showSortButton?: true;
  sortButtonDirection?: SortDirection;
  onSortChange?: (direction: SortDirection) => void;
  children: ReactNode;
};
export const DataTable2ColumnLabel = ({
  showSortButton,
  sortButtonDirection,
  onSortChange,
  children,
}: DataTable2ColumnLabelProps) => {
  const nextSortButtonDirection = useMemo(() => {
    if (sortButtonDirection === "asc") return "desc";
    if (sortButtonDirection === "desc") return undefined;
    return "asc";
  }, [sortButtonDirection]);
  const handleClick = useCallback(() => {
    onSortChange?.(nextSortButtonDirection);
  }, [onSortChange, nextSortButtonDirection]);
  return (
    <styled.DataTable2ColumnLabel>
      {children}
      {showSortButton && (
        <styled.SortButton
          type="button"
          aria-label="sort the column"
          data-sort-direction={sortButtonDirection}
          onClick={handleClick}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M8.17 3.25a1 1 0 0 1 1.3-.33c.15.08.27.19.36.33l2.13 3.2c.1.15.16.33.17.51 0 .18-.03.36-.12.52s-.21.29-.37.39a1 1 0 0 1-.51.14H6.87a1 1 0 0 1-.83-1.56z" />
            <path d="M9.83 14.75a1 1 0 0 1-1.3.33.95.95 0 0 1-.36-.33l-2.13-3.2c-.1-.15-.16-.33-.17-.51 0-.18.03-.36.12-.52s.21-.29.37-.39a1 1 0 0 1 .51-.14h4.26a1 1 0 0 1 .83 1.56z" />
          </svg>
        </styled.SortButton>
      )}
    </styled.DataTable2ColumnLabel>
  );
};
