import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import Snackbar, { SnackbarProps } from "./Snackbar";
import Button from "../Button";

export default {
  title: "Components/Feedback/Snackbar",
  component: Snackbar,
  args: {
    isOpen: false,
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Description markdown={"It express `position: fixed;` panel."} />
          <ArgsTable of={Snackbar} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<SnackbarProps> = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen);

    return (
      <>
        <Button inline={true} onClick={() => setIsOpen(true)}>
          OPEN SNACKBAR
        </Button>
        <Snackbar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          This is Snackbar({args.color} color).
        </Snackbar>
      </>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    color: "default",
  },
};

export const Dark = {
  ...Template,
  args: {
    color: "dark",
  },
};

export const Warning = {
  ...Template,
  args: {
    color: "warning",
  },
};
