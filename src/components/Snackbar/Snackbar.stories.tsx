import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
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
          <Markdown>{"It express `position: fixed;` panel."}</Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof Snackbar>;

const Template: StoryObj<typeof Snackbar> = {
  render: (args: SnackbarProps) => {
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
