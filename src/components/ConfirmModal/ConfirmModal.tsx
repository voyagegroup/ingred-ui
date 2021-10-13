import * as React from "react";
import * as Styled from "./styled";
import Typography from "../Typography";
import Icon from "../Icon";
import Spacer from "../Spacer";
import Flex from "../Flex";
import FloatingTip from "../FloatingTip";
import Button from "../Button";
import { ButtonColor } from "../Button/Button";
import Spinner from "../Spinner";
import { useTheme } from "../../themes";
import ActionButton from "../ActionButton";
import { IconName } from "../Icon/Icon";
import Modal, { ModalCloseReason, ModalProps } from "../Modal";
import Fade from "../Fade";
import { CSSTransitionProps } from "../../utils/reactTransitionGroup";
import { useLocaleProps } from "../../hooks/useLocaleProps";

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
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
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
  fullSize?: boolean;
  /**
   * If `true`, children is wrapped by `<Spacer px={3} pb={3} />`.
   */
  disableHorizontalPadding?: boolean;
  /**
   * ```
   * type SubAction = {
   *   title: string;
   *   icon: IconName;
   *   action: () => void;
   * }
   * ```
   * **Recommend to use with `fullSize={true}`**
   */
  subActions?: SubAction[];
  tipElement?: JSX.Element;
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
      fullSize = false,
      overflowYScroll = true,
      disableHorizontalPadding = false,
      subActions = [],
      tipElement,
      modalProps,
      fadeProps,
    } = props;

    const theme = useTheme();
    const showFooter = !!onSubmit;
    const [iconWrapperElement, setIconWrapperElement] =
      React.useState<HTMLDivElement | null>(null);
    const [isTipOpen, setIsTipOpen] = React.useState<boolean>(false);

    const handleIsTipOpen = (isTipOpen: boolean) => () => {
      setIsTipOpen(isTipOpen);
    };

    const handleClose =
      (reason: ConfirmModalCloseReason) =>
      (
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
      ) => {
        if (onClose) onClose(event, reason);
      };

    return (
      <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
        <Fade in={isOpen} unmountOnExit={true} {...fadeProps}>
          <Styled.ModalContainer ref={ref} fullSize={fullSize}>
            <form onSubmit={onSubmit}>
              <Styled.ModalHeader>
                <Styled.LeftContainer>
                  <Typography weight="bold" size="xxxl">
                    {title}
                  </Typography>

                  {tipElement && (
                    <Styled.TipContainer>
                      <Styled.IconContainer
                        ref={setIconWrapperElement}
                        onClick={handleIsTipOpen(!isTipOpen)}
                      >
                        <Icon name="question" type="fill" size="lg" />
                      </Styled.IconContainer>
                      <FloatingTip
                        baseElement={iconWrapperElement}
                        isOpen={isTipOpen}
                        positionPriority={["right-start"]}
                        onClose={handleIsTipOpen(false)}
                      >
                        <Styled.TipContentContainer>
                          {tipElement}
                        </Styled.TipContentContainer>
                      </FloatingTip>
                    </Styled.TipContainer>
                  )}

                  <Spacer pr={2} />
                  {subActions.map(({ icon, action, title }) => (
                    <Spacer key={title} pr={2}>
                      {/* eslint-disable-next-line react/jsx-handler-names */}
                      <ActionButton icon={icon} type="button" onClick={action}>
                        {title}
                      </ActionButton>
                    </Spacer>
                  ))}
                </Styled.LeftContainer>
                <Styled.IconContainer onClick={handleClose("clickCloseIcon")}>
                  <Icon name="close" size="lg" color={theme.palette.black} />
                </Styled.IconContainer>
              </Styled.ModalHeader>
              <Styled.ScrollContainer
                overflowYScroll={overflowYScroll}
                fullSize={fullSize}
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
                <Styled.ModalFooter fullSize={fullSize}>
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
  },
);

export default ConfirmModal;
