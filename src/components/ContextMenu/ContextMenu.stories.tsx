import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
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
      text: "Apple",
      onClick: () => {},
    },
    {
      text: "Banana",
      onClick: () => {},
    },
    {
      text: "Orange",
      onClick: () => {},
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  contents: [
    {
      text: "Edit",
      onClick: () => {},
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
      onClick: () => {},
    },
    {
      text: "Delete",
      onClick: () => {},
      type: "warning",
    },
  ],
};
