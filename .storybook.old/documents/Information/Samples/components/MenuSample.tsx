import * as React from "react";
import { Menu } from "../../../../../src/components";
import { action } from "@storybook/addon-actions";

const MenuSample: React.FC = () => {
  const [
    buttonElement,
    setButtonElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const handleToggleMenu = (showMenu: boolean) => () => {
    setShowMenu(showMenu);
  };

  return (
    <>
      <button ref={setButtonElement} onClick={handleToggleMenu(!showMenu)}>
        Click me!!
      </button>
      {showMenu && (
        <Menu
          baseElement={buttonElement}
          contents={[
            {
              text: "Save",
              onClick: action("clicked 'Save'"),
            },
            {
              text: "Edit",
              onClick: action("clicked 'Edit'"),
            },
          ]}
          onClose={handleToggleMenu(false)}
        />
      )}
    </>
  );
};

export default MenuSample;
