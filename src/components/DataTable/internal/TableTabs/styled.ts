import styled from "styled-components";

export const Container = styled.div`
  padding-top: ${({ theme }) => theme.spacing * 1.5}px;
  padding-left: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => `${theme.radius}px ${theme.radius}px`} 0 0;
`;

export const TabContainer = styled.ul`
  list-style: none;
  display: flex;
`;

export const TabItem = styled.li<{ active: boolean }>`
  min-width: ${({ theme }) => theme.spacing * 10}px;
  /* MEMO: Use negative margin to cover the border of Container */
  margin-bottom: -1px;
  padding: ${({ active, theme }) =>
    active
      ? `calc(${theme.spacing * 1.5}px - 1px) calc(${
          theme.spacing * 2
        }px - 1px)`
      : `${theme.spacing * 1.5}px ${theme.spacing * 2}px`};
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.palette.divider}` : "none"};
  border-bottom: ${({ active, theme }) =>
    active ? "none" : `1px solid ${theme.palette.divider}`};
  border-radius: ${({ theme }) => `${theme.radius}px ${theme.radius}px`} 0 0;
  background-color: ${({ active, theme }) =>
    active ? theme.palette.background.default : "none"};
  cursor: pointer;
`;
