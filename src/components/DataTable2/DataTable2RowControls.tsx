import React, { useContext, type ReactNode } from "react";
import * as styled from "./styled";
import Icon from "../Icon";
import { ContextMenu2, ContextMenu2Container } from "../ContextMenu2";
import { DataTable2Context } from "./context";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2RowControls = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { checkedRows } = useContext(DataTable2Context);

  return (
    <ContextMenu2Container>
      <ContextMenu2
        width={200}
        trigger={
          <styled.RowMenuTrigger
            type="button"
            disabled={checkedRows.length === 0}
          >
            <em>{checkedRows.length}</em>件選択
            <Icon name="arrow_down" color="currentColor" />
          </styled.RowMenuTrigger>
        }
      >
        {children}
      </ContextMenu2>
    </ContextMenu2Container>
  );
};
