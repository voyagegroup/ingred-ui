import { ArgsTable, Stories, Title } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Typography from "../Typography";
import ClickAwayListener from "./ClickAwayListener";

export default {
  title: "Components/Utils/ClickAwayListener",
  component: ClickAwayListener,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={ClickAwayListener} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: StoryObj = {
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
