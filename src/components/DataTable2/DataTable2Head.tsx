import React, {
  useMemo,
  useContext,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { DataTable2Context, ColumnContext } from "./context";
import * as styled from "./styled";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2HeadProps = {
  children: ReactNode;
};

export const DataTable2Head = ({ children }: DataTable2HeadProps) => {
  const { hasRowControls, columns } = useContext(DataTable2Context);

  const childrenWithData = useMemo(() => {
    return Children.toArray(children)
      .map((child, i) => {
        const column = columns[i];
        return {
          id: column.id,
          index: i,
          order: column.order,
          visible: column.visible,
          child,
        };
      })
      .filter((data) => data.id !== undefined);
  }, [children, columns]);

  // children を order に従って並び替える
  const childrenWithDataVisibleOrdered = useMemo(() => {
    return childrenWithData
      .sort((a, b) => a.order - b.order)
      .filter((data) => data.visible);
  }, [childrenWithData]);

  return (
    <>
      {/* 幅を決めるための <col/> 展開する。<th> 自体には width を指定しない */}
      <colgroup>
        {hasRowControls && <col style={{ width: 34 }} />}
        {childrenWithDataVisibleOrdered.map(({ id, child }) => {
          if (!isValidElement(child)) return null;
          const props = child.props as { width?: string | number };
          return <col key={id} style={{ width: props.width }} />;
        })}
      </colgroup>
      <styled.DataTable2Header>
        <tr>
          {hasRowControls && <th aria-label="empty cell" />}
          {childrenWithDataVisibleOrdered.map(({ id, index, child }) => (
            <ColumnContext.Provider key={id} value={{ index: index }}>
              {child}
            </ColumnContext.Provider>
          ))}
        </tr>
      </styled.DataTable2Header>
    </>
  );
};
