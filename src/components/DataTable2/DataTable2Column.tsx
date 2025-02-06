import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
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
