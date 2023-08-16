import styled from "styled-components";
import { Flex } from "..";

export const Container = styled.div`
  padding: 0 ${({ theme }) => theme.spacing * 3}px;
  position: relative;
  width: fit-content;
`;

export const ScrollContainer = styled.div`
  overflow-y: scroll;
  max-height: 400px;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing}px;
  border: none;
`;

export const DatePickerContainer = styled(Flex)`
  padding: ${({ theme }) => theme.spacing}px;
  border: none;
  width: fit-content;
`;

export const CalendarContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: ${({ theme }) => theme.spacing * 6}px;
`;

export const DayStyle = styled.span`
  padding: ${({ theme }) => theme.spacing}px 0;
  text-align: center;
  color: ${({ theme }) => theme.palette.gray.dark};
`;

export const CalendarMonth = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
`;

export const IconContainer = styled.button`
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing}px;
  right: ${({ theme }) => theme.spacing}px;
  border: none;
  background: none;
`;
