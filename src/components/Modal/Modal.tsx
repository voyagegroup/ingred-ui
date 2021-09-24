import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";
import Backdrop, { BackdropProps } from "../Backdrop";
import { createChainedFunction } from "../../utils/createChainedFunction";

const getHasTransition = (props: React.PropsWithChildren<any>): boolean => {
  // eslint-disable-next-line no-prototype-builtins
  return props.hasOwnProperty("in");
};

// TODO: enable close with Escape key
export type ModalCloseReason = "backdropClick";

export type ModalProps = {
  /**
   * If `false`, children becomes `visibility: hidden`.
   */
  isOpen?: boolean;
  /**
   * If `true`, children contains [Backdrop](/?path=/docs/components-feedback-backdrop).
   */
  hasBackground?: boolean;
  /**
   * props of [Backdrop](/?path=/docs/components-feedback-backdrop)
   */
  backdropProps?: BackdropProps;
  /**
   * Control the transition of Backdrop.
   */
  enableTransition?: boolean;
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason,
  ) => void;
  children: React.ReactElement;
};

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen = true,
      hasBackground = true,
      backdropProps,
      enableTransition = true,
      onClose,
      children,
    },
    ref,
  ) => {
    const [exited, setExited] = React.useState<boolean>(true);

    const handleBackDropClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (onClose) onClose(event, "backdropClick");
    };

    const handleEnter = () => {
      setExited(false);
    };

    const handleExited = () => {
      setExited(true);
    };

    const childProps: any = {};
    if (enableTransition && getHasTransition(children.props)) {
      childProps.onEnter = createChainedFunction(
        handleEnter,
        children.props.onEnter,
      );
      childProps.onExited = createChainedFunction(
        handleExited,
        children.props.onExited,
      );
    }

    return (
      <Portal>
        <Styled.Container ref={ref} isHidden={!isOpen && exited}>
          {hasBackground && (
            <Backdrop
              {...backdropProps}
              isOpen={!enableTransition || isOpen}
              onClick={handleBackDropClick}
            />
          )}
          {React.cloneElement(children, childProps)}
        </Styled.Container>
      </Portal>
    );
  },
);

export default Modal;
