import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";
import { NavigationRailContext } from "../utils";
import Spacer from "../../Spacer";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
};

const ExpantionMenuItem: React.FC<Props> = ({
  title,
  isActive = false,
  onMouseEnter,
  ...rest
}) => {
  const notificationCount = 10 as number;
  const { onHandleClose } = React.useContext(NavigationRailContext);
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textWrapperElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!textWrapperElement.current || !textElement.current) return;
    const wrapperWidth = textWrapperElement.current.offsetWidth;
    const textWidth = textElement.current.offsetWidth;
    setShowTooltip(wrapperWidth <= textWidth);
  }, [textWrapperElement, textElement]);

  return (
    <Tooltip
      content={title}
      positionPriority={["right"]}
      enterDelay={NavigationRailTransitionDuration * 1000}
      disabled={!showTooltip}
      onMouseEnter={onHandleClose}
    >
      <Styled.Container {...rest}>
        <Styled.TextContainer ref={textWrapperElement} isActive={isActive}>
          <Styled.TextWrapper ref={textElement}>{title}</Styled.TextWrapper>
        </Styled.TextContainer>
        {notificationCount !== 0 && (
          <Spacer pr={2}>
            <SideNotificationBadge notificationCount={notificationCount} />
          </Spacer>
        )}
      </Styled.Container>
    </Tooltip>
  );
};

export { ExpantionMenuItem };
