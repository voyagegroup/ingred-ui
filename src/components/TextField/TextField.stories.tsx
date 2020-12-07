import * as React from "react";
import styled from "styled-components";
import TextField from "./TextField";
import Typography from "../Typography";
import { useTheme } from "../../themes/useTheme";
import Spacer from "../Spacer";

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
  min-width: 300px;
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => {
  const theme = useTheme();
  return (
    <Container>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Error
          </Typography>
          <Spacer pt={2} />
          <TextField
            value="Textfield"
            readOnly={true}
            errorText={"数値で入力してください"}
          />
        </Column>
        <Column>
          <Typography weight="bold" size="xxl">
            Error(Textarea)
          </Typography>
          <Spacer pt={2} />
          <TextField
            value="Textfield"
            readOnly={true}
            errorText={"入力が正しくありません"}
            multiline={true}
          />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Password
          </Typography>
          <Typography color={theme.palette.text.hint}>
            Last
            passを利用している方は下キーを押すとパスワードの候補が表示されます
          </Typography>
          <Spacer pt={2} />
          <TextField value="secure text" readOnly={true} type="password" />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            With icon
          </Typography>
          <Spacer pt={2} />
          <TextField placeholder="検索" icon="search" />
        </Column>
      </RowContainer>
    </Container>
  );
};
