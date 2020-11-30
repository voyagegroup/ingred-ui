import styled from "styled-components";

import { hexToRgba } from "../../../../utils/hexToRgba";

const CELL_PADDING = 24;

export const StandardCell = styled.td`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding-left: ${({ theme }) => theme.spacing * 2}px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const HeaderCell = styled.th`
  text-align: left;
  width: ${CELL_PADDING + 18}px;
  padding: ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 2}px;
  box-shadow: 0 4px ${({ theme }) => hexToRgba(theme.palette.gray.main, 0.24)};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;
