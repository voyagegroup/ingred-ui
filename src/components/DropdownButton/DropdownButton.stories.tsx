import * as React from "react";
import styled from "styled-components";
import { DropdownButton } from "./";
import { action } from "@storybook/addon-actions";

const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
  justify-content: center;
  align-items: center;
  width: 2000px;
  height: 1000px;
`;

export default {
  title: "DropdownButton",
  parameters: {
    component: DropdownButton
  }
};

export const Overview = () => {
  const contents = [
    {
      text: "保存する",
      onClick: action("clicked '保存する'"),
    },
    {
      text: "保存して実行する",
      onClick: action("clicked '保存して実行する'"),
    },
    {
      text: "下書きとして保存する",
      onClick: action("clicked '下書きとして保存する'"),
    },
  ];
  return (
    <Container>
      <DropdownButton title="hogehoge" contents={contents} />
    </Container>
  );
};
