import * as React from "react";
import { fontSize } from "../Typography/Typography";
import * as Styled from "./styled";
import { Theme, useTheme } from "../../themes";
import Spacer from "../Spacer";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor =
  | "primary"
  | "primaryPale"
  | "basicLight"
  | "basicDark"
  | "danger"
  | "clear";

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

const ButtonHeight = {
  small: "28px",
  medium: "32px",
  large: "40px",
};

const FontSize = {
  small: `${fontSize.xs}px`,
  medium: `${fontSize.sm}px`,
  large: `${fontSize.md}px`,
};

const BorderRadius = {
  small: "4px",
  medium: "6px",
  large: "6px",
};

const paddingInline = {
  small: "6px",
  medium: "8px",
  large: "10px",
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
      boxShadow: theme.shadow["3dShadowPrimary"],
      border: `1px solid ${theme.palette.primary.dark}`,
    },
    hover: {
      background: theme.palette.primary.dark,
      border: "none",
    },
    active: {
      background: theme.palette.primary.dark,
      boxShadow: theme.shadow["3dShadowActive"],
      border: "none",
    },
  },
  basicLight: {
    normal: {
      background: theme.palette.background.default,
      color: theme.palette.black,
      boxShadow: theme.shadow["3dShadowBasic"],
      border: `1px solid ${theme.palette.divider}`,
    },
    hover: {
      background: theme.palette.gray.highlight,
      border: `1px solid ${theme.palette.divider}`,
    },
    active: {
      background: theme.palette.gray.highlight,
      boxShadow: theme.shadow["3dShadowActive"],
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  basicDark: {
    normal: {
      background: theme.palette.basicDark.main,
      color: theme.palette.black,
      boxShadow: theme.shadow["3dShadowBasic"],
      border: `1px solid ${theme.palette.basicDark.deepDark}`,
    },
    hover: {
      background: theme.palette.basicDark.dark,
      border: "none",
    },
    active: {
      background: theme.palette.basicDark.dark,
      boxShadow: theme.shadow["3dShadowBasicActive"],
      border: "none",
    },
  },
  danger: {
    normal: {
      background: theme.palette.danger.main,
      color: theme.palette.text.white,
      boxShadow: theme.shadow["3dShadowDanger"],
      border: `1px solid ${theme.palette.danger.dark}`,
    },
    hover: {
      background: theme.palette.danger.dark,
      border: "none",
    },
    active: {
      background: theme.palette.danger.dark,
      boxShadow: theme.shadow["3dShadowActive"],
      border: "none",
    },
  },
  clear: {
    normal: {
      background: "none",
      color: theme.palette.black,
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
  primaryPale: {
    normal: {
      background: theme.palette.primaryPale.main,
      color: theme.palette.primaryPale.dark,
      boxShadow: theme.shadow["3dShadowPrimaryPale"],
      border: `1px solid ${theme.palette.primaryPale.light}`,
    },
    hover: {
      background: theme.palette.primaryPale.highlight,
      border: "none",
    },
    active: {
      background: theme.palette.primaryPale.highlight,
      boxShadow: theme.shadow["3dShadowPrimaryPaleActive"],
      border: "none",
    },
  },
});

type baseProps = {
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
  icon?: React.ReactNode;
  size?: ButtonSize;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
} & React.ComponentPropsWithoutRef<"button">;
type AnchorProps = Omit<baseProps, "onClick"> & {
  /**
   * If added this props, root node becomes `<a />`.
   */
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
};
type BaseButtonProps = baseProps & {
  href?: undefined;
  target?: undefined;
  rel?: undefined;
};

export type ButtonProps = BaseButtonProps | AnchorProps;

const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    component,
    children,
    color = "primary",
    inline = false,
    size = "medium",
    icon,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const colorStyle = getContainerColorStyles(theme)[color];

  const anchorProps: {
    as?:
      | keyof JSX.IntrinsicElements
      | React.ComponentType<{ className: string }>;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: string;
  } = (() => {
    if (typeof rest.href === "string") {
      const { href, target, rel } = rest;
      return {
        as: component || "a",
        href,
        target,
        rel,
      };
    }
    return {};
  })();

  return (
    <Styled.ButtonContainer
      ref={ref}
      {...rest}
      as={component || "button"}
      {...anchorProps}
      size={size}
      inline={inline}
      paddingInline={paddingInline[size]}
      normal={colorStyle.normal}
      hover={colorStyle.hover}
      active={colorStyle.active}
      borderRadius={BorderRadius[size]}
      fontSize={FontSize[size]}
      height={ButtonHeight[size]}
      color={color}
    >
      {icon && icon}
      {icon && children && <Spacer pr={0.5} />}
      {children && <Styled.Text>{children}</Styled.Text>}
    </Styled.ButtonContainer>
  );
});

export default Button;
