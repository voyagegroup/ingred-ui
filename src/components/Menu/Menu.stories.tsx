import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import Menu, { MenuProps } from "./Menu";
import Button from "../Button";

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

const Template: Story<MenuProps> = (args) => {
  const [buttonElement, setButtonElement] = React.useState<HTMLElement | null>(
    null,
  );
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
