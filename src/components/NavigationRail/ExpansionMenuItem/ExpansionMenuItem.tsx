import * as React from "react";
import { useTheme } from "../../../themes";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import * as Styled from "./styled";

export type NavigationRailExpansionMenuItemProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "title"
> & {
  title: React.ReactNode;
  /**
   * If `true`, it is highlighted.
   */
  isActive?: boolean;
  /**
   * If not `0`, the number is located on the right.
   */
  notificationCount?: number;
};

const ExpansionMenuItem = React.forwardRef<
  HTMLDivElement,
  NavigationRailExpansionMenuItemProps
>(({ title, isActive = false, notificationCount = 0, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Styled.Container ref={ref} {...rest}>
      <Styled.TitleWrapper
        component="div"
        weight={isActive ? "bold" : "normal"}
        color={isActive ? "primary" : theme.palette.black}
        size="sm"
      >
        {title}
      </Styled.TitleWrapper>
      <SideNotificationBadge
        notificationCount={notificationCount}
        invisible={notificationCount === 0}
      />
    </Styled.Container>
  );
});

export { ExpansionMenuItem };
