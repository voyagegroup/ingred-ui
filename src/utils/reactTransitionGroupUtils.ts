import { CSSTransitionProps as OriginalCSSTransitionProps } from "react-transition-group/CSSTransition";

export type CSSTransitionProps = OriginalCSSTransitionProps & {
  timeout: Omit<OriginalCSSTransitionProps["timeout"], "undefined">;
};

export const getDuration = (
  timeout: CSSTransitionProps["timeout"],
  state: "enter" | "exit",
): number => (typeof timeout === "number" ? timeout : timeout[state] || 0);
