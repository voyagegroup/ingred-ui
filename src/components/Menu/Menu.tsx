import * as React from "react";
import * as PopperJS from "@popperjs/core";
import MenuList, { ContentProp } from "../MenuList/MenuList";
import Popover from "../Popover";
import { ModalProps } from "../Modal";

export type MenuProps = React.ComponentPropsWithRef<"div"> & {
  isOpen?: boolean;
  baseElement?: HTMLElement | null;
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
  onClose?: ModalProps["onClose"];
};

const Menu: React.FunctionComponent<MenuProps> = ({
  isOpen = true,
  baseElement = null,
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  onClose,
  ...rest
}) => {
  const onHandleClickMenuList = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (onClose) onClose(event);
    if (rest.onClick) rest.onClick(event);
  };

  return (
    <Popover
      isOpen={isOpen}
      baseElement={baseElement}
      positionPriority={positionPriority}
      onClose={onClose}
    >
      <MenuList contents={contents} {...rest} onClick={onHandleClickMenuList} />
    </Popover>
  );
};

export default Menu;
