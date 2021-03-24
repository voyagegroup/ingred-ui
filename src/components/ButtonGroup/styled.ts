import styled from "styled-components";

export type ContainerProps = {
  minWidth: string;
  horizontalPadding: string;
};

export const ButtonGroupContainer = styled.div<ContainerProps>`
  display: inline-flex;

  & > * {
    min-width: ${({ minWidth }) => minWidth};
    width: auto;
    padding-right: ${({ horizontalPadding }) => horizontalPadding};
    padding-left: ${({ horizontalPadding }) => horizontalPadding};
  }

  & > *:not(:last-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  & > *:not(:first-child) {
    border-left: none;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  & > *:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
