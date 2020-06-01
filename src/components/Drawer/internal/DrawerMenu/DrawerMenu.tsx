import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import { IconName } from "../../../Icon/Icon";
import Tooltip from "../../../Tooltip";
import { DrawerContext } from "../../utils";
import { DrawerTransitionDuration } from "../../constants";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
  iconName: IconName;
};

const DrawerMenu: React.FC<Props> = ({
  title,
  isActive = false,
  iconName,
  onMouseEnter,
  ...rest
}) => {
  const { isOpen } = React.useContext(DrawerContext);

  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textWrapperElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!textWrapperElement.current || !textElement.current) return;
    const wrapperWidth = textWrapperElement.current.offsetWidth;
    const textWidth = textElement.current.offsetWidth;
    setShowTooltip(wrapperWidth < textWidth);
  }, [textWrapperElement, textElement]);

  return (
    <Tooltip
      content={title}
      positionPriority={["right"]}
      openDelay={DrawerTransitionDuration * 1000}
      disable={!showTooltip}
    >
      <Styled.Container isActive={isActive} {...rest}>
        <Icon
          name={iconName}
          size="lg"
          type={isActive ? "fill" : "line"}
          color={isActive ? "active" : "line"}
        />
        <Styled.TextWrapper
          ref={textWrapperElement}
          isActive={isActive}
          isOpen={isOpen}
        >
          <span ref={textElement}>{title}</span>
        </Styled.TextWrapper>
      </Styled.Container>
    </Tooltip>
  );
};

export { DrawerMenu };
