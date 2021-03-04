import styled from "styled-components";
import { CSSTransition as OriginalCSSTransition } from "react-transition-group";
import {
  CSSTransitionProps,
  getDuration,
} from "../../utils/reactTransitionGroup";

const getTranslate = (direction: string) => {
  switch (direction) {
    case "down":
      return "translateY(100vh)";
    case "up":
      return "translateY(-100vh)";
    case "right":
      return "translateX(100vw)";
    case "left":
      return "translateX(-100vw)";
    default:
      return "translateY(100vh)";
  }
};

export const transitionClass = "slide-transition";

export const CSSTransition = styled(OriginalCSSTransition)<CSSTransitionProps>`
  &.${transitionClass}-enter, &.${transitionClass}-appear {
    transform: ${({ direction }) => getTranslate(direction)};
  }
  &.${transitionClass}-enter-active, &.${transitionClass}-appear-active {
    transform: none;
    transition: transform ${({ timeout }) => getDuration(timeout, "enter")}ms;
  }
  &.${transitionClass}-exit {
    transform: none;
  }
  &.${transitionClass}-exit-active {
    transform: ${({ direction }) => getTranslate(direction)};
    transition: transform ${({ timeout }) => getDuration(timeout, "exit")}ms;
  }
  &.${transitionClass}-exit-done {
    transform: ${({ direction }) => getTranslate(direction)};
  }
`;
