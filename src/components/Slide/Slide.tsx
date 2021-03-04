import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";

const Slide: React.FunctionComponent<CSSTransitionProps> = ({
  // TODO: define and get duration from theme
  timeout = 300,
  children,
  direction = "down",
  ...rest
}) => {
  return (
    <Styled.CSSTransition
      appear={true}
      timeout={timeout}
      direction={direction}
      classNames={Styled.transitionClass}
      {...rest}
    >
      {children}
    </Styled.CSSTransition>
  );
};

export default Slide;
