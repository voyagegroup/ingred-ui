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
      children as React.ReactElement<any>[],
      (child: React.ReactElement<any>) => {
        const Button = React.cloneElement(child, {
          ...child.props,
          ...(disabled && { disabled: true }),
          size: size,
          inline: true,
          color: color,
          style: {
            ...child.props.style,
          },
          // icon に ButtonGroup の size に合わせた値を適用
          icon: child.props.icon
            ? React.cloneElement(child.props.icon, {
                size: buttonIconSize[size],
              })
            : undefined,
        });
        return Button;
      },
    );

    return (
      <Styled.ButtonGroupContainer
        ref={ref}
        {...rest}
        minSize={buttonMinSize[minSize]}
      >
        {childrenWithProps}
      </Styled.ButtonGroupContainer>
    );
  },
);

export default ButtonGroup;
