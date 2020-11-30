import styled from "styled-components";
import { CSSTransition as OriginalCSSTransition } from "react-transition-group";
import {
  CSSTransitionProps,
  getDuration,
} from "../../utils/reactTransitionGroup";

export const transitionClass = "fade-transition";

export const CSSTransition = styled(OriginalCSSTransition)<CSSTransitionProps>`
  &.${transitionClass}-enter, &.${transitionClass}-appear {
    opacity: 0;
  }

  &.${transitionClass}-enter-active, &.${transitionClass}-appear-active {
    opacity: 1;
    transition: opacity ${({ timeout }) => getDuration(timeout, "enter")}ms;
  }

  &.${transitionClass}-exit {
    opacity: 1;
  }

  &.${transitionClass}-exit-active {
    opacity: 0;
    transition: opacity ${({ timeout }) => getDuration(timeout, "exit")}ms;
  }

  &.${transitionClass}-exit-done {
    opacity: 0;
  }
`;
