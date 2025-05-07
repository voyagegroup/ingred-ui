import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";
import Typography from "../Typography";
import ClickAwayListener from "./ClickAwayListener";
import { Title, Stories } from "@storybook/blocks";

export default {
  title: "Components/Utils/ClickAwayListener",
  component: ClickAwayListener,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof ClickAwayListener>;

export const Basic: StoryObj<typeof ClickAwayListener> = {
  render: () => {
    const [text, setText] = React.useState("not clicked");

    const handleClickInner = () => {
      setText("clicked inner");
    };

    const handleClickOuter = () => {
      setText("clicked outer");
    };

    return (
      <>
        <ClickAwayListener onClickAway={handleClickOuter}>
          <Button style={{ width: "240px" }} onClick={handleClickInner}>
            Click inner/outer me!!
          </Button>
        </ClickAwayListener>
        <Typography>{text}</Typography>
      </>
    );
  },
};
