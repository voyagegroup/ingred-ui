import styled from "styled-components";
import { Size } from "../../../../styles";
import { colors } from "../../../../styles/color";

const CELL_PADDING = 24;

export const StandardCell = styled.td`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing * 2}px 0
    ${({ theme }) => theme.spacing * 2}px ${({ theme }) => theme.spacing * 3}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export const HeaderCell = styled.th`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing * 2}px 0
    ${({ theme }) => theme.spacing * 2 - 2}px
    ${({ theme }) => theme.spacing * 3}px;
  background-color: ${colors.basic[100]};
  border-bottom: ${Size.Border.Normal} solid
    ${({ theme }) => theme.palette.gray.light};
`;
