import * as React from "react";
import * as Styled from "./styled";

import { ButtonSize } from "../Button/Button";
import { useTheme } from "../../themes";

type GroupButtonSize = Exclude<ButtonSize, "large">;

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: GroupButtonSize;
  disabled?: boolean;
};

const buttonSize: Record<GroupButtonSize, { minWidth: string }> = {
  small: {
    minWidth: "63px",
  },
  medium: {
    minWidth: "71px",
  },
};

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ size = "medium", disabled = false, children, ...rest }, ref) => {
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
        ref={ref}
        minWidth={buttonSize[size].minWidth}
        horizontalPadding={horizontalPadding}
        {...rest}
      >
        {childrenWithProps}
      </Styled.ButtonGroupContainer>
    );
  },
);

export default ButtonGroup;
