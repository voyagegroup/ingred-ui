import styled from "styled-components";
import { DrawerTransitionDuration } from "../../constants";

export const Container = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-left: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.palette.primary.main}` : "none"};
  padding: ${({ theme, isActive }) =>
    `${theme.spacing * 2}px 0 ${theme.spacing * 2}px calc(${
      theme.spacing * 3
    }px + ${isActive ? 0 : 2}px)`};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.background.hint : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const TextWrapper = styled.div<{ isActive: boolean; isOpen: boolean }>`
  flex-shrink: 1;
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.spacing * 1.5}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  color: ${({ theme, isActive }) =>
    theme.palette.text[isActive ? "primary" : "secondary"]};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity ${DrawerTransitionDuration}s;
`;
