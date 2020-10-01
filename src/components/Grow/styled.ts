import styled from "styled-components";
import { CSSTransition as OriginalCSSTransition } from "react-transition-group";
import { CSSTransitionProps as OriginalCSSTransitionProps } from "react-transition-group/CSSTransition";

export const transitionClass = "grow-transition";

type CSSTransitionProps = {
  timeout: Omit<OriginalCSSTransitionProps["timeout"], "undefined">;
};

const getDuration = (
  timeout: CSSTransitionProps["timeout"],
  state: "enter" | "exit",
): number => (typeof timeout === "number" ? timeout : timeout[state] || 0);

export const CSSTransition = styled(OriginalCSSTransition)<CSSTransitionProps>`
  &.${transitionClass}-enter {
    transform: scale(0);
  }

  &.${transitionClass}-enter-active {
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
