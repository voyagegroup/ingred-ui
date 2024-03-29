import * as React from "react";
import { createChainedFunction } from "../../utils/createChainedFunction";
import MenuList, { ContentProp, MenuListProps } from "../MenuList/MenuList";
import { ModalCloseReason } from "../Modal";
import Popover, { PopoverProps } from "../Popover";
import { Placement } from "@floating-ui/react";
import { AutoPlacement } from "../../hooks/usePlacement";

export type MenuCloseReason = "clickMenuList";

export type MenuProps = {
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
   * Define priority of position. Please check [this](https://floating-ui.com/docs/tutorial#placements).
   * For backward compatibility, `"auto" | "auto-start" | "auto-end"` are included in addition to the above positions.
   */
  positionPriority?: (Placement | AutoPlacement)[];
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason | MenuCloseReason,
  ) => void;
  maxHeight?: MenuListProps["maxHeight"];
  /**
   * props of [MenuList](/?path=/docs/components-navigation-menulist)
   */
  menuListProps?: Partial<MenuListProps>;
  /**
   * props of [Popover](/?path=/docs/components-utils-popover)
   */
  popoverProps?: Partial<PopoverProps>;
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    isOpen = true,
    baseElement = null,
    contents,
    positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
    onClose,
    maxHeight = "none",
    menuListProps,
    popoverProps,
    ...rest
  },
  ref,
) {
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
      {...popoverProps}
    >
      <MenuList
        ref={ref}
        contents={contents}
        maxHeight={maxHeight}
        {...rest}
        {...menuListProps}
        onClick={createChainedFunction(
          handleCloseMenuList,
          menuListProps?.onClick,
        )}
      />
    </Popover>
  );
});

export default Menu;
