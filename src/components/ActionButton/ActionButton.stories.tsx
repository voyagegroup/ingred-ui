import { action } from "@storybook/addon-actions";
import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { Story } from "@storybook/react/types-6-0";
import React from "react";
import ActionButton, { ActionButtonProps } from "./ActionButton";

export default {
  title: "Components/Inputs/ActionButton",
  component: ActionButton,
  args: {
    onClick: action("clicked"),
    icon: "pencil",
    children: "Edit",
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description markdown={"It can behave like a `<button />` tags."} />
          <ArgsTable of={ActionButton} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<ActionButtonProps> = (args) => <ActionButton {...args} />;

export const Primary = Template.bind({});

export const Warning = Template.bind({});
Warning.args = {
  color: "warning",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
