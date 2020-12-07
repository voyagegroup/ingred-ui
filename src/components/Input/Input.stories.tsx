import * as React from "react";
import styled from "styled-components";
import Input from "./Input";
import Typography from "../Typography";
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
  component: Input,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
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
      <Column>
        <Typography weight="bold" size="xxl">
          Typed
        </Typography>
        <Spacer pt={2} />
        <Input value="Textfield" readOnly={true} />
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Disabled
        </Typography>
        <Spacer pt={2} />
        <Input disabled={true} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Disabled &amp; Typed
        </Typography>
        <Spacer pt={2} />
        <Input value="Textfield" readOnly={true} disabled={true} />
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Error
        </Typography>
        <Spacer pt={2} />
        <Input error={true} readOnly={true} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Error &amp; Typed
        </Typography>
        <Spacer pt={2} />
        <Input error={true} value="Textfield" readOnly={true} />
      </Column>
    </RowContainer>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Textarea
        </Typography>
        <Spacer pt={2} />
        <Input multiline={true} placeholder="プレースホルダー" />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Textarea(Error)
        </Typography>
        <Spacer pt={2} />
        <Input error={true} multiline={true} placeholder="プレースホルダー" />
      </Column>
    </RowContainer>
  </Container>
);
