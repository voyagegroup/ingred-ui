import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../../Tooltip";

type Props = React.ComponentPropsWithRef<"div"> & {
  title: string;
  isActive?: boolean;
};

const DrawerExpantionMenuItem: React.FC<Props> = ({
  title,
  isActive = false,
  onMouseEnter,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const textWrapperElement = React.useRef<HTMLDivElement | null>(null);
  const textElement = React.useRef<HTMLSpanElement | null>(null);

  const onHandleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (textWrapperElement.current && textElement.current) {
      if (showTooltip) return;
      const wrapperWidth = textWrapperElement.current.offsetWidth;
      const textWidth = textElement.current.offsetWidth;
      setShowTooltip(wrapperWidth < textWidth);
    }
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
        ref={textWrapperElement}
        isActive={isActive}
        onMouseEnter={onHandleMouseEnter}
        {...rest}
      >
        <span ref={textElement}>{title}</span>
      </Styled.Container>
    </Tooltip>
  );
};

export { DrawerExpantionMenuItem };
