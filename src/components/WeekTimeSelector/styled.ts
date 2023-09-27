import styled from "styled-components";

export const Container = styled.div``;

export const WeekTimeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing * 2}px;
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  grid-gap: ${({ theme }) => theme.spacing / 2}px;
  align-items: center;
  justify-items: center;
  width: fit-content;
`;

export const TimeContainer = styled.div``;

export const WeekTimeItem = styled.button<{ active: boolean; hover: boolean }>`
  background-color: ${({ active, hover, theme }) =>
    // eslint-disable-next-line no-nested-ternary
    hover
      ? theme.palette.primary.highlight
      : active
      ? theme.palette.primary.main
      : theme.palette.gray.highlight};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  cursor: pointer;
  height: ${({ theme }) => theme.spacing * 3}px;
  width: ${({ theme }) => theme.spacing * 3}px;
  border: none;
  outline: none;
`;
