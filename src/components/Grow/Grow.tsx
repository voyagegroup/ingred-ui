import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "../../utils/reactTransitionGroupUtils";

export type GrowProps = Partial<CSSTransitionProps> & {
  children?: React.ComponentElement<HTMLElement, any>;
};

const Grow: React.FunctionComponent<GrowProps> = ({
  // TODO: define and get duration from theme
  timeout = 300,
  children,
  ...rest
}) => {
  return (
    <Styled.CSSTransition
      timeout={timeout}
      classNames={Styled.transitionClass}
      {...rest}
    >
      {children}
    </Styled.CSSTransition>
  );
};

export default Grow;
