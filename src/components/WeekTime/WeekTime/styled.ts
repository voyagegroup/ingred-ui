import styled from "styled-components";

export const Container = styled.div``;

export const WeekTimeItem = styled.span<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    // eslint-disable-next-line no-nested-ternary
    active ? theme.palette.primary.main : theme.palette.white};
  border: 1px solid
    ${({ theme, active }) =>
      // eslint-disable-next-line no-nested-ternary
      active ? theme.palette.primary.dark : theme.palette.gray.main};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  height: ${({ theme }) => theme.spacing * 3}px;
  width: ${({ theme }) => theme.spacing * 3}px;
  outline: none;
`;
