import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { action } from "@storybook/addon-actions";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";

export default {
  title: "Components/Navigation/ContextMenu",
  component: ContextMenu,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={ContextMenu} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<ContextMenuProps> = (args) => {
  return <ContextMenu {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  contents: [
    {
      text: "Edit",
      onClick: action('clicked "Edit"'),
    },
    {
      text: "Save",
      onClick: action('clicked "Save"'),
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  contents: [
    {
      text: "Edit",
      onClick: action('clicked "Edit"'),
    },
    {
      text: "Save",
      onClick: () => {},
      type: "disabled",
    },
  ],
};

export const Warning = Template.bind({});
Warning.args = {
  contents: [
    {
      text: "Edit",
      onClick: action('clicked "Edit"'),
    },
    {
      text: "Delete",
      onClick: action('clicked "Delete"'),
      type: "warning",
    },
  ],
};
