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
  padding: ${({ theme, size }) =>
    size === "small"
      ? `${theme.spacing}px ${theme.spacing * 1.5}px`
      : `${theme.spacing * 2}px`};
  border-radius: 6px;
  position: relative;

  & > div {
    gap: ${({ theme }) => theme.spacing}px;
  }

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
  font-size: ${({ size }) =>
    size === "small" ? `${fontSize.sm}px` : `${fontSize.md}px`};
  line-height: 1.4;
  color: inherit;
`;
