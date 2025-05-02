import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Stories, Title, Markdown } from "@storybook/blocks";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>{"色やラベルをpropsで指定できます。"}</Markdown>
          <Controls />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

const Template: Story = {
  render: (args: React.ComponentProps<typeof Badge>) => <Badge {...args} />,
};

export const Primary: Story = {
  ...Template,
  args: {
    color: "primary",
    children: "primary",
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    color: "secondary",
    children: "secondary",
  },
};
export const Success: Story = {
  ...Template,
  args: {
    color: "success",
    children: "success",
  },
};

export const Warning: Story = {
  ...Template,
  args: {
    color: "warning",
    children: "warning",
  },
};

export const Danger: Story = {
  ...Template,
  args: {
    color: "danger",
    children: "danger",
  },
};

export const Basic: Story = {
  ...Template,
  args: {
    color: "basic",
    children: "basic",
  },
};
