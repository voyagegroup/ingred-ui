import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import MenuList from "./MenuList";
import { text } from "@storybook/addon-knobs";

const Container = styled.div`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "MenuList",
  component: MenuList,
  parameters: {
    docs: { page: null },
  },
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
      divideTop: true,
    },
    {
      text: "下書きとして保存するhogehogehogehoge",
      onClick: action("clicked '下書きとして保存する'"),
    },
    {
      text: "やっぱり何もしない",
      onClick: action("clicked 'やっぱり何もしない'"),
      divideTop: true,
    },
  ];
  const maxHeight = text("MaxHeight", "100px");
  return (
    <Container>
      <MenuList contents={contents} maxHeight={maxHeight} />
    </Container>
  );
};
