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

export type Props = {
  title: string;
  confirmText?: string;
  onClose?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonColor?: Exclude<ButtonColor, "cancel">;
  disabled?: boolean;
  loading?: boolean;
  overflowYScroll?: boolean;
  fullSize?: boolean;
  disableHorizontalPadding?: boolean;

  // TypeScriptで型エラーが出るので一旦これでしのぐ
  children?: React.ReactNode;
};

const ConfirmModal: React.FunctionComponent<Props> = ({
  title,
  confirmText = "はい",
  children,
  onClose,
  onSubmit,
  buttonColor = "primary",
  disabled,
  loading,
  fullSize = false,
  overflowYScroll = true,
  disableHorizontalPadding = false
}) => {
  const theme = useTheme();
  return (
    <Styled.Container>
      <Styled.ModalBackground />
      <Styled.ModalContainer fullSize={fullSize}>
        <form onSubmit={onSubmit}>
          <Styled.ScrollContainer overflowYScroll={overflowYScroll}>
            <Styled.ModalHeader>
              <Styled.TitleContainer>
                <Typography weight="bold" size="xxxl">
                  {title}
                </Typography>
              </Styled.TitleContainer>
              <Styled.IconContainer onClick={onClose}>
                <Icon name="close" size="lg" color={theme.palette.black} />
              </Styled.IconContainer>
            </Styled.ModalHeader>

            {disableHorizontalPadding ? (
              children
            ) : (
              <Spacer px={3} pb={3}>
                {children}
              </Spacer>
            )}
          </Styled.ScrollContainer>
          <Styled.ModalFooter>
            <Flex display="flex" alignItems="center">
              <Spacer pr={2}>
                <Button type="button" color="cancel" onClick={onClose}>
                  キャンセル
                </Button>
              </Spacer>
              <Button type="submit" color={buttonColor} disabled={disabled}>
                {confirmText}
              </Button>
            </Flex>
          </Styled.ModalFooter>
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
