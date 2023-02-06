import * as React from "react";
import * as Styled from "./styled";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

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
      <Styled.TextContainer>
        <Styled.TextWrapper
          component="span"
          weight={isActive ? "bold" : "normal"}
          color={isActive ? "primary" : theme.palette.black}
          size="sm"
        >
          {title}
        </Styled.TextWrapper>
      </Styled.TextContainer>
      <SideNotificationBadge
        notificationCount={notificationCount}
        invisible={notificationCount === 0}
      />
    </Styled.Container>
  );
});

export { ExpansionMenuItem };
