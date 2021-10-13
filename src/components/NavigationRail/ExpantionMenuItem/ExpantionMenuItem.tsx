import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";
import { NavigationRailContext } from "../utils";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

export type NavigationRailExpantionMenuItemProps =
  React.ComponentPropsWithoutRef<"div"> & {
    title: string;
    /**
     * If it props exists, replace `title` props with it.
     */
    titleElement?: JSX.Element;
    /**
     * If `true`, it is highlighted.
     */
    isActive?: boolean;
    /**
     * If not `0`, the number is located on the right.
     */
    notificationCount?: number;
  };

const ExpantionMenuItem = React.forwardRef<
  HTMLDivElement,
  NavigationRailExpantionMenuItemProps
>(
  (
    {
      title,
      titleElement,
      isActive = false,
      onMouseEnter,
      notificationCount = 0,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const { handleClose } = React.useContext(NavigationRailContext);
    const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

    const textContainerElement = React.useRef<HTMLDivElement | null>(null);
    const textElement = React.useRef<HTMLSpanElement | null>(null);

    React.useEffect(() => {
      textContainerElement.current?.addEventListener("mouseover", () => {
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
        <Styled.Container ref={ref} {...rest}>
          <Styled.TextContainer ref={textContainerElement}>
            <Styled.TextWrapper
              ref={textElement}
              component="span"
              weight={isActive ? "bold" : "normal"}
              color={isActive ? "primary" : theme.palette.black}
              size="sm"
            >
              {titleElement ? titleElement : title}
            </Styled.TextWrapper>
          </Styled.TextContainer>
          <SideNotificationBadge
            notificationCount={notificationCount}
            invisible={notificationCount === 0}
          />
        </Styled.Container>
      </Tooltip>
    );
  },
);

export { ExpantionMenuItem };
