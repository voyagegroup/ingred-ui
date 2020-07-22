import React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import { SpacerProps } from "../../utils/spacerUtils";

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
