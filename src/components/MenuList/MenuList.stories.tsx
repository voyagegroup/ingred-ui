import React from "react";
import { StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import MenuList, { MenuListProps } from "./MenuList";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Navigation/MenuList",
  component: MenuList,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <Markdown>
            {`MenuList is a lower-level component that is leveraged [&lt;Menu /&gt;](${window.location.origin}/?path=/docs/components-navigation-menu--example).`}
          </Markdown>
          <ArgsTable of={MenuList} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<MenuListProps> = {
  render: (args) => {
    return (
      <div style={{ backgroundColor: "silver", padding: "10px" }}>
        <MenuList {...args} />
      </div>
    );
  },
};

export const Basic = {
  ...Template,
  args: {
    contents: [
      { text: "Save", onClick: action('clicked "Save"'), type: "default" },
      { text: "Edit", onClick: action('clicked "Edit"'), type: "default" },
      { text: "Delete", onClick: () => {}, type: "disabled" },
      { text: "Update", onClick: action('clicked "Update"'), type: "warning" },
      {
        text: "Save",
        onClick: action('clicked "Save"'),
        type: "default",
        iconName: "save",
      },
      {
        text: "Edit",
        onClick: action('clicked "Edit"'),
        type: "default",
        iconName: "pencil",
      },
      {
        text: "Delete",
        onClick: () => {},
        type: "disabled",
        iconName: "delete_bin",
      },
      {
        text: "Update",
        onClick: action('clicked "Update"'),
        type: "warning",
        iconName: "zoom_in",
      },
    ],
    maxHeight: "100px",
  },
};

export const Group = {
  ...Template,
  args: {
    contents: [
      {
        title: "Fruits",
        contents: [
          { text: "Apple", onClick: action('clicked "Apple"') },
          { text: "Peach", onClick: action('clicked "Peach"') },
          { text: "Orange", onClick: action('clicked "Orange"') },
          { text: "Strawberry", onClick: action('clicked "Strawberry"') },
        ],
      },
      {
        title: "Vegetables",
        contents: [
          { text: "Cabbage", onClick: action('clicked "Cabbage"') },
          { text: "Carrot", onClick: action('clicked "Carrot"') },
          { text: "Radish", onClick: action('clicked "Radish"') },
          { text: "Cucumber", onClick: action('clicked "Cucumber"') },
        ],
      },
    ],
    maxHeight: "250px",
  },
};
