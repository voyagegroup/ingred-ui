import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import { NavigationRailContext } from "../utils";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";
import NotificationBadge from "../../NotificationBadge";
import { palette } from "../../../themes";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
  iconName: IconName;
  notificationCount?: number;
  expantionList?: React.ReactNode[];
  defaultExpand?: boolean;
  onChangeExpand?: (isExpand: boolean) => void;
};

const ExpantionMenu: React.FC<Props> = ({
  title,
  isActive = false,
  iconName,
  expantionList = [],
  defaultExpand = false,
  notificationCount = 0,
  onChangeExpand,
  onClick,
  onMouseEnter,
  ...rest
}) => {
  const { isOpen, onHandleClose } = React.useContext(NavigationRailContext);

  const [isExpand, setIsExpand] = React.useState<boolean>(defaultExpand);
  const [delayTransition, setDelayTransition] = React.useState<boolean>(false);
  const [expantionHeight, setExpantionHeight] = React.useState<string>("auto");
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textContainerElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);
  const expantionElement = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    textContainerElement.current?.addEventListener("transitionend", () => {
      if (!textContainerElement.current || !textElement.current) return;
      const containerWidth = textContainerElement.current.offsetWidth;
      const textWidth = textElement.current.offsetWidth;
      setShowTooltip(containerWidth <= textWidth);
    });
  }, [textContainerElement, textElement]);

  const onHandleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (expantionList.length !== 0) setIsExpand(!isExpand);
    if (onClick) onClick(event);
  };

  React.useEffect(() => {
    setDelayTransition(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    setDelayTransition(false);
    if (onChangeExpand) onChangeExpand(isExpand);
  }, [isExpand, onChangeExpand]);

  React.useEffect(() => {
    if (!expantionElement.current) return;
    // MEMO: transitionのための高さを取得
    const { height } = expantionElement.current.getBoundingClientRect();
    if (height !== 0) setExpantionHeight(`${height}px`);
  }, []);

  return (
    <>
      <Tooltip
        content={title}
        positionPriority={["right"]}
        enterDelay={NavigationRailTransitionDuration * 1000}
        disabled={!showTooltip}
        onMouseEnter={onHandleClose}
      >
        <Styled.Container isActive={isActive} onClick={onHandleClick} {...rest}>
          <NotificationBadge
            badgeContent={notificationCount}
            position="top-left"
          >
            <Icon
              name={iconName}
              size="lg"
              type={isActive ? "fill" : "line"}
              color={isActive ? "active" : palette.black}
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
          <Styled.ArrowIconWrapper isExpand={isExpand} isOpen={isOpen}>
            <Icon
              name="arrow_bottom"
              color={isActive ? "active" : palette.black}
              size="lg"
            />
          </Styled.ArrowIconWrapper>
        </Styled.Container>
      </Tooltip>
      <Styled.Expantion
        ref={expantionElement}
        isExpand={(isExpand && isOpen) || expantionHeight === "auto"}
        height={expantionHeight}
        delay={delayTransition}
      >
        {expantionList.map((node, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>{node}</React.Fragment>
        ))}
      </Styled.Expantion>
    </>
  );
};

export { ExpantionMenu };
