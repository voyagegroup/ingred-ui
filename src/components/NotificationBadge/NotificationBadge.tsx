import * as React from "react";
import * as Styled from "./styled";

export type Props = {
  variant?: "dot" | "normal";
  badgeContent?: number | string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  dotSize?: "small" | "medium" | "large";
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  children: React.ReactNode;
};

const NotificationBadge: React.FunctionComponent<Props> = ({
  badgeContent = "",
  variant = "normal",
  position = "top-right",
  dotSize = "medium",
  max = 99,
  showZero = false,
  invisible: invisibleProp = false,
  children,
}) => {
  let invisible = invisibleProp;

  if (
    (badgeContent === 0 && !showZero) ||
    (badgeContent === "" && variant !== "dot")
  ) {
    invisible = true;
  }

  let displayValue: number | string = "";

  if (variant !== "dot") {
    if (typeof badgeContent === "number") {
      displayValue = badgeContent > max ? `${max}+` : badgeContent;
    } else {
      displayValue = badgeContent;
    }
  }

  return (
    <Styled.Container>
      {children}
      <Styled.Badge
        variant={variant}
        position={position}
        size={dotSize}
        invisible={invisible}
      >
        {displayValue}
      </Styled.Badge>
    </Styled.Container>
  );
};

export default NotificationBadge;
