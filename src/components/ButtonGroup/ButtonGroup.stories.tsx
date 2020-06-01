import * as React from "react";
import styled from "styled-components";
import ButtonGroup from ".";
import Button from "../Button";
import { action } from "@storybook/addon-actions";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default {
  title: "ButtonGroup",
  parameters: {
    component: Button,
  },
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      Medium Button
    </Typography>
    <RowContainer>
      <ButtonGroup>
        <Button onClick={action("clicked")}>保存する</Button>
        <Button onClick={action("clicked")}>編集する</Button>
      </ButtonGroup>
    </RowContainer>

    <Typography weight="bold" size="xxl">
      Small Button
    </Typography>
    <RowContainer>
      <ButtonGroup size="small">
        <Button onClick={action("clicked")}>保存する</Button>
        <Button onClick={action("clicked")}>編集する</Button>
        <Button onClick={action("clicked")}>キャンセル</Button>
      </ButtonGroup>
    </RowContainer>
  </Container>
);
