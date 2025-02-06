import React, { type ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../styles";

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

//
// -----------------------------------------------------------------------------

export const RowsControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${colors.basic[100]};
`;

export const RowMenuTriggerLabel = styled.span`
  display: flex;

  em {
    font-style: normal;
    font-weight: 700;
    color: ${colors.blue[500]};
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
  gap: 8px;
`;

//
// -----------------------------------------------------------------------------

export const DataTable2Header = styled.thead`
  position: sticky;
  top: 0;
`;

export const DragHandle = styled.button`
  position: absolute;
  inset: 0 -5px 0 auto;
  width: 10px;
  padding: 0;
  border: 0;
  cursor: col-resize;
  background: red;

  touch-action: none;
  user-select: none;
  webkit-user-select: none;
`;

// thead 内の th 要素
export const DataTable2Column = styled.th`
  position: relative;
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
