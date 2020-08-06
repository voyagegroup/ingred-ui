import styled from "styled-components";
import { Border } from "../../styles";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const BorderContainer = styled.div<{ fullWidth?: boolean }>`
  border: ${({ fullWidth, theme }) =>
    fullWidth ? "none" : `${Border.Small} solid ${theme.palette.divider}`};
  border-top: ${Border.Small} solid ${({ theme }) => theme.palette.divider};
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
  max-height: ${({ maxHeight }) => maxHeight};
`;
