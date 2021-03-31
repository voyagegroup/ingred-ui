import styled from "styled-components";
import { NavigationRailTransitionDuration } from "../constants";
import Typography from "../../Typography";

export const Container = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing * 2}px 0 ${theme.spacing * 2}px ${theme.spacing * 3}px`};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.background.hint : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const TextContainer = styled.div<{ isOpen: boolean }>`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing * 1.5}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity ${NavigationRailTransitionDuration}s;
  min-width: 0;
`;

export const TextWrapper = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ArrowIconWrapper = styled.div<{
  isExpand: boolean;
  isOpen: boolean;
}>`
  margin-right: ${({ theme }) => theme.spacing}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: rotate(${({ isExpand }) => (isExpand ? "180deg" : "none")});
  transition: transform 0.3s, opacity ${NavigationRailTransitionDuration}s;
`;

type ExpantionProps = {
  isExpand: boolean;
  delay: boolean;
  height: string;
};

export const Expantion = styled.div<ExpantionProps>`
  overflow-y: hidden;
  max-height: ${({ isExpand, height }) => (isExpand ? height : "0px")};
  transition: max-height 0.3s
    ${({ delay }) => (delay ? NavigationRailTransitionDuration : 0)}s;
`;
