import * as React from "react";
import Snackbar from "./Snackbar";
import { SnackbarContent } from "./internal/SnackbarContent";
import styled from "styled-components";
import Typography from "../Typography";
import Spacer from "../Spacer";
import Button from "../Button";
import { useTheme } from "../../themes/useTheme";
import { select } from "@storybook/addon-knobs";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing * 3}px;
`;

export default {
  title: "Snackbar",
  component: Snackbar,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const vertical = select(
    "vertical",
    {
      Top: "top",
      Bottom: "bottom",
    },
    "bottom",
  );

  const horizontal = select(
    "horizontal",
    {
      Left: "left",
      Right: "right",
    },
    "right",
  );

  return (
    <Container>
      <Typography weight="bold" size="xxl">
        Overview
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <SnackbarContent color="dark">
          <Typography color="white" size="sm">
            操作が長時間行われていません。
          </Typography>
        </SnackbarContent>
        <Spacer pr={1} />
        <SnackbarContent color="default">
          <Typography size="sm">操作が長時間行われていません。</Typography>
        </SnackbarContent>
        <Spacer pr={1} />
        <SnackbarContent color="warning">
          <Typography size="sm" color={theme.palette.warning.deepDark}>
            操作が長時間行われていません。
          </Typography>
        </SnackbarContent>
      </RowContainer>
      <Spacer pt={5} />
      <Typography weight="bold" size="xxl">
        Long text
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <SnackbarContent color="dark">
          <Typography color="white" size="sm">
            指定したグループと紐付いているクリエイティブのみがグループとして選択できます。グループとの紐付けは設定メニューから行えます。
          </Typography>
        </SnackbarContent>
      </RowContainer>
      <Spacer pt={5} />
      <Typography weight="bold" size="xxl">
        Example
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <Button inline={true} onClick={() => setIsOpen(true)}>
          OPEN SNACKBAR
        </Button>
        <Snackbar
          isOpen={isOpen}
          color="dark"
          anchorOrigin={{
            vertical,
            horizontal,
          }}
          onClose={() => setIsOpen(false)}
        >
          <Typography color="white" size="sm">
            指定したグループと紐付いているクリエイティブのみがグループとして選択できます。グループとの紐付けは設定メニューから行えます。
          </Typography>
        </Snackbar>
      </RowContainer>
    </Container>
  );
};
