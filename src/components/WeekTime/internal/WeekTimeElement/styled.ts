import styled from "styled-components";

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
