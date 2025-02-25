import React, { type ReactNode } from "react";
import * as styled from "./styled";
import Spinner from "../Spinner";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2CellProps = {
  loading?: boolean;
  children: ReactNode;
};

export const DataTable2Cell = ({ loading, children }: DataTable2CellProps) => (
  <td>
    <styled.DataTable2CellInner>
      <styled.DataTable2CellContents>{children}</styled.DataTable2CellContents>
      {loading && (
        <styled.DataTable2CellSpinner>
          <Spinner width="20px" />
        </styled.DataTable2CellSpinner>
      )}
    </styled.DataTable2CellInner>
  </td>
);
