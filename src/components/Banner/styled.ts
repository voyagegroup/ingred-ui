import styled, { css } from "styled-components";
import { BannerType, BannerSize } from "./Banner";

type ContainerProps = {
  type: BannerType;
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
          background-color: ${theme.palette.primary.highlight};
          color: ${theme.palette.primary.dark};
          border: 1px solid ${theme.palette.primary.light};
        `;
      case "warning":
        return css`
          background-color: ${theme.palette.warning.highlight};
          color: ${theme.palette.warning.dark};
          border: 1px solid ${theme.palette.warning.light};
        `;
      case "error":
        return css`
          background-color: ${theme.palette.danger.highlight};
          color: ${theme.palette.danger.dark};
          border: 1px solid ${theme.palette.danger.light};
        `;
      default:
        return css`
          background-color: ${theme.palette.primary.highlight};
          color: ${theme.palette.primary.dark};
          border: 1px solid ${theme.palette.primary.light};
        `;
    }
  }}
`;
