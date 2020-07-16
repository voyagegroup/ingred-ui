import styled from "styled-components";
import { Size } from "../../../../styles";
import { colors } from "../../../../styles/color";

const CELL_PADDING = 24;

export const StandardCell = styled.td`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding-left: ${({ theme }) => theme.spacing * 2}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export const HeaderCell = styled.th`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 2}px;
  /* TODO: 他に透明度指定する方法を聞く */
  box-shadow: 0 4px ${colors.basic[300]}3D;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: ${Size.Border.Small} solid ${colors.basic[300]};
`;
