import React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import { SpacerProps } from "../../utils/spacerUtils";

type Props = SpacerProps & {
  color?: string;
  orientation?: "vertical" | "horizontal";
  isFlexItem?: boolean;
};

const Divider: React.FunctionComponent<Props> = ({
  color: colorProp,
  orientation = "horizontal",
  isFlexItem = false,
  ...rest
}) => {
  const theme = useTheme();
  const color = colorProp || theme.palette.divider;
  return (
    <Styled.Divider
      color={color}
      orientation={orientation}
      isFlexItem={isFlexItem}
      {...rest}
    />
  );
};

export default Divider;
