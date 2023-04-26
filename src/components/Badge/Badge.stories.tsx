import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Badge, { BadgeProps } from "./Badge";

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

const Template: StoryObj<BadgeProps> = {
  render: (args) => <Badge {...args} />,
};

export const Primary: StoryObj<BadgeProps> = {
  ...Template,
  args: {
    color: "primary",
    children: "primary",
  },
};

export const Secondary: StoryObj<BadgeProps> = {
  ...Template,
  args: {
    color: "secondary",
    children: "secondary",
  },
};
export const Success: StoryObj<BadgeProps> = {
  ...Template,
  args: {
    color: "success",
    children: "success",
  },
};

export const Warning: StoryObj<BadgeProps> = {
  ...Template,
  args: {
    color: "warning",
    children: "warning",
  },
};

export const Danger: StoryObj<BadgeProps> = {
  ...Template,
  args: {
    color: "danger",
    children: "danger",
  },
};
