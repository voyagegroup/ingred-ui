import * as React from "react";
import NotificationBadge, { NotificationBadgeProps } from ".";
import { Icon } from "..";
import { Story } from "@storybook/react/types-6-0";

export default {
  title: "Components/Data Display/NotificationBadge",
  component: NotificationBadge,
};

export const Number: Story<NotificationBadgeProps> = (args) => (
  <NotificationBadge {...args}>
    <Icon name="setting" type="fill" size="lg" />
  </NotificationBadge>
);

Number.args = {
  badgeContent: 100,
};

export const Text: Story<NotificationBadgeProps> = (args) => (
  <NotificationBadge {...args}>
    <Icon name="setting" type="fill" size="lg" />
  </NotificationBadge>
);

Text.args = {
  badgeContent: "New",
};

export const Dot: Story<NotificationBadgeProps> = (args) => (
  <NotificationBadge {...args}>
    <Icon name="setting" type="fill" size="lg" />
  </NotificationBadge>
);

Dot.args = {
  variant: "dot",
};
