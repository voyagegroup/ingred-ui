import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { select, text } from "@storybook/addon-knobs";
import DropdownButton from "./";
import Spacer from "../Spacer";

const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
  justify-content: center;
  align-items: center;
  width: 200vw;
  height: 250vh;
`;

export default {
  title: "DropdownButton",
  parameters: {
    component: DropdownButton,
  },
};

export const Overview = () => {
  const title = text("Title", "保存する");

  const size = select(
    "Size",
    {
      Small: "small",
      Medium: "medium",
      Large: "large",
    },
    "medium",
  );

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
  return (
    <Container>
      <DropdownButton size={size} contents={contents}>
        {title}
      </DropdownButton>
      <Spacer pr={40} />
      <DropdownButton
        split={true}
        size={size}
        contents={contents}
        onClick={action("clicked hogehgoe")}
      >
        {title}
      </DropdownButton>
    </Container>
  );
};
