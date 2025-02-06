import React from "react";
import * as styled from "./styled";
import Icon from "../Icon";
import {
  ContextMenu2Container,
  ContextMenu2,
  ContextMenu2HeadingItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2Pagination = () => {
  return (
    <styled.RowMenuPagination>
      <button type="button" aria-label="前のページへ">
        <Icon name="arrow_left" color="currentColor" />
      </button>
      <ContextMenu2Container>
        <ContextMenu2
          width={296}
          trigger={
            <button type="button">
              1
              <styled.RowMenuPaginationOperator>
                -
              </styled.RowMenuPaginationOperator>
              100
              <styled.RowMenuPaginationOperator>
                /
              </styled.RowMenuPaginationOperator>
              1,000
              <Icon name="arrow_right" size="sm" />
            </button>
          }
        >
          <ContextMenu2HeadingItem>表示件数を変更</ContextMenu2HeadingItem>
          <ContextMenu2CheckItem>10</ContextMenu2CheckItem>
          <ContextMenu2CheckItem>20</ContextMenu2CheckItem>
          <ContextMenu2CheckItem>50</ContextMenu2CheckItem>
          <ContextMenu2CheckItem checked>100</ContextMenu2CheckItem>
          <ContextMenu2CheckItem>200</ContextMenu2CheckItem>
        </ContextMenu2>
      </ContextMenu2Container>
      <button type="button" aria-label="次のページへ">
        <Icon name="arrow_right" color="currentColor" />
      </button>
    </styled.RowMenuPagination>
  );
};
