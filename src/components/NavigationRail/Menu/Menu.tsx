import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import Tooltip from "../../Tooltip";
import { NavigationRailContext } from "../utils";
import { NavigationRailTransitionDuration } from "../constants";
import NotificationBadge from "../../NotificationBadge";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
  iconName: IconName;
  notificationCount?: number;
};

const Menu: React.FC<Props> = ({
  title,
  isActive = false,
  iconName,
  notificationCount = 0,
  onMouseEnter,
  ...rest
}) => {
  const { isOpen, onHandleClose } = React.useContext(NavigationRailContext);

  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textWrapperElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    textWrapperElement.current?.addEventListener("transitionend", () => {
      if (!textWrapperElement.current || !textElement.current) return;
      const wrapperWidth = textWrapperElement.current.offsetWidth;
      const textWidth = textElement.current.offsetWidth;
      setShowTooltip(wrapperWidth <= textWidth);
    });
  }, [textWrapperElement, textElement]);

  return (
    <Tooltip
      content={title}
      positionPriority={["right"]}
      enterDelay={NavigationRailTransitionDuration * 1000}
      disabled={!showTooltip}
      onMouseEnter={onHandleClose}
    >
      <Styled.Container isActive={isActive} {...rest}>
        <NotificationBadge
          badgeContent={notificationCount}
          position="top-left"
          invisible={isOpen}
        >
          <Icon
            name={iconName}
            size="lg"
            type={isActive ? "fill" : "line"}
            color={isActive ? "active" : "line"}
          />
        </NotificationBadge>
        <Styled.TextContainer
          ref={textWrapperElement}
          isActive={isActive}
          isOpen={isOpen}
        >
          <Styled.TextWrapper ref={textElement}>{title}</Styled.TextWrapper>
        </Styled.TextContainer>
        {notificationCount !== 0 && (
          <SideNotificationBadge notificationCount={notificationCount} />
        )}
      </Styled.Container>
    </Tooltip>
  );
};

export { Menu };
