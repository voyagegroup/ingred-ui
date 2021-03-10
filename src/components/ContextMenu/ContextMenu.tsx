import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import { ContentProp } from "../MenuList/MenuList";
import Menu, { MenuProps } from "../Menu";
import { createChainedFunction } from "../../utils/createChainedFunction";

export type ContextMenuProps = {
  /**
   * `type ContentProp = React.ComponentPropsWithRef<"div"> & {
   *   text: string;
   *   onClick: () => void;
   *   divideTop?: boolean;
   *   disabled?: boolean;
   * }`
   */
  contents: ContentProp[];
  /**
   * Define priority of position. Please check [this](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements).
   */
  positionPriority?: PopperJS.Placement[];
  menuMaxHeight?: MenuProps["maxHeight"];
  /**
   * props of [Menu](/?path=/docs/components-navigation-menu)
   */
  menuProps?: Partial<MenuProps>;
};

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  menuMaxHeight = "none",
  menuProps,
}) => {
  const [
    iconWrapperElement,
    setIconWrapperElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleToggleOpen = (open: boolean) => () => {
    setIsOpen(open);
  };

  return (
    <>
      <Styled.ActionButton
        ref={setIconWrapperElement}
        data-testid="icon-wrapper"
        icon="more_vert"
        onClick={handleToggleOpen(!isOpen)}
      />
      <Menu
        isOpen={isOpen}
        baseElement={iconWrapperElement}
        contents={contents}
        positionPriority={positionPriority}
        maxHeight={menuMaxHeight}
        {...menuProps}
        onClose={createChainedFunction(
          handleToggleOpen(false),
          menuProps?.onClose,
        )}
      />
    </>
  );
};

export default ContextMenu;
