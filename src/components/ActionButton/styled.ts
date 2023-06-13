import styled from "styled-components";

type ContainerProps = {
  borderColor: string;
  normalBackgroundColor: string;
  hoverBackgroundColor: string;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing * 0.25}px;
  height: 32px;
  padding: ${({ theme }) => theme.spacing * 0.75}px;
  border: 1px solid ${({ borderColor }) => borderColor};
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
