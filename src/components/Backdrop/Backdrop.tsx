import * as React from "react";
import * as Styled from "./styled";
import Fade from "../Fade";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";

export type BackdropProps = React.ComponentPropsWithoutRef<"div"> & {
  isOpen?: boolean;
  invisible?: boolean;
  /**
   * Unit: millisecond
   */
  transitionDuration?: number;
  /**
   * props of [Fade](/?path=/docs/components-utils-fade)
   */
  fadeProps?: CSSTransitionProps;
};

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      isOpen = true,
      invisible = false,
      transitionDuration,
      children,
      fadeProps,
      ...rest
    },
    ref,
  ) => {
    return (
      <Fade
        in={isOpen}
        timeout={transitionDuration}
        unmountOnExit={true}
        {...fadeProps}
      >
        <Styled.Container invisible={invisible} {...rest} ref={ref}>
          {children}
        </Styled.Container>
      </Fade>
    );
  },
);

export default Backdrop;
