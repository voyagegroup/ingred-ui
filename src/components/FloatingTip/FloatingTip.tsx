import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import Popover from "../Popover";
import Icon from "../Icon";
import { ModalProps } from "../Modal";
import { useTheme } from "../../themes";

export type FloatingTipProps = {
  baseElement: HTMLElement | null;
  positionPriority?: PopperJS.Placement[];
  offset?: [number, number];
  isOpen: boolean;
  onClose: ModalProps["onClose"];
  children: React.ReactNode;
};

const FloatingTip: React.FunctionComponent<FloatingTipProps> = ({
  baseElement,
  positionPriority = ["right-start"],
  offset = [0, 10],
  isOpen,
  onClose,
  children,
}) => {
  const theme = useTheme();
  return (
    <Popover
      isOpen={isOpen}
      baseElement={baseElement}
      positionPriority={positionPriority}
      offset={offset}
      onClose={onClose}
    >
      <Styled.Container>
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
        <Styled.IconWrapper onClick={onClose}>
          <Icon name="close" color={theme.palette.black} />
        </Styled.IconWrapper>
      </Styled.Container>
    </Popover>
  );
};

export default FloatingTip;
