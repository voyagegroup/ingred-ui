import React from "react";
import { Story } from "@storybook/react/types-6-0";
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
      source: { type: "code" },
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

const Template: Story<ToastProps> = (args) => {
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
};

export const Info = Template.bind({});
Info.args = {
  appearance: "info",
};

export const Success = Template.bind({});
Success.args = {
  appearance: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  appearance: "warning",
};

export const Error = Template.bind({});
Error.args = {
  appearance: "error",
};
