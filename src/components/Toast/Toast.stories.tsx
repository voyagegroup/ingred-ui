import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { AppearanceTypes } from "react-toast-notifications";
import Toast from ".";
import Typography from "../Typography";
import Button from "../Button";

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
  title: "Components/Toast",
  component: Toast,
  parameters: {
    docs: { page: null },
  },
};

const ToastSample = () => {
  const { addToast } = Toast.useToasts();
  const handleClick = () => {
    addToast("○○が完了しました", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  return (
    <div>
      <Button inline onClick={handleClick}>
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
    {["info", "success", "warning", "error"].map((appearance) => (
      <RowContainer key={appearance}>
        <Column>
          <Typography weight="bold" size="xxl">
            Info
          </Typography>
          <Toast
            appearance={appearance as AppearanceTypes}
            onDismiss={action("clicked")}
          >
            ○○が完了しました。
          </Toast>
        </Column>
      </RowContainer>
    ))}
  </Container>
);
