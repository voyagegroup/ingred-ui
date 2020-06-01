import styled from "styled-components";
import { Size } from "../../../../styles";

const CELL_PADDING = 24;

export const StandardCell = styled.td`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing * 2}px 0
    ${({ theme }) => theme.spacing * 2}px ${({ theme }) => theme.spacing * 3}px;
`;

export const HeaderCell = styled.th`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing * 2}px 0
    ${({ theme }) => theme.spacing * 2 - 2}px
    ${({ theme }) => theme.spacing * 3}px;
  box-shadow: inset 0 ${Size.Border.Small} 0
      ${({ theme }) => theme.palette.divider},
    inset 0 -${Size.Border.Small} 0 ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.gray.highlight};
`;
