import styled, { css } from "styled-components";

// 背景オーバーレイ
export type BackdropProps = {
  shouldShow: boolean;
  transitionDuration: number;
};

export const Backdrop = styled.div<BackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(4, 28, 51, 0.8);
  z-index: 1200;
  opacity: ${({ shouldShow }) => shouldShow ? 1 : 0};
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms ease-out;
`;

// Drawerコンテナ
export type DrawerContainerProps = {
  direction: "left" | "right" | "bottom";
  currentSize: number;
  shouldShow: boolean;
  transitionDuration: number;
};

const getContainerTransform = (direction: string, shouldShow: boolean) => {
  if (shouldShow) {
    return "translate3d(0, 0, 0)"; // 画面内位置（最終位置）
  }
  
  // 画面外位置（初期位置）
  switch (direction) {
    case "left":
      return "translate3d(-100%, 0, 0)";
    case "right":
      return "translate3d(100%, 0, 0)";
    case "bottom":
      return "translate3d(0, 100%, 0)";
    default:
      return "translate3d(0, 0, 0)";
  }
};

export const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  top: ${({ direction }) => direction === "bottom" ? "auto" : 0};
  bottom: ${({ direction }) => direction === "bottom" ? 0 : 0};
  left: ${({ direction }) => direction === "right" ? "auto" : 0};
  right: ${({ direction }) => direction === "left" ? "auto" : 0};
  width: ${({ direction, currentSize }) => direction === "bottom" ? "100%" : `${currentSize}px`};
  height: ${({ direction, currentSize }) => direction === "bottom" ? `${currentSize}px` : "100%"};
  background-color: ${({ theme }) => theme?.palette?.background?.default || "#ffffff"};
  box-shadow: 0 2px 16px rgba(4, 28, 51, 0.12);
  z-index: 1201;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: ${({ direction, shouldShow }) => getContainerTransform(direction, shouldShow)};
  transition: transform ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1);
`;

// リサイズハンドル
export type ResizeHandleProps = {
  direction: "left" | "right" | "bottom";
};

export const ResizeHandle = styled.div<ResizeHandleProps>`
  position: absolute;
  z-index: 10;
  background-color: transparent;
  cursor: ${({ direction }) => direction === "bottom" ? "ns-resize" : "ew-resize"};
  transition: border-color 0.2s ease;
  
  ${({ direction }) => {
    switch (direction) {
      case "left":
        return css`
          top: 0;
          right: 0;
          width: 8px;
          height: 100%;
          border-right: 2px solid transparent;
          
          &:hover {
            border-right: 2px solid ${({ theme }) => theme?.palette?.primary?.main || "#0b82f4"};
          }
        `;
      case "right":
        return css`
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          border-left: 2px solid transparent;
          
          &:hover {
            border-left: 2px solid ${({ theme }) => theme?.palette?.primary?.main || "#0b82f4"};
          }
        `;
      case "bottom":
        return css`
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          border-top: 2px solid transparent;
          
          &:hover {
            border-top: 2px solid ${({ theme }) => theme?.palette?.primary?.main || "#0b82f4"};
          }
        `;
      default:
        return "";
    }
  }}
`;

// スティッキーヘッダー
export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme?.palette?.background?.default || "#ffffff"};
  z-index: 1;
  border-bottom: 1px solid ${({ theme }) => theme?.palette?.divider || "#e5e7eb"};
  margin-bottom: 8px;
  padding-bottom: 8px;
`;

// スクロール可能なコンテンツエリア
export const ScrollableContent = styled.div`
  flex: 1;
  overflow: auto;
`;

// スティッキーフッター
export const StickyFooter = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${({ theme }) => theme?.palette?.background?.default || "#ffffff"};
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme?.palette?.divider || "#e5e7eb"};
  margin-top: 8px;
  padding-top: 8px;
`; 