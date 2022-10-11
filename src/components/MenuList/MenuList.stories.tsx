import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import MenuList, { MenuListProps } from "./MenuList";

export default {
  title: "Components/Navigation/MenuList",
  component: MenuList,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={
              "MenuList is a lower-level component that is leveraged [`<Menu />`](/?path=/docs/components-navigation-menu--example)."
            }
          />
          <ArgsTable of={MenuList} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<MenuListProps> = (args) => {
  return (
    <div style={{ backgroundColor: "silver", padding: "10px" }}>
      <MenuList {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  contents: [
    { text: "Save", onClick: () => {}, type: "default" },
    { text: "Edit", onClick: () => {}, type: "default" },
    { text: "Delete", onClick: () => {}, type: "disabled" },
    { text: "Update", onClick: () => {}, type: "warning" },
  ],
  maxHeight: "100px",
};

export const Group = Template.bind({});
Group.args = {
  contents: [
    {
      title: "Fruits",
      contents: [
        { text: "Apple", onClick: () => {} },
        { text: "Peach", onClick: () => {} },
        { text: "Orange", onClick: () => {} },
        { text: "Strawberry", onClick: () => {} },
      ],
    },
    {
      title: "Vegetables",
      contents: [
        { text: "Cabbage", onClick: () => {} },
        { text: "Carrot", onClick: () => {} },
        { text: "Radish", onClick: () => {} },
        { text: "Cucumber", onClick: () => {} },
      ],
    },
  ],
  maxHeight: "250px",
};
