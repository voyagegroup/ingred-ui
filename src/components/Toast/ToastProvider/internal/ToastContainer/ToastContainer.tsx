import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../../../../Spacer";
import { ToastContainerProps } from "../../../../../lib/react-toast-notification/src";

const ToastContainer: React.FunctionComponent<ToastContainerProps> = ({
  children,
  ...rest
}) => {
  const spacerProps = {
    pt: rest.placement.includes("top") ? 3 : 0,
    pb: rest.placement.includes("bottom") ? 3 : 0,
  };

  return (
    <Styled.ToastContainer {...rest}>
      <Spacer {...spacerProps}>{children}</Spacer>
    </Styled.ToastContainer>
  );
};

export default ToastContainer;
