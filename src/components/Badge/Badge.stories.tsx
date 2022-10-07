import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Subtitle, ArgsTable, Stories } from "@storybook/addon-docs";
import Badge, { BadgeProps } from "./Badge";

export default {
  title: "Components/Data Display/Badge",
  components: Badge,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <ArgsTable of={Badge} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  children: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  children: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  color: "success",
  children: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  color: "warning",
  children: "warning",
};

export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
  children: "danger",
};
