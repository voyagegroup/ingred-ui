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
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <Styled.CSSTransition
      nodeRef={nodeRef}
      appear={true}
      timeout={timeout}
      direction={direction}
      classNames={Styled.transitionClass}
      {...rest}
    >
      <div ref={nodeRef}>{children}</div>
    </Styled.CSSTransition>
  );
};

export default Slide;
