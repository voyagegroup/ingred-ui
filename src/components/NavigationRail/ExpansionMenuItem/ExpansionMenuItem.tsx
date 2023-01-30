import * as React from "react";
import * as Styled from "./styled";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

export type NavigationRailExpansionMenuItemProps =
  React.ComponentPropsWithoutRef<"div"> & {
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

  const textContainerElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    textContainerElement.current?.addEventListener("mouseover", () => {
      if (!textContainerElement.current || !textElement.current) return;
    });
  }, [textContainerElement, textElement]);

  return (
    <Styled.Container ref={ref} {...rest}>
      <Styled.TextContainer ref={textContainerElement}>
        <Styled.TextWrapper
          ref={textElement}
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
