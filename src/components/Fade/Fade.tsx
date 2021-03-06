import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";

const Fade: React.FunctionComponent<CSSTransitionProps> = ({
  // TODO: define and get duration from theme
  timeout = 300,
  children,
  ...rest
}) => {
  return (
    <Styled.CSSTransition
      appear={true}
      mountOnEnter={true}
      timeout={timeout}
      classNames={Styled.transitionClass}
      {...rest}
    >
      {children}
    </Styled.CSSTransition>
  );
};

export default Fade;
