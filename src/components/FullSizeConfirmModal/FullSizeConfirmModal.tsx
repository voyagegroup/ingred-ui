import * as React from "react";
import * as Styled from "./styled";
import Typography from "../Typography";
import Icon from "../Icon";
import Spacer from "../Spacer";
import Flex from "../Flex";
import Button from "../Button";
import { ButtonColor } from "../Button/Button";
import Spinner from "../Spinner";
import { useTheme } from "../../themes";
import { IconName } from "../Icon/Icon";
import Modal, { ModalCloseReason, ModalProps } from "../Modal";
import Fade from "../Fade";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type FullSizeConfirmModalCloseReason =
  | "clickCloseIcon"
  | "clickCancelButton";

export type SubAction = {
  title: string;
  icon: IconName;
  action: () => void;
};

export type FullSizeConfirmModalProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onClose?: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<Element, MouseEvent>,
    reason: ModalCloseReason | FullSizeConfirmModalCloseReason,
  ) => void;
  /**
   * If `undefined`, footer is removed.
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonColor?: ButtonColor;
  isOpen?: boolean;
  /**
   * If `true`, disabled to click submit button.
   */
  disabled?: boolean;
  loading?: boolean;
  overflowYScroll?: boolean;
  /**
   * If `true`, children is wrapped by `<Spacer px={3} pb={3} />`.
   */
  disableHorizontalPadding?: boolean;
  subActions?: React.ReactNode;
  /**
   * props of [Modal](/?path=/docs/components-utils-modal)
   */
  modalProps?: ModalProps;
  /**
   * props of [Fade](/?path=/docs/components-utils-fade)
   */
  fadeProps?: CSSTransitionProps;

  // MEMO: Added this to prevent type error.
  children?: React.ReactNode;
};

const FullSizeConfirmModal = React.forwardRef<
  HTMLDivElement,
  FullSizeConfirmModalProps
>((inProps, ref) => {
  const props = useLocaleProps({
    props: inProps,
    name: "FullSizeConfirmModal",
  });
  const {
    title,
    confirmText = "Confirm",
    cancelText = "Cancel",
    children,
    onClose,
    onSubmit,
    buttonColor = "primary",
    isOpen = true,
    disabled,
    loading,
    overflowYScroll = true,
    disableHorizontalPadding = false,
    subActions,
    modalProps,
    fadeProps,
  } = props;

  const theme = useTheme();
  const showFooter = !!onSubmit;

  const handleClose =
    (reason: FullSizeConfirmModalCloseReason) =>
    (
      event:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<Element, MouseEvent>,
    ) => {
      if (onClose) onClose(event, reason);
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
      <Fade in={isOpen} unmountOnExit={true} {...fadeProps}>
        <Styled.ModalContainer ref={ref}>
          <form onSubmit={onSubmit}>
            <Styled.ModalHeader>
              <Styled.LeftContainer>
                <Typography weight="bold" size="xxxl">
                  {title}
                </Typography>
                <Spacer pr={2} />
                {subActions}
              </Styled.LeftContainer>
              <Styled.IconContainer onClick={handleClose("clickCloseIcon")}>
                <Icon name="close" size="lg" color={theme.palette.black} />
              </Styled.IconContainer>
            </Styled.ModalHeader>
            <Styled.ScrollContainer
              overflowYScroll={overflowYScroll}
              showFooter={showFooter}
            >
              {disableHorizontalPadding ? (
                children
              ) : (
                <Spacer px={3} pb={3}>
                  {children}
                </Spacer>
              )}
            </Styled.ScrollContainer>
            {showFooter && (
              <Styled.ModalFooter>
                <Flex display="flex" alignItems="center">
                  <Button
                    type="button"
                    color="secondary"
                    inline={true}
                    onClick={handleClose("clickCancelButton")}
                  >
                    {cancelText}
                  </Button>
                  <Spacer pr={2} />
                  <Button
                    type="submit"
                    color={buttonColor}
                    disabled={disabled}
                    inline={true}
                  >
                    {confirmText}
                  </Button>
                </Flex>
              </Styled.ModalFooter>
            )}
          </form>
          {loading && (
            <Styled.LoadingContainer>
              <Spinner />
            </Styled.LoadingContainer>
          )}
        </Styled.ModalContainer>
      </Fade>
    </Modal>
  );
});

export default FullSizeConfirmModal;
