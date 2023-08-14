import styled from "styled-components";

export const Action = styled.button<{ clicked: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  display: block;
  margin: 0;
  padding: ${({ theme }) => theme.spacing}px;
  color: ${({ clicked, theme }) =>
    clicked ? theme.palette.primary.main : theme.palette.black};

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
    border-radius: ${({ theme }) => theme.radius}px;
  }
`;

export const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing}px ${theme.spacing * 2}px`};
`;
