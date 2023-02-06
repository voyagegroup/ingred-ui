import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import { NavigationRailContext } from "../utils";
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
    { title, isActive = false, iconName, notificationCount = 0, ...rest },
    ref,
  ) => {
    const theme = useTheme();
    const { isOpen } = React.useContext(NavigationRailContext);

    return (
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
        <Styled.TextContainer isOpen={isOpen}>
          <Styled.TextWrapper
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
    );
  },
);

export { Menu };
