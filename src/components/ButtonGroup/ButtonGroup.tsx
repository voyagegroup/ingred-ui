import * as React from "react";
import * as Styled from "./styled";

import { ButtonColor, ButtonSize } from "../Button/Button";

type ButtonMinSize = ButtonSize | "fit-content";

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: ButtonSize;
  color?: ButtonColor;
  minSize?: ButtonMinSize;
  disabled?: boolean;
};

// ButtonGroup内のButtonのiconのサイズを指定する
const buttonIconSize: Record<ButtonSize, string> = {
  small: "md",
  medium: "md-lg",
  large: "md-lg",
};

// ButtonGroup内のButtonの最小幅を揃えるためのもの
const buttonMinSize: Record<ButtonMinSize, string> = {
  "fit-content": "fit-content",
  small: "63px",
  medium: "71px",
  large: "71px",
};

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      size = "medium",
      color = "basicLight",
      minSize = "fit-content",
      disabled = false,
      children,
      ...rest
    },
    ref,
  ) {
    const childrenWithProps = React.Children.map(
      children as React.ReactElement[],
      (child: React.ReactElement) => {
        const childProps = child.props as Record<string, any>;
        const buttonProps = {
          ...childProps,
          ...(disabled && { disabled: true }),
          size,
          inline: true,
          color,
          style: {
            ...(childProps.style || {}),
          },
          // icon に ButtonGroup の size に合わせた値を適用
          icon: childProps.icon
            ? React.cloneElement(childProps.icon as React.ReactElement, {
                size: buttonIconSize[size],
              } as any)
            : undefined,
        };
        const Button = React.cloneElement(child, buttonProps as any);
        return Button;
      },
    );

    return (
      <Styled.ButtonGroupContainer
        ref={ref}
        {...rest as any}
        minSize={buttonMinSize[minSize]}
      >
        {childrenWithProps}
      </Styled.ButtonGroupContainer>
    );
  },
);

export default ButtonGroup;
