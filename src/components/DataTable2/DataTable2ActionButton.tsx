import React, { useContext, type ReactNode, type ReactElement } from "react";
import * as styled from "./styled";
import { DataTable2Context } from "./context";
import { ContextMenu2ButtonItem } from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2ActionButtonProps = {
  prepend?: ReactElement<any>;
  children: ReactNode;
  onClick?: () => void;
};
export const DataTable2ActionButton = ({
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
