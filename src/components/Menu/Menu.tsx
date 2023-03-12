import * as PopperJS from "@popperjs/core";
import * as React from "react";
import { createChainedFunction } from "../../utils/createChainedFunction";
import MenuList, { ContentProp, MenuListProps } from "../MenuList/MenuList";
import { ModalCloseReason } from "../Modal";
import Popover, { PopoverProps } from "../Popover";

export type MenuCloseReason = "clickMenuList";

// TODO: need breaking change(#211)
//       remove 'React.ComponentPropsWithoutRef<"div">' because it is included menuListProps
export type MenuProps = React.ComponentPropsWithoutRef<"div"> & {
  isOpen?: boolean;
  /**
   * Basis of `<Menu />` position.
   */
  baseElement?: HTMLElement | null;
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
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason | MenuCloseReason,
  ) => void;
  maxHeight?: MenuListProps["maxHeight"];
  /**
   * props of [MenuList](/?path=/docs/components-navigation-menulist)
   */
  menuListProps?: Partial<MenuListProps>;
  popOverProps?: Partial<PopoverProps>;
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      isOpen = true,
      baseElement = null,
      contents,
      positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
      onClose,
      maxHeight = "none",
      menuListProps,
      popOverProps,
      ...rest
    },
    ref,
  ) => {
    const handleCloseMenuList = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (onClose) onClose(event, "clickMenuList");
    };

    return (
      <Popover
        isOpen={isOpen}
        baseElement={baseElement}
        positionPriority={positionPriority}
        onClose={onClose}
        {...popOverProps}
      >
        <MenuList
          ref={ref}
          contents={contents}
          maxHeight={maxHeight}
          {...rest}
          {...menuListProps}
          onClick={createChainedFunction(
            handleCloseMenuList,
            rest.onClick,
            menuListProps?.onClick,
          )}
        />
      </Popover>
    );
  },
);

export default Menu;
