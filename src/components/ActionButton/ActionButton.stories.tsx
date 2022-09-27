import { action } from "@storybook/addon-actions";
import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { Story } from "@storybook/react/types-6-0";
import React from "react";
import ActionButton, { ActionButtonProps } from "./";

export default {
  title: "Components/Inputs/ActionButton",
  component: ActionButton,
  args: {
    onClick: action("clicked"),
    icon: "pencil",
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

export const Primary: Story<ActionButtonProps> = (args) => {
  return (
    <ActionButton color="primary" {...args}>
      Edit
    </ActionButton>
  );
};

export const Warning: Story<ActionButtonProps> = (args) => {
  return (
    <ActionButton color="warning" {...args}>
      Edit
    </ActionButton>
  );
};

export const Disabled: Story<ActionButtonProps> = (args) => {
  return (
    <ActionButton disabled={true} {...args}>
      Edit
    </ActionButton>
  );
};
