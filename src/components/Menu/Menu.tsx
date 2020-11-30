import * as React from "react";
import * as PopperJS from "@popperjs/core";
import MenuList, { ContentProp, MenuListProps } from "../MenuList/MenuList";
import Popover from "../Popover";
import { ModalCloseReason } from "../Modal";
import { createChainedFunction } from "../../utils/createChainedFunction";

export type MenuCloseReason = "clickMenuList";

// TODO: need breaking change(#211)
//       remove 'React.ComponentPropsWithRef<"div">' because it is included menuListProps
export type MenuProps = React.ComponentPropsWithRef<"div"> & {
  isOpen?: boolean;
  baseElement?: HTMLElement | null;
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason | MenuCloseReason,
  ) => void;
  maxHeight?: MenuListProps["maxHeight"];
  menuListProps?: Partial<MenuListProps>;
};

const Menu: React.FunctionComponent<MenuProps> = ({
  isOpen = true,
  baseElement = null,
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  onClose,
  maxHeight = "none",
  menuListProps,
  ...rest
}) => {
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
    >
      <MenuList
        contents={contents}
        maxHeight={maxHeight}
        {...rest}
        onClick={createChainedFunction(
          handleCloseMenuList,
          rest.onClick,
          menuListProps?.onClick,
        )}
      />
    </Popover>
  );
};

export default Menu;
