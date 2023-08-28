import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import { NavigationRailContext } from "../utils";
import NotificationBadge from "../../NotificationBadge";
import { useTheme } from "../../../themes";

export type NavigationRailExpansionMenuProps =
  React.ComponentPropsWithoutRef<"div"> & {
    title: string;
    /**
     * If `true`, it is highlighted.
     */
    isActive?: boolean;
    iconName: IconName;
    /**
     * If not `0`, the number is located on the upper right.
     */
    notificationCount?: number;
    /**
     * Array of `<NavigationRail.ExpansionMenu />` is expected.
     */
    expansionList?: React.ReactNode[];
    /**
     * If `true`, it is expanded as default.
     */
    defaultExpand?: boolean;
    /**
     * It can define callback function that triggered when this component is `expanded`.
     */
    onChangeExpand?: (isExpand: boolean) => void;
  };

const ExpansionMenu = React.forwardRef<
  HTMLDivElement,
  NavigationRailExpansionMenuProps
>(function ExpansionMenu(
  {
    title,
    isActive = false,
    iconName,
    expansionList: expansionList = [],
    defaultExpand = false,
    notificationCount = 0,
    onChangeExpand,
    onClick,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const { isOpen } = React.useContext(NavigationRailContext);

  const [isExpand, setIsExpand] = React.useState<boolean>(defaultExpand);
  const [delayTransition, setDelayTransition] = React.useState<boolean>(false);
  const [expansionHeight, setExpansionHeight] = React.useState<string>("auto");

  const expansionElement = React.useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (expansionList.length !== 0) setIsExpand(!isExpand);
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
    if (!expansionElement.current) return;
    // MEMO: Get height for CSS transition
    const { height } = expansionElement.current.getBoundingClientRect();
    if (height !== 0) setExpansionHeight(`${height}px`);
  }, []);

  return (
    <div ref={ref}>
      <Styled.Container isActive={isActive} onClick={handleClick} {...rest}>
        <NotificationBadge badgeContent={notificationCount} position="top-left">
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
        <Styled.ArrowIconWrapper isExpand={isExpand} isOpen={isOpen}>
          <Icon
            name="arrow_bottom"
            color={isActive ? "active" : theme.palette.black}
            size="md"
          />
        </Styled.ArrowIconWrapper>
      </Styled.Container>
      <Styled.Expansion
        ref={expansionElement}
        isExpand={(isExpand && isOpen) || expansionHeight === "auto"}
        height={expansionHeight}
        delay={delayTransition}
      >
        {expansionList.map((node, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>{node}</React.Fragment>
        ))}
      </Styled.Expansion>
    </div>
  );
});

export { ExpansionMenu };
