import * as React from "react";
import NotificationBadge, { NotificationBadgeProps } from "./NotificationBadge";
import { Icon } from "..";
import { StoryObj } from "@storybook/react";

export default {
  title: "Components/Data Display/NotificationBadge",
  component: NotificationBadge,
};

export const Number: StoryObj<NotificationBadgeProps> = {
  args: {
    badgeContent: 100,
    children: <Icon name="setting" type="fill" size="lg" />,
  },
};

export const Text: StoryObj<NotificationBadgeProps> = {
  args: {
    badgeContent: "New",
    children: <Icon name="setting" type="fill" size="lg" />,
  },
};

export const Dot: StoryObj<NotificationBadgeProps> = {
  args: {
    variant: "dot",
    children: <Icon name="setting" type="fill" size="lg" />,
  },
};
