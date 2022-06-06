import * as React from "react";
import * as Styled from "./styled";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";

const Fade: React.FunctionComponent<CSSTransitionProps> = ({
  // TODO: define and get duration from theme
  timeout = 300,
  children,
  ...rest
}) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Styled.CSSTransition
      nodeRef={nodeRef}
      appear={true}
      mountOnEnter={true}
      timeout={timeout}
      classNames={Styled.transitionClass}
      {...rest}
    >
      <div ref={nodeRef}>{children}</div>
    </Styled.CSSTransition>
  );
};

export default Fade;
