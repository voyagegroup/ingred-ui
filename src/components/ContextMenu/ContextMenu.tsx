import * as PopperJS from "@popperjs/core";
import * as React from "react";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { createChainedFunction } from "../../utils/createChainedFunction";
import { ActionButtonProps } from "../ActionButton";
import Menu, { MenuProps } from "../Menu";
import { ContentProp } from "../MenuList/MenuList";
import * as Styled from "./styled";

export type ContextMenuProps = {
  /**
   * `type ContentProp = React.ComponentPropsWithoutRef<"div"> & {
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
  actionButtonProps?: Partial<ActionButtonProps>;
};

const ContextMenu = React.forwardRef<HTMLButtonElement, ContextMenuProps>(
  (
    {
      contents,
      positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
      menuMaxHeight = "none",
      menuProps,
      actionButtonProps,
    },
    ref,
  ) => {
    const [iconWrapperElement, setIconWrapperElement] =
      React.useState<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleToggleOpen = (open: boolean) => () => {
      setIsOpen(open);
    };

    const refs = useMergeRefs<HTMLButtonElement>(setIconWrapperElement, ref);

    return (
      <>
        <Styled.ActionButton
          ref={refs}
          data-testid="icon-wrapper"
          icon="more_vert"
          onClick={handleToggleOpen(!isOpen)}
          {...actionButtonProps}
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
  },
);

export default ContextMenu;
