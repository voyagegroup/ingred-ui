import styled from "styled-components";

type CellProps = {
  width: string;
  isSortable: boolean;
};

export const HeaderCell = styled.th<CellProps>`
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 2 - 2}px;
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
`;

export const IconContainer = styled.div`
  flex: 1 0 auto;
`;
