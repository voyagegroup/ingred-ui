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
  border-top: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.gray.highlight};
`;

export const IconContainer = styled.div`
  flex: 1 0 auto;
`;
