import styled from "styled-components";
import { CSSTransition as OriginalCSSTransition } from "react-transition-group";
import {
  CSSTransitionProps,
  getDuration,
} from "../../utils/reactTransitionGroup";

export const transitionClass = "grow-transition";

export const CSSTransition = styled(OriginalCSSTransition)<CSSTransitionProps>`
  &.${transitionClass}-enter, &.${transitionClass}-appear {
    transform: scale(0);
  }

  &.${transitionClass}-enter-active, &.${transitionClass}-appear-active {
    transform: none;
    transition: transform ${({ timeout }) => getDuration(timeout, "enter")}ms;
  }

  &.${transitionClass}-exit {
    transform: none;
  }

  &.${transitionClass}-exit-active {
    transform: scale(0);
    transition: transform ${({ timeout }) => getDuration(timeout, "exit")}ms;
  }

  &.${transitionClass}-exit-done {
    transform: scale(0);
  }
`;
