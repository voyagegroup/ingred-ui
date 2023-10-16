import styled from "styled-components";

export const Container = styled.div``;

export const WeekTimeItem = styled.button<{ active: boolean; hover: boolean }>`
  background-color: ${({ active, hover, theme }) =>
    // eslint-disable-next-line no-nested-ternary
    hover
      ? theme.palette.primary.highlight
      : active
      ? theme.palette.primary.main
      : theme.palette.white};
  border: 1px solid
    ${({ theme, active, hover }) =>
      // eslint-disable-next-line no-nested-ternary
      hover
        ? theme.palette.primary.light
        : active
        ? theme.palette.primary.dark
        : theme.palette.gray.main};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  cursor: pointer;
  height: ${({ theme }) => theme.spacing * 3}px;
  width: ${({ theme }) => theme.spacing * 3}px;
  outline: none;
`;
