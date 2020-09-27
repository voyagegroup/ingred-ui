import * as React from "react";
import * as Styled from "./styled";
import Fade, { FadeProps } from "../Fade";

export type BackdropProps = React.ComponentPropsWithRef<"div"> & {
  isOpen?: boolean;
  invisible?: boolean;
  transitionDuration?: number; // MEMO: millisecond
  fadeProps?: FadeProps;
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
        mountOnEnter={true}
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
