import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Badge from "./Badge";
import Icon from "../Icon";

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
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "basic",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small"],
    },
  },
};

const Template: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args} />,
};

export const Normal: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "primary",
    children: "ノーマル",
  },
};

export const NormalWithIcon: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "success",
    children: "アイコン付き",
    icon: <Icon name="image" size="sm" color="currentColor" />,
  },
};

export const Pill: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    type: "pill",
    color: "secondary",
    children: "ピルタイプ",
  },
};

export const Signal: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    type: "signal",
    color: "success",
    children: "ステータス",
  },
};
