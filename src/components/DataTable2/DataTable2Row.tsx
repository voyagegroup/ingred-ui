import React, {
  useMemo,
  useCallback,
  useContext,
  Children,
  type ReactNode,
} from "react";
import * as styled from "./styled";
import { DataTable2Context } from "./context";
import Checkbox from "../Checkbox";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2RowProps = {
  id: string;
  children: ReactNode;
};

export const DataTable2Row = ({ id, children }: DataTable2RowProps) => {
  const { isSmallLayout, columns, checkedRows, setCheckedRows, rowSpacing } =
    useContext(DataTable2Context);
  const isChecked = useMemo(() => checkedRows.includes(id), [id, checkedRows]);
  const handleCheck = useCallback(() => {
    const newCheckedRows = checkedRows.includes(id)
      ? checkedRows.filter((rowId) => rowId !== id)
      : [...checkedRows, id];
    setCheckedRows(newCheckedRows);
  }, [id, checkedRows, setCheckedRows]);

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
    <styled.DataTable2Row
      data-highlighted={isChecked}
      data-spacing={rowSpacing}
      isSmallLayout={isSmallLayout}
    >
      <td>
        <styled.CheckboxWrapper>
          <Checkbox checked={isChecked} onChange={handleCheck} />
          <input type="checkbox" aria-label="この行を選択" />
        </styled.CheckboxWrapper>
      </td>
      {childrenWithDataVisibleOrdered.map(({ child }) => child)}
    </styled.DataTable2Row>
  );
};
