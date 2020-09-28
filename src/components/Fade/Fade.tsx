import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type FadeProps = Partial<CSSTransitionProps> & {
  children?: React.ComponentElement<HTMLElement, any>;
};

const Fade: React.FunctionComponent<FadeProps> = ({
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

export default Fade;
