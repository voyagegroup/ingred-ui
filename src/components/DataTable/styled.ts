import styled from "styled-components";
import { Size, Radius } from "../../styles";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const BorderContainer = styled.div<{ fullWidth?: boolean }>`
  border: ${({ fullWidth, theme }) =>
    fullWidth ? "none" : `${Size.Border.Small} solid ${theme.palette.divider}`};
  border-top: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ fullWidth }) => (fullWidth ? "none" : Radius.SMALL)};
`;

export const TableContainer = styled.div<{ maxHeight: string }>`
  overflow: scroll;
  max-height: ${({ maxHeight }) => maxHeight};
`;
