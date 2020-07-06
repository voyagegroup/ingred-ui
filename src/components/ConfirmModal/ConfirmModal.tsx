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
import Modal from "../Modal";

export type SubAction = {
  title: string;
  icon: IconName;
  action: () => void;
};

export type Props = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonColor?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  overflowYScroll?: boolean;
  fullSize?: boolean;
  disableHorizontalPadding?: boolean;
  subActions?: SubAction[];
  tipElement?: JSX.Element;

  // TypeScriptで型エラーが出るので一旦これでしのぐ
  children?: React.ReactNode;
};

const ConfirmModal: React.FunctionComponent<Props> = ({
  title,
  confirmText = "はい",
  cancelText = "キャンセル",
  children,
  onClose,
  onSubmit,
  buttonColor = "primary",
  disabled,
  loading,
  fullSize = false,
  overflowYScroll = true,
  disableHorizontalPadding = false,
  subActions = [],
  tipElement,
}) => {
  const theme = useTheme();
  const showFooter = !!onSubmit;
  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const onHandleIsOpen = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };
  return (
    <Modal hasBackground={true}>
      <Styled.ModalContainer fullSize={fullSize}>
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
                    onClick={onHandleIsOpen(!isOpen)}
                  >
                    <Icon name="question" type="fill" size="lg" />
                  </Styled.IconContainer>
                  <FloatingTip
                    baseElement={iconWrapperElement}
                    isOpen={isOpen}
                    positionPriority={["right-start"]}
                    onClose={onHandleIsOpen(false)}
                  >
                    <Styled.TipContentContainer>
                      {tipElement}
                    </Styled.TipContentContainer>
                  </FloatingTip>
                </Styled.TipContainer>
              )}

              <Spacer pr={2} />
              {subActions.map(({ icon, action, title }) => (
                <Spacer key="title" pr={2}>
                  <ActionButton icon={icon} type="button" onClick={action}>
                    {title}
                  </ActionButton>
                </Spacer>
              ))}
            </Styled.LeftContainer>
            <Styled.IconContainer onClick={onClose}>
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
                <Spacer pr={2}>
                  <Button type="button" color="secondary" onClick={onClose}>
                    {cancelText}
                  </Button>
                </Spacer>
                <Button type="submit" color={buttonColor} disabled={disabled}>
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
    </Modal>
  );
};

export default ConfirmModal;
