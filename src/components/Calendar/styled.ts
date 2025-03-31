import styled from "styled-components";
import { Flex, Typography } from "..";
import { getShadow } from "../../utils/getShadow";
import { StyledComponentProps } from "../../utils/styledTypes";

export const Card = styled(Flex)<StyledComponentProps>`
  box-shadow: ${({ theme }) =>
    getShadow(
      5,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.white};
  width: fit-content;
  overflow: hidden;
  position: relative;
  display: flex;
`;

export const Container = styled.div<StyledComponentProps>`
  padding: 0 ${({ theme }) => theme.spacing * 3}px;
  position: relative;
  width: fit-content;
`;

export const ScrollContainer = styled.div<StyledComponentProps>`
  overflow-y: scroll;
  max-height: 400px;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing}px;
  border: none;
`;

export const DatePickerContainer = styled(Flex)<StyledComponentProps>`
  padding: ${({ theme }) => theme.spacing}px;
  padding-top: 0;
  border: none;
  width: fit-content;
`;

export const CalendarContainer = styled(Flex)<StyledComponentProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: ${({ theme }) => theme.spacing * 6}px;
`;

export const DayStyle = styled.span<StyledComponentProps>`
  padding: ${({ theme }) => theme.spacing}px 0;
  text-align: center;
  color: ${({ theme }) => theme.palette.gray.deepDark};
`;

export const TitleContainer = styled(Typography)<
  { expanded: boolean } & StyledComponentProps
>`
  color: ${({ theme, expanded }) =>
    expanded ? "transparent" : theme.palette.black};
  transition: color 300ms;
`;

export const CalendarMonth = styled.div<
  { expanded: boolean } & StyledComponentProps
>`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
  align-items: center;
  background-color: ${({ theme, expanded }) =>
    expanded ? "transparent" : theme.palette.background.default};
  transition: background-color 300ms;
`;

export const IconContainer = styled.button<
  { expanded: boolean; onClick?: () => void } & StyledComponentProps
>`
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing * 2}px;
  right: ${({ theme }) => theme.spacing * 2}px;
  border: none;
  background: none;
  opacity: ${({ expanded }) => (expanded ? 0 : 1)};
  transition: opacity 300ms;
`;

export const IconButton = styled.div<
  { expanded: boolean } & StyledComponentProps
>`
  padding: 0px ${({ theme }) => theme.spacing}px;
  transition: transform 150ms;
  transform-origin: center center;
  transform: ${({ expanded }) => (expanded ? "rotate(180deg)" : "rotate(0)")};
  cursor: pointer;
`;
