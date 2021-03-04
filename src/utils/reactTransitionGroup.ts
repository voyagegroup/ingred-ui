import { CSSTransitionProps as OriginalCSSTransitionProps } from "react-transition-group/CSSTransition";
import Fade from "../components/Fade";
import Grow from "../components/Grow";
import Slide from "../components/Slide";

export type CSSTransitionProps = Partial<OriginalCSSTransitionProps> & {
  children?: React.ComponentElement<HTMLElement, any>;
};

export type TransitionComponent = typeof Fade | typeof Grow | typeof Slide;

export const getDuration = (
  timeout: CSSTransitionProps["timeout"],
  state: "enter" | "exit",
): number => {
  switch (typeof timeout) {
    case "number":
      return timeout;
    case "object":
      return timeout[state] || 0;
    default:
      return 0;
  }
};
