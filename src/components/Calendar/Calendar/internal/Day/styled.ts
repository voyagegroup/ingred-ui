import styled from "styled-components";

const DayContainerBase = styled.button<{ selected?: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : "transparent"};
  color: ${({ selected, theme }) =>
    selected ? theme.palette.white : theme.palette.black};
  border: none;
  border-radius: 50%;
  height: ${({ theme }) => theme.spacing * 4}px;
  width: ${({ theme }) => theme.spacing * 4}px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : theme.palette.primary.highlight};
    transition: 0.3s;
  }
`;

export const DayContainer = styled(DayContainerBase)``;

export const DisableDayContainer = styled(DayContainerBase)`
  color: ${({ theme }) => theme.palette.gray.main};
  cursor: not-allowed;
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.gray.main};
  }
`;
