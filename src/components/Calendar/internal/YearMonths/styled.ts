import styled, { keyframes } from "styled-components";
import Typography from "../../../Typography/Typography";
import { Flex } from "../../..";

export const YearMonthsContainer = styled(Flex)`
  border: none;
  width: fit-content;
  position: absolute;
  z-index: 100;
  background-color: ${({ theme }) => theme.palette.white};
`;

export const YearMonthTitleContainer = styled.div`
  top: 0;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
  padding-right: ${({ theme }) => theme.spacing * 3}px;
  align-items: center;
`;

export const YearContainer = styled(Typography)`
  padding-bottom: ${({ theme }) => theme.spacing}px;
`;

export const MonthContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: ${({ theme }) => theme.spacing * 4}px;
  grid-gap: ${({ theme }) => theme.spacing * 1.2}px;
`;

export const Month = styled.button`
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.palette.black};
  background: white;
`;

const hideAnimation = keyframes`
  0%,
  99.99% {
    visibility: visible;
    opacity: 0;
  }
  100% {
    visibility: hidden;
    opacity: 1;
  }
`;

export const IconButton = styled.div<{ expanded: boolean }>`
  padding: 0px ${({ theme }) => theme.spacing}px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  transform: rotate(180deg);
  animation: ${({ expanded }) => (expanded ? hideAnimation : "")} 0.3s;
  cursor: pointer;
`;
