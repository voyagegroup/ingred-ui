import * as React from "react";
import * as Styled from "./styled";

import { ButtonSize } from "../Button/Button";
import { useTheme } from "../../themes";

type GroupButtonSize = Exclude<ButtonSize, "large">;

export type ButtonGroupProps = {
  size?: GroupButtonSize;
  disabled?: boolean;
};

const buttonSize: Record<
  GroupButtonSize,
  { minWidth: string; height: string }
> = {
  small: {
    minWidth: "63px",
    height: "32px",
  },
  medium: {
    minWidth: "71px",
    height: "42px",
  },
};

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  size = "medium",
  disabled = false,
  children,
}) => {
  const theme = useTheme();
  const horizontalPadding =
    size === "small" ? `${theme.spacing}px` : `${theme.spacing * 2}px`;

  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => {
      const Button = React.cloneElement(child, {
        ...child.props,
        ...(disabled && { disabled: true }),
        size: size,
        color: "secondary",
        style: {
          ...child.props.style,
        },
      });
      return Button;
    },
  );

  return (
    <Styled.ButtonGroupContainer
      height={buttonSize[size].height}
      minWidth={buttonSize[size].minWidth}
      horizontalPadding={horizontalPadding}
    >
      {childrenWithProps}
    </Styled.ButtonGroupContainer>
  );
};
export default ButtonGroup;
