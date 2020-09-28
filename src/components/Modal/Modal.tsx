import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";
import Backdrop, { BackdropProps } from "../Backdrop";
import { createChainedFunction } from "../../utils/createChainedFunction";

// TODO: enable close with Escape key
export type ModalCloseReason = "backdropClick";

export type ModalProps = {
  isOpen?: boolean;
  hasBackground?: boolean;
  backdropProps?: BackdropProps;
  enableTransition?: boolean;
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason,
  ) => void;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen = true,
  onClose,
  hasBackground = true,
  backdropProps,
  enableTransition = false,
  children,
}) => {
  const [exited, setExited] = React.useState<boolean>(true);

  const onHandleBackDropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (onClose) onClose(event, "backdropClick");
  };

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
            onClick={onHandleBackDropClick}
          />
        )}
        {children}
      </Styled.Container>
    </Portal>
  );
};

export default Modal;
