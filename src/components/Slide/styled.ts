import styled from "styled-components";
import { CSSTransition as OriginalCSSTransition } from "react-transition-group";
import {
  CSSTransitionProps,
  getDuration,
} from "../../utils/reactTransitionGroup";

export const transitionClass = "slide-transition";

export const CSSTransition = styled(OriginalCSSTransition)<CSSTransitionProps>`
  &.${transitionClass}-enter, &.${transitionClass}-appear {
    transform: translateY(100vh);
  }
  &.${transitionClass}-enter-active, &.${transitionClass}-appear-active {
    transform: none;
    transition: transform ${({ timeout }) => getDuration(timeout, "enter")}ms;
  }
  &.${transitionClass}-exit {
    transform: none;
  }
  &.${transitionClass}-exit-active {
    transform: translateY(100vh);
    transition: transform ${({ timeout }) => getDuration(timeout, "exit")}ms;
  }
  &.${transitionClass}-exit-done {
    transform: translateY(100vh);
  }
`;
