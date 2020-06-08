import * as React from "react";
import styled from "styled-components";
import Toast from ".";
import Typography from "../Typography";
import Button from "../Button";
import { ToastProps } from "react-toast-notifications";
import { palette } from "../../themes";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string }>`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
`;

const Column = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Toast",
  parameters: {
    component: Toast,
  },
};

const toastProps: Omit<ToastProps, "children"> = {
  appearance: "info",
  autoDismiss: false,
  autoDismissTimeout: 0,
  isRunning: true,
  onDismiss: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  placement: "top-center",
  transitionDuration: 0,
  transitionState: "entered",
};

const ToastSample = () => {
  const { addToast } = Toast.useToasts();
  const onHandleClick = () => {
    addToast("○○が完了しました", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  return (
    <div>
      <Button inline onClick={onHandleClick}>
        トーストを表示する
      </Button>
    </div>
  );
};

export const Overview = () => (
  <Container>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          動かしてみる
        </Typography>
        <Toast.Provider
          placement="top-center"
          autoDismissTimeout={3000}
          transitionDuration={300}
        >
          <ToastSample />
        </Toast.Provider>
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Info
        </Typography>
        <Toast {...toastProps}>○○が完了しました。</Toast>
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Success
        </Typography>
        <Toast {...toastProps} appearance="success">
          ○○が完了しました。
        </Toast>
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Warning
        </Typography>
        <Toast {...toastProps} appearance="warning">
          ○○が完了しました。
        </Toast>
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Error
        </Typography>
        <Typography color={palette.gray.main}>
          エラーメッセージを表示する時はautoDismissをつけないでください
        </Typography>
        <Toast {...toastProps} appearance="error">
          ○○に失敗しました。
        </Toast>
      </Column>
    </RowContainer>
  </Container>
);
