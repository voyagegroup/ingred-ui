import styled from "styled-components";
import { ScrollArea } from "../../../..";

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
    background-color: ${({ theme }) => theme.palette.primary.highlight};
    border-radius: ${({ theme }) => theme.radius}px;
  }
`;

export const ActionsContainer = styled(ScrollArea)`
  padding: ${({ theme }) => `${theme.spacing}px ${theme.spacing * 2}px`};
`;
