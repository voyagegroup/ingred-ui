import styled from "styled-components";
import { Space } from "../../styles";

type ContainerProps = {
  normalBackgroundColor: string;
  hoverBackgroundColor: string;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  padding: ${Space * 0.75}px ${Space}px;
  border: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ normalBackgroundColor }) => normalBackgroundColor};
  white-space: nowrap;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
