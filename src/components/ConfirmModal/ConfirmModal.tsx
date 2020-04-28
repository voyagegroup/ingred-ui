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
import ActionButton from "../ActionButton";
import { IconName } from "../Icon/Icon";

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
  buttonColor?: Exclude<ButtonColor, "cancel">;
  disabled?: boolean;
  loading?: boolean;
  overflowYScroll?: boolean;
  fullSize?: boolean;
  disableHorizontalPadding?: boolean;
  subActions?: SubAction[];

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
  subActions = []
}) => {
  const theme = useTheme();
  const showFooter = !!onSubmit;
  return (
    <Styled.Container>
      <Styled.ModalBackground />
      <Styled.ModalContainer fullSize={fullSize}>
        <form onSubmit={onSubmit}>
          <Styled.ModalHeader>
            <Styled.LeftContainer>
              <Typography weight="bold" size="xxxl">
                {title}
              </Typography>

              <Spacer pr={2} />
              {subActions.map(({ icon, action, title }) => (
                <Spacer pr={2} key="title">
                  <ActionButton icon={icon} onClick={action} type="button">
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
                  <Button type="button" color="cancel" onClick={onClose}>
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
    </Styled.Container>
  );
};

export default ConfirmModal;
