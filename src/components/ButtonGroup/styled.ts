import styled from "styled-components";
import { StyledComponentProps } from "../../utils/styledTypes";

type ButtonGroupProps = {
  minSize?: string;
} & StyledComponentProps;

export const ButtonGroupContainer = styled.div<ButtonGroupProps>`
  display: inline-flex;

  & > * {
    min-width: ${(props) => props.minSize || "fit-content"};
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
