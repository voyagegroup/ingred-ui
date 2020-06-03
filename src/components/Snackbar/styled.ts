import styled from "styled-components";

export const Container = styled.div<{
  horizontal: "left" | "right";
  vertical: "top" | "bottom";
}>`
  position: fixed;
  left: ${({ horizontal, theme }) =>
    horizontal === "left" ? `${theme.spacing * 3}px` : "auto"};
  right: ${({ horizontal, theme }) =>
    horizontal === "right" ? `${theme.spacing * 3}px` : "auto"};
  top: ${({ vertical, theme }) =>
    vertical === "top" ? `${theme.spacing * 3}px` : "auto"};
  bottom: ${({ vertical, theme }) =>
    vertical === "bottom" ? `${theme.spacing * 3}px` : "auto"};
  z-index: ${({ theme }) => theme.depth.snackbar};
`;
