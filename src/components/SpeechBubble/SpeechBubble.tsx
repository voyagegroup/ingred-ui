import * as React from "react";
import * as Styled from "./styled";
import * as PopperJS from "@popperjs/core";
import Popover from "../Popover";
import Icon from "../Icon";
import { useTheme } from "../../themes";

type Props = {
  baseElement: HTMLElement | null;
  positionPriority?: PopperJS.Placement[];
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// MEMO: 命名はまた相談
const SpeechBubble: React.FunctionComponent<Props> = ({
  baseElement,
  positionPriority = ["bottom-start", "bottom-end", "top-start", "top-end"],
  open,
  onClose,
  children,
}) => {
  const theme = useTheme();
  return open ? (
    <Popover baseElement={baseElement} positionPriority={positionPriority}>
      <Styled.Container>
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
        <Styled.IconWrapper onClick={onClose}>
          <Icon name="close" color={theme.palette.black} />
        </Styled.IconWrapper>
      </Styled.Container>
    </Popover>
  ) : null;
};

export default SpeechBubble;
