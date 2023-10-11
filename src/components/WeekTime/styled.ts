import styled from "styled-components";

export const Container = styled.div``;

export const WeekTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 38px repeat(24, 1fr);
  grid-gap: ${({ theme }) => theme.spacing / 2}px;
  align-items: center;
  justify-items: center;
  width: fit-content;
`;

export const ContainerBase = styled.div`
  height: 24px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  border: 1px solid ${({ theme }) => theme.palette.gray.main};
`;

export const WeekContainer = styled(ContainerBase)`
  width: 38px;
`;

export const TimeContainer = styled(ContainerBase)`
  width: 24px;
`;

export const EmptyContainer = styled(ContainerBase)`
  border: none;
`;

export const WeekTimeItem = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.white};
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.palette.primary.dark : theme.palette.gray.main};
  border-radius: ${({ theme }) => theme.spacing / 2}px;
  height: ${({ theme }) => theme.spacing * 3}px;
  width: ${({ theme }) => theme.spacing * 3}px;
  outline: none;
`;
