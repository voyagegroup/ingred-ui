import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories, Markdown } from "@storybook/blocks";
import Toast from "./Toast";
import Button from "../Button";

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast,
  args: {
    placement: "top-center",
    autoDismiss: true,
    autoDismissTimeout: 3000,
    transitionDuration: 300,
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {[
              "`<Toast />` and related methods are the wrapper of [react-toast-notifications](https://github.com/jossmac/react-toast-notifications).",
              "",
              "The toast is used to show alerts on top of an overlay. The toast will close itself when the close button is clicked, or after a timeout.",
            ].join("\n")}
          </Markdown>
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const BaseToastTemplate = (args: any) => {
  const ToastSample = () => {
    const { addToast } = Toast.useToasts();
    const handleClick = () => {
      addToast(
        args.appearance as "info" | "success" | "warning" | "error",
        args,
      );
    };
    return (
      <div>
        <Button inline onClick={handleClick}>
          Show Toast
        </Button>
      </div>
    );
  };
  return (
    <Toast.Provider {...args}>
      <ToastSample />
    </Toast.Provider>
  );
};

export const Info: Story = {
  args: {
    appearance: "info",
  },
  render: BaseToastTemplate,
};

export const Success: Story = {
  args: {
    appearance: "success",
  },
  render: BaseToastTemplate,
};

export const Warning: Story = {
  args: {
    appearance: "warning",
  },
  render: BaseToastTemplate,
};

export const Error: Story = {
  args: {
    appearance: "error",
  },
  render: BaseToastTemplate,
};
