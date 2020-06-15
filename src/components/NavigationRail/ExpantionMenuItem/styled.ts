import styled from "styled-components";

export const Container = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.gray.dark};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${({ theme, isActive }) =>
      isActive ? theme.palette.text.primary : theme.palette.gray.deepDark};
  }
`;
