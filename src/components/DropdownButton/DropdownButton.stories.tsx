import * as React from "react";
import styled from "styled-components";
import { DropdownButton } from "./";
import { action } from "@storybook/addon-actions";
import Spacer from "../Spacer";
import { MenuList } from "../MenuList";

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
      text: "下書きとして保存するhogehogehogehoge",
      onClick: action("clicked '下書きとして保存する'"),
    },
    {
      text: "やっぱり何もしない",
      onClick: action("clicked 'やっぱり何もしない'"),
    },
  ];
  return (
    <Container>
      <DropdownButton title="hogehoge">
        <MenuList contents={contents} divideIndex={[2]} />
      </DropdownButton>
      <Spacer px={20} />
      <DropdownButton
        split={true}
        title="hogehoge"
        onClick={action("clicked hogehgoe")}
      >
        <MenuList contents={contents} />
      </DropdownButton>
  </Container>
  );
};
