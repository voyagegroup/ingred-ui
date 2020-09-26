import * as React from "react";
import { Transition } from "react-transition-group";
import {
  TransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition";

type TransitionStyle = { [status in TransitionStatus]: React.CSSProperties };
const styles: TransitionStyle = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

const getTransitionStyle = (
  timeout: Omit<TransitionProps["timeout"], "undefined">,
  state: TransitionStatus,
): React.CSSProperties => {
  let duration: number;
  if (typeof timeout === "number") {
    duration = timeout;
  } else {
    switch (state) {
      case "entered":
      case "entering":
        duration = timeout["enter"] || 0;
        break;
      case "exiting":
      case "exited":
      case "unmounted":
        duration = timeout["exit"] || 0;
        break;
    }
  }
  return { transition: `opacity ${duration}ms` };
};

type ChildrenType = React.ComponentElement<HTMLElement, any>;

export type FadeProps = Partial<TransitionProps> & {
  children: ChildrenType;
};

const Fade: React.FunctionComponent<FadeProps> = ({
  // TODO: define and get duration from theme
  timeout = 300,
  children,
  ...rest
}) => {
  return (
    <Transition timeout={timeout} {...rest}>
      {(state) => {
        const childComponent = children as ChildrenType;
        return React.cloneElement(childComponent, {
          ...childComponent.props,
          style: {
            ...styles[state],
            ...getTransitionStyle(timeout, state),
            ...childComponent.props.style,
          },
          ref: childComponent.ref,
        });
      }}
    </Transition>
  );
};

export default Fade;
