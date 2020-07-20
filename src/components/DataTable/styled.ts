import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const BorderContainer = styled.div<{ fullWidth?: boolean }>`
  border: ${({ fullWidth }) =>
    fullWidth ? "none" : `${Size.Border.Small} solid ${colors.basic[300]}`};
  border-top: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${({ fullWidth }) => (fullWidth ? "none" : Radius.SMALL)};
`;

export const TableContainer = styled.div<{ maxHeight: string }>`
  overflow: scroll;
  max-height: ${({ maxHeight }) => maxHeight};
`;
