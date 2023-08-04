import * as React from "react";
import { useLocaleProps } from "../../hooks/useLocaleProps";
import { useTheme } from "../../themes";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";
import Button from "../Button";
import { ButtonColor } from "../Button/Button";
import Fade from "../Fade";
import Flex from "../Flex";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Modal, { ModalCloseReason, ModalProps } from "../Modal";
import Spacer from "../Spacer";
import Spinner from "../Spinner";
import Typography from "../Typography";
import * as Styled from "./styled";

export type ConfirmModalCloseReason = "clickCloseIcon" | "clickCancelButton";

export type SubAction = {
  title: string;
  icon: IconName;
  action: () => void;
};

export type ConfirmModalProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onClose?: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<Element, MouseEvent>,
    reason: ModalCloseReason | ConfirmModalCloseReason,
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
  subActions?: React.ReactNode[];
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

const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "ConfirmModal" });
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
      (reason: ConfirmModalCloseReason) =>
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
                  {subActions && (
                    <Spacer pl={2}>
                      <Flex display="flex" alignItems="center" gap={1}>
                        {subActions.map((action, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <React.Fragment key={index}>{action}</React.Fragment>
                        ))}
                      </Flex>
                    </Spacer>
                  )}
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
                      color="clear"
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
  },
);

export default ConfirmModal;
