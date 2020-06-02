import * as React from "react";
import * as Styled from "./styled";
import { fontSize } from "../Typography/Typography";

type GroupButtonSize = "small" | "medium";

type Props = {
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

const ButtonGroup: React.FunctionComponent<Props> = ({
  size = "medium",
  disabled = false,
  children,
}) => {
  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => {
      return React.cloneElement(child, { disabled: disabled });
    },
  );
  return (
    <Styled.ButtonGroupContainer
      height={buttonSize[size].height}
      minWidth={buttonSize[size].minWidth}
      fontSize={
        size === "small" ? `${fontSize["xs"]}px` : `${fontSize["md"]}px`
      }
    >
      {childrenWithProps}
    </Styled.ButtonGroupContainer>
  );
};
export default ButtonGroup;
