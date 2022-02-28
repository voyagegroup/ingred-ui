import * as React from "react";
import { fontSize } from "../Typography/Typography";

import { Props as BaseButtonProps } from "./internal/BaseButton";
import * as Styled from "./styled";
import { Theme, useTheme } from "../../themes";
import { hexToRgba } from "../../utils/hexToRgba";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary" | "danger" | "clear";

export type ButtonColorStyle = {
  normal: {
    background: string;
    color: string;
    boxShadow: string;
    border: string;
  };
  hover: {
    background?: string;
    border: string;
  };
  active: {
    background?: string;
    boxShadow: string;
    border: string;
  };
};

export type Padding = {
  theme: Theme;
  size: ButtonSize;
  color: ButtonColor;
};

const getContainerColorStyles = (
  theme: Theme,
): { [P in ButtonColor]: ButtonColorStyle } => ({
  primary: {
    normal: {
      background: theme.palette.primary.main,
      color: theme.palette.text.white,
      boxShadow: `0px -2px ${hexToRgba(
        theme.palette.black,
        0.16,
      )} inset, 0px 2px ${hexToRgba(theme.palette.black, 0.08)}`,
      border: `1px solid ${theme.palette.primary.dark}`,
    },
    hover: {
      background: theme.palette.primary.dark,
      border: "none",
    },
    active: {
      background: theme.palette.primary.dark,
      boxShadow: `inset 0 2px ${hexToRgba(theme.palette.black, 0.16)}`,
      border: "none",
    },
  },
  secondary: {
    normal: {
      background: theme.palette.background.default,
      color: theme.palette.black,
      boxShadow: `0px -2px ${hexToRgba(
        theme.palette.black,
        0.16,
      )} inset, 0px 2px ${hexToRgba(theme.palette.black, 0.08)}`,
      border: `1px solid ${theme.palette.divider}`,
    },
    hover: {
      background: theme.palette.gray.highlight,
      border: `1px solid ${theme.palette.divider}`,
    },
    active: {
      background: theme.palette.gray.highlight,
      boxShadow: `inset 0 2px ${hexToRgba(theme.palette.black, 0.16)}`,
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  danger: {
    normal: {
      background: theme.palette.danger.main,
      color: theme.palette.text.white,
      boxShadow: `0px -2px ${hexToRgba(
        theme.palette.black,
        0.16,
      )} inset, 0px 2px ${hexToRgba(theme.palette.black, 0.08)}`,
      border: `1px solid ${theme.palette.danger.dark}`,
    },
    hover: {
      background: theme.palette.danger.dark,
      border: "none",
    },
    active: {
      background: theme.palette.danger.dark,
      boxShadow: `inset 0 2px ${hexToRgba(theme.palette.black, 0.16)}`,
      border: "none",
    },
  },
  clear: {
    normal: {
      background: "none",
      color: theme.palette.gray.deepDark,
      boxShadow: "none",
      border: "none",
    },
    hover: {
      background: theme.palette.gray.light,
      border: "none",
    },
    active: {
      background: theme.palette.gray.main,
      boxShadow: "none",
      border: "none",
    },
  },
});

const paddingAtActive: Record<
  ButtonSize,
  { paddingTop: string; paddingBottom: string }
> = {
  small: {
    paddingTop: "7px",
    paddingBottom: "5px",
  },
  medium: {
    paddingTop: "11px",
    paddingBottom: "9px",
  },
  large: {
    paddingTop: "14px",
    paddingBottom: "12px",
  },
};

const verticalPadding: Record<ButtonSize, { padding: string }> = {
  small: {
    padding: "6px",
  },
  medium: {
    padding: "10px",
  },
  large: {
    padding: "13px",
  },
};

const getPadding = ({ theme, size, color }: Padding) => ({
  horizontalPadding: size === "small" ? `10px` : `${theme.spacing * 2}px`,
  verticalPadding: verticalPadding[size].padding,
  paddingTopAtActive: color === "clear" ? "" : paddingAtActive[size].paddingTop,
  paddingBottomAtActive:
    color === "clear" ? "" : paddingAtActive[size].paddingBottom,
});

export type ButtonProps = Omit<BaseButtonProps, "color"> & {
  /**
   * The component used for the root node.
   * Default: `<button />`
   */
  component?:
    | keyof JSX.IntrinsicElements
    | React.ComponentType<{ className: string }>;
  color?: ButtonColor;
  /**
   * Control whether "inline" or "block" Element.
   */
  inline?: boolean;
  size?: ButtonSize;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  /**
   * If added this props, root node becomes `<a />`.
   */
  href?: string;
};

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      component,
      children,
      color = "primary",
      inline = false,
      size = "medium",
      href,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const colorStyle = getContainerColorStyles(theme)[color];
    const {
      horizontalPadding,
      verticalPadding,
      paddingTopAtActive,
      paddingBottomAtActive,
    } = getPadding({
      theme,
      size,
      color,
    });

    const isLink = !!href;
    let anchorProps: any = {};
    if (isLink) {
      anchorProps = {
        as: component || "a",
        href,
      };
    }

    return (
      <Styled.ButtonContainer
        ref={ref}
        {...rest}
        as={component || "button"}
        {...anchorProps}
        inline={inline}
        verticalPadding={verticalPadding}
        horizontalPadding={horizontalPadding}
        paddingTopAtActive={paddingTopAtActive}
        paddingBottomAtActive={paddingBottomAtActive}
        normal={{ ...colorStyle.normal }}
        hover={{ ...colorStyle.hover }}
        active={{ ...colorStyle.active }}
        fontWeight={color === "secondary" ? "normal" : "bold"}
        fontSize={
          size === "small" ? `${fontSize["xs"]}px` : `${fontSize["md"]}px`
        }
      >
        {children}
      </Styled.ButtonContainer>
    );
  },
);

export default Button;
