import * as React from "react";
import { fontSize } from "../Typography/Typography";
// TODO: colorsの扱いについて考える
import { colors } from "../../styles/color";
import { Props as BaseButtonProps } from "./internal/BaseButton";
import * as Styled from "./styled";
import { Theme, useTheme } from "../../themes";

type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "danger" | "cancel";

export type ButtonColorStyle = {
  normal: {
    background: string;
    color: string;
    boxShadow: string;
  };
  hover: {
    background?: string;
  };
  active: {
    background?: string;
  };
};

const getContainerColorStyles = (
  theme: Theme,
): { [P in ButtonColor]: ButtonColorStyle } => ({
  primary: {
    normal: {
      background: theme.palette.primary.main,
      color: theme.palette.white,
      boxShadow: "0px 3px 16px #0b82f466",
    },
    hover: {
      background: theme.palette.primary.dark,
    },
    active: {
      background: theme.palette.primary.deepDark,
    },
  },
  danger: {
    normal: {
      background: theme.palette.danger.main,
      color: theme.palette.white,
      boxShadow: "0px 3px 16px #EB0A4E66",
    },
    hover: {
      background: theme.palette.danger.dark,
    },
    active: {
      background: theme.palette.danger.deepDark,
    },
  },
  cancel: {
    normal: {
      background: "transparent",
      color: theme.palette.black,
      boxShadow: "none",
    },
    hover: {
      background: colors.basic[300],
    },
    active: {
      background: colors.basic[400],
    },
  },
});

const buttonSize: Record<ButtonSize, string> = {
  small: "64px",
  medium: "130px",
  large: "178px",
};

export type Props = Omit<BaseButtonProps, "color"> & {
  color?: ButtonColor;
  inline?: boolean;
  size?: ButtonSize;
  onClick?: () => void;
};

const Button: React.FunctionComponent<Props> = ({
  children,
  color = "primary",
  inline = false,
  size = "medium",
  ...rest
}) => {
  const theme = useTheme();
  const colorStyle = getContainerColorStyles(theme)[color];
  const horizontalPadding =
    size === "small" ? `10px` : `${theme.spacing * 2}px`;
  return (
    <Styled.ButtonContainer
      {...rest}
      inline={inline}
      horizontalPadding={horizontalPadding}
      normal={{ ...colorStyle.normal }}
      hover={{ ...colorStyle.hover }}
      active={{ ...colorStyle.active }}
      fontWeight={color === "cancel" ? "normal" : "bold"}
      fontSize={
        size === "small" ? `${fontSize["xs"]}px` : `${fontSize["md"]}px`
      }
      height={size === "small" ? "32px" : "40px"}
      minWidth={buttonSize[size]}
    >
      {children}
    </Styled.ButtonContainer>
  );
};

export default Button;
