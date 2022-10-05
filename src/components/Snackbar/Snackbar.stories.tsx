import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import Snackbar, { SnackbarProps } from "./Snackbar";
import Button from "../Button";

export default {
  title: "Components/Feedback/Snackbar",
  component: Snackbar,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { type: "code" },
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

export const Example: Story<SnackbarProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  return (
    <>
      <Button inline={true} onClick={() => setIsOpen(true)}>
        OPEN SNACKBAR
      </Button>
      <Snackbar
        {...args}
        isOpen={isOpen}
        color="default"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setIsOpen(false)}
      >
        This is Snackbar(default color).
      </Snackbar>
      <Snackbar
        {...args}
        isOpen={isOpen}
        color="dark"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => setIsOpen(false)}
      >
        This is Snackbar(dark color).
      </Snackbar>
      <Snackbar
        {...args}
        isOpen={isOpen}
        color="warning"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={() => setIsOpen(false)}
      >
        This is Snackbar(warning color).
      </Snackbar>
    </>
  );
};
