import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import Typography from "../Typography";

export type Props = React.ComponentPropsWithRef<"button"> & {
  icon: IconName;
};

const ActionButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, icon, ...rest }, ref) => (
    <Styled.Container {...rest} ref={ref}>
      <Spacer pr={0.25}>
        <Icon name={icon} color="active" />
      </Spacer>
      <Typography color="primary" size="md">
        {children}
      </Typography>
    </Styled.Container>
  ),
);

export default ActionButton;
