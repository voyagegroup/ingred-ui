import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
  padding-left: ${({ theme }) => theme.spacing * 7.75}px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
`;

export const TextContainer = styled.div<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.gray.dark};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
