import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "../../utils/reactTransitionGroupUtils";

const Grow: React.FunctionComponent<CSSTransitionProps> = ({
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
