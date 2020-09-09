import styled from "styled-components";

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
  box-shadow: 0 4px ${({ theme }) => hexToRgba(theme.palette.gray.main, 0.24)};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  border-right: ${({ theme, enableRuledLine }) =>
    enableRuledLine ? `1px solid ${theme.palette.divider}` : "none"};
  &:last-of-type {
    border-right: none;
  }
`;
