import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import Menu, { MenuProps } from "./Menu";
import Button from "../Button";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Navigation/Menu",
  component: Menu,
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description
            markdown={
              "A Menu displays a list of choices. It appears when the user interacts with a button, or other control."
            }
          />
          <ArgsTable of={Menu} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: StoryObj<MenuProps> = {
  render: (args) => {
    const [buttonElement, setButtonElement] =
      React.useState<HTMLElement | null>(null);
    const [showMenu, setShowMenu] = React.useState(false);
    const handleToggleMenu = () => {
      setShowMenu(!showMenu);
    };
    return (
      <>
        <Button ref={setButtonElement} inline={true} onClick={handleToggleMenu}>
          Click me!!
        </Button>
        {showMenu && (
          <Menu
            {...args}
            baseElement={buttonElement}
            onClose={handleToggleMenu}
          />
        )}
      </>
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
