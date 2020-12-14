import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { select, text, boolean } from "@storybook/addon-knobs";
import DropdownButton from "./";
import Spacer from "../Spacer";

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.dark};
  justify-content: center;
  align-items: center;
  width: 150vw;
  height: 150vh;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing * 5}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default {
  title: "Components/DropdownButton",
  component: DropdownButton,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => {
  const title = text("Title", "保存する");
  const disabled = boolean("Disabled", false);
  const menuMaxHeight = text("MenuMaxHeight", "none");

  const size = select(
    "Size",
    {
      Small: "small",
      Medium: "medium",
      Large: "large",
    },
    "medium",
  );

  const color = select(
    "Color",
    {
      Primary: "primary",
      Secondary: "secondary",
    },
    "primary",
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
      <Inner>
        <DropdownButton
          disabled={disabled}
          color={color}
          size={size}
          contents={contents}
          menuMaxHeight={menuMaxHeight}
        >
          {title}
        </DropdownButton>
        <Spacer pr={40} />
        <DropdownButton
          disabled={disabled}
          color={color}
          split={true}
          size={size}
          contents={contents}
          menuMaxHeight={menuMaxHeight}
          onClick={action(`clicked ${title}`)}
        >
          {title}
        </DropdownButton>
      </Inner>
    </Container>
  );
};
