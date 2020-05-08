import styled from "styled-components";
import { colors } from "../../../../styles/color";
import { Size } from "../../../../styles/size";

type CellProps = {
  width: string;
  isSortable: boolean;
};

export const HeaderCell = styled.th<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 2 - 2}px;
  background-color: ${colors.basic[100]};
  border-bottom: ${Size.Border.Normal} solid
    ${({ theme }) => theme.palette.gray.light};
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
`;

export const IconContainer = styled.div`
  /* flex: 1 0 auto; */
`;
