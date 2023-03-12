import * as PopperJS from "@popperjs/core";
import * as React from "react";
import { useTheme } from "../../themes";
import Icon from "../Icon";
import { ModalCloseReason } from "../Modal";
import Popover, { PopoverProps } from "../Popover";
import * as Styled from "./styled";

export type FloatingTipCloseReason = "clickCloseIcon";

export type FloatingTipProps = {
  /**
   * That becomes position reference of this component.
   */
  baseElement: HTMLElement | null;
  /**
   * Define priority of position. Please check [this](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements).
   */
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason | FloatingTipCloseReason,
  ) => void;
  popOverProps?: Partial<PopoverProps>;
};

const FloatingTip = React.forwardRef<HTMLDivElement, FloatingTipProps>(
  (
    {
      baseElement,
      positionPriority = ["right-start"],
      offset = [0, 10],
      isOpen,
      onClose,
      popOverProps,
      children,
    },
    ref,
  ) => {
    const theme = useTheme();

    const handleClickCloseIcon = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (onClose) onClose(event, "clickCloseIcon");
    };

    return (
      <Popover
        isOpen={isOpen}
        baseElement={baseElement}
        positionPriority={positionPriority}
        offset={offset}
        onClose={onClose}
        {...popOverProps}
      >
        <Styled.Container ref={ref}>
          <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
          <Styled.IconWrapper onClick={handleClickCloseIcon}>
            <Icon name="close" color={theme.palette.black} />
          </Styled.IconWrapper>
        </Styled.Container>
      </Popover>
    );
  },
);

export default FloatingTip;
