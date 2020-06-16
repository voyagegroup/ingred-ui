import * as React from "react";
import * as PopperJS from "@popperjs/core";
import MenuList, { ContentProp } from "../MenuList/MenuList";
import ClickAwayListener from "../ClickAwayListener";
import Popover from "../Popover";

type Props = React.ComponentPropsWithRef<"div"> & {
  baseElement?: HTMLElement | null;
  contents: ContentProp[];
  positionPriority?: PopperJS.Placement[];
  onClickAway?: (event: MouseEvent) => void;
};

const Menu: React.FunctionComponent<Props> = ({
  baseElement = null,
  contents,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  onClickAway,
  ...rest
}) => (
  <Popover baseElement={baseElement} positionPriority={positionPriority}>
    <ClickAwayListener onClickAway={onClickAway}>
      <MenuList contents={contents} {...rest} />
    </ClickAwayListener>
  </Popover>
);

export default Menu;
