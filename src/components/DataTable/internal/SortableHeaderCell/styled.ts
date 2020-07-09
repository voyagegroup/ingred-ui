import styled from "styled-components";
import { Size } from "../../../../styles";

type CellProps = {
  width: string;
  isSortable: boolean;
  ruledLine: boolean;
};

export const HeaderCell = styled.th<CellProps>`
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 2 - 2}px;

  box-shadow: ${({ theme, ruledLine }) =>
    ruledLine
      ? `inset 0 ${Size.Border.Small} 0 ${theme.palette.divider}, 
        inset 0 -${Size.Border.Small} 0 ${theme.palette.divider}, 
        inset -0.5px 0 0 ${theme.palette.divider}, 
        inset 0.5px 0 0 ${theme.palette.divider}`
      : `inset 0 ${Size.Border.Small} 0 ${theme.palette.divider},
    inset 0 -${Size.Border.Small} 0 ${theme.palette.divider}`};

  background-color: ${({ theme }) => theme.palette.gray.highlight};
`;

export const IconContainer = styled.div``;
