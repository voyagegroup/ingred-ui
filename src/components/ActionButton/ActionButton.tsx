import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Typography from "../Typography";
import { Theme, useTheme } from "../../themes";
import { colors } from "../../styles/color";

export type ActionButtonColor = "primary" | "warning";

export type ActionButtonColorStyle = {
  normal: {
    background: string;
    color: string;
  };
  hover: {
    background: string;
    color: string;
  };
  active: {
    background: string;
    color: string;
  };
};

const getContainerColorStyles = (
  theme: Theme,
): { [P in ActionButtonColor | "disabled"]: ActionButtonColorStyle } => ({
  primary: {
    normal: {
      background: theme.palette.background.hint,
      color: theme.palette.primary.main,
    },
    hover: {
      background: theme.palette.primary.highlight,
      color: theme.palette.primary.main,
    },
    active: {
      background: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
  warning: {
    normal: {
      background: theme.palette.danger.highlight,
      color: theme.palette.danger.main,
    },
    hover: {
      background: colors.red[200],
      color: theme.palette.text.white,
    },
    active: {
      background: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
  disabled: {
    normal: {
      background: theme.palette.gray.light,
      color: theme.palette.text.disabled,
    },
    hover: {
      background: theme.palette.gray.light,
      color: theme.palette.text.disabled,
    },
    active: {
      background: theme.palette.gray.light,
      color: theme.palette.text.disabled,
    },
  },
});

export type ActionButtonProps = React.ComponentPropsWithRef<"button"> & {
  icon: IconName;
  color?: ActionButtonColor;
};

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, icon, color = "primary", disabled, ...rest }, ref) => {
    const theme = useTheme();
    const colorStyle = disabled
      ? getContainerColorStyles(theme).disabled
      : getContainerColorStyles(theme)[color];

    return (
      <Styled.Container
        {...rest}
        ref={ref}
        normal={colorStyle.normal}
        hover={colorStyle.hover}
        active={colorStyle.active}
      >
        <Spacer pr={0.25}>
          <Icon name={icon} color={colorStyle.normal.color} />
        </Spacer>
        <Typography color={colorStyle.normal.color} size="md">
          {children}
        </Typography>
      </Styled.Container>
    );
  },
);

export default ActionButton;
