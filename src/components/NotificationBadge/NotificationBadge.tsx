import * as React from "react";
import * as Styled from "./styled";

type BaseProps = {
  variant: "normal" | "dot";
  badgeContent?: number | string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  dotSize?: "small" | "medium" | "large";
  children: React.ReactNode;
};

export type Props = BaseProps &
  (
    | {
        variant: "normal";
        badgeContent: number;
        dotSize?: never;
      }
    | {
        variant: "normal";
        badgeContent: string;
        max?: never;
        dotSize?: never;
        showZero?: never;
      }
    | {
        variant: "dot";
        badgeContent?: never;
        max?: never;
        showZero?: never;
      }
  );

const NotificationBadge: React.FunctionComponent<Props> = ({
  variant = "normal",
  badgeContent = "",
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
