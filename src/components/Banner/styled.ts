import styled, { css } from "styled-components";
import { BannerType, BannerSize } from "./types";
import { fontSize } from "../Typography/Typography";

type ContainerProps = {
  type: BannerType;
  size: BannerSize;
};

type ContentWrapperProps = {
  size: BannerSize;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  /* サイズに応じたパディングの調整 */
  padding: ${({ theme, size }) =>
    size === "small" ? `${theme.spacing}px` : `${theme.spacing * 1.5}px`};
  border-radius: ${({ theme, size }) =>
    size === "small" ? `${theme.radius / 2}px` : `${theme.radius}px`};
  position: relative;


  /* タイプに基づいたスタイリング（背景色、テキスト色、ボーダー色） */
  ${({ theme, type }) => {
    switch (type) {
      case "info":
        return css`
          background-color: ${theme.palette.primary.ultraLight};
          color: ${theme.palette.primary.dark};
          border: 1px solid ${theme.palette.primary.light};
        `;
      case "warning":
        return css`
          background-color: ${theme.palette.warning.ultraLight};
          color: ${theme.palette.warning.deepDark};
          border: 1px solid ${theme.palette.warning.dark};
        `;
      case "error":
        return css`
          background-color: ${theme.palette.danger.ultraLight};
          color: ${theme.palette.danger.dark};
          border: 1px solid ${theme.palette.danger.light};
        `;
      default:
        return css`
          background-color: ${theme.palette.primary.ultraLight};
          color: ${theme.palette.primary.dark};
          border: 1px solid ${theme.palette.primary.light};
        `;
    }
  }}
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  align-items: center;
  /* サイズに応じたフォントサイズの調整 */
  font-size: ${({ size }) =>
    size === "small" ? `${fontSize.sm}px` : `${fontSize.md}px`};
  line-height: 1.4;
  color: inherit;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: ${({ theme }) => theme.spacing}px;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radius / 2}px;
  transition: background-color 0.2s;

  &:hover {
    background-color: color-mix(in srgb, currentColor 4%, transparent);
  }
`;
