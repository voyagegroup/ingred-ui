import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";
import { NavigationRailContext } from "../utils";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

export type NavigationRailExpantionMenuItemProps = React.ComponentPropsWithRef<"div"> & {
  title: string;
  titleElement?: JSX.Element;
  isActive?: boolean;
  notificationCount?: number;
};

const ExpantionMenuItem: React.FC<NavigationRailExpantionMenuItemProps> = ({
  title,
  titleElement,
  isActive = false,
  onMouseEnter,
  notificationCount = 0,
  ...rest
}) => {
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
      <Styled.Container {...rest}>
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
};

export { ExpantionMenuItem };
