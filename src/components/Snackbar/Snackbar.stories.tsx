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
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  },
  parameters: {
    controls: { disabled: true },
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

const Template: Story<SnackbarProps> = (args) => {
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
};

export const Default = Template.bind({});
Default.args = {
  color: "default",
};

export const Dark = Template.bind({});
Dark.args = {
  color: "dark",
};

export const Warning = Template.bind({});
Warning.args = {
  color: "warning",
};
