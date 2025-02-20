import React, { useMemo, useCallback, useEffect, useContext } from "react";
import * as styled from "./styled";
import { DataTable2Context } from "./context";
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
  const {
    isSmallLayout,
    totalCount,
    currentPage,
    pageSize,
    pageSizeOptions,
    setCurrentPage,
    setPageSize,
  } = useContext(DataTable2Context);
  const handleOnChange = useCallback(
    (size: number) => {
      // pageSize 変更により currentPage が maxPage を超える場合、
      // currentPage を maxPage に合わせる
      if (currentPage > Math.ceil(totalCount / size) - 1) {
        setCurrentPage(Math.ceil(totalCount / size) - 1);
      }

      setPageSize(size);
    },
    [currentPage, totalCount, setCurrentPage, setPageSize],
  );
  const minPage = 0;
  const maxPage = useMemo(
    () => Math.ceil(totalCount / pageSize) - 1,
    [totalCount, pageSize],
  );

  // handleOnChange 内部で currentPage のオーバーフロー表示をガードしているけれど、
  // 外から強制的に pageSize を変更（currentPage はそのまま）された場合に備えて、ここでもガードする
  useEffect(() => {
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPage, maxPage, setCurrentPage]);

  return (
    <styled.RowMenuPagination>
      <button
        type="button"
        aria-label="前のページへ"
        disabled={currentPage === minPage}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, minPage))}
      >
        <Icon name="arrow_left" color="currentColor" />
      </button>
      {/*
        本当は container query で表示分けをしたいけれど、
        styled-components が対応していないため、React 側で制御
      */}
      {!isSmallLayout && (
        <ContextMenu2Container>
          <ContextMenu2
            width={296}
            trigger={
              <button type="button">
                {Math.min(currentPage * pageSize + 1, pageSize * maxPage)}
                <styled.RowMenuPaginationOperator>
                  -
                </styled.RowMenuPaginationOperator>
                {Math.min((currentPage + 1) * pageSize, totalCount)}
                <styled.RowMenuPaginationOperator>
                  /
                </styled.RowMenuPaginationOperator>
                {totalCount}
                <Icon name="arrow_right" size="sm" />
              </button>
            }
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
      )}
      <button
        type="button"
        aria-label="次のページへ"
        disabled={currentPage === maxPage}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPage))}
      >
        <Icon name="arrow_right" color="currentColor" />
      </button>
    </styled.RowMenuPagination>
  );
};
