import * as React from "react";
import styled from "styled-components";
import Textarea from ".";
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
  title: "Textarea",
  parameters: {
    component: Textarea,
  },
};

export const Overview: React.FunctionComponent = () => {
  const [text, setText] = React.useState<string>("");
  const onHandleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  return (
    <Container>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Normal
          </Typography>
          <Spacer pt={2} />
          <Textarea
            placeholder="hogehoge"
            value={text}
            onChange={onHandleChange}
          />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Error
          </Typography>
          <Spacer pt={2} />
          <Textarea
            placeholder="hogehoge"
            value={text}
            errorText="入力が正しくありません"
            onChange={onHandleChange}
          />
        </Column>
      </RowContainer>
      <RowContainer>
        <Column>
          <Typography weight="bold" size="xxl">
            Disabled
          </Typography>
          <Spacer pt={2} />
          <Textarea
            placeholder="hogehoge"
            value={text}
            disabled={true}
            onChange={onHandleChange}
          />
        </Column>
      </RowContainer>
    </Container>
  );
};
