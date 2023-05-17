import { action } from "@storybook/addon-actions";
import { ArgsTable, Stories, Title } from "@storybook/addon-docs";
import { StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import React from "react";
import ActionButton, { ActionButtonProps } from "./ActionButton";

export default {
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
          <Markdown>{"It can behave like a `<button />` tags."}</Markdown>
          <ArgsTable of={ActionButton} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Primary: StoryObj<ActionButtonProps> = {
  args: {
    color: "primary",
  },
};

export const Warning: StoryObj<ActionButtonProps> = {
  args: {
    color: "warning",
  },
};

export const Disabled: StoryObj<ActionButtonProps> = {
  args: {
    disabled: true,
  },
};
