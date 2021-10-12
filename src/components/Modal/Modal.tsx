import * as React from "react";
import * as Styled from "./styled";
import Portal from "../Portal";
import Backdrop, { BackdropProps } from "../Backdrop";
import { createChainedFunction } from "../../utils/createChainedFunction";

const getHasTransition = (props: React.PropsWithChildren<any>): boolean => {
  // eslint-disable-next-line no-prototype-builtins
  return props.hasOwnProperty("in");
};

/**
 * When keydown backdrop or esc, close modal.
 */
export type ModalCloseReason = "backdropClick" | "escapeKeyDown";

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
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent,
    reason: ModalCloseReason,
  ) => void;
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean;

  children: React.ReactElement;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen = true,
  hasBackground = true,
  backdropProps,
  enableTransition = true,
  onClose,
  closeOnEsc = true,
  children,
}) => {
  const [exited, setExited] = React.useState<boolean>(true);

  React.useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !isOpen) {
      return;
    }

    if (closeOnEsc) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };

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
      <Styled.Container isHidden={!isOpen && exited}>
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
};

export default Modal;
