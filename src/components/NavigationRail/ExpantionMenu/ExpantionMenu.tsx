import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../Icon";
import { IconName } from "../../Icon/Icon";
import { NavigationRailContext } from "../utils";
import Tooltip from "../../Tooltip";
import { NavigationRailTransitionDuration } from "../constants";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
  iconName: IconName;
  expantionList?: React.ReactNode[];
  defaultExpand?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
};

const ExpantionMenu: React.FC<Props> = ({
  title,
  isActive = false,
  iconName,
  expantionList = [],
  defaultExpand = false,
  onExpand,
  onClose,
  onClick,
  onMouseEnter,
  ...rest
}) => {
  const { isOpen, onHandleClose } = React.useContext(NavigationRailContext);

  const [isExpand, setIsExpand] = React.useState<boolean>(defaultExpand);
  const [delayTransition, setDelayTransition] = React.useState<boolean>(false);
  const [expantionHeight, setExpantionHeight] = React.useState<string>("auto");
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textWrapperElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);
  const expantionElement = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!textWrapperElement.current || !textElement.current) return;
    const wrapperWidth = textWrapperElement.current.offsetWidth;
    const textWidth = textElement.current.offsetWidth;
    setShowTooltip(wrapperWidth === textWidth);
  }, [textWrapperElement, textElement]);

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
    if (isExpand) {
      if (onExpand) onExpand();
    } else {
      if (onClose) onClose();
    }
  }, [isExpand, onExpand, onClose]);

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
          <Icon
            name={iconName}
            size="lg"
            type={isActive ? "fill" : "line"}
            color={isActive ? "active" : "line"}
          />
          <Styled.TextContainer
            ref={textWrapperElement}
            isActive={isActive}
            isOpen={isOpen}
          >
            <Styled.TextWrapper ref={textElement}>{title}</Styled.TextWrapper>
          </Styled.TextContainer>
          <Styled.ArrowIconWrapper isExpand={isExpand} isOpen={isOpen}>
            <Icon
              name="arrow_bottom"
              color={isActive ? "active" : "line"}
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
