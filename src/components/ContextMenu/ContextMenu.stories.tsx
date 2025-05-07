import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Stories } from "@storybook/blocks";
import { action } from "@storybook/addon-actions";
import ContextMenu from "./ContextMenu";

export default {
  title: "Components/Navigation/ContextMenu",
  component: ContextMenu,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
} as Meta<typeof ContextMenu>;

export const Basic: StoryObj<typeof ContextMenu> = {
  args: {
    contents: [
      {
        text: "Edit",
        onClick: action('clicked "Edit"'),
      },
      {
        text: "Save",
        onClick: action('clicked "Save"'),
      },
    ],
  },
};

export const Disabled: StoryObj<typeof ContextMenu> = {
  args: {
    contents: [
      {
        text: "Edit",
        onClick: action('clicked "Edit"'),
      },
      {
        text: "Save",
        onClick: () => {},
        type: "disabled",
      },
    ],
  },
};

export const Warning: StoryObj<typeof ContextMenu> = {
  args: {
    contents: [
      {
        text: "Edit",
        onClick: action('clicked "Edit"'),
      },
      {
        text: "Delete",
        onClick: action('clicked "Delete"'),
        type: "warning",
      },
    ],
  },
};
