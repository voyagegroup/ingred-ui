import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "basic";

const getColor = (key: BadgeColor, theme: Theme) => {
  switch (key) {
    case "primary":
      return theme.palette.primary.highlight;
    case "secondary":
      return theme.palette.basicDark.dark;
    case "success":
      return theme.palette.success.main;
    case "warning":
      return theme.palette.warning.main;
    case "danger":
      return theme.palette.danger.main;
    case "basic":
      return theme.palette.black;
  }
};

const getTextColor = (key: BadgeColor, theme: Theme) => {
  switch (key) {
    case "primary":
      return theme.palette.text.primary;
    case "success":
      return theme.palette.success.deepDark;
    case "danger":
      return theme.palette.text.white;
    case "secondary":
      return theme.palette.text.secondary;
    case "warning":
    case "basic":
      return theme.palette.text.primary;
    default:
      return theme.palette.text.white;
  }
};

export type BadgeType = "normal" | "pill" | "signal";

export type BadgeSize = "medium" | "small";

export type BadgeProps = React.ComponentPropsWithoutRef<"a" | "span"> & {
  color: BadgeColor;
  type?: BadgeType;
  fontSize?: string;
  fontWeight?: string;
  component?: "span" | "a";
  size?: BadgeSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Badge = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, BadgeProps>(
  function Badge(
    {
      color,
      type = "normal",
      component = "span",
      fontSize = "13px",
      fontWeight = "normal",
      size = "medium",
      icon,
      iconPosition = "left",
      children,
      ...rest
    },
    ref,
  ) {
    const theme = useTheme();
    if (type === "signal") {
      return (
        <Styled.SignalWrapper
          ref={ref as any}
          as={component}
          size={size}
          {...rest}
        >
          <Styled.SignalDot
            backgroundColor={getColor(color, theme)}
            size={size}
          />
          <span className="badge-signal-text">{children}</span>
        </Styled.SignalWrapper>
      );
    }
    return (
      <Styled.Container
        ref={ref}
        as={component}
        type={type}
        color={
          type === "normal"
            ? getTextColor(color, theme)
            : theme.palette.text.white
        }
        backgroundColor={getColor(color, theme)}
        fontSize={fontSize}
        fontWeight={fontWeight}
        size={size}
        {...rest}
      >
        {icon && iconPosition === "left" && (
          <span className="badge-icon badge-icon-left">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="badge-icon badge-icon-right">{icon}</span>
        )}
      </Styled.Container>
    );
  },
);

export default Badge;
