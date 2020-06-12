import styled from "styled-components";
import { Size } from "../../styles/size";

export type ContainerProps = {
  height: string;
  minWidth: string;
  padding: number;
};

export const ButtonGroupContainer = styled.div<ContainerProps>`
  display: inline-flex;

  button {
    min-width: ${({ minWidth }) => minWidth};
    width: auto;
    height: ${({ height }) => height};
    padding-right: ${({ theme, padding }) => theme.spacing * padding}px;
    padding-left: ${({ theme, padding }) => theme.spacing * padding}px;
  }

  button:disabled + button:not(:disabled) {
    border-left: ${Size.Border.Small} solid
      ${({ theme }) => theme.palette.divider};
  }

  button:not(:last-of-type) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  button:not(:first-of-type) {
    border-left: none;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  button:last-of-type {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
