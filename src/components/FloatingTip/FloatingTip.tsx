import { Placement } from "@floating-ui/react";
import * as React from "react";
import { AutoPlacement } from "../../hooks/usePlacement";
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
   * Define priority of position. Please check [this](https://floating-ui.com/docs/tutorial#placements).
   * For backward compatibility, `"auto" | "auto-start" | "auto-end"` are included in addition to the above positions.
   */
  positionPriority?: (Placement | AutoPlacement)[];
  offset?: [number, number];
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    reason: ModalCloseReason | FloatingTipCloseReason,
  ) => void;
  /**
   * props of [Popover](/?path=/docs/components-utils-popover)
   */
  popoverProps?: Partial<PopoverProps>;
};

const FloatingTip = React.forwardRef<HTMLDivElement, FloatingTipProps>(
  (
    {
      baseElement,
      positionPriority = ["right-start"],
      offset = [0, 10],
      isOpen,
      onClose,
      popoverProps,
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
        {...popoverProps}
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
