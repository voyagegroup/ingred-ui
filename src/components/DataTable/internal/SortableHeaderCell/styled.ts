import styled from "styled-components";
import { colors } from "../../../../styles/color";
import { Size } from "../../../../styles";

type CellProps = {
  width: string;
  isSortable: boolean;
  enableRuledLine: boolean;
};

export const HeaderCell = styled.th<CellProps>`
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
  white-space: nowrap;
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 2}px;
  /* TODO: 他に透明度指定する方法を聞く */
  box-shadow: 0 4px ${colors.basic[300]}3D;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: ${Size.Border.Small} solid ${colors.basic[300]};

  border-right: ${({ theme, enableRuledLine }) =>
    enableRuledLine
      ? `${Size.Border.Small} solid ${theme.palette.gray.light}`
      : "none"};
  &:last-of-type {
    border-right: none;
  }
`;
