import styled from "styled-components";
import { colors } from "../../../../styles/color";
import { Size } from "../../../../styles";
import { hexToRgba } from "../../../../utils/hexToRgba";

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
  box-shadow: 0 4px ${hexToRgba(colors.basic[300], 0.24)};
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
