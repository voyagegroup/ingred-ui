import React, { useMemo, useCallback, useEffect } from "react";
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
export type DataTable2PaginationProps = {
  currentPage: number;
  pageSize: number;
  pageSizeOptions: number[];
  numOfItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (itemsPerPage: number) => void;
};

export const DataTable2Pagination = ({
  currentPage,
  pageSize,
  pageSizeOptions,
  numOfItems,
  onPageChange,
  onPageSizeChange,
}: DataTable2PaginationProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOnChange = useCallback(
    (size: number) => {
      // pageSize 変更により currentPage が maxPage を超える場合、
      // currentPage を maxPage に合わせる
      if (currentPage > Math.ceil(numOfItems / size) - 1) {
        onPageChange(Math.ceil(numOfItems / size) - 1);
      }

      onPageSizeChange(size);
      setIsOpen(false);
    },
    [currentPage, numOfItems, onPageChange, onPageSizeChange],
  );
  const minPage = 0;
  const maxPage = useMemo(
    () => Math.ceil(numOfItems / pageSize) - 1,
    [numOfItems, pageSize],
  );

  // handleOnChange 内部で currentPage のオーバーフロー表示をガードしているけれど、
  // 外から強制的に pageSize を変更（currentPage はそのまま）された場合に備えて、ここでもガードする
  useEffect(() => {
    if (currentPage > maxPage) {
      onPageChange(maxPage);
    }
  }, [currentPage, maxPage, onPageChange]);

  return (
    <styled.RowMenuPagination>
      <button
        type="button"
        aria-label="前のページへ"
        disabled={currentPage === minPage}
        onClick={() => onPageChange(Math.max(currentPage - 1, minPage))}
      >
        <Icon name="arrow_left" color="currentColor" />
      </button>
      <ContextMenu2Container>
        <ContextMenu2
          open={isOpen}
          width={296}
          trigger={
            <button type="button">
              {Math.min(currentPage * pageSize + 1, pageSize * maxPage)}
              <styled.RowMenuPaginationOperator>
                -
              </styled.RowMenuPaginationOperator>
              {Math.min((currentPage + 1) * pageSize, numOfItems)}
              <styled.RowMenuPaginationOperator>
                /
              </styled.RowMenuPaginationOperator>
              {numOfItems}
              <Icon name="arrow_right" size="sm" />
            </button>
          }
          onOpenChange={setIsOpen}
        >
          <ContextMenu2HeadingItem>表示件数を変更</ContextMenu2HeadingItem>
          {pageSizeOptions.map((option) => (
            <ContextMenu2CheckItem
              key={option}
              checked={pageSize === option}
              onChange={() => handleOnChange(option)}
            >
              {option}
            </ContextMenu2CheckItem>
          ))}
        </ContextMenu2>
      </ContextMenu2Container>
      <button
        type="button"
        aria-label="次のページへ"
        disabled={currentPage === maxPage}
        onClick={() => onPageChange(Math.min(currentPage + 1, maxPage))}
      >
        <Icon name="arrow_right" color="currentColor" />
      </button>
    </styled.RowMenuPagination>
  );
};
