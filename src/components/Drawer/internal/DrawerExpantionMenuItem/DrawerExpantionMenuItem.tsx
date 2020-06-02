import * as React from "react";
import * as Styled from "./styled";
import Tooltip from "../../../Tooltip";
import { DrawerTransitionDuration } from "../../constants";

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
      enterDelay={DrawerTransitionDuration * 1000}
      disable={!showTooltip}
    >
      <Styled.Container ref={textWrapperElement} isActive={isActive} {...rest}>
        <span ref={textElement}>{title}</span>
      </Styled.Container>
    </Tooltip>
  );
};

export { DrawerExpantionMenuItem };
