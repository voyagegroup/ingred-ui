import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import Tooltip from "../../Tooltip";
import { NavigationRailContext } from "../utils";
import { NavigationRailTransitionDuration } from "../constants";
import NotificationBadge from "../../NotificationBadge";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

export type NavigationRailMenuProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  /**
   * If `true`, it is highlighted.
   */
  isActive?: boolean;
  iconName: IconName;
  /**
   * The number is located on the upper right.
   */
  notificationCount?: number;
};

const Menu = React.forwardRef<HTMLDivElement, NavigationRailMenuProps>(
  (
    {
      title,
      isActive = false,
      iconName,
      notificationCount = 0,
      onMouseEnter,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const { isOpen, handleClose } = React.useContext(NavigationRailContext);

    const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

    const textContainerElement = React.useRef<HTMLDivElement | null>(null);
    const textElement = React.useRef<HTMLSpanElement | null>(null);

    React.useEffect(() => {
      textContainerElement.current?.addEventListener("transitionend", () => {
        if (!textContainerElement.current || !textElement.current) return;
        const containerWidth = textContainerElement.current.offsetWidth;
        const textWidth = textElement.current.offsetWidth;
        setShowTooltip(containerWidth <= textWidth);
      });
    }, [textContainerElement, textElement]);

    return (
      <Tooltip
        content={title}
        positionPriority={["right"]}
        enterDelay={NavigationRailTransitionDuration * 1000}
        disabled={!showTooltip}
        onMouseEnter={handleClose}
      >
        <Styled.Container ref={ref} isActive={isActive} {...rest}>
          <NotificationBadge
            badgeContent={notificationCount}
            position="top-left"
            invisible={isOpen}
          >
            <Icon
              name={iconName}
              size="lg"
              type={isActive ? "fill" : "line"}
              color={isActive ? "active" : theme.palette.black}
            />
          </NotificationBadge>
          <Styled.TextContainer ref={textContainerElement} isOpen={isOpen}>
            <Styled.TextWrapper
              ref={textElement}
              component="span"
              color={isActive ? "primary" : "initial"}
              weight="bold"
              size="sm"
            >
              {title}
            </Styled.TextWrapper>
          </Styled.TextContainer>
          <SideNotificationBadge
            notificationCount={notificationCount}
            invisible={notificationCount === 0 || !isOpen}
          />
        </Styled.Container>
      </Tooltip>
    );
  },
);

export { Menu };
