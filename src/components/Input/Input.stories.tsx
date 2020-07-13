import * as React from "react";
import styled from "styled-components";
import Input from "./Input";
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
  title: "Input",
  parameters: {
    component: Input,
  },
};

export const Overview = () => {
  const theme = useTheme();
  return (
    <Container>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Empty
          </Typography>
          <Spacer pt={2} />
          <Input placeholder="Place holder" />
        </Column>
        <Column>
          <Typography weight="bold" size="xxl">
            Focus
          </Typography>
          <Spacer pt={2} />
          <Input />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Typed
          </Typography>
          <Spacer pt={2} />
          <Input value="Textfield" readOnly={true} />
        </Column>
        <Column>
          <Typography weight="bold" size="xxl">
            Disabled
          </Typography>
          <Spacer pt={2} />
          <Input disabled={true} />
        </Column>
        <Column>
          <Typography weight="bold" size="xxl">
            Typed &amp; Disabled
          </Typography>
          <Spacer pt={2} />
          <Input value="Textfield" readOnly={true} disabled={true} />
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
          <Input value="secure text" readOnly={true} type="password" />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            with Icon
          </Typography>
          <Spacer pt={2} />
          <Input placeholder="検索" icon="search" />
        </Column>
      </RowContainer>
    </Container>
  );
};
