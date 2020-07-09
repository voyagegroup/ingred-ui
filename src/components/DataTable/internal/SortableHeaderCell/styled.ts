import styled from "styled-components";
import { Size } from "../../../../styles";

type CellProps = {
  width: string;
  isSortable: boolean;
};

export const HeaderCell = styled.th<CellProps>`
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 2 - 2}px;
  box-shadow: inset 0 ${Size.Border.Small} 0
      ${({ theme }) => theme.palette.divider},
    inset 0 -${Size.Border.Small} 0 ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-right: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export const IconContainer = styled.div``;
