import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";
import Backdrop, { BackdropProps } from "../Backdrop";
import { createChainedFunction } from "../../utils/createChainedFunction";

export type ModalProps = {
  isOpen?: boolean;
  hasBackground?: boolean;
  backdropProps?: BackdropProps;
  enableTransition?: boolean;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen = true,
  hasBackground = false,
  backdropProps,
  enableTransition = false,
  children,
}) => {
  const [exited, setExited] = React.useState<boolean>(true);

  const onHandleEnter = () => {
    setExited(false);
  };

  const onHandleExited = () => {
    setExited(true);
  };

  const fadeProps: BackdropProps["fadeProps"] = { ...backdropProps?.fadeProps };
  if (enableTransition) {
    fadeProps.onEnter = createChainedFunction(fadeProps.onEnter, onHandleEnter);
    fadeProps.onExited = createChainedFunction(
      fadeProps.onExited,
      onHandleExited,
    );
  }

  return (
    <Portal>
      <Styled.Container isHidden={!isOpen && exited}>
        {hasBackground && (
          <Backdrop
            {...backdropProps}
            isOpen={!enableTransition || isOpen}
            fadeProps={fadeProps}
          />
        )}
        {children}
      </Styled.Container>
    </Portal>
  );
};

export default Modal;
