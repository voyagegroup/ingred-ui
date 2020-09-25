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
            ...childComponent.props.style,
          },
          ref: childComponent.ref,
        });
      }}
    </Transition>
  );
};

export default Fade;
