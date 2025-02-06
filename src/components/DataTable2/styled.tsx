import React, { type ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import { palette } from "../../themes/palette";
import { getShadow } from "../../utils/getShadow";

const actionButton = `
  display: flex;
  gap: 4px;
  box-sizing: border-box;
  padding: 4px;
  border: 1px solid ${colors.basic[400]};
  border-radius: 4px;
  background: #ffffff;
  /* UI/Text 12 */
  font-size: 12px;
  color: ${colors.basic[900]};
  cursor: pointer;
  box-shadow: ${getShadow(1, 0.04, palette.action.shadowBase)};
  &:where(:disabled) {
    color: ${colors.basic[400]};
    background: ${colors.basic[200]};
    box-shadow: ${getShadow(1, 0.04, palette.black)};
    cursor: not-allowed;
  }
  &:where(li:not(:first-child) button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &:where(li:not(:last-child) button) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:where(:hover:not(:disabled)) {
    background: ${colors.basic[100]};
  }
  &:where(:active:not(:disabled)) {
    padding-block: 6px 2px;
    background: ${palette.gray.highlight};
    box-shadow: ${getShadow(2, 0.04, palette.black)};
  }
`;

export const DataTable2 = styled.div`
  border: 1px solid ${colors.basic[400]};
`;

const ViewportInner = styled.div`
  width: max-content;
  min-width: 100%;

  table {
    table-layout: fixed;
    min-width: 100%;
    border-collapse: collapse;
  }
`;

export const Viewport = styled(
  ({ className, children }: { className?: string; children: ReactNode }) => {
    return (
      <div className={className}>
        <ViewportInner>{children}</ViewportInner>
      </div>
    );
  },
)`
  overflow: auto;
  height: 300px;
  overscroll-behavior-x: contain;
`;

// 最上部のヘッダー部分
// -----------------------------------------------------------------------------
export const RowsControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${colors.basic[100]};
`;

export const RowMenuTrigger = styled.button`
  ${actionButton}
  display: flex;

  em {
    font-style: normal;
    font-weight: 700;
    color: ${colors.blue[500]};
  }

  :disabled em {
    color: inherit;
  }
`;

export const RowsControlsSeparator = styled.hr`
  width: 1px;
  height: 20px;
  margin: 0;
  border: 0;
  border-left: 1px dashed ${colors.basic[400]};
`;

export const RowMenuPagination = styled.div`
  display: flex;
  gap: 0;

  button {
    ${actionButton}
    align-items: center;
    border-radius: 0;
    /* Slide/Text 13 */
    font-size: 13px;
    letter-spacing: 0.01em;
    color: ${colors.basic[900]};

    &:nth-child(n + 2) {
      margin-left: -1px;
    }

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
`;

export const RowMenuPaginationOperator = styled.span`
  color: ${colors.basic[600]};
`;

export const RowMenuFilterTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 4px;
  border: 0;
  border-radius: 4px;
  /* UI/Text 13 */
  font-size: 13px;
  line-height: 16px;
  color: ${colors.blue[500]};
  background: #ffffff;
  cursor: pointer;
  transition: background 0.2s;

  &:where(:hover),
  &:where([aria-expanded="true"]) {
    background: ${colors.blue[100]};
  }
`;

export const RowsControlsExtras = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const DataTable2ActionButton = styled.button`
  ${actionButton}
`;

export const DataTable2ExtrasMenuTrigger = styled.button`
  ${actionButton}
`;

//
// -----------------------------------------------------------------------------

export const DataTable2Header = styled.thead`
  position: sticky;
  z-index: 2;
  top: 0;
  background:
    linear-gradient(${colors.basic[400]}, ${colors.basic[400]}) 0 0 / 100% 1px
      no-repeat,
    linear-gradient(${colors.basic[400]}, ${colors.basic[400]}) 0 100% / 100%
      1px no-repeat,
    #fff;
  box-shadow: 0px 4px 0px rgba(4, 28, 51, 0.04);
`;

//
// -----------------------------------------------------------------------------

export const DataTable2Column = styled.th`
  height: 1px; /* 子要素の高さ 100% を有効にする。table-layout: fixed になっている必要がある */
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: ${colors.basic[900]};

  &:hover {
    z-index: 1;
  }
`;

// thead 内の th 要素
export const DataTable2ColumnInner = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 8px 10px;
  height: 100%;
  margin: 0 5px;
`;

export const DragHandle = styled.button`
  --color: ${colors.basic[400]};
  position: absolute;
  inset: 0 -10px 0 auto;
  width: 10px;
  padding: 0;
  border: 0;
  cursor: col-resize;
  background: transparent;
  touch-action: none;
  user-select: none;
  webkit-user-select: none;
  transition: --color 0.2s;

  &:hover,
  &:where(th[data-dragging="true"] *) {
    --color: ${colors.blue[500]};
  }

  &:where(th:last-child *) {
    right: -5px;
    width: 10px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    width: 1px;
    height: 100%;
    margin: auto;
    background: var(--color);
  }

  &:where(th:last-child *)::before {
    margin-right: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    width: 7px;
    height: 16px;
    margin: auto;
    border-inline: 1px solid var(--color);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:where(thead:hover *)::after,
  &:where(thead:has([data-dragging="true"]) *)::after {
    opacity: 1;
  }

  &:where(th:last-child *)::after {
    width: 4px;
    left: auto;
    border-right: 0;
  }
`;

// ドラッグ操作中のみ、画面全面にオーバーレイ表示される表示されるドラッグ領域
// この領域にマウスが乗っている間は、テキストのドラッグも防げるし、カーソルが変更される
export const DragArea = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0;
  cursor: col-resize;

  &[data-min="true"] {
    cursor: e-resize;
  }

  &[data-max="true"] {
    cursor: w-resize;
  }
`;

//
// -----------------------------------------------------------------------------
export const DataTable2Row = styled.tr`
  background: #ffffff;
  transition: background 0.2s;

  &[data-highlighted="true"] {
    background: ${colors.blue[100]};
  }

  &:not([data-highlighted="true"]):hover {
    background: ${colors.basic[100]};
  }

  td {
    padding: 12px 16px;
    font-size: 14px;
    line-height: 17px;
    color: ${colors.basic[900]};
    border-bottom: 1px solid ${colors.basic[400]};
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
`;

//
// -----------------------------------------------------------------------------
export const DataTable2InlineEditable = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  a {
    color: ${colors.blue[500]};
  }
`;
