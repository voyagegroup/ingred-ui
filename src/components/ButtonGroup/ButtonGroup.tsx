import * as React from "react";
import * as Styled from "./styled";
import { fontSize } from "../Typography/Typography";

type Props = {
  size?: "small" | "medium";
};
type GroupButtonSize = "small" | "medium";

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
  children,
}) => (
  <Styled.ButtonGroupContainer
    height={buttonSize[size].height}
    minWidth={buttonSize[size].minWidth}
    fontSize={size === "small" ? `${fontSize["xs"]}px` : `${fontSize["md"]}px`}
  >
    {children}
  </Styled.ButtonGroupContainer>
);
export default ButtonGroup;
