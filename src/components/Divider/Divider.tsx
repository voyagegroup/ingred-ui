import React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import { SpacerProps } from "../../utils/spacer";

export type DividerProps = SpacerProps & {
  color?: string;
  orientation?: "vertical" | "horizontal";
};

const Divider: React.FunctionComponent<DividerProps> = ({
  color: colorProp,
  orientation = "horizontal",
  ...rest
}) => {
  const theme = useTheme();
  const color = colorProp || theme.palette.divider;
  return <Styled.Divider color={color} orientation={orientation} {...rest} />;
};

export default Divider;
