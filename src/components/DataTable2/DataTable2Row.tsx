import React, { useMemo, useCallback, useContext, type ReactNode } from "react";
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
  const { checkedRows, setCheckedRows } = useContext(DataTable2Context);
  const isChecked = useMemo(() => checkedRows.includes(id), [id, checkedRows]);
  const handleCheck = useCallback(() => {
    const newCheckedRows = checkedRows.includes(id)
      ? checkedRows.filter((rowId) => rowId !== id)
      : [...checkedRows, id];
    setCheckedRows(newCheckedRows);
  }, [id, checkedRows, setCheckedRows]);
  return (
    <styled.DataTable2Row data-highlighted={isChecked}>
      <td>
        <styled.CheckboxWrapper>
          <Checkbox checked={isChecked} onChange={handleCheck} />
          <input type="checkbox" aria-label="この行を選択" />
        </styled.CheckboxWrapper>
      </td>
      {children}
    </styled.DataTable2Row>
  );
};
