import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import Toast, { ToastProps } from "./Toast";
import Button from "../Button";

export default {
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
          <Description
            markdown={[
              "`<Toast />` and related methods are the wrapper of [react-toast-notifications](https://github.com/jossmac/react-toast-notifications).",
              "",
              "The toast is used to show alerts on top of an overlay. The toast will close itself when the close button is clicked, or after a timeout.",
            ].join("\n")}
          />
          <ArgsTable of={Toast} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<ToastProps> = {
  render: (args) => {
    const ToastSample = () => {
      const { addToast } = Toast.useToasts();
      const handleClick = () => {
        addToast(args.appearance, args);
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
  },
};

export const Info = {
  ...Template,
  args: {
    appearance: "info",
  },
};

export const Success = {
  ...Template,
  args: {
    appearance: "success",
  },
};

export const Warning = {
  ...Template,
  args: {
    appearance: "warning",
  },
};

export const Error = {
  ...Template,
  args: {
    appearance: "error",
  },
};
