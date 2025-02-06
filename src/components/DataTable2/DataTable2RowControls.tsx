import React, { useContext } from "react";
import * as styled from "./styled";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2HeadingItem,
  ContextMenu2ButtonItem,
} from "../ContextMenu2";
import { DataTable2Context } from "./context";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2RowControls = () => {
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
            <Icon name="arrow_down" />
          </styled.RowMenuTrigger>
        }
      >
        <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
        <ContextMenu2ButtonItem>有効にする</ContextMenu2ButtonItem>
        <ContextMenu2ButtonItem>アーカイブする</ContextMenu2ButtonItem>
        <ContextMenu2HeadingItem>操作</ContextMenu2HeadingItem>
        <ContextMenu2ButtonItem>複製する</ContextMenu2ButtonItem>
        <ContextMenu2ButtonItem color="danger">削除する</ContextMenu2ButtonItem>
      </ContextMenu2>
    </ContextMenu2Container>
  );
};
