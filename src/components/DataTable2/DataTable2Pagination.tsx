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
      // pageSize 変更時に、ページ数が変わるため、ページをリセットする
      setCurrentPage(0);
      setPageSize(size);
    },
    [setCurrentPage, setPageSize],
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
    <styled.ToolbarPagination>
      <button
        type="button"
        aria-label="前のページへ"
        disabled={currentPage === minPage || totalCount === 0}
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
                {totalCount === 0 ? (
                  <>0 / 0</>
                ) : (
                  <>
                    {Math.min(currentPage * pageSize + 1, totalCount)}
                    <styled.ToolbarPaginationOperator>
                      -
                    </styled.ToolbarPaginationOperator>
                    {Math.min((currentPage + 1) * pageSize, totalCount)}
                    <styled.ToolbarPaginationOperator>
                      /
                    </styled.ToolbarPaginationOperator>
                    {totalCount}
                  </>
                )}
                <Icon name="arrow_down" size="sm" color="currentColor" />
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
        disabled={currentPage === maxPage || totalCount === 0}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPage))}
      >
        <Icon name="arrow_right" color="currentColor" />
      </button>
    </styled.ToolbarPagination>
  );
};
