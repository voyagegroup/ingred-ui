import styled, { css } from "styled-components";
import { addScrollbarProperties } from "../../utils/scrollbar";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const BorderContainer = styled.div<{ fullWidth?: boolean }>`
  border: ${({ fullWidth, theme }) =>
    fullWidth ? "none" : `1px solid ${theme.palette.divider}`};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ fullWidth, theme }) =>
    fullWidth ? "none" : `${theme.radius}px`};
`;

export const TableContainer = styled.div<{
  maxHeight: string;
  horizontalScrollable: boolean;
}>`
  overflow-x: ${({ horizontalScrollable }) =>
    horizontalScrollable ? "scroll" : "visible"};
  overflow-y: ${({ maxHeight }) =>
    maxHeight !== "none" ? "scroll" : "visible"};
  ${({ maxHeight }) =>
    maxHeight !== "none"
      ? addScrollbarProperties({ maxHeight })
      : css`
          overflow-y: visible;
          max-height: ${maxHeight};
        `}
`;
