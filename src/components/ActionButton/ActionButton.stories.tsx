import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import ActionButton from ".";
import { Props } from "./ActionButton";
import Typography from "../Typography";
import Spacer from "../Spacer";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

function createButtons(props: Props[], text = "ボタン") {
  return (
    <>
      {props.map(prop => (
        <Spacer pb={2}>
          <ActionButton {...prop} onClick={action("onClick")}>
            {text}
          </ActionButton>
        </Spacer>
      ))}
    </>
  );
}

export default {
  title: "ActionButton",
  parameters: {
    component: ActionButton
  }
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      normal
    </Typography>
    <Spacer pt={2} />
    <RowContainer>
      {createButtons([{ icon: "pencil" }, { icon: "delete_bin" }])}
    </RowContainer>
  </Container>
);
