import styled from "styled-components";

export type ContainerProps = {
  height: string;
  minWidth: string;
};

export const ButtonGroupContainer = styled.div<ContainerProps>`
  display: inline-flex;

  button {
    min-width: ${({ minWidth }) => minWidth};
    width: auto;
    height: ${({ height }) => height};
    padding-right: ${({ theme }) => theme.spacing}px;
    padding-left: ${({ theme }) => theme.spacing}px;
  }

  button:not(:last-of-type) {
    border-right: none;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  button:not(:first-of-type) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  button:last-of-type {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
