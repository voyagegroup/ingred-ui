import React, { type ReactNode } from "react";
import * as styled from "./styled";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2InlineEditableProps = {
  command: ReactNode;
  children: ReactNode;
};

export const DataTable2InlineEditable = ({
  command,
  children,
}: DataTable2InlineEditableProps) => {
  return (
    <styled.DataTable2InlineEditable>
      {children}
      {command}
    </styled.DataTable2InlineEditable>
  );
};
