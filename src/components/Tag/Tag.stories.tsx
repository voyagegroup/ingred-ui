import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Data Display/Tag",
  component: Tag,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "サイズバリエーション",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "カラーバリエーション",
      table: {
        type: { summary: "light | dark" },
        defaultValue: { summary: "light" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "無効状態",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "タグ",
    size: "medium",
    variant: "light",
    onRemove: () => console.log("remove"),
  },
};

export const Sizes: Story = {
  args: {
    label: "タグ",
    variant: "light",
    onRemove: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Tag {...args} label="Small" size="small" />
      <Tag {...args} label="Medium" size="medium" />
      <Tag {...args} label="Large" size="large" />
    </div>
  ),
};

export const Variants: Story = {
  args: {
    label: "タグ",
    size: "medium",
    onRemove: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Tag {...args} label="Light" variant="light" />
      <Tag {...args} label="Dark" variant="dark" />
    </div>
  ),
};

export const WithoutRemove: Story = {
  args: {
    label: "削除ボタンなし",
    size: "medium",
    variant: "light",
  },
};

export const Disabled: Story = {
  args: {
    label: "タグ",
    size: "medium",
    variant: "light",
    onRemove: () => console.log("remove"),
    disabled: true,
  },
};
