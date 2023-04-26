import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import { action } from "@storybook/addon-actions";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";

export default {
  title: "Components/Navigation/ContextMenu",
  component: ContextMenu,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={ContextMenu} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Basic: StoryObj<ContextMenuProps> = {
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

export const Disabled: StoryObj<ContextMenuProps> = {
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

export const Warning: StoryObj<ContextMenuProps> = {
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
