import * as React from "react";
import * as Styled from "./styled";
import Icon from "../../../Icon";
import { IconName } from "../../../Icon/Icon";
import Tooltip from "../../../Tooltip";
import { DrawerContext } from "../../utils";

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

  const onHandleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // MEMO: transition後の幅を取得するために遅らせている
    setTimeout(() => {
      if (textWrapperElement.current && textElement.current) {
        const wrapperWidth = textWrapperElement.current.offsetWidth;
        const textWidth = textElement.current.offsetWidth;
        setShowTooltip(wrapperWidth < textWidth);
      }
    }, 300);
    if (onMouseEnter) onMouseEnter(event);
  };

  return (
    <Tooltip
      content={title}
      positionPriority={["right"]}
      openDelay={300}
      disable={!showTooltip}
    >
      <Styled.Container
        isActive={isActive}
        onMouseEnter={onHandleMouseEnter}
        {...rest}
      >
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
