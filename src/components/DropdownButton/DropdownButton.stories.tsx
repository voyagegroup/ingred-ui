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
  title: "Components/Inputs/DropdownButton",
  component: DropdownButton,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => {
  const title = text("Title", "Save");
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
      text: "Save",
      onClick: action("clicked 'Save'"),
    },
    {
      text: "Save and execute",
      onClick: action("clicked 'Save and execute'"),
      divideTop: true,
    },
    {
      text: "Save as drafthogehogehogehoge",
      onClick: action("clicked 'Save as draft'"),
    },
    {
      text: "Cancel",
      onClick: action("clicked 'Cancel'"),
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
