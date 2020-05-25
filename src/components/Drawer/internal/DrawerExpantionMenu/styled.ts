import styled from "styled-components";

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
  padding-left: ${({ theme }) => theme.spacing * 1.5}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  color: ${({ theme, isActive }) =>
    theme.palette.text[isActive ? "primary" : "secondary"]};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.3s;
`;

export const ArrowIconWrapper = styled.div<{
  isExpand: boolean;
  isOpen: boolean;
}>`
  margin-right: ${({ theme }) => theme.spacing}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: rotate(${({ isExpand }) => (isExpand ? "180deg" : "none")});
  transition: transform 0.3s, opacity 0.3s;
`;

type ExpantionProps = {
  isExpand: boolean;
  delay: boolean;
  height: string;
};

export const Expantion = styled.div<ExpantionProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: ${({ theme }) => theme.spacing * 7}px;
  max-height: ${({ isExpand, height }) => (isExpand ? height : "0px")};
  transition: max-height 0.3s ${({ delay }) => (delay ? 0.3 : 0)}s;
`;
