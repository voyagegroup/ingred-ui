import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";
import { NavigationRailContext } from "../utils";
import { SideNotificationBadge } from "../internal/SideNotificationBadge";
import { useTheme } from "../../../themes";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
  notificationCount?: number;
};

const ExpantionMenuItem: React.FC<Props> = ({
  title,
  isActive = false,
  onMouseEnter,
  notificationCount = 0,
  ...rest
}) => {
  const theme = useTheme();
  const { onHandleClose } = React.useContext(NavigationRailContext);
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
      onMouseEnter={onHandleClose}
    >
      <Styled.Container {...rest}>
        <Styled.TextContainer ref={textContainerElement}>
          <Styled.TextWrapper
            ref={textElement}
            component="span"
            weight={isActive ? "bold" : "normal"}
            color={isActive ? "primary" : theme.palette.gray.dark}
          >
            {title}
          </Styled.TextWrapper>
        </Styled.TextContainer>
        {notificationCount !== 0 && (
          <SideNotificationBadge notificationCount={notificationCount} />
        )}
      </Styled.Container>
    </Tooltip>
  );
};

export { ExpantionMenuItem };
