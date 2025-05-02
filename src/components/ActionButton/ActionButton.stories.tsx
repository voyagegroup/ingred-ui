import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Stories, Title, Markdown } from "@storybook/blocks";
import React from "react";
import ActionButton, { ActionButtonProps } from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  title: "Components/Inputs/ActionButton",
  component: ActionButton,
  args: {
    onClick: action("clicked"),
    icon: "pencil",
    children: "Edit",
  },
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>{"It can behave like a `<button />` tag."}</Markdown>
          <Controls />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {
  args: {
    color: "primary",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
