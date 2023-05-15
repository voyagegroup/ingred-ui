import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Badge from "./Badge";

export default {
  title: "Components/Data Display/Badge",
  components: Badge,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Badge} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args} />,
};

export const Primary: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "primary",
    children: "primary",
  },
};

export const Secondary: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "secondary",
    children: "secondary",
  },
};
export const Success: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "success",
    children: "success",
  },
};

export const Warning: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "warning",
    children: "warning",
  },
};

export const Danger: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "danger",
    children: "danger",
  },
};

export const Basic: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "basic",
    children: "basic",
  },
};
