import React from "react";
import * as Styled from "./styled";
import { SpacerProps } from "../Spacer/Spacer";
import { useTheme } from "../../themes";

type Props = SpacerProps & {
  color?: string;
};

const Divider: React.FunctionComponent<Props> = ({
  color: colorProp,
  ...rest
}) => {
  const theme = useTheme();
  const color = colorProp || theme.palette.divider;
  return <Styled.Divider color={color} {...rest} />;
};

export default Divider;
