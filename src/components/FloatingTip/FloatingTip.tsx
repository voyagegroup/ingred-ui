import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import ClickAwayListener from "../ClickAwayListener";
import Popover from "../Popover";
import Icon from "../Icon";
import { useTheme } from "../../themes";

type Props = {
  baseElement: HTMLElement | null;
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FloatingTip: React.FunctionComponent<Props> = ({
  baseElement,
  positionPriority = ["right-start"],
  offset = [0, 10],
  isOpen,
  onClose,
  children,
}) => {
  const theme = useTheme();
  return isOpen ? (
    <Popover
      baseElement={baseElement}
      positionPriority={positionPriority}
      offset={offset}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Styled.Container>
          <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
          <Styled.IconWrapper onClick={onClose}>
            <Icon name="close" color={theme.palette.black} />
          </Styled.IconWrapper>
        </Styled.Container>
      </ClickAwayListener>
    </Popover>
  ) : null;
};

export default FloatingTip;
