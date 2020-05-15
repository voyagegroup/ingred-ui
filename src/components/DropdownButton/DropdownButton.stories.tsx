import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { select } from '@storybook/addon-knobs';
import DropdownButton from "./";
import Spacer from "../Spacer";

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
  const size = select("Size", {
    Small: "small",
    Medium: "medium",
    Large: "large",
  }, "medium")

  const contents = [
    {
      text: "保存する",
      onClick: action("clicked '保存する'"),
      divideBottom: true,
    },
    {
      text: "保存して実行する",
      onClick: action("clicked '保存して実行する'"),
    },
    {
      text: "下書きとして保存するhogehogehogehoge",
      onClick: action("clicked '下書きとして保存する'"),
      divideBottom: true,
    },
    {
      text: "やっぱり何もしない",
      onClick: action("clicked 'やっぱり何もしない'"),
    },
  ];
  return (
    <Container>
      <DropdownButton size={size} contents={contents}>
        保存する
      </DropdownButton>
      <Spacer px={20} />
      <DropdownButton
        split={true}
        size={size}
        contents={contents}
        onClick={action("clicked hogehgoe")}
      >
        保存する
      </DropdownButton>
  </Container>
  );
};
