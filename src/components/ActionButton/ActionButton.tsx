import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Typography from "../Typography";
import { Theme, useTheme } from "../../themes";
import { colors } from "../../styles/color";

const getBackgroundColorAtNormal = (theme: Theme) => ({
  primary: theme.palette.background.hint,
  warning: theme.palette.danger.highlight,
  disabled: theme.palette.gray.light,
});

const getBackgroundColorAtHover = (theme: Theme) => ({
  primary: theme.palette.primary.highlight,
  warning: colors.red[200],
  disabled: theme.palette.gray.light,
});

const getTextColor = (theme: Theme) => ({
  primary: theme.palette.primary.main,
  warning: theme.palette.danger.main,
  disabled: theme.palette.text.disabled,
});

type ColorProp = "primary" | "warning";

export type ActionButtonProps = React.ComponentPropsWithRef<"button"> & {
  icon: IconName;
  color?: ColorProp;
};

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, icon, color = "primary", disabled, ...rest }, ref) => {
    const theme = useTheme();

    const getColorByDisabled = (
      color: ColorProp,
      disabled?: boolean,
    ): string => {
      return disabled ? "disabled" : color;
    };

    const colorForStyle = getColorByDisabled(color, disabled);
    const backgroundColorAtNormal = getBackgroundColorAtNormal(theme)[
      colorForStyle
    ];
    const backgroundColorAtHover = getBackgroundColorAtHover(theme)[
      colorForStyle
    ];
    const textColor = getTextColor(theme)[colorForStyle];

    return (
      <Styled.Container
        {...rest}
        ref={ref}
        backgroundColorAtNormal={backgroundColorAtNormal}
        backgroundColorAtHover={backgroundColorAtHover}
        disabled={disabled}
      >
        <Spacer pr={0.25}>
          <Icon name={icon} color={textColor} />
        </Spacer>
        <Typography color={textColor} size="md">
          {children}
        </Typography>
      </Styled.Container>
    );
  },
);

export default ActionButton;
