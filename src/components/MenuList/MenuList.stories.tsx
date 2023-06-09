import React from "react";
import { StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import MenuList, { MenuListProps } from "./MenuList";
import { action } from "@storybook/addon-actions";
import Flex from "../Flex";
import Icon from "../Icon";

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
      { text: "Edit", onClick: action('clicked "Save"'), type: "default" },
      { text: "Delete", onClick: () => {}, type: "disabled" },
      { text: "Update", onClick: action('clicked "Update"'), type: "warning" },
      {
        text: (
          <Flex display="flex" justifyContent="space-between" gap={1}>
            <Icon name="save" />
            Save
          </Flex>
        ),
        onClick: action('clicked "Save"'),
        type: "default",
      },
      {
        text: (
          <Flex display="flex" justifyContent="space-between" gap={1}>
            <Icon name="pencil" />
            Edit
          </Flex>
        ),
        onClick: action('clicked "Edit"'),
        type: "default",
      },
      {
        text: (
          <Flex display="flex" justifyContent="space-between" gap={1}>
            <Icon name="delete_bin" />
            Delete
          </Flex>
        ),
        onClick: () => {},
        type: "disabled",
      },
      {
        text: (
          <Flex display="flex" justifyContent="space-between" gap={1}>
            <Icon name="refresh_line" />
            Update
          </Flex>
        ),
        onClick: action('clicked "Update"'),
        type: "warning",
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
          { text: <span>Grape</span>, onClick: action('clicked "Grape"') },
        ],
      },
      {
        title: "Vegetables",
        contents: [
          { text: "Cabbage", onClick: action('clicked "Cabbage"') },
          { text: "Carrot", onClick: action('clicked "Carrot"') },
          { text: "Radish", onClick: action('clicked "Radish"') },
          { text: "Cucumber", onClick: action('clicked "Cucumber"') },
          { text: <span>Tomato</span>, onClick: action('clicked "Tomato"') },
        ],
      },
    ],
    maxHeight: "250px",
  },
};
